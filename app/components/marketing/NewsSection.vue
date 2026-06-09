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
      slug: 'swiss-startup-days-2026',
      title: 'Helvetra at Swiss Startup Days 2026: open source as the only strategy',
      summary:
        "Notes from the fireside chat on the AI Stage in Bern, where the Apertus team brought Helvetra along. Open source as the only credible strategy for a small Swiss product, and why we keep no record of what you type.",
      date: '2026-06-09',
    },
  },
  de: {
    heading: 'Aus dem Team',
    allNews: 'Alle News →',
    latest: {
      slug: 'swiss-startup-days-2026',
      title: 'Helvetra an den Swiss Startup Days 2026: Open Source als einzige Strategie',
      summary:
        'Notizen vom Fireside-Chat auf der AI Stage in Bern, zu dem das Apertus-Team Helvetra eingeladen hat. Open Source als einzige glaubwürdige Strategie für ein kleines Schweizer Produkt, und warum wir nichts speichern, was Sie eintippen.',
      date: '2026-06-09',
    },
  },
  fr: {
    heading: "De l'équipe",
    allNews: "Toutes les actualités →",
    latest: {
      slug: 'swiss-startup-days-2026',
      title: 'Helvetra aux Swiss Startup Days 2026: l\'open source comme seule stratégie',
      summary:
        "Notes du fireside chat sur l'AI Stage à Berne, où l'équipe Apertus a embarqué Helvetra. L'open source comme seule stratégie crédible pour un petit produit suisse, et pourquoi nous ne gardons rien de ce que vous tapez.",
      date: '2026-06-09',
    },
  },
  it: {
    heading: 'Dal team',
    allNews: 'Tutte le notizie →',
    latest: {
      slug: 'swiss-startup-days-2026',
      title: 'Helvetra agli Swiss Startup Days 2026: l\'open source come unica strategia',
      summary:
        "Note dal fireside chat sull'AI Stage a Berna, dove il team Apertus ha portato Helvetra. Open source come unica strategia credibile per un piccolo prodotto svizzero, e perché non conserviamo nulla di ciò che digiti.",
      date: '2026-06-09',
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
