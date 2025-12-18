<!--
  Call-to-action section for article conclusions.
  Provides a prominent button to drive conversions.
-->
<template>
  <div class="bg-neutral-100 p-8 rounded-xl text-center">
    <p class="text-neutral-700 text-lg mb-5">
      <slot name="text" />
    </p>
    <NuxtLink
      :to="to"
      class="inline-flex items-center gap-2 px-8 py-4 bg-swiss-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-lg"
    >
      <slot name="button" />
      <span aria-hidden="true">→</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>
