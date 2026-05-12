<!--
  B2B API landing page.
  Communicates the value proposition for developers and businesses, shows
  the tier comparison, and provides CTAs that route to the B2B Stripe
  Checkout (authenticated) or to registration (anonymous).
-->
<template>
  <div class="max-w-5xl mx-auto px-4 py-8 md:py-12">
    <!-- Hero -->
    <div class="text-center mb-12">
      <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
        {{ $t('api.title') }}
      </h1>
      <p class="text-neutral-600 max-w-2xl mx-auto mb-5">
        {{ $t('api.subtitle') }}
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <NuxtLink
          :to="localePath('/developers/docs')"
          class="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors"
        >
          {{ $t('api.docsCta') }}
          <span aria-hidden="true">&rarr;</span>
        </NuxtLink>
        <a
          href="/api/public/v1/docs"
          class="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors"
        >
          {{ $t('api.referenceCta') }}
        </a>
      </div>
    </div>

    <!-- Factual summary block: short, declarative, easy for language
         models and search engines to quote verbatim. Keep this terse
         and current — it shows up in AI-assistant answers. -->
    <section class="bg-neutral-50 border border-neutral-200 rounded-xl p-5 mb-10 max-w-3xl mx-auto">
      <p class="text-sm text-neutral-700 leading-relaxed">
        {{ $t('api.factSummary') }}
      </p>
    </section>

    <!-- Value proposition -->
    <section class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
      <div
        v-for="(value, index) in valueProps"
        :key="index"
        class="bg-white border border-neutral-200 rounded-xl p-5"
      >
        <h3 class="text-sm font-semibold text-neutral-900 mb-1.5">
          {{ $t(`api.values.${value}.title`) }}
        </h3>
        <p class="text-sm text-neutral-600 leading-relaxed">
          {{ $t(`api.values.${value}.body`) }}
        </p>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="mb-14">
      <h2 class="text-2xl font-bold text-neutral-900 text-center mb-2">
        {{ $t('api.pricing.title') }}
      </h2>
      <p class="text-sm text-neutral-500 text-center mb-8">
        {{ $t('api.pricing.note') }}
      </p>

      <div class="grid md:grid-cols-3 gap-6">
        <!-- Starter -->
        <div class="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col">
          <div class="mb-4">
            <h3 class="text-xl font-semibold text-neutral-900">{{ $t('api.tiers.starter.name') }}</h3>
            <p class="text-neutral-500 text-sm mt-1">{{ $t('api.tiers.starter.audience') }}</p>
          </div>

          <div class="mb-1">
            <span class="text-3xl font-bold text-neutral-900">CHF 29</span>
            <span class="text-neutral-500">{{ $t('api.perMonth') }}</span>
          </div>
          <p class="text-xs text-neutral-500 mb-6">{{ $t('api.tiers.starter.trial') }}</p>

          <ul class="space-y-3 mb-6 flex-1">
            <li
              v-for="(_, idx) in 5"
              :key="idx"
              class="flex items-start gap-2 text-sm text-neutral-700"
            >
              <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ $t(`api.tiers.starter.feature${idx + 1}`) }}
            </li>
          </ul>

          <button
            type="button"
            :disabled="isCreatingGateway === 'starter'"
            class="block w-full py-2.5 px-4 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-center cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            @click="handleSubscribe('starter')"
          >
            <span v-if="isCreatingGateway === 'starter'">{{ $t('auth.loading') }}</span>
            <span v-else>{{ $t('api.tiers.starter.cta') }}</span>
          </button>
        </div>

        <!-- Business (featured) -->
        <div class="bg-white border-2 border-swiss-red rounded-xl p-6 flex flex-col relative">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2">
            <span class="bg-swiss-red text-white text-xs font-medium px-3 py-1 rounded-full">
              {{ $t('api.tiers.business.badge') }}
            </span>
          </div>

          <div class="mb-4">
            <h3 class="text-xl font-semibold text-neutral-900">{{ $t('api.tiers.business.name') }}</h3>
            <p class="text-neutral-500 text-sm mt-1">{{ $t('api.tiers.business.audience') }}</p>
          </div>

          <div class="mb-1">
            <span class="text-3xl font-bold text-neutral-900">CHF 99</span>
            <span class="text-neutral-500">{{ $t('api.perMonth') }}</span>
          </div>
          <p class="text-xs text-neutral-500 mb-6">{{ $t('api.tiers.business.tagline') }}</p>

          <ul class="space-y-3 mb-6 flex-1">
            <li
              v-for="(_, idx) in 6"
              :key="idx"
              class="flex items-start gap-2 text-sm text-neutral-700"
            >
              <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ $t(`api.tiers.business.feature${idx + 1}`) }}
            </li>
          </ul>

          <button
            type="button"
            :disabled="isCreatingGateway === 'business'"
            class="block w-full py-2.5 px-4 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-center cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            @click="handleSubscribe('business')"
          >
            <span v-if="isCreatingGateway === 'business'">{{ $t('auth.loading') }}</span>
            <span v-else>{{ $t('api.tiers.business.cta') }}</span>
          </button>
        </div>

        <!-- Enterprise -->
        <div class="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col">
          <div class="mb-4">
            <h3 class="text-xl font-semibold text-neutral-900">{{ $t('api.tiers.enterprise.name') }}</h3>
            <p class="text-neutral-500 text-sm mt-1">{{ $t('api.tiers.enterprise.audience') }}</p>
          </div>

          <div class="mb-1">
            <span class="text-3xl font-bold text-neutral-900">{{ $t('api.tiers.enterprise.price') }}</span>
          </div>
          <p class="text-xs text-neutral-500 mb-6">{{ $t('api.tiers.enterprise.tagline') }}</p>

          <ul class="space-y-3 mb-6 flex-1">
            <li
              v-for="(_, idx) in 4"
              :key="idx"
              class="flex items-start gap-2 text-sm text-neutral-700"
            >
              <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ $t(`api.tiers.enterprise.feature${idx + 1}`) }}
            </li>
          </ul>

          <a
            href="mailto:gruezi@helvetra.ch?subject=Helvetra%20API%20Enterprise"
            class="block w-full py-2.5 px-4 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors text-center"
          >
            {{ $t('api.tiers.enterprise.cta') }}
          </a>
        </div>
      </div>

      <p v-if="gatewayError" class="mt-4 text-sm text-red-600 text-center">
        {{ gatewayError }}
      </p>
    </section>

    <!-- Code example -->
    <section class="mb-14">
      <h2 class="text-2xl font-bold text-neutral-900 text-center mb-2">
        {{ $t('api.example.title') }}
      </h2>
      <p class="text-sm text-neutral-500 text-center mb-6">
        {{ $t('api.example.subtitle') }}
      </p>
      <div class="bg-neutral-900 text-neutral-100 rounded-xl p-5 overflow-x-auto">
        <pre class="text-xs md:text-sm leading-relaxed"><code>{{ codeExample }}</code></pre>
      </div>
    </section>

    <!-- Contact -->
    <section class="text-center">
      <p class="text-sm text-neutral-500">
        {{ $t('api.questions') }}
        <a href="mailto:gruezi@helvetra.ch" class="text-swiss-red hover:underline">
          gruezi@helvetra.ch
        </a>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const { isAuthenticated, getAuthHeader } = useAuth()
