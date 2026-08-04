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
      slug: 'apertus-1-5-what-it-means-for-helvetra',
      title: "Helvetra moves to Apertus 1.5: what changes, and what we're watching",
      summary:
        'The Swiss model behind Helvetra just had a major update, and Infomaniak now serves it. What improves for your translations, what we leave switched off, and an honest first look at Swiss German.',
      date: '2026-08-04',
    },
  },
  de: {
    heading: 'Aus dem Team',
    allNews: 'Alle News →',
    latest: {
      slug: 'apertus-1-5-what-it-means-for-helvetra',
      title: 'Helvetra wechselt zu Apertus 1.5: was sich ändert und worauf wir achten',
      summary:
        'Das Schweizer Modell hinter Helvetra hat ein grosses Update erhalten, und Infomaniak stellt es jetzt bereit. Was sich für Ihre Übersetzungen verbessert, was wir ausgeschaltet lassen, und ein ehrlicher erster Blick auf Schweizerdeutsch.',
      date: '2026-08-04',
    },
  },
  fr: {
    heading: "De l'équipe",
    allNews: "Toutes les actualités →",
    latest: {
      slug: 'apertus-1-5-what-it-means-for-helvetra',
      title: 'Helvetra passe à Apertus 1.5 : ce qui change, et ce que nous surveillons',
      summary:
        "Le modèle suisse derrière Helvetra vient de recevoir une mise à jour majeure, et Infomaniak le propose désormais. Ce qui s'améliore pour vos traductions, ce que nous laissons désactivé, et un premier aperçu honnête du suisse allemand.",
      date: '2026-08-04',
    },
  },
  it: {
    heading: 'Dal team',
    allNews: 'Tutte le notizie →',
    latest: {
      slug: 'apertus-1-5-what-it-means-for-helvetra',
      title: 'Helvetra passa ad Apertus 1.5: cosa cambia e cosa stiamo osservando',
      summary:
        "Il modello svizzero dietro Helvetra ha appena ricevuto un aggiornamento importante, e Infomaniak ora lo offre. Cosa migliora per le tue traduzioni, cosa lasciamo disattivato, e uno sguardo onesto al tedesco svizzero.",
      date: '2026-08-04',
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
