<!--
  Account settings page.
  Shows user profile and subscription status.
-->
<template>
  <div class="max-w-2xl mx-auto px-4 py-8 md:py-12">
    <h1 class="text-2xl font-bold text-neutral-900 mb-8">
      {{ $t('account.title') }}
    </h1>

    <!-- Loading state -->
    <div v-if="!user" class="text-center py-12">
      <p class="text-neutral-500">{{ $t('auth.loading') }}</p>
    </div>

    <template v-else>
      <!-- Profile section -->
      <section class="bg-white border border-neutral-200 rounded-lg p-6 mb-6">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">
          {{ $t('account.profile.title') }}
        </h2>

        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-neutral-600">{{ $t('auth.email') }}</span>
            <span class="text-neutral-900">{{ user.email }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-neutral-600">{{ $t('account.profile.emailStatus') }}</span>
            <span
              :class="user.emailVerified ? 'text-green-600' : 'text-amber-600'"
              class="flex items-center gap-1"
            >
              <span v-if="user.emailVerified">{{ $t('account.profile.verified') }}</span>
              <span v-else>{{ $t('account.profile.unverified') }}</span>
            </span>
          </div>
        </div>

        <!-- Resend verification -->
        <div v-if="!user.emailVerified" class="mt-4 pt-4 border-t border-neutral-100">
          <button
            @click="handleResendVerification"
            :disabled="resendLoading || resendCooldown > 0"
            class="text-sm text-swiss-red hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="resendCooldown > 0">
              {{ $t('account.profile.resendIn', { seconds: resendCooldown }) }}
            </span>
            <span v-else-if="resendLoading">{{ $t('auth.loading') }}</span>
            <span v-else>{{ $t('account.profile.resendVerification') }}</span>
          </button>
          <p v-if="resendSuccess" class="text-sm text-green-600 mt-2">
            {{ $t('account.profile.verificationSent') }}
          </p>
        </div>
      </section>

      <!-- Subscription section -->
      <section class="bg-white border border-neutral-200 rounded-lg p-6 mb-6">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">
          {{ $t('account.subscription.title') }}
        </h2>

        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-neutral-600">{{ $t('account.subscription.plan') }}</span>
            <span class="text-neutral-900 font-medium capitalize">
              {{ user.tier === 'free' ? $t('account.subscription.free') : 'Helvetra+' }}
            </span>
          </div>

          <!-- Usage display for free tier -->
          <div v-if="subscription" class="flex justify-between items-center">
            <span class="text-neutral-600">{{ $t('account.subscription.usage') }}</span>
            <span class="text-neutral-900">
              {{ formatNumber(subscription.charactersUsed) }} / {{ formatNumber(subscription.charactersLimit) }}
            </span>
          </div>

          <!-- Progress bar -->
          <div v-if="subscription" class="w-full bg-neutral-100 rounded-full h-2">
            <div
              class="h-2 rounded-full transition-all"
              :class="usagePercent > 90 ? 'bg-red-500' : usagePercent > 70 ? 'bg-amber-500' : 'bg-green-500'"
              :style="{ width: `${Math.min(usagePercent, 100)}%` }"
            />
          </div>
        </div>

        <!-- Upgrade CTA for free users -->
        <div v-if="user.tier === 'free'" class="mt-4 pt-4 border-t border-neutral-100">
          <NuxtLink
            :to="localePath('/pricing')"
            class="inline-flex items-center gap-2 text-swiss-red hover:underline font-medium"
          >
            {{ $t('account.subscription.upgrade') }}
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>
      </section>

      <!-- Logout button -->
      <button
        @click="handleLogout"
        class="w-full py-2.5 px-4 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
      >
        {{ $t('account.logout') }}
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { t, locale } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const { user, logout, getAuthHeader } = useAuth()
const config = useRuntimeConfig()

interface SubscriptionData {
  tier: string
  status: string
  charactersUsed: number
  charactersLimit: number
  creditsRemaining: number
  canTranslate: boolean
  periodStart: string | null
  periodEnd: string | null
}

const subscription = ref<SubscriptionData | null>(null)
const resendLoading = ref(false)
const resendSuccess = ref(false)
const resendCooldown = ref(0)

const usagePercent = computed(() => {
  if (!subscription.value) return 0
  return (subscription.value.charactersUsed / subscription.value.charactersLimit) * 100
})

function formatNumber(num: number): string {
  return num.toLocaleString()
}

async function fetchSubscription() {
  try {
    const response = await $fetch<{ tier: string; status: string; characters_used: number; characters_limit: number; credits_remaining: number; can_translate: boolean; period_start: string | null; period_end: string | null }>(
      `${config.public.apiBase}/v1/subscription`,
      {
        method: 'GET',
        headers: getAuthHeader(),
      }
    )

    subscription.value = {
      tier: response.tier,
      status: response.status,
      charactersUsed: response.characters_used,
      charactersLimit: response.characters_limit,
      creditsRemaining: response.credits_remaining,
      canTranslate: response.can_translate,
      periodStart: response.period_start,
      periodEnd: response.period_end,
    }
  } catch {
    // Ignore errors - subscription data is optional
  }
}

async function handleResendVerification() {
  if (!user.value) return

  resendLoading.value = true
  resendSuccess.value = false

  try {
    await $fetch(`${config.public.apiBase}/v1/auth/resend-verification`, {
      method: 'POST',
      body: { email: user.value.email, locale: locale.value },
    })
    resendSuccess.value = true
    resendCooldown.value = 60
    startCooldownTimer()
  } catch {
    // Ignore - likely rate limited
  } finally {
    resendLoading.value = false
  }
}

function startCooldownTimer() {
  const interval = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
}

async function handleLogout() {
  await logout()
  router.push(localePath('/'))
}

// Fetch subscription on mount
onMounted(() => {
  if (user.value) {
    fetchSubscription()
  }
})

// Redirect if not authenticated
watch(user, (newUser) => {
  if (!newUser && import.meta.client) {
    router.push(localePath('/login'))
  }
}, { immediate: true })

useHead({
  title: () => `${t('account.title')} - Helvetra`,
})
</script>
