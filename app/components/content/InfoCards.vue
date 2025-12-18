<!--
  Side-by-side info cards for comparing two aspects (e.g., privacy practices).
  Supports different variants for visual distinction.
-->
<template>
  <div class="grid md:grid-cols-2 gap-6">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="p-6 rounded-xl"
      :class="card.variant === 'positive' ? 'bg-green-50' : 'bg-neutral-100'"
    >
      <h3 class="font-semibold text-neutral-800 mb-4 text-lg">
        {{ card.title }}
      </h3>
      <ul class="space-y-3 text-neutral-700">
        <li
          v-for="(point, pointIndex) in card.points"
          :key="pointIndex"
          class="flex items-start gap-3"
        >
          <span
            class="mt-0.5"
            :class="card.variant === 'positive' ? 'text-green-500' : 'text-neutral-400'"
          >•</span>
          <span>{{ point }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
interface InfoCard {
  title: string
  points: string[]
  variant?: 'neutral' | 'positive'
}

defineProps<{
  cards: InfoCard[]
}>()
</script>
