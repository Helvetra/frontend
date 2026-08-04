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
        slug: 'apertus-1-5-what-it-means-for-helvetra',
        title: "Helvetra moves to Apertus 1.5: what changes, and what we're watching",
        summary:
          'Apertus 1.5 is live on Infomaniak and Helvetra now runs it. What improves for your translations, what we leave switched off, and an honest first look at Swiss German, dialect output that works, auto-detection that still does not.',
        date: '2026-08-04',
      },
      {
        slug: 'why-helvetra-runs-on-infomaniak',
        title: 'Infomaniak becomes a foundation: what it means for Helvetra',
        summary:
          'Why every layer of Helvetra, the website, the backend, and the Apertus translation model, runs on Infomaniak, and what changed when the company handed voting control to a Swiss public-interest foundation in May 2026.',
        date: '2026-06-23',
      },
      {
        slug: 'swiss-startup-days-2026',
        title: 'Helvetra at Swiss Startup Days 2026: open source as the only strategy',
        summary:
          'Notes from the fireside chat on the AI Stage in Bern, where the Apertus team brought Helvetra along. Open source as the only credible strategy for a small Swiss product, why we keep no record of what you type, and the honest state of Swiss German on Apertus today.',
        date: '2026-06-09',
      },
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
        slug: 'apertus-1-5-what-it-means-for-helvetra',
        title: 'Helvetra wechselt zu Apertus 1.5: was sich ändert und worauf wir achten',
        summary:
          'Apertus 1.5 ist bei Infomaniak live, und Helvetra nutzt es jetzt. Was sich für Ihre Übersetzungen verbessert, was wir ausgeschaltet lassen, und ein ehrlicher erster Blick auf Schweizerdeutsch: Dialektausgabe, die funktioniert, automatische Erkennung, die es noch nicht tut.',
        date: '2026-08-04',
      },
      {
        slug: 'why-helvetra-runs-on-infomaniak',
        title: 'Infomaniak wird zur Stiftung: was das für Helvetra bedeutet',
        summary:
          'Warum jede Schicht von Helvetra, die Website, das Backend und das Apertus-Übersetzungsmodell, auf Infomaniak läuft, und was sich änderte, als das Unternehmen im Mai 2026 die Stimmkontrolle an eine gemeinnützige Schweizer Stiftung übergab.',
        date: '2026-06-23',
      },
      {
        slug: 'swiss-startup-days-2026',
        title: 'Helvetra an den Swiss Startup Days 2026: Open Source als einzige Strategie',
        summary:
          'Notizen vom Fireside-Chat auf der AI Stage in Bern, zu dem das Apertus-Team Helvetra eingeladen hat. Open Source als einzige glaubwürdige Strategie für ein kleines Schweizer Produkt, warum wir nichts speichern, was Sie eintippen, und der ehrliche Stand des Schweizerdeutschen auf Apertus heute.',
        date: '2026-06-09',
      },
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
        slug: 'apertus-1-5-what-it-means-for-helvetra',
        title: 'Helvetra passe à Apertus 1.5 : ce qui change, et ce que nous surveillons',
        summary:
          "Apertus 1.5 est en ligne chez Infomaniak, et Helvetra l'utilise désormais. Ce qui s'améliore pour vos traductions, ce que nous laissons désactivé, et un premier aperçu honnête du suisse allemand : une sortie en dialecte qui fonctionne, une détection automatique qui ne fonctionne pas encore.",
        date: '2026-08-04',
      },
      {
        slug: 'why-helvetra-runs-on-infomaniak',
        title: 'Infomaniak devient une fondation: ce que cela signifie pour Helvetra',
        summary:
          "Pourquoi chaque couche de Helvetra, le site, le backend et le modèle de traduction Apertus, tourne sur Infomaniak, et ce qui a changé quand l'entreprise a confié le contrôle des votes à une fondation suisse d'intérêt public en mai 2026.",
        date: '2026-06-23',
      },
      {
        slug: 'swiss-startup-days-2026',
        title: 'Helvetra aux Swiss Startup Days 2026: l\'open source comme seule stratégie',
        summary:
          "Notes du fireside chat sur l'AI Stage à Berne, où l'équipe Apertus a embarqué Helvetra. L'open source comme seule stratégie crédible pour un petit produit suisse, pourquoi nous ne gardons rien de ce que vous tapez, et l'état honnête du suisse allemand sur Apertus aujourd'hui.",
        date: '2026-06-09',
      },
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
        slug: 'apertus-1-5-what-it-means-for-helvetra',
        title: 'Helvetra passa ad Apertus 1.5: cosa cambia e cosa stiamo osservando',
        summary:
          "Apertus 1.5 è online su Infomaniak, e Helvetra ora lo usa. Cosa migliora per le tue traduzioni, cosa lasciamo disattivato, e uno sguardo onesto al tedesco svizzero: output in dialetto che funziona, rilevamento automatico che ancora no.",
        date: '2026-08-04',
      },
      {
        slug: 'why-helvetra-runs-on-infomaniak',
        title: 'Infomaniak diventa una fondazione: cosa significa per Helvetra',
        summary:
          "Perché ogni livello di Helvetra, il sito, il backend e il modello di traduzione Apertus, gira su Infomaniak, e cosa è cambiato quando l'azienda ha affidato il controllo dei voti a una fondazione svizzera di interesse pubblico a maggio 2026.",
        date: '2026-06-23',
      },
      {
        slug: 'swiss-startup-days-2026',
        title: 'Helvetra agli Swiss Startup Days 2026: l\'open source come unica strategia',
        summary:
          "Note dal fireside chat sull'AI Stage a Berna, dove il team Apertus ha portato Helvetra. Open source come unica strategia credibile per un piccolo prodotto svizzero, perché non conserviamo nulla di ciò che digiti, e lo stato onesto del tedesco svizzero su Apertus oggi.",
        date: '2026-06-09',
      },
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
