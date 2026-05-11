<!--
  Minimal code-block component with a copy-to-clipboard button.
  Used by the developer docs page; no syntax highlighting yet to keep
  the bundle small.
-->
<template>
  <div class="relative bg-neutral-900 text-neutral-100 rounded-xl overflow-hidden">
    <div class="flex items-center justify-between px-4 py-2 bg-neutral-800 border-b border-neutral-700">
      <span class="text-xs text-neutral-400 font-mono">{{ language }}</span>
      <button
        type="button"
        class="text-xs text-neutral-300 hover:text-white transition-colors flex items-center gap-1"
        :aria-label="$t('apiDocs.copyAria')"
        @click="copy"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        <span>{{ copied ? $t('apiDocs.copied') : $t('apiDocs.copy') }}</span>
      </button>
    </div>
    <pre class="px-4 py-4 overflow-x-auto text-xs md:text-sm leading-relaxed"><code>{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string
  language?: string
}>()

const copied = ref(false)

async function copy(): Promise<void> {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  } catch (err) {
    console.error('Clipboard write failed', err)
  }
}
</script>
