/**
 * Authentication middleware.
 * Redirects unauthenticated users to login page.
 * Waits for auth initialization on page reload before deciding.
 */
export default defineNuxtRouteMiddleware(async (_to) => {
  // Skip on server - auth state is client-side only
  if (import.meta.server) return

  const { isAuthenticated, user, initialize } = useAuth()
  const localePath = useLocalePath()

  // If user state is not loaded but tokens might exist, initialize first
  if (!user.value) {
    await initialize()
  }

  if (!isAuthenticated.value) {
    return navigateTo(localePath('/login'))
  }
})
