/**
 * Auth initialization plugin.
 *
 * Restores the session via the refresh-token cookie. Runs after the app
 * has mounted so the refresh round-trip cannot complete during Nuxt's
 * hydration step. If it did, Vue would render components against an
 * SSR HTML that saw user=null while the reactive state already had
 * user={...}, producing "Hydration completed but contains mismatches".
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const { initialize } = useAuth()
    initialize()
  })
})
