/**
 * Centralized config for all comparison articles.
 * Add new comparisons here - they'll appear automatically on /compare hub page.
 */
export interface ComparisonItem {
  slug: string
  translationKey: string
  color: string
  bgColor: string
  letter: string
  tags: string[]
}

export function useComparisons() {
  const comparisons: ComparisonItem[] = [
    {
      slug: 'google-translate',
      translationKey: 'google',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      letter: 'G',
      tags: ['privacy', 'free'],
    },
    {
      slug: 'deepl',
      translationKey: 'deepl',
      color: 'text-sky-600',
      bgColor: 'bg-sky-100',
      letter: 'D',
      tags: ['quality', 'pricing'],
    },
    {
      slug: 'supertext',
      translationKey: 'supertext',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      letter: 'S',
      tags: ['swiss', 'swissGerman'],
    },
  ]

  return {
    comparisons,
  }
}
