<!--
  Main translation interface component.
  Auto-translates with 300ms debounce as user types.
-->
<template>
  <div class="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
    <!-- Language selectors row -->
    <div class="flex items-center justify-between border-b border-neutral-200 px-4 py-3 bg-neutral-50">
      <!-- Source language -->
      <select
        v-model="sourceLanguage"
        class="bg-transparent border-none text-sm font-medium text-neutral-700 cursor-pointer focus:outline-none focus:ring-0"
      >
        <option v-for="lang in availableLanguages" :key="lang.code" :value="lang.code">
          {{ $t(`languages.${lang.code}`) }}
        </option>
      </select>

      <!-- Swap button -->
      <button
        type="button"
        :title="$t('translate.swap')"
        class="p-2 rounded-full hover:bg-neutral-200 transition-colors text-neutral-500 hover:text-neutral-700"
        :disabled="isLoading"
        @click="swapLanguages"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </button>

      <!-- Target language -->
      <select
        v-model="targetLanguage"
        class="bg-transparent border-none text-sm font-medium text-neutral-700 cursor-pointer focus:outline-none focus:ring-0"
      >
        <option v-for="lang in availableLanguages" :key="lang.code" :value="lang.code">
          {{ $t(`languages.${lang.code}`) }}
        </option>
      </select>
    </div>

    <!-- Text areas -->
    <div class="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
      <!-- Source text -->
      <div class="relative">
        <textarea
          v-model="sourceText"
          :placeholder="$t('translate.placeholder')"
          class="w-full h-48 p-4 resize-none border-none focus:outline-none focus:ring-0 text-neutral-900 placeholder-neutral-400"
        />
        <div class="absolute bottom-2 right-2 text-xs text-neutral-400">
          {{ sourceText.length }}
        </div>
      </div>

      <!-- Target text -->
      <div class="relative bg-neutral-50">
        <!-- Loading indicator -->
        <div
          v-if="isLoading"
          class="absolute inset-0 flex items-center justify-center bg-neutral-50/80"
        >
          <div class="flex items-center gap-2 text-neutral-500">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span class="text-sm">{{ $t('translate.button') }}...</span>
          </div>
        </div>

        <!-- Error message -->
        <div
          v-else-if="error"
          class="absolute inset-0 flex items-center justify-center p-4"
        >
          <p class="text-sm text-red-500 text-center">{{ error }}</p>
        </div>

        <!-- Translation result -->
        <textarea
          v-else
          v-model="targetText"
          readonly
          class="w-full h-48 p-4 resize-none border-none focus:outline-none bg-transparent text-neutral-900"
          :class="{ 'text-neutral-400 italic': !targetText }"
        />

        <!-- Copy button -->
        <button
          v-if="targetText && !isLoading && !error"
          type="button"
          :title="$t('translate.copy')"
          class="absolute bottom-2 right-2 p-2 rounded-lg hover:bg-neutral-200 transition-colors text-neutral-500 hover:text-neutral-700"
          @click="copyTranslation"
        >
          <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span v-else class="text-xs text-swiss-red font-medium">{{ $t('translate.copied') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { translate, isLoading, error } = useTranslation()

const sourceLanguage = ref('en')
const targetLanguage = ref('gsw')
const sourceText = ref('')
const targetText = ref('')
const copied = ref(false)

const availableLanguages = [
  { code: 'en' },
  { code: 'de' },
  { code: 'gsw' },
  { code: 'fr' },
  { code: 'it' },
]

let debounceTimer: ReturnType<typeof setTimeout> | null = null

async function performTranslation() {
  if (!sourceText.value.trim()) {
    targetText.value = ''
    return
  }

  if (sourceLanguage.value === targetLanguage.value) {
    targetText.value = sourceText.value
    return
  }

  const result = await translate(
    sourceText.value,
    sourceLanguage.value,
    targetLanguage.value
  )

  if (result !== null) {
    targetText.value = result
  }
}

function debouncedTranslate() {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    performTranslation()
  }, 300)
}

// Watch for changes that trigger translation
watch(sourceText, debouncedTranslate)
watch(sourceLanguage, performTranslation)
watch(targetLanguage, performTranslation)

function swapLanguages() {
  const tempLang = sourceLanguage.value
  sourceLanguage.value = targetLanguage.value
  targetLanguage.value = tempLang

  const tempText = sourceText.value
  sourceText.value = targetText.value
  targetText.value = tempText
}

async function copyTranslation() {
  if (!targetText.value) return

  try {
    await navigator.clipboard.writeText(targetText.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = targetText.value
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// Cleanup on unmount
onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})
</script>
