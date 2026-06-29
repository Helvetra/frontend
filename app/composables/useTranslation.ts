/**
 * Composable for translation API calls.
 *
 * Exposes whole-text translation (`translate`) and incremental, sentence-level
 * translation (`translateIncremental`). The incremental path keeps a per-text
 * cache of sentence translations so that editing one sentence only retranslates
 * that sentence (via the context-aware /translate/partial endpoint), leaving the
 * others untouched. See helvetra/frontend#22 + helvetra/backend#25.
 */
import { segmentSentences, reassemble, contextAround, type Segment } from '../utils/sentences'

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

  // Exactly one translation operation in flight: a new operation aborts the
  // previous one, and only the latest may touch shared state. Shared by both
  // translate() and translateIncremental() so they cancel each other too.
  let abortController: AbortController | null = null
  let requestSeq = 0

  // Honor Retry-After from 429 responses: no new requests until this time.
  let rateLimitedUntil = 0

  // Per-text sentence-translation memory for the incremental path. Keyed by
  // the translation config; any change to it invalidates the whole cache.
  let cacheKey = ''
  let cacheCold = true
  const sentenceCache = new Map<string, string>()

  function makeCacheKey(
    sourceLang: string,
    targetLang: string,
    formality: string,
    dialect: string | null
  ): string {
    return `${sourceLang}|${targetLang}|${formality}|${dialect ?? ''}`
  }

  // Open a new operation: bump the sequence, abort any predecessor, reset the
  // visible loading/error state. Returns the seq + signal for this operation.
  function beginOperation(): { seq: number, signal: AbortSignal } {
    const seq = ++requestSeq
    abortController?.abort()
    abortController = new AbortController()
    isLoading.value = true
    error.value = null
    return { seq, signal: abortController.signal }
  }

  function endOperation(seq: number): void {
    if (seq === requestSeq) {
      isLoading.value = false
    }
  }

  // Map a thrown fetch error to the visible error state. Returns false when the
  // failure was an abort or a superseded request, so the caller bails silently.
  function handleFetchError(e: unknown, seq: number): boolean {
    const errAny = e as { name?: string, cause?: { name?: string } }
    const aborted = errAny.name === 'AbortError' || errAny.cause?.name === 'AbortError'
    if (aborted || seq !== requestSeq) {
      return false
    }

    const fetchError = e as {
      data?: { error?: { code?: string, message?: string, retry_after?: number } }
      statusCode?: number
    }
    const code = fetchError.data?.error?.code
    error.value = (code && ERROR_CODE_MAP[code]) || 'CONNECTION_ERROR'

    // 4xx are never retried; on a rate limit, block new attempts until the
    // server's Retry-After has passed.
    if (fetchError.statusCode === 429) {
      const retryAfterSeconds = fetchError.data?.error?.retry_after ?? 30
      rateLimitedUntil = Date.now() + retryAfterSeconds * 1000
    }

    if (error.value === 'TRANSLATION_REJECTED') {
      console.warn('Translation rejected by backend:', code, fetchError.data?.error?.message)
    }

    return true
  }

  function withDialect(
    body: Record<string, string | null>,
    targetLang: string,
    dialect: string | null
  ): Record<string, string | null> {
    if (targetLang === 'gsw' && dialect) {
      body.dialect = dialect
    }
    return body
  }

  async function postWholeText(
    text: string,
    sourceLang: string,
    targetLang: string,
    formality: string,
    dialect: string | null,
    signal: AbortSignal
  ): Promise<TranslationResponse> {
    return authedFetch<TranslationResponse>(`${config.public.apiBase}/v1/translate`, {
      method: 'POST',
      body: withDialect(
        { text, source_lang: sourceLang, target_lang: targetLang, formality },
        targetLang,
        dialect
      ),
      signal,
    })
  }

  /**
   * Translate the whole text in one request. Used for the anonymous landing
   * pages, for auto-detect (where the source language is unknown), and as the
   * cold first pass of incremental translation.
   */
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

    const { seq, signal } = beginOperation()
    try {
      const response = await postWholeText(text, sourceLang, targetLang, formality, dialect, signal)
      if (seq !== requestSeq) {
        return null
      }
      if (response.success && response.data) {
        return {
          translation: response.data.translation,
          detected_source_lang: response.data.detected_source_lang,
        }
      }
      error.value = response.error?.message ?? 'Translation failed'
      return null
    } catch (e) {
      handleFetchError(e, seq)
      return null
    } finally {
      endOperation(seq)
    }
  }

  /**
   * Translate one sentence using the surrounding text as read-only context,
   * via the partial endpoint. Returns the segment's translation, or throws so
   * the caller's error handling runs.
   */
  async function postPartial(
    segment: string,
    sourceLang: string,
    targetLang: string,
    context: { before: string, after: string },
    formality: string,
    dialect: string | null,
    signal: AbortSignal
  ): Promise<string> {
    const response = await authedFetch<TranslationResponse>(
      `${config.public.apiBase}/v1/translate/partial`,
      {
        method: 'POST',
        body: withDialect(
          {
            segment,
            context_before: context.before,
            context_after: context.after,
            source_lang: sourceLang,
            target_lang: targetLang,
            formality,
          },
          targetLang,
          dialect
        ),
        signal,
      }
    )
    if (response.success && response.data) {
      return response.data.translation
    }
    throw { data: { error: response.error } }
  }

  function resetCacheIfConfigChanged(key: string): void {
    if (key !== cacheKey) {
      cacheKey = key
      cacheCold = true
      sentenceCache.clear()
    }
  }

  // Unique, non-empty cores in document order, plus the first segment each one
  // appears in (used to build its translation context).
  function collectCores(segments: Segment[]): { cores: string[], segByCore: Map<string, Segment> } {
    const cores: string[] = []
    const segByCore = new Map<string, Segment>()
    for (const s of segments) {
      if (s.core && !segByCore.has(s.core)) {
        segByCore.set(s.core, s)
        cores.push(s.core)
      }
    }
    return { cores, segByCore }
  }

  /**
   * Translate incrementally: only sentences that changed since the last call
   * are retranslated; unchanged sentences reuse their cached translation. The
   * source language must be explicit (not 'auto'). Requires a cold whole-text
   * pass first, which also seeds the cache when the sentence counts align; if
   * they do not, the cache self-heals on the next edit via per-sentence calls.
   */
  async function translateIncremental(
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

    resetCacheIfConfigChanged(makeCacheKey(sourceLang, targetLang, formality, dialect))

    const { seq, signal } = beginOperation()
    try {
      const segments = segmentSentences(text, sourceLang)
      const { cores, segByCore } = collectCores(segments)
      if (cores.length === 0) {
        return { translation: text }
      }

      // Cold pass: one whole-text request for best quality and a single call.
      // Seed the cache from it when the sentence counts line up.
      if (cacheCold) {
        const response = await postWholeText(
          text, sourceLang, targetLang, formality, dialect, signal
        )
        if (seq !== requestSeq) {
          return null
        }
        if (!response.success || !response.data) {
          error.value = response.error?.message ?? 'Translation failed'
          return null
        }

        const whole = response.data.translation
        cacheCold = false

        const translatedCores = segmentSentences(whole, targetLang)
          .map((s) => s.core)
          .filter(Boolean)
        if (translatedCores.length === cores.length) {
          cores.forEach((core, i) => sentenceCache.set(core, translatedCores[i]!))
        }
        return { translation: whole }
      }

      // Warm pass: translate only the cores we have not seen, with context.
      const needed = cores.filter((core) => !sentenceCache.has(core))
      for (const core of needed) {
        const segment = segByCore.get(core)!
        const translation = await postPartial(
          core,
          sourceLang,
          targetLang,
          contextAround(text, segment),
          formality,
          dialect,
          signal
        )
        if (seq !== requestSeq) {
          return null
        }
        sentenceCache.set(core, translation)
      }

      const assembled = reassemble(segments, (core) => sentenceCache.get(core) ?? '')
      return { translation: assembled }
    } catch (e) {
      handleFetchError(e, seq)
      return null
    } finally {
      endOperation(seq)
    }
  }

  return {
    translate,
    translateIncremental,
    isLoading,
    error,
  }
}
