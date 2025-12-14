<!--
  Main translation interface component.
  Auto-translates with two-phase debounce: 500ms loading indicator, 1000ms API call.
-->
<template>
  <div class="bg-white rounded-2xl border border-neutral-200 overflow-hidden" style="box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05), 0 0 60px 20px rgba(218, 41, 28, 0.12);">
    <!-- Language selectors row -->
    <div class="flex items-center justify-between border-b border-neutral-200 px-4 py-3 bg-neutral-50">
      <!-- Source language -->
      <LanguageDropdown
        v-model="sourceLanguage"
        :options="languageOptions"
      />

      <!-- Swap button -->
      <button
        type="button"
        :title="$t('translate.swap')"
        class="p-3 md:p-2 rounded-full hover:bg-neutral-200 transition-colors text-neutral-500 hover:text-neutral-700"
        :disabled="isLoading"
        @click="swapLanguages"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </button>

      <!-- Target language -->
      <LanguageDropdown
        v-model="targetLanguage"
        :options="languageOptions"
      />
    </div>

    <!-- Formality toggle (only for languages with T-V distinction) -->
    <div
      v-if="showFormalityToggle"
      class="flex items-center justify-end gap-2 px-4 py-2 border-b border-neutral-200 bg-neutral-50/50"
    >
      <span class="text-xs text-neutral-500">{{ $t('formality.label') }}:</span>
      <div class="flex rounded-lg bg-neutral-200/50 p-0.5">
        <button
          type="button"
          class="px-3 py-1 text-xs font-medium rounded-md transition-colors"
          :class="formality === 'informal'
            ? 'bg-white text-neutral-900 shadow-sm'
            : 'text-neutral-600 hover:text-neutral-900'"
          @click="setFormality('informal')"
        >
          {{ $t('formality.informal') }}
        </button>
        <button
          type="button"
          class="px-3 py-1 text-xs font-medium rounded-md transition-colors"
          :class="formality === 'formal'
            ? 'bg-white text-neutral-900 shadow-sm'
            : 'text-neutral-600 hover:text-neutral-900'"
          @click="setFormality('formal')"
        >
          {{ $t('formality.formal') }}
        </button>
      </div>
    </div>

    <!-- Text areas -->
    <div class="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
      <!-- Source text -->
      <div class="relative">
        <textarea
          v-model="sourceText"
          :placeholder="$t('translate.placeholder')"
          ref="sourceTextarea"
          class="w-full h-56 md:h-96 p-4 resize-none border-none focus:outline-none focus:ring-0 text-neutral-900 placeholder-neutral-400"
          @focus="scrollIntoViewOnMobile"
        />
        <!-- Clear button -->
        <button
          v-if="sourceText"
          type="button"
          :title="$t('translate.clear')"
          class="absolute bottom-2 left-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors"
          @click="clearText"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span class="text-sm font-medium">{{ $t('translate.clear') }}</span>
        </button>
        <div
          class="absolute bottom-2 right-2 text-xs"
          :class="sourceText.length > charLimit ? 'text-red-500 font-medium' : 'text-neutral-400'"
        >
          {{ sourceText.length.toLocaleString() }} / {{ charLimit.toLocaleString() }}
        </div>
      </div>

      <!-- Target text -->
      <div class="relative bg-neutral-50 h-56 md:h-96">
        <!-- Scrollable content area -->
        <div ref="outputContainer" class="h-full overflow-y-auto p-4 pb-12">
          <!-- Registration invite for character limit (anonymous users) -->
          <div
            v-if="error === 'TEXT_TOO_LONG' && !isAuthenticated && !isLoading"
            class="h-full flex items-center justify-center"
          >
            <div class="text-center px-4">
              <p class="text-sm text-neutral-700 mb-3">{{ $t('limits.wantMore') }}</p>
              <NuxtLink
                :to="localePath('/register')"
                class="inline-flex items-center gap-2 px-4 py-2 bg-swiss-red text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                {{ $t('limits.registerCta') }}
                <span aria-hidden="true">&rarr;</span>
              </NuxtLink>
              <p class="text-xs text-neutral-500 mt-2">
                {{ $t('limits.alreadyAccount') }}
                <NuxtLink :to="localePath('/login')" class="text-swiss-red hover:underline">
                  {{ $t('limits.loginLink') }}
                </NuxtLink>
              </p>
            </div>
          </div>

          <!-- Regular error message -->
          <div
            v-else-if="error && !isLoading"
            class="h-full flex items-center justify-center"
          >
            <p class="text-sm text-red-500 text-center">{{ $t(`errors.${error}`) }}</p>
          </div>

          <template v-else>
            <!-- Existing translation (pulses subtly when loading) -->
            <div
              v-if="targetText"
              class="text-neutral-900 whitespace-pre-wrap"
              :class="{ 'animate-pulse-subtle': isPendingTranslation || isLoading }"
            >{{ targetText }}</div>

            <!-- Skeleton loading (flows naturally below text) -->
            <div
              v-if="isPendingTranslation || isLoading"
              class="space-y-2"
              :class="{ 'mt-3': targetText }"
            >
              <div class="h-3 bg-neutral-200/60 rounded animate-pulse w-3/4" />
              <div class="h-3 bg-neutral-200/60 rounded animate-pulse w-5/6" />
              <div class="h-3 bg-neutral-200/60 rounded animate-pulse w-1/2" />
            </div>
          </template>
        </div>

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
              class="p-3 md:p-2 rounded-lg hover:bg-neutral-200 transition-colors text-neutral-400 hover:text-green-600"
              @click="handleFeedback('like')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
            <button
              type="button"
              :title="$t('feedback.dislike')"
              class="p-3 md:p-2 rounded-lg hover:bg-neutral-200 transition-colors text-neutral-400 hover:text-red-600"
              @click="handleFeedback('dislike')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors"
            :class="copied
              ? 'bg-green-100 text-green-700'
              : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'"
            @click="copyTranslation"
          >
            <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-sm font-medium">{{ copied ? $t('translate.copied') : $t('translate.copy') }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Feedback modal -->
    <FeedbackModal
      :is-open="showFeedbackModal"
      :vote="pendingVote"
      :source-text="sourceText"
      :source-lang="sourceLanguage"
      :translated-text="targetText"
      :target-lang="targetLanguage"
      @close="showFeedbackModal = false"
      @submitted="onFeedbackSubmitted"
    />
  </div>
