<!--
  Payment cancelled page shown when user cancels Payrexx checkout.
  Provides option to retry or return to pricing page.
-->
<template>
  <div class="max-w-md mx-auto px-4 py-16 text-center">
    <div class="mb-6">
      <div class="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-8 h-8 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>

    <h1 class="text-2xl font-bold text-neutral-900 mb-3">
      {{ $t('pricing.cancel.title') }}
    </h1>

    <p class="text-neutral-600 mb-8">
      {{ $t('pricing.cancel.description') }}
    </p>

    <div class="space-y-3">
      <NuxtLink
        :to="localePath('/pricing')"
        class="block w-full py-2.5 px-4 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
      >
        {{ $t('pricing.cancel.retryCta') }}
      </NuxtLink>

      <NuxtLink
        :to="localePath('/')"
        class="block w-full py-2.5 px-4 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
      >
        {{ $t('pricing.cancel.homeCta') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: () => `${t('pricing.cancel.title')} - Helvetra`,
})
</script>
