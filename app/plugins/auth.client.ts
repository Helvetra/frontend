/**
 * Auth initialization plugin.
 * Restores auth state from localStorage before route middleware runs.
 */
export default defineNuxtPlugin(async () => {
  const { initialize } = useAuth()
  await initialize()
})
