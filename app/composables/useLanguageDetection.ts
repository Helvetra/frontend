/**
 * Composable for detecting the language of input text.
 * Uses franc library for client-side language detection.
 */

import { franc } from 'franc'

// Map ISO 639-3 codes (franc) to our language codes
const ISO_TO_LANG: Record<string, string> = {
  eng: 'en',
  deu: 'de',
  gsw: 'gsw',
  fra: 'fr',
  ita: 'it',
}

// Our supported language codes for detection
const SUPPORTED_ISO_CODES = ['eng', 'deu', 'gsw', 'fra', 'ita']

export function useLanguageDetection() {
  /**
   * Detect language from text input.
   * Returns the detected language code or null if undetermined.
   */
  function detectLanguage(text: string): string | null {
    if (!text || text.length < 20) {
      return null
    }

    const detected = franc(text, {
      only: SUPPORTED_ISO_CODES,
      minLength: 20,
    })

    if (detected === 'und') {
      return null
    }

    return ISO_TO_LANG[detected] || null
  }

  return {
    detectLanguage,
  }
}
