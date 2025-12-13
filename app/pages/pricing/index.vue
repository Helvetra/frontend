<!--
  Pricing page showing tier comparison and upgrade options.
  Redirects to Payrexx for payment processing.
-->
<template>
  <div class="max-w-4xl mx-auto px-4 py-8 md:py-12">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold text-neutral-900 mb-3">
        {{ $t('pricing.title') }}
      </h1>
      <p class="text-neutral-600 max-w-xl mx-auto">
        {{ $t('pricing.subtitle') }}
      </p>
    </div>

    <!-- Pricing cards -->
    <div class="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      <!-- Free tier -->
      <div class="bg-white border border-neutral-200 rounded-xl p-6">
        <div class="mb-4">
          <h2 class="text-xl font-semibold text-neutral-900">{{ $t('pricing.free.name') }}</h2>
          <p class="text-neutral-500 text-sm mt-1">{{ $t('pricing.free.description') }}</p>
        </div>

        <div class="mb-6">
          <span class="text-3xl font-bold text-neutral-900">{{ $t('pricing.free.price') }}</span>
        </div>

        <ul class="space-y-3 mb-6">
          <li class="flex items-start gap-2 text-sm text-neutral-600">
            <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ $t('pricing.free.featureLimit') }}
          </li>
          <li class="flex items-start gap-2 text-sm text-neutral-600">
            <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ $t('pricing.free.feature1') }}
          </li>
          <li class="flex items-start gap-2 text-sm text-neutral-600">
            <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ $t('pricing.free.feature2') }}
          </li>
          <li class="flex items-start gap-2 text-sm text-neutral-600">
            <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ $t('pricing.free.featureFormality') }}
          </li>
          <li class="flex items-start gap-2 text-sm text-neutral-600">
            <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ $t('pricing.free.feature3') }}
          </li>
        </ul>

        <div v-if="isAuthenticated && user?.tier === 'free'" class="text-center">
          <span class="inline-block px-4 py-2 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-medium">
            {{ $t('pricing.currentPlan') }}
          </span>
        </div>
        <NuxtLink
          v-else-if="!isAuthenticated"
          :to="localePath('/register')"
          class="block w-full py-2.5 px-4 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors text-center"
        >
          {{ $t('pricing.free.cta') }}
        </NuxtLink>
      </div>

      <!-- Pro tier (Helvetra+) -->
      <div class="bg-white border-2 border-swiss-red rounded-xl p-6 relative">
        <div class="absolute -top-3 left-1/2 -translate-x-1/2">
          <span class="bg-swiss-red text-white text-xs font-medium px-3 py-1 rounded-full">
            {{ $t('pricing.popular') }}
          </span>
        </div>

        <div class="mb-4">
          <h2 class="text-xl font-semibold text-neutral-900">{{ $t('pricing.pro.name') }}</h2>
          <p class="text-neutral-500 text-sm mt-1">{{ $t('pricing.pro.description') }}</p>
        </div>

        <div class="mb-6">
          <span class="text-3xl font-bold text-neutral-900">CHF 4.99</span>
          <span class="text-neutral-500">{{ $t('pricing.perMonth') }}</span>
        </div>

        <ul class="space-y-3 mb-6">
          <li class="flex items-start gap-2 text-sm text-neutral-600">
            <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ $t('pricing.pro.featureBasic') }}
          </li>
          <li class="flex items-start gap-2 text-sm text-neutral-600">
            <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ $t('pricing.pro.featureLimit') }}
          </li>
          <li class="flex items-start gap-2 text-sm text-neutral-600">
            <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ $t('pricing.pro.feature1') }}
          </li>
          <li class="flex items-start gap-2 text-sm text-neutral-600">
            <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ $t('pricing.pro.feature2') }}
          </li>
          <li class="flex items-start gap-2 text-sm text-neutral-600">
            <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ $t('pricing.pro.feature3') }}
          </li>
        </ul>

        <div v-if="isAuthenticated && user?.tier === 'pro'" class="text-center">
          <span class="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
            {{ $t('pricing.currentPlan') }}
          </span>
        </div>
        <button
          v-else
          @click="handleUpgrade"
          :disabled="upgradeLoading"
          class="block w-full py-2.5 px-4 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-center disabled:opacity-50"
        >
          <span v-if="upgradeLoading">{{ $t('auth.loading') }}</span>
          <span v-else>{{ $t('pricing.pro.cta') }}</span>
        </button>
      </div>
    </div>

    <!-- Payment methods -->
    <div class="mt-10 text-center">
      <p class="text-sm text-neutral-500 mb-3">{{ $t('pricing.paymentMethods') }}</p>
      <div class="flex items-center justify-center gap-4">
        <span class="text-sm font-medium text-neutral-600">TWINT</span>
        <span class="text-neutral-300">|</span>
        <span class="text-sm font-medium text-neutral-600">Visa</span>
        <span class="text-neutral-300">|</span>
        <span class="text-sm font-medium text-neutral-600">Mastercard</span>
      </div>
    </div>

    <!-- FAQ link -->
    <div class="mt-8 text-center">
      <p class="text-sm text-neutral-500">
        {{ $t('pricing.questions') }}
        <a href="mailto:gruezi@helvetra.ch" class="text-swiss-red hover:underline">
          gruezi@helvetra.ch
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { user, isAuthenticated } = useAuth()
const config = useRuntimeConfig()

const upgradeLoading = ref(false)

async function handleUpgrade() {
  // If not logged in, redirect to register first
  if (!isAuthenticated.value) {
    navigateTo(localePath('/register'))
    return
  }

  upgradeLoading.value = true

  // Redirect to Payrexx payment page
  // The payment page will redirect back to /pricing/success or /pricing/cancel
  const payrexxUrl = config.public.payrexxProUrl || 'https://helvetra.payrexx.com/de/pay?tid=e84e0dd3'

  // Add user email as reference for webhook matching
  const urlWithRef = `${payrexxUrl}&referenceId=${encodeURIComponent(user.value?.email || '')}`

  window.location.href = urlWithRef
}

useHead({
  title: () => `${t('pricing.title')} - Helvetra`,
})
</script>
