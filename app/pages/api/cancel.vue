<!--
  Landing page shown when a B2B Stripe Checkout session is cancelled
  before completion. Reassures the customer and routes them back to the
  pricing page in case they want to try again or pick a different tier.
-->
<template>
  <div class="max-w-md mx-auto px-4 py-16 text-center">
    <div class="mb-6">
      <div class="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-10 h-10 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>

    <h1 class="text-2xl font-bold text-neutral-900 mb-3">
      {{ $t('api.cancel.title') }}
    </h1>

    <p class="text-neutral-600 mb-8">
      {{ $t('api.cancel.description') }}
    </p>

    <div class="space-y-3">
      <NuxtLink
        :to="localePath('/api')"
        class="block w-full py-2.5 px-4 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
      >
        {{ $t('api.cancel.backCta') }}
      </NuxtLink>

      <a
        href="mailto:gruezi@helvetra.ch"
        class="block w-full py-2.5 px-4 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
      >
        {{ $t('api.cancel.contactCta') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: () => `${t('api.cancel.title')} - Helvetra`,
})
</script>
