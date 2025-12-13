<!--
  Registration page.
  Allows new users to create an account.
-->
<template>
  <div class="min-h-[60vh] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-sm">
      <!-- Success state: Check your email -->
      <div v-if="registrationComplete" class="text-center">
        <div class="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-neutral-900 mb-4">
          {{ $t('auth.register.checkEmail') }}
        </h1>
        <p class="text-neutral-600 mb-6">
          {{ $t('auth.register.checkEmailDescription', { email: registeredEmail }) }}
        </p>
        <NuxtLink
          :to="localePath('/')"
          class="inline-block py-2.5 px-6 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          {{ $t('auth.register.continueToApp') }}
        </NuxtLink>
        <p class="mt-4 text-sm text-neutral-500">
          {{ $t('auth.register.noEmail') }}
          <button
            type="button"
            :disabled="resendCooldown > 0"
            class="text-swiss-red hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleResend"
          >
            <span v-if="resendCooldown > 0">{{ $t('account.profile.resendIn', { seconds: resendCooldown }) }}</span>
            <span v-else>{{ $t('account.profile.resendVerification') }}</span>
          </button>
        </p>
        <p v-if="resendSuccess" class="mt-2 text-sm text-green-600">
          {{ $t('account.profile.verificationSent') }}
        </p>
      </div>

      <!-- Registration form -->
      <template v-else>
        <h1 class="text-2xl font-bold text-neutral-900 text-center mb-8">
          {{ $t('auth.register.title') }}
        </h1>

        <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-neutral-700 mb-1">
            {{ $t('auth.email') }}
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-swiss-red focus:border-transparent outline-none transition-shadow"
            :placeholder="$t('auth.emailPlaceholder')"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-neutral-700 mb-1">
            {{ $t('auth.password') }}
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="new-password"
            minlength="8"
            class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-swiss-red focus:border-transparent outline-none transition-shadow"
            :placeholder="$t('auth.passwordPlaceholder')"
          />
          <p class="mt-1 text-xs text-neutral-500">
            {{ $t('auth.register.passwordHint') }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-neutral-700 mb-1">
            {{ $t('auth.register.confirmPassword') }}
          </label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            autocomplete="new-password"
            class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-swiss-red focus:border-transparent outline-none transition-shadow"
            :placeholder="$t('auth.register.confirmPasswordPlaceholder')"
          />
        </div>

        <!-- Error message -->
        <div v-if="errorMessage" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          {{ errorMessage }}
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          :disabled="isLoading || !isFormValid"
          class="w-full py-2.5 px-4 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-swiss-red disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span v-if="isLoading">{{ $t('auth.loading') }}</span>
          <span v-else>{{ $t('auth.register.submit') }}</span>
        </button>
      </form>

      <!-- Privacy notice -->
      <p class="mt-4 text-xs text-neutral-500 text-center">
        {{ $t('auth.register.privacyNotice') }}
        <NuxtLink
          :to="localePath('/privacy')"
          class="text-swiss-red hover:underline"
        >
          {{ $t('auth.register.privacyLink') }}
        </NuxtLink>
      </p>

        <!-- Login link -->
        <p class="mt-6 text-center text-sm text-neutral-600">
          {{ $t('auth.register.hasAccount') }}
          <NuxtLink
            :to="localePath('/login')"
            class="text-swiss-red hover:underline font-medium"
          >
            {{ $t('auth.register.loginLink') }}
          </NuxtLink>
        </p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { register, resendVerification, isLoading, error } = useAuth()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const localError = ref<string | null>(null)
const registrationComplete = ref(false)
const registeredEmail = ref('')
const resendCooldown = ref(0)
const resendSuccess = ref(false)

let cooldownInterval: ReturnType<typeof setInterval> | null = null

const isFormValid = computed(() => {
  return email.value && password.value && password.value === confirmPassword.value
})

const errorMessage = computed(() => {
  if (localError.value) return localError.value
  if (!error.value) return null

  switch (error.value) {
    case 'EMAIL_EXISTS':
      return t('auth.errors.emailExists')
    case 'VALIDATION_ERROR':
      return t('auth.errors.validationError')
    case 'RATE_LIMITED':
      return t('auth.errors.rateLimited')
    case 'CONNECTION_ERROR':
      return t('auth.errors.connectionError')
    default:
      return t('auth.errors.generic')
  }
})

async function handleSubmit() {
  localError.value = null

  if (password.value !== confirmPassword.value) {
    localError.value = t('auth.errors.passwordMismatch')
    return
  }

  if (password.value.length < 8) {
    localError.value = t('auth.errors.passwordTooShort')
    return
  }

  const success = await register(email.value, password.value, locale.value)
  if (success) {
    registeredEmail.value = email.value
    registrationComplete.value = true
  }
}

async function handleResend() {
  resendSuccess.value = false
  const result = await resendVerification(registeredEmail.value, locale.value)

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

useHead({
  title: () => `${t('auth.register.title')} - Helvetra`,
})
</script>
