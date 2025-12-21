<!--
  Comparison page: Helvetra vs Google Translate.
  Balanced, honest comparison with rich prose content for SEO.
-->
<template>
  <div>
    <article class="max-w-4xl mx-auto px-4 py-8 md:py-12">
    <!-- Header -->
    <header class="mb-10">
      <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
        {{ $t('compare.google.title') }}
      </h1>
      <p class="text-xl text-neutral-600 leading-relaxed">
        {{ $t('compare.google.subtitle') }}
      </p>
    </header>

    <!-- Quick Comparison Table -->
    <ContentComparisonTable
      primary-name="Helvetra"
      secondary-name="Google Translate"
      primary-color="text-swiss-red"
      secondary-color="text-blue-600"
      :rows="comparisonRows"
    />

    <!-- Introduction -->
    <ContentProseSection id="introduction">
      <template #sr-title>Introduction</template>
      <p>{{ $t('compare.google.intro.p1') }}</p>
      <p>{{ $t('compare.google.intro.p2') }}</p>
    </ContentProseSection>

    <!-- Where Google Translate Wins -->
    <ContentFeatureSection
      id="google-wins"
      :title="$t('compare.google.googleWins.title')"
      :verdict="$t('compare.google.googleWins.verdict')"
      verdict-variant="secondary"
    >
      <ContentFeatureItem :title="$t('compare.google.googleWins.coverage.title')">
        <p>{{ $t('compare.google.googleWins.coverage.p1') }}</p>
        <p>{{ $t('compare.google.googleWins.coverage.p2') }}</p>
      </ContentFeatureItem>

      <ContentFeatureItem :title="$t('compare.google.googleWins.free.title')">
        <p>{{ $t('compare.google.googleWins.free.p1') }}</p>
      </ContentFeatureItem>

      <ContentFeatureItem :title="$t('compare.google.googleWins.ecosystem.title')">
        <p>{{ $t('compare.google.googleWins.ecosystem.p1') }}</p>
      </ContentFeatureItem>
    </ContentFeatureSection>

    <!-- Where Helvetra Wins -->
    <ContentFeatureSection
      id="helvetra-wins"
      :title="$t('compare.google.helvetraWins.title')"
      :verdict="$t('compare.google.helvetraWins.verdict')"
      verdict-variant="primary"
    >
      <ContentFeatureItem :title="$t('compare.google.helvetraWins.privacy.title')">
        <p>{{ $t('compare.google.helvetraWins.privacy.p1') }}</p>
        <p>{{ $t('compare.google.helvetraWins.privacy.p2') }}</p>
      </ContentFeatureItem>

      <ContentFeatureItem :title="$t('compare.google.helvetraWins.swissAi.title')">
        <p>{{ $t('compare.google.helvetraWins.swissAi.p1') }}</p>
        <p>{{ $t('compare.google.helvetraWins.swissAi.p2') }}</p>
      </ContentFeatureItem>

      <ContentFeatureItem :title="$t('compare.google.helvetraWins.swissGerman.title')">
        <p>{{ $t('compare.google.helvetraWins.swissGerman.p1') }}</p>
      </ContentFeatureItem>

      <ContentFeatureItem :title="$t('compare.google.helvetraWins.simplicity.title')">
        <p>{{ $t('compare.google.helvetraWins.simplicity.p1') }}</p>
      </ContentFeatureItem>
    </ContentFeatureSection>

    <!-- The Privacy Trade-off -->
    <section class="mb-12" aria-labelledby="privacy-tradeoff">
      <h2 id="privacy-tradeoff" class="text-2xl font-bold text-neutral-900 mb-6">
        {{ $t('compare.google.privacyTradeoff.title') }}
      </h2>

      <div class="prose prose-neutral prose-lg max-w-none mb-8">
        <p>{{ $t('compare.google.privacyTradeoff.intro') }}</p>
      </div>

      <ContentInfoCards :cards="privacyCards" />

      <div class="prose prose-neutral prose-lg max-w-none mt-8">
        <p class="italic text-neutral-600">{{ $t('compare.google.privacyTradeoff.honestTruth') }}</p>
      </div>
    </section>

    <!-- Which Should You Choose -->
    <section class="mb-12" aria-labelledby="which-choose">
      <h2 id="which-choose" class="text-2xl font-bold text-neutral-900 mb-6">
        {{ $t('compare.google.useCases.title') }}
      </h2>

      <ContentChoiceCards
        :primary-title="$t('compare.google.useCases.chooseHelvetra.title')"
        :secondary-title="$t('compare.google.useCases.chooseGoogle.title')"
        :primary-points="helvetraPoints"
        :secondary-points="googlePoints"
      />
    </section>

    <!-- Conclusion -->
    <ContentProseSection
      id="conclusion"
      :title="$t('compare.google.conclusion.title')"
    >
      <p>{{ $t('compare.google.conclusion.p1') }}</p>
      <p>{{ $t('compare.google.conclusion.p2') }}</p>
      <p>{{ $t('compare.google.conclusion.p3') }}</p>
    </ContentProseSection>

    <!-- CTA -->
    <ContentArticleCTA :to="localePath('/')">
      <template #text>{{ $t('compare.google.conclusion.cta') }}</template>
      <template #button>{{ $t('compare.google.conclusion.tryHelvetra') }}</template>
    </ContentArticleCTA>
  </article>

    <!-- Newsletter -->
    <MarketingNewsletterSection />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { getArticleSchema, useJsonLd } = useSchemaOrg()

