/**
 * Composable for authentication and user state management.
 * Handles login, registration, token refresh, and user profile.
 */

interface User {
  id: string
  email: string
  emailVerified: boolean
  tier: string
}

interface Tokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

interface AuthResponse {
  success: boolean
  data?: {
    user: {
      id: string
      email: string
      email_verified: boolean
      tier: string
    }
    tokens: {
      access_token: string
      refresh_token: string
      token_type: string
      expires_in: number
    }
  }
  error?: {
    code: string
    message: string
  }
}

interface UserResponse {
  success: boolean
  data?: {
    user: {
      id: string
      email: string
      email_verified: boolean
      tier: string
    }
  }
  error?: {
    code: string
    message: string
  }
}

interface MessageResponse {
  success: boolean
  message?: string
  error?: {
    code: string
    message: string
  }
}

const TOKEN_STORAGE_KEY = 'helvetra_tokens'

/**
 * Get stored tokens from localStorage.
 */
function getStoredTokens(): Tokens | null {
  if (!import.meta.client) return null
  const stored = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

/**
 * Store tokens in localStorage.
 */
function storeTokens(tokens: Tokens): void {
  if (import.meta.client) {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens))
  }
}

/**
 * Clear stored tokens.
 */
function clearTokens(): void {
  if (import.meta.client) {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  }
}

