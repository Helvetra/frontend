<!--
  Callout box for verdict/summary statements in comparison articles.
-->
<template>
  <div
    class="mt-6 p-5 rounded-r-lg border-l-4"
    :class="variantClasses"
  >
    <p class="font-medium" :class="textClass">
      <slot />
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'neutral'
}>(), {
  variant: 'primary',
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-red-50 border-swiss-red'
    case 'secondary':
      return 'bg-blue-50 border-blue-500'
    case 'neutral':
      return 'bg-neutral-100 border-neutral-400'
    default:
      return 'bg-red-50 border-swiss-red'
  }
})

const textClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'text-red-900'
    case 'secondary':
      return 'text-blue-900'
    case 'neutral':
      return 'text-neutral-800'
    default:
      return 'text-red-900'
  }
})
</script>
