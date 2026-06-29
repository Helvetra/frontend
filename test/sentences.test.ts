import { describe, it, expect } from 'vitest'
import { segmentSentences, reassemble, contextAround } from '../app/utils/sentences'

const identity = (c: string) => c

describe('segmentSentences', () => {
  it('splits a simple multi-sentence string', () => {
    const segs = segmentSentences('Hello world. How are you? Bye.')
    expect(segs.map((s) => s.core)).toEqual(['Hello world.', 'How are you?', 'Bye.'])
  })

  it('returns no segments for empty input', () => {
    expect(segmentSentences('')).toEqual([])
  })

  it('treats a single sentence with no terminal punctuation as one core', () => {
    const segs = segmentSentences('just typing the first sentence')
    expect(segs).toHaveLength(1)
    expect(segs[0]!.core).toBe('just typing the first sentence')
  })

  it('records offsets that slice back to the core', () => {
    const text = '  Hello.\n\nWorld!  '
    for (const s of segmentSentences(text)) {
      expect(text.slice(s.start, s.end)).toBe(s.core)
    }
  })
})

describe('reassemble — round-trip invariant', () => {
  const cases = [
    'Hello world. How are you? Bye.',
    '  Leading and trailing spaces.  ',
    'Paragraph one.\n\nParagraph two with two sentences. And a second.',
    'No punctuation here',
    'Tabs\tand\nnewlines. Second line.\n',
    'Ünïcödé sentences work. Zürich ist schön. Grüezi mitenand.',
    '',
    '   \n\n  ',
  ]

  for (const text of cases) {
    it(`reproduces input exactly: ${JSON.stringify(text.slice(0, 30))}`, () => {
      const segs = segmentSentences(text)
      expect(reassemble(segs, identity)).toBe(text)
    })
  }
})

describe('reassemble — with translations', () => {
  it('replaces cores and keeps whitespace structure', () => {
    const text = 'Hello.\n\nWorld!'
    const segs = segmentSentences(text)
    const map: Record<string, string> = { 'Hello.': 'Hallo.', 'World!': 'Welt!' }
    expect(reassemble(segs, (c) => map[c] ?? c)).toBe('Hallo.\n\nWelt!')
  })

  it('reuses the same translation for a repeated sentence', () => {
    const text = 'Stop. Go. Stop.'
    const segs = segmentSentences(text)
    const calls: string[] = []
    reassemble(segs, (c) => {
      calls.push(c)
      return c.toUpperCase()
    })
    // Both "Stop." cores resolve through the same translate function.
    expect(calls.filter((c) => c === 'Stop.')).toHaveLength(2)
  })
})

describe('contextAround', () => {
  it('returns the exact text before and after a segment', () => {
    const text = 'One. Two. Three.'
    const segs = segmentSentences(text)
    const { before, after } = contextAround(text, segs[1]!)
    expect(before).toBe('One. ')
    expect(after).toBe(' Three.')
    // before + core + after reconstructs the original.
    expect(before + segs[1]!.core + after).toBe(text)
  })
})
