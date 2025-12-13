<!--
  Application header with logo, language selector, and auth controls.
  Matches marketing site design with minimal, clean styling.
-->
<template>
  <header class="py-6">
    <div class="container mx-auto px-4 md:px-8">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/img/logo.svg" alt="Helvetra" class="h-10" />
        </NuxtLink>

        <div class="flex items-center gap-4">
          <!-- Language selector -->
          <nav class="flex gap-2">
            <NuxtLink
              v-for="locale in availableLocales"
              :key="locale.code"
              :to="switchLocalePath(locale.code)"
              class="px-2 py-1 text-xs rounded transition-colors"
              :class="locale.code === currentLocale
                ? 'bg-neutral-100 text-neutral-900 font-medium'
                : 'text-neutral-500 hover:text-neutral-900'"
            >
              {{ locale.label }}
            </NuxtLink>
          </nav>

          <!-- Auth controls -->
          <div class="flex items-center gap-2 pl-4 border-l border-neutral-200">
            <template v-if="isAuthenticated && user">
              <!-- User menu -->
              <NuxtLink
                :to="localePath('/account')"
                class="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-700 hover:text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <span class="w-6 h-6 bg-swiss-red text-white rounded-full flex items-center justify-center text-xs font-medium">
                  {{ userInitial }}
                </span>
                <span class="hidden sm:inline">{{ $t('nav.account') }}</span>
              </NuxtLink>
            </template>
            <template v-else>
              <!-- Login/Register buttons -->
              <NuxtLink
                :to="localePath('/login')"
                class="px-3 py-1.5 text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                {{ $t('nav.login') }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/register')"
                class="px-3 py-1.5 text-sm bg-swiss-red text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {{ $t('nav.register') }}
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
type LocaleCode = 'en' | 'de' | 'gsw' | 'fr' | 'it'

const { locale: currentLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const { user, isAuthenticated, initialize } = useAuth()

const availableLocales: { code: LocaleCode; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'gsw', label: 'CH' },
  { code: 'fr', label: 'FR' },
  { code: 'it', label: 'IT' },
  { code: 'en', label: 'EN' },
]

const userInitial = computed(() => {
  if (!user.value?.email) return '?'
  return user.value.email.charAt(0).toUpperCase()
})

// Initialize auth state on mount
onMounted(() => {
  initialize()
})
</script>
