<!--
  Interface language selector dropdown.
  Allows switching between supported UI languages.
-->
<template>
  <div class="relative">
    <select
      :value="locale"
      class="appearance-none bg-neutral-100 border border-neutral-200 rounded-lg px-3 py-2 pr-8 text-sm cursor-pointer hover:bg-neutral-200 transition-colors"
      @change="setLocale(($event.target as HTMLSelectElement).value as 'en' | 'de' | 'fr' | 'it')"
    >
      <option v-for="loc in locales" :key="loc.code" :value="loc.code">
        {{ loc.name }}
      </option>
    </select>
    <span class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
      ▼
    </span>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
</script>
