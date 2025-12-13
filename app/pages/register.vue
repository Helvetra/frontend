<!--
  Registration page.
  Allows new users to create an account.
-->
<template>
  <div class="min-h-[60vh] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-sm">
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
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const { register, isLoading, error } = useAuth()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const localError = ref<string | null>(null)

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
    // Redirect to home with verification notice
    router.push(localePath('/'))
  }
}

useHead({
  title: () => `${t('auth.register.title')} - Helvetra`,
})
</script>
