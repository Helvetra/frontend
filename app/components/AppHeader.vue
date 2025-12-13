<!--
  Application header with logo, navigation, language selector, and auth controls.
  Responsive design with hamburger menu on mobile.
-->
<template>
  <header class="py-4 md:py-6">
    <div class="container mx-auto px-4 md:px-8">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/img/logo.svg" alt="Helvetra" class="h-8 md:h-10" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6">
          <!-- Nav links -->
          <nav class="flex items-center gap-4">
            <NuxtLink
              :to="localePath('/pricing')"
              class="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {{ $t('nav.pricing') }}
            </NuxtLink>
          </nav>

          <!-- Language selector -->
          <nav class="flex gap-1 pl-4 border-l border-neutral-200">
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
              <NuxtLink
                :to="localePath('/account')"
                class="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-700 hover:text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <span class="w-6 h-6 bg-swiss-red text-white rounded-full flex items-center justify-center text-xs font-medium">
                  {{ userInitial }}
                </span>
                <span>{{ $t('nav.account') }}</span>
              </NuxtLink>
            </template>
            <template v-else>
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

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="md:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          aria-label="Toggle menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden mt-4 pt-4 border-t border-neutral-200"
      >
        <!-- Nav links -->
        <nav class="flex flex-col gap-2 mb-4">
          <NuxtLink
            :to="localePath('/pricing')"
            class="py-2 text-neutral-700 hover:text-neutral-900 transition-colors"
            @click="mobileMenuOpen = false"
          >
            {{ $t('nav.pricing') }}
          </NuxtLink>
        </nav>

        <!-- Language selector -->
        <div class="flex flex-wrap gap-2 py-3 border-t border-neutral-100">
          <NuxtLink
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            class="px-3 py-1.5 text-sm rounded transition-colors"
            :class="locale.code === currentLocale
              ? 'bg-neutral-100 text-neutral-900 font-medium'
              : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'"
            @click="mobileMenuOpen = false"
          >
            {{ locale.label }}
          </NuxtLink>
        </div>

        <!-- Auth controls -->
        <div class="flex flex-col gap-2 pt-3 border-t border-neutral-100">
          <template v-if="isAuthenticated && user">
            <NuxtLink
              :to="localePath('/account')"
              class="flex items-center gap-2 py-2 text-neutral-700 hover:text-neutral-900 transition-colors"
              @click="mobileMenuOpen = false"
            >
              <span class="w-6 h-6 bg-swiss-red text-white rounded-full flex items-center justify-center text-xs font-medium">
                {{ userInitial }}
              </span>
              <span>{{ $t('nav.account') }}</span>
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink
              :to="localePath('/login')"
              class="py-2 text-neutral-700 hover:text-neutral-900 transition-colors"
              @click="mobileMenuOpen = false"
            >
              {{ $t('nav.login') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/register')"
              class="py-2 px-4 text-center bg-swiss-red text-white rounded-lg hover:bg-red-700 transition-colors"
              @click="mobileMenuOpen = false"
            >
              {{ $t('nav.register') }}
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
type LocaleCode = 'en' | 'de' | 'fr' | 'it'

const { locale: currentLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const { user, isAuthenticated, initialize } = useAuth()

const mobileMenuOpen = ref(false)

const availableLocales: { code: LocaleCode; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'fr', label: 'FR' },
  { code: 'it', label: 'IT' },
  { code: 'en', label: 'EN' },
]

const userInitial = computed(() => {
  if (!user.value?.email) return '?'
  return user.value.email.charAt(0).toUpperCase()
})

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

// Initialize auth state on mount
onMounted(() => {
  initialize()
})
</script>
