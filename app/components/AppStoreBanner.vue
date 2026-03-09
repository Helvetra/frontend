<!--
  Temporary announcement banner promoting the iOS app launch.
  Dismissible with localStorage persistence, SSR-safe.
-->
<template>
  <Transition name="app-banner">
    <div
      v-if="visible"
      class="bg-swiss-red text-white"
    >
      <div class="max-w-[1200px] mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-sm">
        <span class="font-medium">{{ $t('marketing.appBanner.text') }}</span>
        <a
          href="https://apps.apple.com/ch/app/helvetra-swiss-translator/id6755720087"
          target="_blank"
          rel="noopener"
          class="underline hover:no-underline font-semibold whitespace-nowrap"
        >
          {{ $t('marketing.appBanner.cta') }}
        </a>
        <button
          type="button"
          class="ml-2 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
          :aria-label="$t('marketing.appBanner.close')"
          @click="dismiss"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const STORAGE_KEY = 'helvetra-app-banner-dismissed'

const visible = ref(false)

onMounted(() => {
  try {
    visible.value = localStorage.getItem(STORAGE_KEY) !== '1'
  } catch {
    visible.value = true
  }
})

function dismiss() {
  visible.value = false
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Storage unavailable in private browsing
  }
}
</script>
