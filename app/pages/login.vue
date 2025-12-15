<!--
  Login page.
  Allows users to sign in with email and password.
-->
<template>
  <div class="min-h-[60vh] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-sm">
      <h1 class="text-2xl font-bold text-neutral-900 text-center mb-8">
        {{ $t('auth.login.title') }}
      </h1>

      <form class="space-y-4" @submit.prevent="handleSubmit">
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
          >
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
            autocomplete="current-password"
            class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-swiss-red focus:border-transparent outline-none transition-shadow"
            :placeholder="$t('auth.passwordPlaceholder')"
          >
        </div>

        <!-- Error message -->
        <div v-if="errorMessage" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          {{ errorMessage }}
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-2.5 px-4 bg-swiss-red text-white font-medium rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-swiss-red disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span v-if="isLoading">{{ $t('auth.loading') }}</span>
          <span v-else>{{ $t('auth.login.submit') }}</span>
        </button>
      </form>

      <!-- Register link -->
      <p class="mt-6 text-center text-sm text-neutral-600">
        {{ $t('auth.login.noAccount') }}
        <NuxtLink
          :to="localePath('/register')"
          class="text-swiss-red hover:underline font-medium"
        >
          {{ $t('auth.login.registerLink') }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const { login, isLoading, error } = useAuth()

const email = ref('')
const password = ref('')

const errorMessage = computed(() => {
  if (!error.value) return null

  switch (error.value) {
    case 'INVALID_CREDENTIALS':
      return t('auth.errors.invalidCredentials')
    case 'RATE_LIMITED':
      return t('auth.errors.rateLimited')
    case 'CONNECTION_ERROR':
      return t('auth.errors.connectionError')
    default:
      return t('auth.errors.generic')
  }
})

async function handleSubmit() {
  const success = await login(email.value, password.value)
  if (success) {
    router.push(localePath('/'))
  }
}

useHead({
  title: () => `${t('auth.login.title')} - Helvetra`,
})
</script>
