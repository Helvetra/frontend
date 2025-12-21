/// <reference types="node" />
/**
 * Nuxt configuration.
 * Configures modules, i18n, and runtime settings.
 */
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
  ],

  // Inline critical CSS to prevent FOUC
  features: {
    inlineStyles: true,
  },

  i18n: {
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
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api',
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
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // DNS prefetch and preconnect for API
        { rel: 'dns-prefetch', href: 'https://api.helvetra.ch' },
        { rel: 'preconnect', href: 'https://api.helvetra.ch', crossorigin: '' },
      ],
    },
  },
})
