<!--
  Latest news callout shown on the homepage.
  Single-article preview today; scales to a small list when there are
  more. Source of truth for the listed article is the news index page;
  this component links there for the full set.
-->
<template>
  <section class="py-12 md:py-16 bg-neutral-50">
    <div class="max-w-4xl mx-auto px-4 md:px-8">
      <div class="flex items-baseline justify-between mb-6">
        <h2 class="text-2xl md:text-3xl font-bold text-neutral-900">
          {{ t.heading }}
        </h2>
        <NuxtLink
          :to="localePath('/news')"
          class="text-sm text-swiss-red hover:text-swiss-red-dark underline underline-offset-2 decoration-2 hover:underline-offset-4"
        >
          {{ t.allNews }}
        </NuxtLink>
      </div>

      <NuxtLink
        :to="localePath(`/news/${t.latest.slug}`)"
        class="group block p-6 md:p-8 bg-white border border-neutral-200 rounded-xl hover:border-swiss-red hover:shadow-lg transition-all"
      >
        <time
          :datetime="t.latest.date"
          class="text-sm text-neutral-500 mb-2 block"
        >
          {{ formatDate(t.latest.date) }}
        </time>
        <h3 class="text-xl md:text-2xl font-semibold text-neutral-900 group-hover:text-swiss-red transition-colors mb-2">
          {{ t.latest.title }}
        </h3>
        <p class="text-neutral-600">
          {{ t.latest.summary }}
        </p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { locale } = useI18n()

// Per-locale content. Keep in sync with app/pages/news/index.vue.
const content = {
  en: {
    heading: 'From the team',
    allNews: 'All news →',
    latest: {
      slug: 'apertus-at-uphill-conf-2026',
      title: 'Apertus at Uphill Conf 2026: what it means for Helvetra',
      summary:
        "Notes from Imanol Schlag's keynote on the fully-open Swiss AI model behind Helvetra. Why a single PhD student took Apertus from zero to ~40% Swiss German performance in a day.",
      date: '2026-05-22',
    },
  },
  de: {
    heading: 'Aus dem Team',
    allNews: 'Alle News →',
    latest: {
      slug: 'apertus-at-uphill-conf-2026',
      title: 'Apertus an der Uphill Conf 2026: was das für Helvetra bedeutet',
      summary:
        'Notizen aus Imanol Schlags Keynote über das vollständig offene Schweizer KI-Modell hinter Helvetra. Warum ein Doktorand Apertus an einem einzigen Tag von null auf etwa 40 Prozent Schweizerdeutsch gebracht hat.',
      date: '2026-05-22',
    },
  },
  fr: {
    heading: "De l'équipe",
    allNews: "Toutes les actualités →",
    latest: {
      slug: 'apertus-at-uphill-conf-2026',
      title: 'Apertus à la Uphill Conf 2026: ce que cela signifie pour Helvetra',
      summary:
        "Notes de la keynote d'Imanol Schlag sur le modèle d'IA suisse entièrement ouvert qui propulse Helvetra. Pourquoi un seul doctorant a fait passer Apertus de zéro à environ 40 % en suisse allemand en une journée.",
      date: '2026-05-22',
    },
  },
  it: {
    heading: 'Dal team',
    allNews: 'Tutte le notizie →',
    latest: {
      slug: 'apertus-at-uphill-conf-2026',
      title: 'Apertus alla Uphill Conf 2026: cosa significa per Helvetra',
      summary:
        'Note dal keynote di Imanol Schlag sul modello di IA svizzero interamente aperto che alimenta Helvetra. Perché un singolo dottorando ha portato Apertus da zero a circa il 40% in tedesco svizzero in un giorno.',
      date: '2026-05-22',
    },
  },
} as const

const t = computed(() => content[locale.value as keyof typeof content] || content.en)

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
</script>
