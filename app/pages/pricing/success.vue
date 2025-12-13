<!--
  Payment success page shown after successful Payrexx checkout.
  Confirms subscription upgrade and guides user to account page.
-->
<template>
  <div class="max-w-md mx-auto px-4 py-16 text-center">
    <div class="mb-6">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>

    <h1 class="text-2xl font-bold text-neutral-900 mb-3">
      {{ $t('pricing.success.title') }}
    </h1>

    <p class="text-neutral-600 mb-8">
      {{ $t('pricing.success.description') }}
    </p>

    <div class="space-y-3">
      <NuxtLink
        :to="localePath('/account')"
        class="block w-full py-2.5 px-4 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
      >
        {{ $t('pricing.success.accountCta') }}
      </NuxtLink>

      <NuxtLink
        :to="localePath('/')"
        class="block w-full py-2.5 px-4 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
      >
        {{ $t('pricing.success.translateCta') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: () => `${t('pricing.success.title')} - Helvetra`,
})
</script>
