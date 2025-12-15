<!--
  Pricing page showing tier comparison and upgrade options.
  Creates Payrexx gateway via API and redirects to payment page.
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

    <!-- Billing toggle -->
    <div class="flex flex-row flex-nowrap items-center justify-center gap-3 mb-8">
      <span
        class="text-sm font-medium whitespace-nowrap"
        :class="billingPeriod === 'monthly' ? 'text-neutral-900' : 'text-neutral-500'"
      >
        {{ $t('pricing.monthly') }}
      </span>
      <button
        type="button"
        class="relative inline-flex h-6 w-11 min-w-[2.75rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-swiss-red focus:ring-offset-2"
        :class="billingPeriod === 'yearly' ? 'bg-swiss-red' : 'bg-neutral-200'"
        role="switch"
        :aria-checked="billingPeriod === 'yearly'"
        @click="billingPeriod = billingPeriod === 'monthly' ? 'yearly' : 'monthly'"
      >
        <span
          class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          :class="billingPeriod === 'yearly' ? 'translate-x-5' : 'translate-x-0'"
        />
      </button>
      <span
        class="text-sm font-medium whitespace-nowrap"
        :class="billingPeriod === 'yearly' ? 'text-neutral-900' : 'text-neutral-500'"
      >
        {{ $t('pricing.yearly') }}
      </span>
      <span
        v-if="billingPeriod === 'yearly'"
        class="ml-1 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 whitespace-nowrap"
      >
        {{ $t('pricing.save40') }}
      </span>
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
          <template v-if="billingPeriod === 'yearly'">
            <span class="text-3xl font-bold text-neutral-900">CHF 4.99</span>
            <span class="text-neutral-500">{{ $t('pricing.perMonth') }}</span>
            <div class="text-sm text-neutral-500 mt-1">
              {{ $t('pricing.billedYearly', { total: 'CHF 59.88' }) }}
            </div>
          </template>
          <template v-else>
            <span class="text-3xl font-bold text-neutral-900">CHF 7.99</span>
            <span class="text-neutral-500">{{ $t('pricing.perMonth') }}</span>
            <div class="text-sm text-neutral-500 mt-1">
              {{ $t('pricing.billedMonthly') }}
            </div>
          </template>
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
        <!-- Upgrade button for authenticated users -->
        <div v-else-if="isAuthenticated">
          <button
            :disabled="isCreatingGateway"
            class="block w-full py-2.5 px-4 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-center cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            @click="handleUpgrade"
          >
            <span v-if="isCreatingGateway" class="inline-flex items-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {{ $t('auth.loading') }}
            </span>
            <span v-else>{{ $t('pricing.pro.cta') }}</span>
          </button>
          <p v-if="gatewayError" class="mt-2 text-sm text-red-600 text-center">
            {{ gatewayError }}
          </p>
        </div>
        <!-- Redirect to register for non-authenticated users -->
        <NuxtLink
          v-else
          :to="localePath('/register')"
          class="block w-full py-2.5 px-4 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-center"
        >
          {{ $t('pricing.pro.cta') }}
        </NuxtLink>
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
const config = useRuntimeConfig()
const { user, isAuthenticated, getAuthHeader } = useAuth()

const billingPeriod = ref<'monthly' | 'yearly'>('yearly')
const isCreatingGateway = ref(false)
const gatewayError = ref<string | null>(null)

interface GatewayResponse {
  success: boolean
  gateway_url?: string
  error?: string
}

async function handleUpgrade(): Promise<void> {
  if (isCreatingGateway.value) return

  isCreatingGateway.value = true
  gatewayError.value = null

  try {
    const response = await $fetch<GatewayResponse>(
      `${config.public.apiBase}/v1/payments/create-gateway`,
      {
        method: 'POST',
        headers: getAuthHeader(),
        body: {
          billing_period: billingPeriod.value,
        },
      }
    )

    if (response.success && response.gateway_url) {
      // Redirect to Payrexx payment page
      window.location.href = response.gateway_url
    } else {
      gatewayError.value = response.error || 'Failed to create payment'
    }
  } catch (error) {
    console.error('Payment gateway error:', error)
    gatewayError.value = 'Connection error. Please try again.'
  } finally {
    isCreatingGateway.value = false
  }
}

useHead({
  title: () => `${t('pricing.title')} - Helvetra`,
})
</script>