// Add Article schema for comparison content
useJsonLd(getArticleSchema({
  headline: 'Helvetra vs Google Translate: Swiss Privacy Comparison',
  description: 'Compare Helvetra and Google Translate. Privacy-focused Swiss alternative vs global reach.',
  datePublished: '2024-12-18',
  dateModified: '2024-12-19',
}))

// Comparison table rows
const comparisonRows = computed(() => [
  {
    label: t('compare.google.table.price'),
    primaryValue: t('compare.google.table.helvetraPrice'),
    secondaryValue: t('compare.google.table.googlePrice'),
  },
  {
    label: t('compare.google.table.languages'),
    primaryValue: t('compare.google.table.helvetraLangs'),
    secondaryValue: t('compare.google.table.googleLangs'),
  },
  {
    label: t('compare.google.table.swissGerman'),
    primaryValue: t('compare.google.table.yes'),
    secondaryValue: t('compare.google.table.no'),
    primaryCheck: true,
    secondaryCheck: false,
  },
  {
    label: t('compare.google.table.dataPrivacy'),
    primaryValue: t('compare.google.table.helvetraPrivacy'),
    secondaryValue: t('compare.google.table.googlePrivacy'),
  },
  {
    label: t('compare.google.table.bestFor'),
    primaryValue: t('compare.google.table.helvetraBestFor'),
    secondaryValue: t('compare.google.table.googleBestFor'),
  },
])

// Privacy comparison cards
const privacyCards = computed(() => [
  {
    title: t('compare.google.privacyTradeoff.googleCollects.title'),
    points: [
      t('compare.google.privacyTradeoff.googleCollects.point1'),
      t('compare.google.privacyTradeoff.googleCollects.point2'),
      t('compare.google.privacyTradeoff.googleCollects.point3'),
    ],
    variant: 'neutral' as const,
  },
  {
    title: t('compare.google.privacyTradeoff.helvetraCollects.title'),
    points: [
      t('compare.google.privacyTradeoff.helvetraCollects.point1'),
      t('compare.google.privacyTradeoff.helvetraCollects.point2'),
    ],
    variant: 'positive' as const,
  },
])

// Choice cards points
const googlePoints = computed(() => [
  t('compare.google.useCases.chooseGoogle.point1'),
  t('compare.google.useCases.chooseGoogle.point2'),
  t('compare.google.useCases.chooseGoogle.point3'),
  t('compare.google.useCases.chooseGoogle.point4'),
])

const helvetraPoints = computed(() => [
  t('compare.google.useCases.chooseHelvetra.point1'),
  t('compare.google.useCases.chooseHelvetra.point2'),
  t('compare.google.useCases.chooseHelvetra.point3'),
  t('compare.google.useCases.chooseHelvetra.point4'),
  t('compare.google.useCases.chooseHelvetra.point5'),
])

useHead({
  title: () => t('compare.google.meta.title'),
  meta: [
    { name: 'description', content: () => t('compare.google.meta.description') },
  ],
})

useSeoMeta({
  ogTitle: () => t('compare.google.meta.title'),
  ogDescription: () => t('compare.google.meta.description'),
  ogType: 'article',
})
</script>