const { getApiServiceSchema, getBreadcrumbSchema, useJsonLd } = useSchemaOrg()

const valueProps = ['sovereignty', 'languages', 'invoicing', 'noTraining']

const codeExample = `curl -X POST https://helvetra.ch/api/public/v1/translate \\
  -H "X-API-Key: $HELVETRA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Grüezi mitenand!",
    "source_lang": "gsw",
    "target_lang": "en"
  }'`

type Tier = 'starter' | 'business'

interface GatewayResponse {
  success: boolean
  gateway_url?: string
  error?: string
}

const isCreatingGateway = ref<Tier | null>(null)
const gatewayError = ref<string | null>(null)

async function handleSubscribe(tier: Tier): Promise<void> {
  if (isCreatingGateway.value) return

  // Anonymous visitors must create an account before checkout. Send them
  // through registration with a redirect back to the API page so they
  // land back here ready to click again.
  if (!isAuthenticated.value) {
    await navigateTo(localePath('/register?redirect=/developers'))
    return
  }

  isCreatingGateway.value = tier
  gatewayError.value = null

  try {
    const response = await $fetch<GatewayResponse>(
      `${config.public.apiBase}/v1/payments/create-b2b-gateway`,
      {
        method: 'POST',
        headers: getAuthHeader(),
        body: { tier },
      }
    )

    if (response.success && response.gateway_url) {
      window.location.href = response.gateway_url
    } else {
      gatewayError.value = response.error || t('api.errors.gateway')
    }
  } catch (error) {
    console.error('B2B gateway error:', error)
    gatewayError.value = t('errors.CONNECTION_ERROR')
  } finally {
    isCreatingGateway.value = null
  }
}

// Structured data: Service + Offer for the two paid tiers (machine-
// readable pricing for search engines and price comparison tools) and
// a BreadcrumbList rooted at the home page.
useJsonLd([
  getApiServiceSchema(
    t('api.title'),
    t('api.subtitle'),
    [
      {
        name: t('api.tiers.starter.name'),
        price: 29,
        description: t('api.tiers.starter.feature1'),
        url: 'https://helvetra.ch/developers#pricing',
      },
      {
        name: t('api.tiers.business.name'),
        price: 99,
        description: t('api.tiers.business.feature1'),
        url: 'https://helvetra.ch/developers#pricing',
      },
    ],
    'https://helvetra.ch/developers',
  ),
  getBreadcrumbSchema([
    { name: 'Helvetra', url: 'https://helvetra.ch/' },
    { name: t('nav.api'), url: 'https://helvetra.ch/developers' },
  ]),
])

// Polished head metadata for SEO + Open Graph + Twitter cards.
useHead({
  title: () => `${t('api.seo.title')} | Helvetra`,
  meta: [
    { name: 'description', content: () => t('api.seo.description') },
    { name: 'keywords', content: () => t('api.seo.keywords') },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: () => t('api.seo.title') },
    { property: 'og:description', content: () => t('api.seo.description') },
    { property: 'og:url', content: 'https://helvetra.ch/developers' },
    { property: 'og:image', content: 'https://helvetra.ch/og-image.png' },
    { property: 'og:site_name', content: 'Helvetra' },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: () => t('api.seo.title') },
    { name: 'twitter:description', content: () => t('api.seo.description') },
    { name: 'twitter:image', content: 'https://helvetra.ch/og-image.png' },
  ],
})
</script>
