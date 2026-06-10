/// <reference types="node" />
/**
 * Nuxt configuration.
 * Configures modules, i18n, and runtime settings.
 */
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Tell Vue that <altcha-widget> (Infomaniak's spam-protection web
  // component, loaded via the script tag in MarketingNewsletterSection)
  // is a real custom element. Without this, Vue tries to resolve it as
  // a Vue component, the SSR pass strips the unknown tag, and the
  // client expects it to exist on hydration. See the warning chain in
  // helvetra/frontend.
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.startsWith('altcha-'),
    },
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
  ],

  site: {
    url: 'https://helvetra.ch',
  },

  sitemap: {
    exclude: [
      '/impressum', '/*/impressum',
      '/login', '/*/login',
      '/register', '/*/register',
      '/confirm', '/*/confirm',
      '/verify-email', '/*/verify-email',
      '/account', '/*/account',
      '/developers/dashboard', '/*/developers/dashboard',
      '/developers/success', '/*/developers/success',
      '/developers/cancel', '/*/developers/cancel',
      '/pricing/success', '/*/pricing/success',
      '/pricing/cancel', '/*/pricing/cancel',
    ],
  },

  // Inline critical CSS to prevent FOUC
  features: {
    inlineStyles: true,
  },

  i18n: {
    baseUrl: 'https://helvetra.ch',
    locales: [
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
      { code: 'de', language: 'de-CH', name: 'Deutsch', file: 'de.json' },
      { code: 'fr', language: 'fr-CH', name: 'Français', file: 'fr.json' },
      { code: 'it', language: 'it-CH', name: 'Italiano', file: 'it.json' },
    ],
    defaultLocale: 'en',
    lazy: true,
    strategy: 'prefix_except_default',
    compilation: {
      strictMessage: false,
    },
    // Disable the v-t directive optimization. It rewrites $t/v-t calls
    // in a way that produces SSR vs CSR mismatches in some templates
    // (the module itself warns about this and is deprecating the feature
    // in v10). See nuxt-modules/i18n#3238.
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api',
      // Matomo analytics — self-hosted, cookieless. Leave empty to disable
      // tracking entirely (e.g. local dev). Overridable via env at deploy
      // time so we never hard-code the tracker URL into the bundle.
      matomoUrl: process.env.NUXT_PUBLIC_MATOMO_URL || '',
      matomoSiteId: process.env.NUXT_PUBLIC_MATOMO_SITE_ID || '',
    },
  },

  // Performance optimizations for Core Web Vitals
  experimental: {
    payloadExtraction: true,
  },

  nitro: {
    compressPublicAssets: true,
    minify: true,
  },

  routeRules: {
    // Cache static assets aggressively
    '/img/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },

  app: {
    head: {
      title: 'Helvetra',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'description', content: 'The very Swiss translation app' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#e10a19' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Helvetra' },
        { property: 'og:image', content: 'https://helvetra.ch/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://helvetra.ch/og-image.png' },
      ],
      link: [
        // Favicon for search engines and browsers (ICO is most compatible)
        // Cache-bust query param forces Safari to fetch fresh favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=2' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // DNS prefetch and preconnect for API
        { rel: 'dns-prefetch', href: 'https://api.helvetra.ch' },
        { rel: 'preconnect', href: 'https://api.helvetra.ch', crossorigin: '' },
      ],
    },
  },
})
