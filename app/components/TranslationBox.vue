<!--
  Main translation interface component.
  Auto-translates with two-phase debounce: 500ms loading indicator, 1000ms API call.
-->
<template>
  <div class="bg-white rounded-2xl border border-neutral-200 overflow-hidden" style="box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05), 0 0 60px 20px rgba(218, 41, 28, 0.12);">
    <!-- Language selectors row -->
    <div class="grid grid-cols-3 items-center border-b border-neutral-200 px-4 py-3 bg-neutral-50">
      <!-- Source language (hidden until text is entered) -->
      <div class="justify-self-start">
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 -translate-x-2"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 -translate-x-2"
        >
          <LanguageDropdown
            v-if="showSourceDropdown"
            v-model="sourceLanguage"
            :options="languageOptions"
          />
        </Transition>
      </div>

      <!-- Swap button (only visible when source dropdown is shown) -->
      <div class="justify-self-center">
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 scale-75"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-75"
        >
          <button
            v-if="showSourceDropdown"
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
        </Transition>
      </div>

      <!-- Target language -->
      <div class="justify-self-end">
        <LanguageDropdown
          v-model="targetLanguage"
          :options="languageOptions"
          align="right"
        />
      </div>
    </div>

    <!-- Formality toggle and dialect selector -->
    <div
      v-if="showFormalityToggle"
      class="flex items-center justify-end gap-4 px-4 py-2 border-b border-neutral-200 bg-neutral-50/50"
    >
      <!-- Formality toggle -->
      <div class="flex items-center gap-2">
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

      <!-- Dialect selector (only for Swiss German) -->
      <div v-if="showDialectSelector" class="flex items-center gap-2">
        <span class="text-xs text-neutral-500">{{ $t('dialect.label') }}:</span>
        <select
          :value="dialect"
          class="text-xs font-medium bg-white border border-neutral-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-swiss-red focus:border-transparent"
          @change="setDialect(($event.target as HTMLSelectElement).value)"
        >
          <option
            v-for="d in SWISS_DIALECTS"
            :key="d.code"
            :value="d.code"
          >
            {{ d.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Text areas -->
    <div class="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
      <!-- Source text -->
      <div class="flex flex-col h-56 md:h-96">
        <textarea
          ref="sourceTextarea"
          v-model="sourceText"
          :placeholder="$t('translate.placeholder')"
          class="flex-1 w-full p-4 resize-none border-none focus:outline-none focus:ring-0 text-neutral-900 placeholder-neutral-400"
          @focus="scrollIntoViewOnMobile"
        />
        <!-- Source footer: clear button and character count -->
        <div class="flex items-center justify-between px-2 py-2">
          <button
            v-if="sourceText"
            type="button"
            :title="$t('translate.clear')"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors"
            @click="clearText"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="text-sm font-medium">{{ $t('translate.clear') }}</span>
          </button>
          <div v-else />
          <div
            class="text-xs"
            :class="sourceText.length > charLimit ? 'text-red-500 font-medium' : 'text-neutral-400'"
          >
            {{ sourceText.length.toLocaleString() }} / {{ charLimit.toLocaleString() }}
          </div>
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

          <!-- Upgrade invite for character limit (authenticated free users) -->
          <div
            v-else-if="error === 'TEXT_TOO_LONG' && isAuthenticated && !isLoading"
            class="h-full flex items-center justify-center"
          >
            <div class="text-center px-4">
              <p class="text-sm text-neutral-700 mb-3">{{ $t('limits.wantMorePro') }}</p>
              <NuxtLink
                :to="localePath('/pricing')"
                class="inline-flex items-center gap-2 px-4 py-2 bg-swiss-red text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                {{ $t('limits.upgradeCta') }}
                <span aria-hidden="true">&rarr;</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Registration invite for weekly limit (anonymous users) -->
          <div
            v-else-if="error === 'WEEKLY_LIMIT_EXCEEDED' && !isAuthenticated && !isLoading"
            class="h-full flex items-center justify-center"
          >
            <div class="text-center px-4">
              <p class="text-sm text-neutral-700 mb-3">{{ $t('limits.weeklyLimitReached') }}</p>
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

          <!-- Upgrade invite for usage limit (authenticated free users) -->
          <div
            v-else-if="(error === 'WEEKLY_LIMIT_EXCEEDED' || error === 'RATE_LIMITED') && isAuthenticated && !isLoading"
            class="h-full flex items-center justify-center"
          >
            <div class="text-center px-4">
              <p class="text-sm text-neutral-700 mb-3">{{ $t('limits.usageLimitReached') }}</p>
              <NuxtLink
                :to="localePath('/pricing')"
                class="inline-flex items-center gap-2 px-4 py-2 bg-swiss-red text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                {{ $t('limits.upgradeCta') }}
                <span aria-hidden="true">&rarr;</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Registration invite for rate limit (anonymous users) -->
          <div
            v-else-if="error === 'RATE_LIMITED' && !isAuthenticated && !isLoading"
            class="h-full flex items-center justify-center"
          >
            <div class="text-center px-4">
              <p class="text-sm text-neutral-700 mb-3">{{ $t('limits.weeklyLimitReached') }}</p>
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
const { detectLanguage } = useLanguageDetection()
const localePath = useLocalePath()
const config = useRuntimeConfig()

// Character limit based on tier (default to anonymous limit)
const charLimit = ref(400)

const STORAGE_KEY_SOURCE = 'helvetra_source_lang'
const STORAGE_KEY_TARGET = 'helvetra_target_lang'
const STORAGE_KEY_FORMALITY = 'helvetra_formality'
const STORAGE_KEY_DIALECT = 'helvetra_dialect'

// Languages with T-V distinction (informal/formal address)
const FORMALITY_LANGUAGES = ['de', 'gsw', 'fr', 'it']

// Swiss German dialects
const SWISS_DIALECTS = [
  { code: 'bern', label: 'Bärndütsch' },
  { code: 'zurich', label: 'Züritüütsch' },
  { code: 'basel', label: 'Baseldytsch' },
  { code: 'stgallen', label: 'Sanggallerdütsch' },
  { code: 'wallis', label: 'Walliserdütsch' },
  { code: 'luzern', label: 'Luzärndütsch' },
]

// Minimum characters before attempting language detection
const MIN_CHARS_FOR_DETECTION = 15

// Maximum LLM detection calls per session (cost control)
const MAX_LLM_DETECTIONS_PER_SESSION = 3

const sourceLanguage = ref('de')
const targetLanguage = ref('en')
const sourceText = ref('')
const targetText = ref('')
const copied = ref(false)
const formality = ref<'informal' | 'formal'>('informal')
const dialect = ref('bern')  // Default to Bärndütsch
const sourceTextarea = ref<HTMLTextAreaElement | null>(null)
const outputContainer = ref<HTMLDivElement | null>(null)

// Language detection state
const isAutoDetectMode = ref(true)
const userOverrodeSource = ref(false)
const detectedLanguage = ref<string | null>(null)

// LLM detection session counter (for Swiss German vs German disambiguation)
const llmDetectionCount = ref(0)
const pendingLlmDetection = ref(false)

// Show source language dropdown only after detection or manual override
const showSourceDropdown = computed(() =>
  userOverrodeSource.value || detectedLanguage.value !== null
)

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

// Show dialect selector only when target is Swiss German
const showDialectSelector = computed(() => targetLanguage.value === 'gsw')

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
    const savedDialect = localStorage.getItem(STORAGE_KEY_DIALECT)

    if (savedSource && availableLanguages.some(l => l.code === savedSource)) {
      sourceLanguage.value = savedSource
    }
    if (savedTarget && availableLanguages.some(l => l.code === savedTarget)) {
      targetLanguage.value = savedTarget
    }
    if (savedFormality === 'informal' || savedFormality === 'formal') {
      formality.value = savedFormality
    }
    if (savedDialect && SWISS_DIALECTS.some(d => d.code === savedDialect)) {
      dialect.value = savedDialect
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
    localStorage.setItem(STORAGE_KEY_DIALECT, dialect.value)
  }
}

// Set formality and trigger re-translation
function setFormality(value: 'informal' | 'formal') {
  formality.value = value
  saveLanguagePreferences()
  performTranslation()
}

// Set dialect and trigger re-translation
function setDialect(value: string) {
  dialect.value = value
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

  // Determine source language to send
  // When franc detected German and we haven't exceeded LLM quota, use 'auto' for LLM disambiguation
  let sourceLangToSend = sourceLanguage.value
  const shouldUseLlmDetection =
    pendingLlmDetection.value &&
    llmDetectionCount.value < MAX_LLM_DETECTIONS_PER_SESSION

  if (shouldUseLlmDetection) {
    sourceLangToSend = 'auto'
  }

  // Only pass dialect when translating to Swiss German
  const effectiveDialect = targetLanguage.value === 'gsw' ? dialect.value : null

  const result = await translate(
    sourceText.value,
    sourceLangToSend,
    targetLanguage.value,
    effectiveFormality,
    effectiveDialect
  )

  if (result !== null) {
    targetText.value = result.translation

    // Handle LLM-detected source language
    if (result.detected_source_lang && shouldUseLlmDetection) {
      llmDetectionCount.value++
      pendingLlmDetection.value = false

      // Update detected language if different from client-side detection
      if (result.detected_source_lang !== detectedLanguage.value) {
        detectedLanguage.value = result.detected_source_lang
        sourceLanguage.value = result.detected_source_lang

        // Make sure target is different
        if (result.detected_source_lang === targetLanguage.value) {
          targetLanguage.value = result.detected_source_lang === 'en' ? 'de' : 'en'
        }
      }
    }

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

/**
 * Attempt to detect the source language from input text.
 * When franc detects German, flags for LLM verification to distinguish German from Swiss German.
 */
function tryDetectLanguage() {
  // Skip if user has manually selected a language
  if (userOverrodeSource.value) return

  // Need enough text for reliable detection
  if (sourceText.value.length < MIN_CHARS_FOR_DETECTION) return

  const detected = detectLanguage(sourceText.value)
  if (detected && detected !== detectedLanguage.value) {
    detectedLanguage.value = detected
    // Update source language to detected language
    sourceLanguage.value = detected
    // Make sure target is different
    if (detected === targetLanguage.value) {
      targetLanguage.value = detected === 'en' ? 'de' : 'en'
    }

    // When franc detects German, trigger LLM verification for Swiss German disambiguation
    // Only if we haven't exceeded the session quota
    if (detected === 'de' && llmDetectionCount.value < MAX_LLM_DETECTIONS_PER_SESSION) {
      pendingLlmDetection.value = true
    }
  }
}

// Watch for changes that trigger translation and detection
watch(sourceText, (newText) => {
  debouncedTranslate()

  // Reset detection state when text is cleared
  if (!newText.trim()) {
    detectedLanguage.value = null
    userOverrodeSource.value = false
    pendingLlmDetection.value = false
  } else {
    // Try to detect language
    tryDetectLanguage()
  }
})

watch(sourceLanguage, (newLang, oldLang) => {
  // If user selects same language as target, swap them
  if (newLang === targetLanguage.value) {
    targetLanguage.value = oldLang
  }

  // Mark as user override if changed manually (not from detection)
  if (detectedLanguage.value !== null && newLang !== detectedLanguage.value) {
    userOverrodeSource.value = true
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
