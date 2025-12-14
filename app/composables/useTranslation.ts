/**
 * Composable for translation API calls.
 * Handles communication with the backend translation endpoint.
 */

interface TranslationResponse {
  success: boolean
  data?: {
    translation: string
    source_lang: string
    target_lang: string
  }
  meta?: {
    characters: number
    processing_time_ms: number
  }
  error?: {
    code: string
    message: string
    retry_after?: number
  }
}

export function useTranslation() {
  const config = useRuntimeConfig()
  const { getAuthHeader } = useAuth()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function translate(
    text: string,
    sourceLang: string,
    targetLang: string,
    formality: 'informal' | 'formal' | 'auto' = 'auto'
  ): Promise<string | null> {
    if (!text.trim()) {
      return null
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<TranslationResponse>(
        `${config.public.apiBase}/v1/translate`,
        {
          method: 'POST',
          headers: getAuthHeader(),
          body: {
            text,
            source_lang: sourceLang,
            target_lang: targetLang,
            formality,
          },
        }
      )

      if (response.success && response.data) {
        return response.data.translation
      }

      if (response.error) {
        error.value = response.error.message
        return null
      }

      error.value = 'Translation failed'
      return null
    } catch (e) {
      const fetchError = e as {
        data?: TranslationResponse | { detail?: Array<{ type: string; msg: string }> }
        statusCode?: number
      }

      if (fetchError.data && 'error' in fetchError.data && fetchError.data.error) {
        error.value = fetchError.data.error.message
      } else if (fetchError.statusCode === 422) {
        // Pydantic validation error
        const detail = (fetchError.data as { detail?: Array<{ type: string; msg: string }> })?.detail
        if (detail?.[0]?.type === 'string_too_long') {
          error.value = 'TEXT_TOO_LONG'
        } else {
          error.value = 'VALIDATION_ERROR'
        }
      } else if (fetchError.statusCode === 429) {
        error.value = 'RATE_LIMITED'
      } else {
        error.value = 'CONNECTION_ERROR'
      }

      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    translate,
    isLoading,
    error,
  }
}
