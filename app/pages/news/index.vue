<!--
  News hub: lists Helvetra news articles. Auto-discovered into sitemap.
  Single article today; the layout already scales to N entries when more
  are added. Each article entry is declared in `news` below — adding a
  new article means: drop the .vue file in app/pages/news/ + add the
  entry here.
-->
<template>
  <div>
    <article class="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <header class="mb-10 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          News from Helvetra
        </h1>
        <p class="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Notes from Swiss AI events, Apertus releases, and what's shaping the model behind every Helvetra translation.
        </p>
      </header>

      <ul class="space-y-6 mb-12">
        <li
          v-for="item in news"
          :key="item.slug"
          class="group"
        >
          <NuxtLink
            :to="localePath(`/news/${item.slug}`)"
            class="block p-6 bg-white border border-neutral-200 rounded-xl hover:border-swiss-red hover:shadow-lg transition-all"
          >
            <time
              :datetime="item.date"
              class="text-sm text-neutral-500 mb-2 block"
            >
              {{ formatDate(item.date) }}
            </time>
            <h2 class="text-xl font-semibold text-neutral-900 group-hover:text-swiss-red transition-colors mb-2">
              {{ item.title }}
            </h2>
            <p class="text-neutral-600">
              {{ item.summary }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </article>

    <MarketingNewsletterSection />
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { locale } = useI18n()

const CANONICAL_URL = 'https://helvetra.ch/news'

interface NewsItem {
  slug: string
  title: string
  summary: string
  date: string // ISO date
}

// Listed newest first. Add new entries at the top.
const news: NewsItem[] = [
  {
    slug: 'apertus-at-uphill-conf-2026',
    title: 'Apertus at Uphill Conf 2026: what it means for Helvetra',
    summary:
      "Notes from Imanol Schlag's keynote on the fully-open Swiss AI model behind Helvetra. Why a single PhD student took Apertus from zero to ~40% Swiss German performance in a day, and why every Apertus release from here on directly upgrades the translations you get from us.",
    date: '2026-05-22',
  },
]

function formatDate(iso: string): string {
  // Display format: "22 May 2026" — neutral, scannable, no locale guessing.
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

useHead(() => {
  const isNonEnglish = locale.value !== 'en'
  return {
    title: 'News from Helvetra',
    link: [{ rel: 'canonical', href: CANONICAL_URL }],
    meta: [
      {
        name: 'description',
        content:
          "Notes from Swiss AI events, Apertus releases, and what's shaping the model behind every Helvetra translation.",
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'News from Helvetra' },
      { property: 'og:url', content: CANONICAL_URL },
      ...(isNonEnglish
        ? [{ name: 'robots', content: 'noindex,follow' }]
        : []),
    ],
  }
})
</script>
