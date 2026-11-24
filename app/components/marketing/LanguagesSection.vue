<!--
  Languages section showing supported languages.
-->
<template>
  <section class="py-24 bg-white text-center">
    <div class="max-w-[1200px] mx-auto px-4 md:px-8">
      <h2 class="text-2xl font-normal text-black mb-10">
        {{ $t('marketing.languages.title') }}
      </h2>
      <div class="flex flex-wrap justify-center gap-6 md:gap-10 text-lg">
        <span
          v-for="code in languageCodes"
          :key="code"
          :class="code === 'gsw' ? 'text-swiss-red font-medium' : 'text-neutral-600'"
        >
          {{ $t(`languages.${code}`) }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const languageCodes = ['de', 'gsw', 'fr', 'it', 'rm', 'en', 'sq', 'pt', 'es', 'hr', 'sr']
</script>
