<!--
  Individual feature item within a FeatureSection.
  Contains a title and prose description.
-->
<template>
  <div>
    <h3 class="text-xl font-semibold text-neutral-800 mb-3">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
