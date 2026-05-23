<!--
  News hub: lists Helvetra news articles. Auto-discovered into sitemap.
  Single article today; the layout already scales to N entries when more
  are added. Article entries live in the per-locale `news` arrays below.
-->
<template>
  <div>
    <article class="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <header class="mb-10 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          {{ t.heading }}
        </h1>
        <p class="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          {{ t.subtitle }}
        </p>
      </header>

      <ul class="space-y-6 mb-12">
        <li
          v-for="item in t.items"
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

interface NewsItem {
  slug: string
  title: string
  summary: string
  date: string // ISO date
}

interface Locale {
  heading: string
  subtitle: string
  items: NewsItem[]
}

// Listed newest first. Add new entries at the top of each locale array.
const content = {
  en: {
    heading: 'News from Helvetra',
    subtitle:
      "Notes from Swiss AI events, Apertus releases, and what's shaping the model behind every Helvetra translation.",
    items: [
      {
        slug: 'apertus-at-uphill-conf-2026',
        title: 'Apertus at Uphill Conf 2026: what it means for Helvetra',
        summary:
          "Notes from Imanol Schlag's keynote on the fully-open Swiss AI model behind Helvetra. Why a single PhD student took Apertus from zero to ~40% Swiss German performance in a day, and why every Apertus release from here on directly upgrades the translations you get from us.",
        date: '2026-05-22',
      },
    ],
  },
  de: {
    heading: 'News von Helvetra',
    subtitle:
      'Notizen von Schweizer KI-Anlässen, Apertus-Releases und allem, was das Modell hinter jeder Helvetra-Übersetzung prägt.',
    items: [
      {
        slug: 'apertus-at-uphill-conf-2026',
        title: 'Apertus an der Uphill Conf 2026: was das für Helvetra bedeutet',
        summary:
          'Notizen aus Imanol Schlags Keynote über das vollständig offene Schweizer KI-Modell hinter Helvetra. Warum ein einzelner Doktorand Apertus an einem Tag von null auf etwa 40 Prozent Schweizerdeutsch gebracht hat, und warum jedes künftige Apertus-Release die Übersetzungen, die Sie von uns erhalten, direkt verbessert.',
        date: '2026-05-22',
      },
    ],
  },
  fr: {
    heading: 'Actualités de Helvetra',
    subtitle:
      "Notes d'événements suisses d'IA, des sorties d'Apertus, et de tout ce qui façonne le modèle derrière chaque traduction Helvetra.",
    items: [
      {
        slug: 'apertus-at-uphill-conf-2026',
        title: 'Apertus à la Uphill Conf 2026: ce que cela signifie pour Helvetra',
        summary:
          "Notes de la keynote d'Imanol Schlag sur le modèle d'IA suisse entièrement ouvert qui propulse Helvetra. Pourquoi un seul doctorant a fait passer Apertus de zéro à environ 40 % en suisse allemand en une journée, et pourquoi chaque future sortie d'Apertus améliorera directement les traductions que vous obtenez chez nous.",
        date: '2026-05-22',
      },
    ],
  },
  it: {
    heading: 'Notizie da Helvetra',
    subtitle:
      'Note da eventi svizzeri di IA, release di Apertus e tutto ciò che modella il modello dietro ogni traduzione di Helvetra.',
    items: [
      {
        slug: 'apertus-at-uphill-conf-2026',
        title: 'Apertus alla Uphill Conf 2026: cosa significa per Helvetra',
        summary:
          'Note dal keynote di Imanol Schlag sul modello di IA svizzero interamente aperto che alimenta Helvetra. Perché un singolo dottorando ha portato Apertus da zero a circa il 40% in tedesco svizzero in un giorno, e perché ogni futura release di Apertus migliorerà direttamente le traduzioni che vi forniamo.',
        date: '2026-05-22',
      },
    ],
  },
} as const satisfies Record<string, Locale>

const t = computed(() => content[locale.value as keyof typeof content] || content.en)

const canonical = computed(() =>
  locale.value === 'en'
    ? 'https://helvetra.ch/news'
    : `https://helvetra.ch/${locale.value}/news`,
)

const dateLocaleMap: Record<string, string> = {
  en: 'en-GB',
  de: 'de-CH',
  fr: 'fr-CH',
  it: 'it-CH',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString(dateLocaleMap[locale.value] || 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

useHead(() => ({
  title: t.value.heading,
  link: [{ rel: 'canonical', href: canonical.value }],
  meta: [
    { name: 'description', content: t.value.subtitle },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: t.value.heading },
    { property: 'og:url', content: canonical.value },
  ],
}))
</script>
