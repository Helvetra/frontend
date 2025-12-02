<!--
  Application header with logo and language selector.
  Matches marketing site design with minimal, clean styling.
-->
<template>
  <header class="py-6">
    <div class="container mx-auto px-4 md:px-8">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/img/logo.svg" alt="Helvetra" class="h-10" />
        </NuxtLink>

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
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
type LocaleCode = 'en' | 'de' | 'gsw' | 'fr' | 'it'

const { locale: currentLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales: { code: LocaleCode; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'gsw', label: 'CH' },
  { code: 'fr', label: 'FR' },
  { code: 'it', label: 'IT' },
  { code: 'en', label: 'EN' },
]
</script>
