<!--
  Email verification page.
  Handles verification token from URL and displays result.
-->
<template>
  <div class="min-h-[60vh] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-sm text-center">
      <!-- Loading state -->
      <div v-if="isVerifying">
        <div class="w-16 h-16 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-neutral-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-neutral-900 mb-4">
          {{ $t('verification.verifying') }}
        </h1>
      </div>

      <!-- Success state -->
      <div v-else-if="verificationSuccess">
        <div class="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-neutral-900 mb-4">
          {{ $t('verification.success') }}
        </h1>
        <p class="text-neutral-600 mb-6">
          {{ $t('verification.successDescription') }}
        </p>
        <NuxtLink
          :to="localePath('/')"
          class="inline-block py-2.5 px-6 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          {{ $t('verification.continueToApp') }}
        </NuxtLink>
      </div>

      <!-- Error state -->
      <div v-else>
        <div class="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-neutral-900 mb-4">
          {{ $t('verification.error') }}
        </h1>
        <p class="text-neutral-600 mb-6">
          {{ $t('verification.errorDescription') }}
        </p>
        <NuxtLink
          :to="localePath('/login')"
          class="inline-block py-2.5 px-6 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          {{ $t('verification.backToLogin') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { verifyEmail, fetchUser } = useAuth()

const isVerifying = ref(true)
const verificationSuccess = ref(false)

onMounted(async () => {
  const token = route.query.token as string

  if (!token) {
    isVerifying.value = false
    return
  }

  const success = await verifyEmail(token)
  verificationSuccess.value = success
  isVerifying.value = false

  // Refresh user data if verification succeeded
  if (success) {
    await fetchUser()
  }
})

useHead({
  title: () => `${t('verification.title')} - Helvetra`,
})
</script>
