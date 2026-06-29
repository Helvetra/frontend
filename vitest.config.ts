import { defineConfig } from 'vitest/config'

// Lightweight unit-test setup for pure logic modules (no Nuxt runtime).
export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'node',
  },
})
