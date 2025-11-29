<!--
  Home page with translation interface.
-->
<template>
  <div class="max-w-4xl mx-auto px-4 py-8 md:py-12">
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
        {{ $t('app.title') }}
      </h1>
      <p class="text-lg text-neutral-500">
        {{ $t('app.tagline') }}
      </p>
    </div>

    <TranslationBox />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Helvetra - Swiss Translation',
})
</script>
