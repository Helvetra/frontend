/**
 * Composable for authentication and user state management.
 *
 * Refresh tokens live in an HttpOnly+Secure+SameSite=Strict cookie scoped to
 * /api/v1/auth (set by the backend when we send `use_cookie: true`). The
 * short-lived access token lives in memory only via useState — never in
 * localStorage — so an XSS payload cannot exfiltrate either token. On page
 * load we silently call /refresh: a valid cookie restores the session, no
 * cookie or expired cookie leaves the user logged out.
 *
 * See helvetra/frontend#96 + helvetra/backend#110 for the migration off the
 * old localStorage-based flow.
 */

interface User {
  id: string
  email: string
  emailVerified: boolean
  tier: string
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

export function useAuth() {
  const config = useRuntimeConfig()

  // Global state. accessToken lives in memory only (no persistence) — page
  // reload clears it and we recover via the refresh cookie.
  const user = useState<User | null>('auth-user', () => null)
  const accessToken = useState<string | null>('auth-access-token', () => null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  // Every authed request to /api needs credentials: 'include' so the
  // refresh cookie travels along on /refresh + /logout, and so the
  // browser stores the Set-Cookie on the response. Same-origin
  // (helvetra.ch → /api → backend) so no CORS gymnastics needed.
  const fetchOpts = { credentials: 'include' as const }

  function getAuthHeader(): Record<string, string> {
    return accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {}
  }

  // Read the non-HttpOnly csrf_token cookie set by the backend. Used to
  // populate the X-CSRF-Token header on cookie-authenticated state-
  // changing requests (double-submit pattern, helvetra/backend#110).
  function getCsrfHeader(): Record<string, string> {
    if (!import.meta.client) return {}
    const match = document.cookie.match(/(?:^|; )csrf_token=([^;]+)/)
    return match ? { 'X-CSRF-Token': decodeURIComponent(match[1]!) } : {}
  }

  function setSession(userData: {
    id: string
    email: string
    email_verified: boolean
    tier: string
  }, token: string): void {
    user.value = {
      id: userData.id,
      email: userData.email,
      emailVerified: userData.email_verified,
      tier: userData.tier,
    }
    accessToken.value = token
  }

  function clearSession(): void {
    user.value = null
    accessToken.value = null
  }

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
          body: { email, password, locale, use_cookie: true },
          ...fetchOpts,
        }
      )

      if (response.success && response.data) {
        setSession(response.data.user, response.data.tokens.access_token)
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

  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<AuthResponse>(
        `${config.public.apiBase}/v1/auth/login`,
        {
          method: 'POST',
          body: { email, password, use_cookie: true },
          ...fetchOpts,
        }
      )

      if (response.success && response.data) {
        setSession(response.data.user, response.data.tokens.access_token)
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

  async function logout(): Promise<void> {
    try {
      await $fetch<MessageResponse>(
        `${config.public.apiBase}/v1/auth/logout`,
        {
          method: 'POST',
          headers: { ...getCsrfHeader() },
          ...fetchOpts,
        }
      )
    } catch {
      // Ignore — clear local state regardless.
    }

    clearSession()
  }

  /**
   * Exchange the refresh-token cookie for a new access token (rotates the
   * cookie too). No request body — server reads the cookie via credentials.
   */
  async function refreshToken(): Promise<boolean> {
    try {
      const response = await $fetch<AuthResponse>(
        `${config.public.apiBase}/v1/auth/refresh`,
        {
          method: 'POST',
          headers: { ...getCsrfHeader() },
          ...fetchOpts,
        }
      )

      if (response.success && response.data?.tokens) {
        accessToken.value = response.data.tokens.access_token
        return true
      }

      clearSession()
      return false
    } catch {
      clearSession()
      return false
    }
  }

  async function fetchUser(): Promise<boolean> {
    if (!accessToken.value) return false

    try {
      const response = await $fetch<UserResponse>(
        `${config.public.apiBase}/v1/auth/me`,
        {
          method: 'GET',
          headers: getAuthHeader(),
          ...fetchOpts,
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
        const refreshed = await refreshToken()
        if (refreshed) {
          return fetchUser()
        }
      }

      return false
    }
  }

  /**
   * On client mount, attempt to restore the session via the refresh-token
   * cookie. If it exists and is valid the user stays logged in across reloads.
   */
  async function initialize(): Promise<void> {
    if (!import.meta.client) return

    const refreshed = await refreshToken()
    if (refreshed) {
      await fetchUser()
    }
  }

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
      const fetchError = e as {
        statusCode?: number
        data?: { detail?: string }
        response?: { headers?: Headers }
      }

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
    getCsrfHeader,
    verifyEmail,
    resendVerification,
  }
}
