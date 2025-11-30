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

        <!-- Bottom actions: feedback and copy -->
        <div
          v-if="targetText && !isLoading && !error"
          class="absolute bottom-2 right-2 flex items-center gap-1"
        >
          <!-- Feedback buttons -->
          <div v-if="!feedbackSubmitted" class="flex items-center gap-1 mr-2">
            <button
              type="button"
              :title="$t('feedback.like')"
              class="p-2 rounded-lg hover:bg-neutral-200 transition-colors text-neutral-400 hover:text-green-600"
              @click="handleFeedback('like')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
            <button
              type="button"
              :title="$t('feedback.dislike')"
              class="p-2 rounded-lg hover:bg-neutral-200 transition-colors text-neutral-400 hover:text-red-600"
              @click="handleFeedback('dislike')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
            </button>
          </div>
          <!-- Feedback submitted confirmation -->
          <span v-else class="text-xs text-green-600 font-medium mr-2">
            {{ $t('feedback.thanks') }}
          </span>

          <!-- Copy button -->
          <button
            type="button"
            :title="$t('translate.copy')"
            class="p-2 rounded-lg hover:bg-neutral-200 transition-colors text-neutral-500 hover:text-neutral-700"
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

    <!-- Feedback modal -->
    <FeedbackModal
      :is-open="showFeedbackModal"
      :vote="pendingVote"
      :translation-id="translationId"
      :source-lang="sourceLanguage"
      :target-lang="targetLanguage"
      @close="showFeedbackModal = false"
      @submitted="onFeedbackSubmitted"
    />
  </div>
</template>

<script setup lang="ts">
const { translate, isLoading, error } = useTranslation()
const { submitFeedback, hasStoredConsent } = useFeedback()

const STORAGE_KEY_SOURCE = 'helvetra_source_lang'
const STORAGE_KEY_TARGET = 'helvetra_target_lang'

const sourceLanguage = ref('de')
const targetLanguage = ref('en')
const sourceText = ref('')
const targetText = ref('')
const copied = ref(false)

// Feedback state
const showFeedbackModal = ref(false)
const pendingVote = ref<'like' | 'dislike'>('like')
const feedbackSubmitted = ref(false)
const translationId = ref('')

/**
 * Generate a unique ID for the current translation.
 */
function generateTranslationId(): string {
  const hash = btoa(`${sourceLanguage.value}:${targetLanguage.value}:${sourceText.value.slice(0, 100)}`)
  return `${Date.now()}-${hash.slice(0, 20)}`
}

// Load saved language preferences from localStorage
onMounted(() => {
  if (import.meta.client) {
    const savedSource = localStorage.getItem(STORAGE_KEY_SOURCE)
    const savedTarget = localStorage.getItem(STORAGE_KEY_TARGET)

    if (savedSource && availableLanguages.some(l => l.code === savedSource)) {
      sourceLanguage.value = savedSource
    }
    if (savedTarget && availableLanguages.some(l => l.code === savedTarget)) {
      targetLanguage.value = savedTarget
    }
  }
})

// Persist language selections to localStorage
function saveLanguagePreferences() {
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY_SOURCE, sourceLanguage.value)
    localStorage.setItem(STORAGE_KEY_TARGET, targetLanguage.value)
  }
}

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
watch(sourceLanguage, () => {
  saveLanguagePreferences()
  performTranslation()
})
watch(targetLanguage, () => {
  saveLanguagePreferences()
  performTranslation()
})

function swapLanguages() {
  const tempLang = sourceLanguage.value
  sourceLanguage.value = targetLanguage.value
  targetLanguage.value = tempLang

  const tempText = sourceText.value
  sourceText.value = targetText.value
  targetText.value = tempText

  saveLanguagePreferences()
}

/**
 * Handle feedback button click.
 */
async function handleFeedback(vote: 'like' | 'dislike') {
  translationId.value = generateTranslationId()
  pendingVote.value = vote

  // If user has stored consent, submit directly
  if (hasStoredConsent()) {
    const success = await submitFeedback({
      translationId: translationId.value,
      vote,
      consent: true,
    })
    if (success) {
      feedbackSubmitted.value = true
      resetFeedbackAfterDelay()
    }
  } else {
    // Show consent modal
    showFeedbackModal.value = true
  }
}

/**
 * Called when feedback is submitted via modal.
 */
function onFeedbackSubmitted() {
  feedbackSubmitted.value = true
  resetFeedbackAfterDelay()
}

/**
 * Reset feedback state after showing confirmation.
 */
function resetFeedbackAfterDelay() {
  setTimeout(() => {
    feedbackSubmitted.value = false
  }, 3000)
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
