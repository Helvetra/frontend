/**
 * Pure sentence-segmentation helpers for incremental translation.
 *
 * No Vue or Nuxt dependencies, so the tricky logic (whitespace preservation,
 * reassembly) is unit-testable in isolation. The core invariant every change
 * must keep: reassembling the original sentences with an identity translation
 * reproduces the input text exactly, character for character.
 */

export interface Segment {
  /** The trimmed sentence text — the unit that gets translated. */
  core: string
  /** Whitespace before the core within this segment. */
  leading: string
  /** Whitespace after the core within this segment. */
  trailing: string
  /** Character offset of the core's start in the original text. */
  start: number
  /** Character offset of the core's end in the original text. */
  end: number
}

// Intl.Segmenter construction is not free; reuse one per locale.
const SEGMENTERS = new Map<string, Intl.Segmenter>()

function getSegmenter(locale: string): Intl.Segmenter {
  let segmenter = SEGMENTERS.get(locale)
  if (!segmenter) {
    try {
      segmenter = new Intl.Segmenter(locale, { granularity: 'sentence' })
    } catch {
      // Unknown locale code: fall back to a generic segmenter.
      segmenter = new Intl.Segmenter('en', { granularity: 'sentence' })
    }
    SEGMENTERS.set(locale, segmenter)
  }
  return segmenter
}

/**
 * Split text into sentence segments, separating each sentence's core text from
 * the surrounding whitespace so reassembly can restore the exact structure
 * (including paragraph breaks). Whitespace-only segments yield an empty core.
 */
export function segmentSentences(text: string, locale = 'en'): Segment[] {
  if (!text) return []

  const segmenter = getSegmenter(locale)
  const segments: Segment[] = []

  for (const { segment, index } of segmenter.segment(text)) {
    const leading = segment.match(/^\s*/)?.[0] ?? ''
    const rest = segment.slice(leading.length)
    const trailing = rest.match(/\s*$/)?.[0] ?? ''
    const core = rest.slice(0, rest.length - trailing.length)
    const start = index + leading.length

    segments.push({ core, leading, trailing, start, end: start + core.length })
  }

  return segments
}

/**
 * Rebuild a full text from its segments, replacing each non-empty core with
 * `translate(core)` and preserving all original whitespace. With an identity
 * `translate`, the output equals the original text exactly.
 */
export function reassemble(
  segments: Segment[],
  translate: (core: string) => string,
): string {
  return segments
    .map((s) => s.leading + (s.core ? translate(s.core) : '') + s.trailing)
    .join('')
}

/**
 * The text surrounding a segment, used as read-only context when translating
 * just that segment. Reconstructed from offsets so it matches the source byte
 * for byte.
 */
export function contextAround(
  text: string,
  segment: Segment,
): { before: string; after: string } {
  return { before: text.slice(0, segment.start), after: text.slice(segment.end) }
}
