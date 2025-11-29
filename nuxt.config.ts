/**
 * Nuxt configuration.
 * Configures modules, i18n, and runtime settings.
 */
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
  ],

  i18n: {
    locales: [
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
      { code: 'de', language: 'de-CH', name: 'Deutsch', file: 'de.json' },
      { code: 'gsw', language: 'gsw', name: 'Schwyzerdütsch', file: 'gsw.json' },
      { code: 'fr', language: 'fr-CH', name: 'Français', file: 'fr.json' },
      { code: 'it', language: 'it-CH', name: 'Italiano', file: 'it.json' },
    ],
    defaultLocale: 'en',
    lazy: true,
    strategy: 'prefix_except_default',
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000',
    },
  },

  app: {
    head: {
      title: 'Helvetra',
      meta: [
        { name: 'description', content: 'The very Swiss translation app' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
})
