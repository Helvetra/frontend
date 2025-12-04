/**
 * Composable for feedback API calls.
 * Handles communication with the backend feedback endpoint.
 */

interface FeedbackRequest {
  vote: 'like' | 'dislike'
  consent: boolean
  sourceText: string
  sourceLang: string
  translatedText: string
  targetLang: string
  region?: string
  comment?: string
}

interface FeedbackResponse {
  success: boolean
  error?: {
    code: string
    message: string
  }
}

const CONSENT_STORAGE_KEY = 'helvetra_feedback_consent'

export function useFeedback() {
  const config = useRuntimeConfig()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Check if user has previously saved consent preference.
   */
  function hasStoredConsent(): boolean {
    if (!import.meta.client) return false
    return localStorage.getItem(CONSENT_STORAGE_KEY) === 'true'
  }

  /**
   * Save consent preference to localStorage.
   */
  function saveConsent(): void {
    if (import.meta.client) {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'true')
    }
  }

  /**
   * Submit feedback to the backend.
   */
  async function submitFeedback(request: FeedbackRequest): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<FeedbackResponse>(
        `${config.public.apiBase}/v1/feedback`,
        {
          method: 'POST',
          body: {
            vote: request.vote,
            consent: request.consent,
            source_text: request.sourceText,
            source_lang: request.sourceLang,
            translated_text: request.translatedText,
            target_lang: request.targetLang,
            region: request.region || null,
            comment: request.comment || null,
          },
        }
      )

      if (response.success) {
        return true
      }

      if (response.error) {
        error.value = response.error.message
        return false
      }

      error.value = 'Feedback submission failed'
      return false
    } catch (e) {
      const fetchError = e as { data?: FeedbackResponse; statusCode?: number }

      if (fetchError.data?.error) {
        error.value = fetchError.data.error.message
      } else if (fetchError.statusCode === 429) {
        error.value = 'Too many requests. Please wait a moment.'
      } else {
        error.value = 'Connection error. Please try again.'
      }

      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    submitFeedback,
    hasStoredConsent,
    saveConsent,
    isLoading,
    error,
  }
}
