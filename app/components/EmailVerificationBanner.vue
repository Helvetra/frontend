<!--
  Banner shown to logged-in users whose email is not verified.
  Displays a warning with option to resend verification email.
-->
<template>
  <div
    v-if="showBanner"
    class="bg-amber-50 border-b border-amber-200 px-4 py-3"
  >
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
      <div class="flex items-center gap-2 text-amber-800">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span class="text-sm">{{ $t('verification.banner') }}</span>
      </div>
      <div class="flex items-center gap-3">
        <button
          type="button"
          :disabled="resendCooldown > 0 || isResending"
          class="text-sm font-medium text-amber-800 hover:text-amber-900 underline disabled:opacity-50 disabled:cursor-not-allowed"
          @click="handleResend"
        >
          <span v-if="isResending">{{ $t('auth.loading') }}</span>
          <span v-else-if="resendCooldown > 0">{{ $t('account.profile.resendIn', { seconds: resendCooldown }) }}</span>
          <span v-else>{{ $t('account.profile.resendVerification') }}</span>
        </button>
        <span v-if="resendSuccess" class="text-sm text-green-700">
          {{ $t('account.profile.verificationSent') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const { user, resendVerification } = useAuth()

const resendCooldown = ref(0)
const resendSuccess = ref(false)
const isResending = ref(false)

let cooldownInterval: ReturnType<typeof setInterval> | null = null

const showBanner = computed(() => {
  return user.value && !user.value.emailVerified
})

async function handleResend() {
  if (!user.value?.email) return

  isResending.value = true
  resendSuccess.value = false

  const result = await resendVerification(user.value.email, locale.value)

  isResending.value = false

  if (result.success) {
    resendSuccess.value = true
    startCooldown(60)
  } else if (result.retryAfter) {
    startCooldown(result.retryAfter)
  }
}

function startCooldown(seconds: number) {
  resendCooldown.value = seconds
  if (cooldownInterval) clearInterval(cooldownInterval)

  cooldownInterval = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) {
      clearInterval(cooldownInterval!)
      cooldownInterval = null
    }
  }, 1000)
}

onUnmounted(() => {
  if (cooldownInterval) clearInterval(cooldownInterval)
})
</script>
