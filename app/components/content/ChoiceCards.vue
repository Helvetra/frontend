<!--
  Side-by-side "Choose X if..." cards for recommendation sections.
  Shows two options with their respective use cases.
-->
<template>
  <div class="grid md:grid-cols-2 gap-6">
    <!-- Secondary choice (competitor) -->
    <div class="border border-neutral-200 p-6 rounded-xl">
      <h3 class="font-semibold text-neutral-800 mb-4 text-lg">
        {{ secondaryTitle }}
      </h3>
      <ul class="space-y-3 text-neutral-700">
        <li
          v-for="(point, index) in secondaryPoints"
          :key="index"
          class="flex items-start gap-3"
        >
          <span class="text-blue-500 font-bold">→</span>
          <span>{{ point }}</span>
        </li>
      </ul>
    </div>

    <!-- Primary choice (Helvetra) - highlighted -->
    <div class="border-2 border-swiss-red p-6 rounded-xl bg-red-50/30">
      <h3 class="font-semibold text-swiss-red mb-4 text-lg">
        {{ primaryTitle }}
      </h3>
      <ul class="space-y-3 text-neutral-700">
        <li
          v-for="(point, index) in primaryPoints"
          :key="index"
          class="flex items-start gap-3"
        >
          <span class="text-swiss-red font-bold">→</span>
          <span>{{ point }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  primaryTitle: string
  secondaryTitle: string
  primaryPoints: string[]
  secondaryPoints: string[]
}>()
</script>
