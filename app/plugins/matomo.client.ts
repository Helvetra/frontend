/**
 * Matomo analytics integration.
 *
 * Cookieless, first-party, IP-anonymised. The script is fetched from
 * our self-hosted Matomo instance at analyze.helvetra.ch (configured via
 * runtimeConfig). disableCookies must be pushed BEFORE the first
 * trackPageView so the initial visit is also cookieless.
 *
 * Client-only (the .client.ts suffix prevents SSR execution): we never
 * want the tracker script in the prerendered HTML, only injected after
 * hydration. Route changes are tracked by listening to router.afterEach,
 * since Nuxt SPA navigations do not reload the script tag.
 */

declare global {
  interface Window {
    _paq?: unknown[][]
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const trackerUrl = config.public.matomoUrl as string
  const siteId = config.public.matomoSiteId as string

  // If either is missing (e.g. local dev without env set), don't load
  // anything. Cookieless or not, no tracker means no surprises.
  if (!trackerUrl || !siteId) return

  // Normalise trailing slash so URL concatenation stays clean regardless
  // of how the env var was set.
  const url = trackerUrl.endsWith('/') ? trackerUrl : `${trackerUrl}/`

  const paq = (window._paq = window._paq || [])
  paq.push(['disableCookies'])
  paq.push(['enableLinkTracking'])
  paq.push(['setTrackerUrl', `${url}matomo.php`])
  paq.push(['setSiteId', siteId])
  // Honour Do-Not-Track / Global Privacy Control if the browser signals it.
  paq.push(['setDoNotTrack', true])
  // Initial page view (subsequent ones go through the router hook below).
  paq.push(['trackPageView'])

  // Async-inject the tracker script. Position before any existing
  // script tag matches the standard Matomo install snippet, but
  // appending to <head> also works in Nuxt's hydrated DOM.
  const script = document.createElement('script')
  script.async = true
  script.src = `${url}matomo.js`
  document.head.appendChild(script)

  // SPA route tracking. Nuxt navigations don't fire a fresh page load,
  // so without this we'd only see the initial visit per browser tab.
  const router = useRouter()
  router.afterEach((to) => {
    paq.push(['setCustomUrl', window.location.origin + to.fullPath])
    paq.push(['setDocumentTitle', document.title])
    paq.push(['trackPageView'])
  })

  // Expose a tiny typed helper for ad-hoc event tracking (e.g. "Subscribe
  // clicked", "API key generated") without making components reach into
  // window._paq directly.
  nuxtApp.provide('trackEvent', (category: string, action: string, name?: string, value?: number) => {
    const args: unknown[] = ['trackEvent', category, action]
    if (name !== undefined) args.push(name)
    if (value !== undefined) args.push(value)
    paq.push(args)
  })
})

declare module '#app' {
  interface NuxtApp {
    $trackEvent: (category: string, action: string, name?: string, value?: number) => void
  }
}
