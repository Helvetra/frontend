<!--
  Home page with translation interface placeholder.
  Full translation UI implemented in Issue #2.
-->
<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-neutral-900 mb-4">
        {{ $t('app.title') }}
      </h1>
      <p class="text-xl text-neutral-500">
        {{ $t('app.tagline') }}
      </p>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
      <p class="text-center text-neutral-500">
        Translation interface coming in Issue #2
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Helvetra - Swiss Translation',
})
</script>
