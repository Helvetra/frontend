<!--
  Feature highlight section with multiple subsections.
  Used for "Where X Wins" sections in comparison articles.
-->
<template>
  <section class="mb-12" :aria-labelledby="id">
    <h2 :id="id" class="text-2xl font-bold text-neutral-900 mb-6">
      {{ title }}
    </h2>

    <div class="space-y-8 prose prose-neutral prose-lg max-w-none">
      <slot />
    </div>

    <ContentVerdictBox v-if="verdict" :variant="verdictVariant" class="mt-6">
      {{ verdict }}
    </ContentVerdictBox>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  id: string
  title: string
  verdict?: string
  verdictVariant?: 'primary' | 'secondary' | 'neutral'
}>(), {
  verdict: undefined,
  verdictVariant: 'neutral',
})
</script>