export function useAuth() {
  const config = useRuntimeConfig()

  // Global state using useState for cross-component reactivity
  const user = useState<User | null>('auth-user', () => null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  /**
   * Get authorization header for API requests.
   */
  function getAuthHeader(): Record<string, string> {
    const tokens = getStoredTokens()
    if (!tokens?.accessToken) return {}
    return { Authorization: `Bearer ${tokens.accessToken}` }
  }

  /**
   * Register a new user account.
   */
  async function register(
    email: string,
    password: string,
    locale?: string
  ): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<AuthResponse>(
        `${config.public.apiBase}/v1/auth/register`,
        {
          method: 'POST',
          body: { email, password, locale },
        }
      )

      if (response.success && response.data) {
        const { user: userData, tokens } = response.data

        storeTokens({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresIn: tokens.expires_in,
        })

        user.value = {
          id: userData.id,
          email: userData.email,
          emailVerified: userData.email_verified,
          tier: userData.tier,
        }

        return true
      }

      if (response.error) {
        error.value = response.error.message
        return false
      }

      error.value = 'Registration failed'
      return false
    } catch (e) {
      const fetchError = e as { data?: AuthResponse; statusCode?: number }

      if (fetchError.statusCode === 409) {
        error.value = 'EMAIL_EXISTS'
      } else if (fetchError.statusCode === 422) {
        error.value = 'VALIDATION_ERROR'
      } else if (fetchError.statusCode === 429) {
        error.value = 'RATE_LIMITED'
      } else if (fetchError.data?.error) {
        error.value = fetchError.data.error.message
      } else {
        error.value = 'CONNECTION_ERROR'
      }

      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Login with email and password.
   */
  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<AuthResponse>(
        `${config.public.apiBase}/v1/auth/login`,
        {
          method: 'POST',
          body: { email, password },
        }
      )

      if (response.success && response.data) {
        const { user: userData, tokens } = response.data

        storeTokens({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresIn: tokens.expires_in,
        })

        user.value = {
          id: userData.id,
          email: userData.email,
          emailVerified: userData.email_verified,
          tier: userData.tier,
        }

        return true
      }

      if (response.error) {
        error.value = response.error.message
        return false
      }

      error.value = 'Login failed'
      return false
    } catch (e) {
      const fetchError = e as { data?: AuthResponse; statusCode?: number }

      if (fetchError.statusCode === 401) {
        error.value = 'INVALID_CREDENTIALS'
      } else if (fetchError.statusCode === 429) {
        error.value = 'RATE_LIMITED'
      } else if (fetchError.data?.error) {
        error.value = fetchError.data.error.message
      } else {
        error.value = 'CONNECTION_ERROR'
      }

      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Logout and clear session.
   */
  async function logout(): Promise<void> {
    const tokens = getStoredTokens()

    if (tokens?.refreshToken) {
      try {
        await $fetch<MessageResponse>(
          `${config.public.apiBase}/v1/auth/logout`,
          {
            method: 'POST',
            body: { refresh_token: tokens.refreshToken },
          }
        )
      } catch {
        // Ignore logout errors - clear local state anyway
      }
    }

    clearTokens()
    user.value = null
  }

  /**
   * Refresh access token using refresh token.
   */
  async function refreshToken(): Promise<boolean> {
    const tokens = getStoredTokens()
    if (!tokens?.refreshToken) return false

    try {
      const response = await $fetch<AuthResponse>(
        `${config.public.apiBase}/v1/auth/refresh`,
        {
          method: 'POST',
          body: { refresh_token: tokens.refreshToken },
        }
      )

      if (response.success && response.data?.tokens) {
        storeTokens({
          accessToken: response.data.tokens.access_token,
          refreshToken: response.data.tokens.refresh_token,
          expiresIn: response.data.tokens.expires_in,
        })
        return true
      }

      // Refresh failed - clear session
      clearTokens()
      user.value = null
      return false
    } catch {
      clearTokens()
      user.value = null
      return false
    }
  }

  /**
   * Fetch current user profile.
   */
  async function fetchUser(): Promise<boolean> {
    const tokens = getStoredTokens()
    if (!tokens?.accessToken) return false

    try {
      const response = await $fetch<UserResponse>(
        `${config.public.apiBase}/v1/auth/me`,
        {
          method: 'GET',
          headers: getAuthHeader(),
        }
      )

      if (response.success && response.data?.user) {
        const userData = response.data.user
        user.value = {
          id: userData.id,
          email: userData.email,
          emailVerified: userData.email_verified,
          tier: userData.tier,
        }
        return true
      }

      return false
    } catch (e) {
      const fetchError = e as { statusCode?: number }

      if (fetchError.statusCode === 401) {
        // Token expired - try refresh
        const refreshed = await refreshToken()
        if (refreshed) {
          return fetchUser()
        }
      }

      return false
    }
  }

  /**
   * Initialize auth state from stored tokens.
   */
  async function initialize(): Promise<void> {
    if (!import.meta.client) return

    const tokens = getStoredTokens()
    if (tokens?.accessToken) {
      await fetchUser()
    }
  }

  /**
   * Verify email with token from verification link.
   */
  async function verifyEmail(token: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<MessageResponse>(
        `${config.public.apiBase}/v1/auth/verify-email`,
        {
          method: 'POST',
          body: { token },
        }
      )

      if (response.success) {
        // Update local user state
        if (user.value) {
          user.value.emailVerified = true
        }
        return true
      }

      error.value = 'VERIFICATION_FAILED'
      return false
    } catch (e) {
      const fetchError = e as { statusCode?: number }

      if (fetchError.statusCode === 400) {
        error.value = 'INVALID_TOKEN'
      } else {
        error.value = 'VERIFICATION_FAILED'
      }

      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Resend verification email.
   */
  async function resendVerification(
    email: string,
    locale?: string
  ): Promise<{ success: boolean; retryAfter?: number }> {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<MessageResponse>(
        `${config.public.apiBase}/v1/auth/resend-verification`,
        {
          method: 'POST',
          body: { email, locale },
        }
      )

      return { success: response.success }
    } catch (e) {
      const fetchError = e as { statusCode?: number; data?: { detail?: string }; response?: { headers?: Headers } }

      if (fetchError.statusCode === 429) {
        const retryAfter = parseInt(fetchError.data?.detail?.match(/(\d+)/)?.[1] || '60')
        error.value = 'RESEND_RATE_LIMITED'
        return { success: false, retryAfter }
      }

      error.value = 'RESEND_FAILED'
      return { success: false }
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    register,
    login,
    logout,
    refreshToken,
    fetchUser,
    initialize,
    getAuthHeader,
    verifyEmail,
    resendVerification,
  }
}