</template>

<script setup lang="ts">
const { translate, isLoading, error } = useTranslation()
const { submitFeedback, hasStoredConsent } = useFeedback()
const { isAuthenticated, getAuthHeader } = useAuth()
const localePath = useLocalePath()
const config = useRuntimeConfig()

// Character limit based on tier (default to anonymous limit)
const charLimit = ref(400)

const STORAGE_KEY_SOURCE = 'helvetra_source_lang'
const STORAGE_KEY_TARGET = 'helvetra_target_lang'
const STORAGE_KEY_FORMALITY = 'helvetra_formality'

// Languages with T-V distinction (informal/formal address)
const FORMALITY_LANGUAGES = ['de', 'gsw', 'fr', 'it']

const sourceLanguage = ref('de')
const targetLanguage = ref('en')
const sourceText = ref('')
const targetText = ref('')
const copied = ref(false)
const formality = ref<'informal' | 'formal'>('informal')
const sourceTextarea = ref<HTMLTextAreaElement | null>(null)
const outputContainer = ref<HTMLDivElement | null>(null)

/**
 * Scroll textarea into view on mobile when keyboard appears.
 */
function scrollIntoViewOnMobile() {
  if (import.meta.client && window.innerWidth < 768 && sourceTextarea.value) {
    // Small delay to let keyboard appear
    setTimeout(() => {
      sourceTextarea.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 300)
  }
}

/**
 * Scroll output container to bottom after translation completes.
 */
function scrollOutputToBottom() {
  nextTick(() => {
    if (outputContainer.value) {
      outputContainer.value.scrollTop = outputContainer.value.scrollHeight
    }
  })
}

// Show formality toggle only for languages with T-V distinction
const showFormalityToggle = computed(() =>
  FORMALITY_LANGUAGES.includes(targetLanguage.value)
)

// Feedback state
const showFeedbackModal = ref(false)
const pendingVote = ref<'like' | 'dislike'>('like')
const feedbackSubmitted = ref(false)

/**
 * Fetch tier limits from the API to show correct character limit.
 */
async function fetchTierLimits() {
  try {
    const response = await $fetch<{ max_chars_per_request: number }>(
      `${config.public.apiBase}/v1/subscription/limits`,
      { headers: getAuthHeader() }
    )
    charLimit.value = response.max_chars_per_request
  } catch {
    // Keep default limit on error
  }
}

// Load saved preferences from localStorage
onMounted(() => {
  if (import.meta.client) {
    const savedSource = localStorage.getItem(STORAGE_KEY_SOURCE)
    const savedTarget = localStorage.getItem(STORAGE_KEY_TARGET)
    const savedFormality = localStorage.getItem(STORAGE_KEY_FORMALITY)

    if (savedSource && availableLanguages.some(l => l.code === savedSource)) {
      sourceLanguage.value = savedSource
    }
    if (savedTarget && availableLanguages.some(l => l.code === savedTarget)) {
      targetLanguage.value = savedTarget
    }
    if (savedFormality === 'informal' || savedFormality === 'formal') {
      formality.value = savedFormality
    }

    // Fetch tier limits
    fetchTierLimits()
  }
})

// Persist preferences to localStorage
function saveLanguagePreferences() {
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY_SOURCE, sourceLanguage.value)
    localStorage.setItem(STORAGE_KEY_TARGET, targetLanguage.value)
    localStorage.setItem(STORAGE_KEY_FORMALITY, formality.value)
  }
}

