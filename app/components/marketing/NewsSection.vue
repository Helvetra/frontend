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
      slug: 'why-helvetra-runs-on-infomaniak',
      title: 'Infomaniak becomes a foundation: what it means for Helvetra',
      summary:
        'Every layer of Helvetra runs on Infomaniak: the website, the backend, and the Apertus model. Why we host where we host, and what changed when the company locked its independence into a Swiss public-interest foundation.',
      date: '2026-06-23',
    },
  },
  de: {
    heading: 'Aus dem Team',
    allNews: 'Alle News →',
    latest: {
      slug: 'why-helvetra-runs-on-infomaniak',
      title: 'Infomaniak wird zur Stiftung: was das für Helvetra bedeutet',
      summary:
        'Jede Schicht von Helvetra läuft auf Infomaniak: die Website, das Backend und das Apertus-Modell. Warum wir dort hosten, wo wir hosten, und was sich änderte, als das Unternehmen seine Unabhängigkeit in einer gemeinnützigen Schweizer Stiftung verankerte.',
      date: '2026-06-23',
    },
  },
  fr: {
    heading: "De l'équipe",
    allNews: "Toutes les actualités →",
    latest: {
      slug: 'why-helvetra-runs-on-infomaniak',
      title: 'Infomaniak devient une fondation: ce que cela signifie pour Helvetra',
      summary:
        "Chaque couche de Helvetra tourne sur Infomaniak: le site, le backend et le modèle Apertus. Pourquoi nous hébergeons là où nous hébergeons, et ce qui a changé quand l'entreprise a verrouillé son indépendance dans une fondation suisse d'intérêt public.",
      date: '2026-06-23',
    },
  },
  it: {
    heading: 'Dal team',
    allNews: 'Tutte le notizie →',
    latest: {
      slug: 'why-helvetra-runs-on-infomaniak',
      title: 'Infomaniak diventa una fondazione: cosa significa per Helvetra',
      summary:
        "Ogni livello di Helvetra gira su Infomaniak: il sito, il backend e il modello Apertus. Perché ospitiamo dove ospitiamo, e cosa è cambiato quando l'azienda ha blindato la propria indipendenza in una fondazione svizzera di interesse pubblico.",
      date: '2026-06-23',
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
