<!--
  Reusable comparison table for "vs" articles.
  Displays a side-by-side comparison of two products/services.
-->
<template>
  <section class="mb-12" aria-labelledby="quick-comparison">
    <h2 id="quick-comparison" class="sr-only">Quick Comparison</h2>
    <div class="overflow-x-auto rounded-lg border border-neutral-200">
      <table class="w-full">
        <thead>
          <tr class="bg-neutral-50 border-b border-neutral-200">
            <th class="text-left py-4 px-5 font-semibold text-neutral-700 w-1/3" />
            <th class="text-left py-4 px-5 font-semibold w-1/3" :class="primaryColor">
              {{ primaryName }}
            </th>
            <th class="text-left py-4 px-5 font-semibold w-1/3" :class="secondaryColor">
              {{ secondaryName }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-100">
          <tr
            v-for="(row, index) in rows"
            :key="row.label"
            :class="{ 'bg-neutral-50/50': index % 2 === 1 }"
          >
            <td class="py-4 px-5 font-medium text-neutral-700">{{ row.label }}</td>
            <td class="py-4 px-5 text-neutral-600">
              <template v-if="row.primaryCheck !== undefined">
                <span
                  class="inline-flex items-center gap-1.5 font-medium"
                  :class="row.primaryCheck ? 'text-green-700' : 'text-red-600'"
                >
                  <svg v-if="row.primaryCheck" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                  {{ row.primaryValue }}
                </span>
              </template>
              <template v-else>
                {{ row.primaryValue }}
              </template>
            </td>
            <td class="py-4 px-5 text-neutral-600">
              <template v-if="row.secondaryCheck !== undefined">
                <span
                  class="inline-flex items-center gap-1.5 font-medium"
                  :class="row.secondaryCheck ? 'text-green-700' : 'text-red-600'"
                >
                  <svg v-if="row.secondaryCheck" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                  {{ row.secondaryValue }}
                </span>
              </template>
              <template v-else>
                {{ row.secondaryValue }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ComparisonRow {
  label: string
  primaryValue: string
  secondaryValue: string
  primaryCheck?: boolean
  secondaryCheck?: boolean
}

withDefaults(defineProps<{
  primaryName: string
  secondaryName: string
  primaryColor?: string
  secondaryColor?: string
  rows: ComparisonRow[]
}>(), {
  primaryColor: 'text-swiss-red',
  secondaryColor: 'text-blue-600',
})
</script>
