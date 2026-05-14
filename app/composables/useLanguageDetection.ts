/**
 * Composable for detecting the language of input text.
 * Uses franc library for client-side language detection.
 */

import { francAll } from 'franc'

// Map ISO 639-3 codes (franc) to our language codes
// Note: Romansh (roh) is not supported by franc, so LLM detection handles it
const ISO_TO_LANG: Record<string, string> = {
  eng: 'en',
  deu: 'de',
  gsw: 'gsw',
  fra: 'fr',
  ita: 'it',
  roh: 'rm',
}

const LANG_TO_ISO: Record<string, string> = Object.fromEntries(
  Object.entries(ISO_TO_LANG).map(([iso, lang]) => [lang, iso]),
)

const SUPPORTED_ISO_CODES = ['eng', 'deu', 'gsw', 'fra', 'ita']

// When franc's top result differs from the target language but the target
// also scores within this margin, treat as ambiguous and abstain. Short
// Latin-alphabet text (e.g. "Dear Max, I hope you're doing fine.") often
// scores high in several languages; switching source on that gives the user
// a confidently wrong translation.
const AMBIGUOUS_GAP = 0.2

export function useLanguageDetection() {
  /**
   * Detect language from text input.
   * Returns the detected language code or null if undetermined.
   *
   * targetLanguage (when provided) suppresses auto-switching for cases where
   * the input could plausibly be in the target language — avoids producing
   * a wrong translation from a low-confidence guess.
   */
  function detectLanguage(text: string, targetLanguage?: string): string | null {
    if (!text || text.length < 20) {
      return null
    }

    const ranked = francAll(text, {
      only: SUPPORTED_ISO_CODES,
      minLength: 20,
    })

    if (!ranked.length || ranked[0]?.[0] === 'und') {
      return null
    }

    const [topIso, topScore] = ranked[0]!
    const top = ISO_TO_LANG[topIso] || null

    if (!top) return null

    if (targetLanguage && top !== targetLanguage) {
      const targetIso = LANG_TO_ISO[targetLanguage]
      const targetEntry = targetIso ? ranked.find(([iso]) => iso === targetIso) : undefined
      if (targetEntry && topScore - targetEntry[1] < AMBIGUOUS_GAP) {
        return null
      }
    }

    return top
  }

  return {
    detectLanguage,
  }
}