// Set formality and trigger re-translation
function setFormality(value: 'informal' | 'formal') {
  formality.value = value
  saveLanguagePreferences()
  performTranslation()
}

const availableLanguages = [
  { code: 'en' },
  { code: 'de' },
  { code: 'gsw' },
  { code: 'fr' },
  { code: 'it' },
]

const { t } = useI18n()
const languageOptions = computed(() =>
  availableLanguages.map(lang => ({
    value: lang.code,
    label: t(`languages.${lang.code}`),
  }))
)

// Two-phase debounce timers
let loadingIndicatorTimer: ReturnType<typeof setTimeout> | null = null
let apiCallTimer: ReturnType<typeof setTimeout> | null = null

// Shows loading spinner before API call (visual feedback while typing)
const isPendingTranslation = ref(false)

async function performTranslation() {
  isPendingTranslation.value = false
  if (!sourceText.value.trim()) {
    targetText.value = ''
    return
  }

  // Only send formality for languages that support it
  const effectiveFormality = FORMALITY_LANGUAGES.includes(targetLanguage.value)
    ? formality.value
    : 'auto'

  const result = await translate(
    sourceText.value,
    sourceLanguage.value,
    targetLanguage.value,
    effectiveFormality
  )

  if (result !== null) {
    targetText.value = result
    scrollOutputToBottom()
  }
}

function debouncedTranslate() {
  // Clear both timers when user types
  if (loadingIndicatorTimer) {
    clearTimeout(loadingIndicatorTimer)
  }
  if (apiCallTimer) {
    clearTimeout(apiCallTimer)
  }
  isPendingTranslation.value = false

  // Don't show loading for empty text
  if (!sourceText.value.trim()) {
    targetText.value = ''
    return
  }

  // Phase 1: Show loading indicator after 500ms of inactivity
  loadingIndicatorTimer = setTimeout(() => {
    isPendingTranslation.value = true
  }, 500)

  // Phase 2: Trigger API call after 1000ms of inactivity
  apiCallTimer = setTimeout(() => {
    performTranslation()
  }, 1000)
}

// Watch for changes that trigger translation
watch(sourceText, debouncedTranslate)
watch(sourceLanguage, (newLang, oldLang) => {
  // If user selects same language as target, swap them
  if (newLang === targetLanguage.value) {
    targetLanguage.value = oldLang
  }
  saveLanguagePreferences()
  performTranslation()
})
watch(targetLanguage, (newLang, oldLang) => {
  // If user selects same language as source, swap them
  if (newLang === sourceLanguage.value) {
    sourceLanguage.value = oldLang
  }
  saveLanguagePreferences()
  performTranslation()
})

// Re-fetch tier limits when auth state changes (login/logout)
watch(isAuthenticated, () => {
  fetchTierLimits()
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
 * Clear both source and translated text.
 */
function clearText() {
  sourceText.value = ''
  targetText.value = ''
}

/**
 * Handle feedback button click.
 */
async function handleFeedback(vote: 'like' | 'dislike') {
  pendingVote.value = vote

  // If user has stored consent, submit directly
  if (hasStoredConsent()) {
    const success = await submitFeedback({
      vote,
      consent: true,
      sourceText: sourceText.value,
      sourceLang: sourceLanguage.value,
      translatedText: targetText.value,
      targetLang: targetLanguage.value,
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
  if (loadingIndicatorTimer) {
    clearTimeout(loadingIndicatorTimer)
  }
  if (apiCallTimer) {
    clearTimeout(apiCallTimer)
  }
})
</script>
