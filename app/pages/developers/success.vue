<!--
  Landing page shown after a successful B2B Stripe Checkout. Confirms the
  subscription is active (or trialing) and points the customer at the
  next steps (generate an API key, read the docs).
-->
<template>
  <div class="max-w-md mx-auto px-4 py-16 text-center">
    <div class="mb-6">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>

    <h1 class="text-2xl font-bold text-neutral-900 mb-3">
      {{ $t('api.success.title') }}
    </h1>

    <p class="text-neutral-600 mb-8">
      {{ $t('api.success.description') }}
    </p>

    <div class="bg-neutral-50 rounded-xl p-6 mb-8 text-left">
      <h2 class="text-sm font-semibold text-neutral-900 mb-4">
        {{ $t('api.success.nextStepsTitle') }}
      </h2>
      <ol class="space-y-3 list-decimal list-inside text-sm text-neutral-700">
        <li>{{ $t('api.success.step1') }}</li>
        <li>{{ $t('api.success.step2') }}</li>
        <li>{{ $t('api.success.step3') }}</li>
      </ol>
    </div>

    <div class="space-y-3">
      <NuxtLink
        :to="localePath('/account')"
        class="block w-full py-2.5 px-4 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
      >
        {{ $t('api.success.accountCta') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: () => `${t('api.success.title')} - Helvetra`,
})
</script>
