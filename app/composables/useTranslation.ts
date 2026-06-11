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
    detected_source_lang?: string
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

export interface TranslationResult {
  translation: string
  detected_source_lang?: string
}

// Backend error codes → the UI's error vocabulary. Anything unknown (network
// failure, 5xx, unexpected code) falls back to CONNECTION_ERROR.
const ERROR_CODE_MAP: Record<string, string> = {
  TEXT_TOO_LONG: 'TEXT_TOO_LONG',
  WEEKLY_LIMIT_EXCEEDED: 'WEEKLY_LIMIT_EXCEEDED',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMITED',
  PLACEHOLDER_LEAK: 'TRANSLATION_REJECTED',
  NAME_SUBSTITUTION: 'TRANSLATION_REJECTED',
  SUSPICIOUS_OUTPUT: 'TRANSLATION_REJECTED',
}

export function useTranslation() {
  const config = useRuntimeConfig()
  const { authedFetch } = useAuth()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Exactly one translate request in flight: a new request aborts the
  // previous one, and only the latest request may touch shared state.
  let abortController: AbortController | null = null
  let requestSeq = 0

  // Honor Retry-After from 429 responses: no new requests until this time.
  let rateLimitedUntil = 0

  async function translate(
    text: string,
    sourceLang: string,
    targetLang: string,
    formality: 'informal' | 'formal' | 'auto' = 'auto',
    dialect: string | null = null
  ): Promise<TranslationResult | null> {
    if (!text.trim()) {
      return null
    }

    if (Date.now() < rateLimitedUntil) {
      error.value = 'RATE_LIMITED'
      return null
    }

    const seq = ++requestSeq
    abortController?.abort()
    abortController = new AbortController()

    isLoading.value = true
    error.value = null

    try {
      const body: Record<string, string | null> = {
        text,
        source_lang: sourceLang,
        target_lang: targetLang,
        formality,
      }
      // Only include dialect when translating to Swiss German
      if (targetLang === 'gsw' && dialect) {
        body.dialect = dialect
      }

      const response = await authedFetch<TranslationResponse>(
        `${config.public.apiBase}/v1/translate`,
        {
          method: 'POST',
          body,
          signal: abortController.signal,
        }
      )

      if (response.success && response.data) {
        return {
          translation: response.data.translation,
          detected_source_lang: response.data.detected_source_lang,
        }
      }

      if (response.error) {
        error.value = response.error.message
        return null
      }

      error.value = 'Translation failed'
      return null
    } catch (e) {
      // A superseded request was aborted on purpose: stay silent and let
      // the newer request own the loading/error state. ofetch wraps the
      // DOMException, so check the cause as well.
      const errAny = e as { name?: string; cause?: { name?: string } }
      const aborted = errAny.name === 'AbortError' || errAny.cause?.name === 'AbortError'
      if (aborted || seq !== requestSeq) {
        return null
      }

      // Every backend error arrives in one envelope since backend#119:
      // {success: false, error: {code, message, ...}}.
      const fetchError = e as {
        data?: { error?: { code?: string; message?: string; retry_after?: number } }
        statusCode?: number
      }
      const code = fetchError.data?.error?.code

      error.value = (code && ERROR_CODE_MAP[code]) || 'CONNECTION_ERROR'

      // 4xx responses are never retried; for rate limits, additionally
      // block new attempts until the server's Retry-After has passed.
      if (fetchError.statusCode === 429) {
        const retryAfterSeconds = fetchError.data?.error?.retry_after ?? 30
        rateLimitedUntil = Date.now() + retryAfterSeconds * 1000
      }

      if (error.value === 'TRANSLATION_REJECTED') {
        console.warn(
          'Translation rejected by backend:',
          code,
          fetchError.data?.error?.message
        )
      }

      return null
    } finally {
      if (seq === requestSeq) {
        isLoading.value = false
      }
    }
  }

  return {
    translate,
    isLoading,
    error,
  }
}
