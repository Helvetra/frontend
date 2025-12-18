<!--
  Prose section wrapper for article body content.
  Applies consistent typography and spacing.
-->
<template>
  <section class="mb-12" :aria-labelledby="id">
    <h2
      v-if="title"
      :id="id"
      class="text-2xl font-bold text-neutral-900 mb-6"
    >
      {{ title }}
    </h2>
    <h2 v-else :id="id" class="sr-only">
      <slot name="sr-title" />
    </h2>
    <div class="prose prose-neutral prose-lg max-w-none">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  title?: string
}>()
</script>
