<!--
  Minimal SVG bar chart for monthly B2B usage history.
  No charting library — keeps the bundle small and removes a dependency
  surface area for a single, simple visual.
-->
<template>
  <div v-if="periods.length === 0" class="text-xs text-neutral-500 text-center py-6">
    {{ $t('apiDashboard.history.empty') }}
  </div>
  <div v-else>
    <div class="flex items-baseline justify-between mb-3">
      <h3 class="text-sm font-medium text-neutral-700">
        {{ $t('apiDashboard.history.title') }}
      </h3>
      <p class="text-xs text-neutral-400">
        {{ $t('apiDashboard.history.scale', { max: maxYLabel }) }}
      </p>
    </div>

    <!-- SVG chart. viewBox keeps it responsive; absolute pixel sizing
         comes from the parent. -->
    <svg
      :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
      class="w-full h-32"
      role="img"
      :aria-label="$t('apiDashboard.history.ariaLabel')"
    >
      <!-- Reference line for the included quota (100% of current limit) -->
      <line
        v-if="quotaLineY !== null"
        :x1="0"
        :x2="chartWidth"
        :y1="quotaLineY"
        :y2="quotaLineY"
        stroke="#D4D4D4"
        stroke-dasharray="3 3"
        stroke-width="1"
      />

      <!-- Bars -->
      <g
        v-for="(p, idx) in periods"
        :key="p.period_start"
      >
        <title>
          {{ formatMonth(p.period_start) }}: {{ p.characters_used.toLocaleString() }} / {{ p.characters_limit.toLocaleString() }}
        </title>
        <rect
          :x="barX(idx)"
          :y="barY(p.characters_used)"
          :width="barWidth"
          :height="barHeightFor(p.characters_used)"
          :class="barColorClass(p)"
          rx="2"
        />
      </g>

      <!-- X axis labels (every other label on dense data) -->
      <g v-for="(p, idx) in periods" :key="`x-${p.period_start}`">
        <text
          v-if="periods.length <= 6 || idx % 2 === 0"
          :x="barX(idx) + barWidth / 2"
          :y="chartHeight - 2"
          text-anchor="middle"
          class="text-[9px] fill-neutral-500"
        >{{ formatMonthShort(p.period_start) }}</text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
interface UsageHistoryPoint {
  period_start: string
  period_end: string
  characters_used: number
  characters_limit: number
}

const props = defineProps<{
  periods: UsageHistoryPoint[]
}>()

const { locale } = useI18n()

// Drawing parameters in SVG user units. The viewBox lets the chart
// stretch to whatever pixel size the parent assigns.
const chartWidth = 600
const chartHeight = 130
const chartPadX = 8
const chartPadTop = 6
const chartPadBottom = 14

const maxValue = computed(() => {
  // Bar scale is normalised against the largest of (any month's used,
  // any month's limit). Defaulting to 1 prevents division by zero on
  // an empty list (the wrapper already short-circuits that path).
  let max = 1
  for (const p of props.periods) {
    if (p.characters_used > max) max = p.characters_used
    if (p.characters_limit > max) max = p.characters_limit
  }
  return max
})

const maxYLabel = computed(() => {
  const m = maxValue.value
  if (m >= 1_000_000) return `${(m / 1_000_000).toFixed(1)}M`
  if (m >= 1_000) return `${Math.round(m / 1_000)}k`
  return String(m)
})

const drawableHeight = computed(() => chartHeight - chartPadTop - chartPadBottom)
const drawableWidth = computed(() => chartWidth - chartPadX * 2)
const slotWidth = computed(() => (props.periods.length ? drawableWidth.value / props.periods.length : 0))
const barWidth = computed(() => Math.max(8, slotWidth.value * 0.6))

function barX(idx: number): number {
  return chartPadX + slotWidth.value * idx + (slotWidth.value - barWidth.value) / 2
}

function barHeightFor(value: number): number {
  if (maxValue.value === 0) return 0
  return (value / maxValue.value) * drawableHeight.value
}

function barY(value: number): number {
  return chartPadTop + drawableHeight.value - barHeightFor(value)
}

const quotaLineY = computed(() => {
  // Reference line at 100% of the most recent period's limit, scaled
  // against maxValue. Hides itself if the line would be off-canvas.
  const latest = props.periods[props.periods.length - 1]
  if (!latest || latest.characters_limit <= 0) return null
  if (latest.characters_limit > maxValue.value) return null
  return chartPadTop + drawableHeight.value - (latest.characters_limit / maxValue.value) * drawableHeight.value
})

function barColorClass(p: UsageHistoryPoint): string {
  if (p.characters_limit === 0) return 'fill-neutral-300'
  const ratio = p.characters_used / p.characters_limit
  if (ratio >= 1) return 'fill-amber-500'
  if (ratio >= 0.8) return 'fill-amber-400'
  return 'fill-swiss-red'
}

function formatMonth(iso: string): string {
  return new Date(iso).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
  })
}

function formatMonthShort(iso: string): string {
  return new Date(iso).toLocaleDateString(locale.value, {
    month: 'short',
  })
}
</script>
