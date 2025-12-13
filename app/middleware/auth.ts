/**
 * Authentication middleware.
 * Redirects unauthenticated users to login page.
 */
export default defineNuxtRouteMiddleware((_to) => {
  const { isAuthenticated } = useAuth()
  const localePath = useLocalePath()

  if (!isAuthenticated.value) {
    return navigateTo(localePath('/login'))
  }
})
