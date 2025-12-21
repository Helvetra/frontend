<!--
  Comparison page: Helvetra vs Supertext.
  Two Swiss companies with different approaches: consumer vs enterprise focus.
-->
<template>
  <div>
    <ContentArticleLayout>
      <template #title>{{ $t('compare.supertext.title') }}</template>
      <template #subtitle>{{ $t('compare.supertext.subtitle') }}</template>

      <!-- Quick Comparison Table -->
      <ContentComparisonTable
        primary-name="Helvetra"
        secondary-name="Supertext"
        primary-color="text-swiss-red"
        secondary-color="text-emerald-600"
        :rows="comparisonRows"
      />

      <!-- Introduction -->
      <ContentProseSection id="introduction">
        <template #sr-title>Introduction</template>
        <p>{{ $t('compare.supertext.intro.p1') }}</p>
        <p>{{ $t('compare.supertext.intro.p2') }}</p>
      </ContentProseSection>

      <!-- Where Supertext Wins -->
      <ContentFeatureSection
        id="supertext-wins"
        :title="$t('compare.supertext.supertextWins.title')"
        :verdict="$t('compare.supertext.supertextWins.verdict')"
        verdict-variant="secondary"
      >
        <ContentFeatureItem :title="$t('compare.supertext.supertextWins.human.title')">
          <p>{{ $t('compare.supertext.supertextWins.human.p1') }}</p>
          <p>{{ $t('compare.supertext.supertextWins.human.p2') }}</p>
        </ContentFeatureItem>

        <ContentFeatureItem :title="$t('compare.supertext.supertextWins.enterprise.title')">
          <p>{{ $t('compare.supertext.supertextWins.enterprise.p1') }}</p>
        </ContentFeatureItem>

        <ContentFeatureItem :title="$t('compare.supertext.supertextWins.languages.title')">
          <p>{{ $t('compare.supertext.supertextWins.languages.p1') }}</p>
        </ContentFeatureItem>

        <ContentFeatureItem :title="$t('compare.supertext.supertextWins.formats.title')">
          <p>{{ $t('compare.supertext.supertextWins.formats.p1') }}</p>
        </ContentFeatureItem>
      </ContentFeatureSection>

      <!-- Where Helvetra Wins -->
      <ContentFeatureSection
        id="helvetra-wins"
        :title="$t('compare.supertext.helvetraWins.title')"
        :verdict="$t('compare.supertext.helvetraWins.verdict')"
        verdict-variant="primary"
      >
        <ContentFeatureItem :title="$t('compare.supertext.helvetraWins.swissGerman.title')">
          <p>{{ $t('compare.supertext.helvetraWins.swissGerman.p1') }}</p>
          <p>{{ $t('compare.supertext.helvetraWins.swissGerman.p2') }}</p>
        </ContentFeatureItem>

        <ContentFeatureItem :title="$t('compare.supertext.helvetraWins.pricing.title')">
          <p>{{ $t('compare.supertext.helvetraWins.pricing.p1') }}</p>
          <p>{{ $t('compare.supertext.helvetraWins.pricing.p2') }}</p>
        </ContentFeatureItem>

        <ContentFeatureItem :title="$t('compare.supertext.helvetraWins.instant.title')">
          <p>{{ $t('compare.supertext.helvetraWins.instant.p1') }}</p>
        </ContentFeatureItem>

        <ContentFeatureItem :title="$t('compare.supertext.helvetraWins.simplicity.title')">
          <p>{{ $t('compare.supertext.helvetraWins.simplicity.p1') }}</p>
        </ContentFeatureItem>
      </ContentFeatureSection>

      <!-- The Swiss German Irony -->
      <section aria-labelledby="swiss-german-irony">
        <h2 id="swiss-german-irony" class="text-2xl font-bold text-neutral-900 mb-6">
          {{ $t('compare.supertext.swissGermanIrony.title') }}
        </h2>

        <div class="prose prose-neutral prose-lg max-w-none mb-8">
          <p>{{ $t('compare.supertext.swissGermanIrony.intro') }}</p>
        </div>

        <ContentInfoCards :cards="ironyCards" />

        <div class="prose prose-neutral prose-lg max-w-none mt-8">
          <p class="italic text-neutral-600">{{ $t('compare.supertext.swissGermanIrony.conclusion') }}</p>
        </div>
      </section>

      <!-- Pricing Comparison -->
      <section aria-labelledby="pricing-comparison">
        <h2 id="pricing-comparison" class="text-2xl font-bold text-neutral-900 mb-6">
          {{ $t('compare.supertext.pricingSection.title') }}
        </h2>

        <div class="prose prose-neutral prose-lg max-w-none mb-8">
          <p>{{ $t('compare.supertext.pricingSection.intro') }}</p>
        </div>

        <ContentInfoCards :cards="pricingCards" />

        <div class="prose prose-neutral prose-lg max-w-none mt-8">
          <p>{{ $t('compare.supertext.pricingSection.conclusion') }}</p>
        </div>
      </section>

      <!-- Which Should You Choose -->
      <section aria-labelledby="which-choose">
        <h2 id="which-choose" class="text-2xl font-bold text-neutral-900 mb-6">
          {{ $t('compare.supertext.useCases.title') }}
        </h2>

        <ContentChoiceCards
          :primary-title="$t('compare.supertext.useCases.chooseHelvetra.title')"
          :secondary-title="$t('compare.supertext.useCases.chooseSupertext.title')"
          :primary-points="helvetraPoints"
          :secondary-points="supertextPoints"
        />
      </section>

      <!-- Conclusion -->
      <ContentProseSection
        id="conclusion"
        :title="$t('compare.supertext.conclusion.title')"
      >
        <p>{{ $t('compare.supertext.conclusion.p1') }}</p>
        <p>{{ $t('compare.supertext.conclusion.p2') }}</p>
        <p>{{ $t('compare.supertext.conclusion.p3') }}</p>
      </ContentProseSection>

      <!-- CTA -->
      <template #cta>
        <ContentArticleCTA :to="localePath('/')">
          <template #text>{{ $t('compare.supertext.conclusion.cta') }}</template>
          <template #button>{{ $t('compare.supertext.conclusion.tryHelvetra') }}</template>
        </ContentArticleCTA>
      </template>
    </ContentArticleLayout>

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
  headline: 'Helvetra vs Supertext: Swiss Translation Comparison',
  description: 'Compare Helvetra and Supertext. Consumer-focused AI translation vs enterprise human translation services.',
  datePublished: '2024-12-18',
  dateModified: '2024-12-19',
}))

// Comparison table rows
const comparisonRows = computed(() => [
  {
    label: t('compare.supertext.table.type'),
    primaryValue: t('compare.supertext.table.helvetraType'),
    secondaryValue: t('compare.supertext.table.supertextType'),
  },
  {
    label: t('compare.supertext.table.price'),
    primaryValue: t('compare.supertext.table.helvetraPrice'),
    secondaryValue: t('compare.supertext.table.supertextPrice'),
  },
  {
    label: t('compare.supertext.table.languages'),
    primaryValue: t('compare.supertext.table.helvetraLangs'),
    secondaryValue: t('compare.supertext.table.supertextLangs'),
  },
  {
    label: t('compare.supertext.table.swissGerman'),
    primaryValue: t('compare.supertext.table.yes'),
    secondaryValue: t('compare.supertext.table.no'),
    primaryCheck: true,
    secondaryCheck: false,
  },
  {
    label: t('compare.supertext.table.humanReview'),
    primaryValue: t('compare.supertext.table.no'),
    secondaryValue: t('compare.supertext.table.yes'),
    primaryCheck: false,
    secondaryCheck: true,
  },
  {
    label: t('compare.supertext.table.bestFor'),
    primaryValue: t('compare.supertext.table.helvetraBestFor'),
    secondaryValue: t('compare.supertext.table.supertextBestFor'),
  },
])

// Swiss German irony cards
const ironyCards = computed(() => [
  {
    title: t('compare.supertext.swissGermanIrony.supertext.title'),
    points: [
      t('compare.supertext.swissGermanIrony.supertext.point1'),
      t('compare.supertext.swissGermanIrony.supertext.point2'),
      t('compare.supertext.swissGermanIrony.supertext.point3'),
    ],
    variant: 'neutral' as const,
  },
  {
    title: t('compare.supertext.swissGermanIrony.helvetra.title'),
    points: [
      t('compare.supertext.swissGermanIrony.helvetra.point1'),
      t('compare.supertext.swissGermanIrony.helvetra.point2'),
      t('compare.supertext.swissGermanIrony.helvetra.point3'),
    ],
    variant: 'positive' as const,
  },
])

// Pricing comparison cards
const pricingCards = computed(() => [
  {
    title: t('compare.supertext.pricingSection.supertextPricing.title'),
    points: [
      t('compare.supertext.pricingSection.supertextPricing.point1'),
      t('compare.supertext.pricingSection.supertextPricing.point2'),
      t('compare.supertext.pricingSection.supertextPricing.point3'),
      t('compare.supertext.pricingSection.supertextPricing.point4'),
    ],
    variant: 'neutral' as const,
  },
  {
    title: t('compare.supertext.pricingSection.helvetraPricing.title'),
    points: [
      t('compare.supertext.pricingSection.helvetraPricing.point1'),
      t('compare.supertext.pricingSection.helvetraPricing.point2'),
      t('compare.supertext.pricingSection.helvetraPricing.point3'),
    ],
    variant: 'positive' as const,
  },
])

// Choice cards points
const supertextPoints = computed(() => [
  t('compare.supertext.useCases.chooseSupertext.point1'),
  t('compare.supertext.useCases.chooseSupertext.point2'),
  t('compare.supertext.useCases.chooseSupertext.point3'),
  t('compare.supertext.useCases.chooseSupertext.point4'),
])

const helvetraPoints = computed(() => [
  t('compare.supertext.useCases.chooseHelvetra.point1'),
  t('compare.supertext.useCases.chooseHelvetra.point2'),
  t('compare.supertext.useCases.chooseHelvetra.point3'),
  t('compare.supertext.useCases.chooseHelvetra.point4'),
  t('compare.supertext.useCases.chooseHelvetra.point5'),
])

useHead({
  title: () => t('compare.supertext.meta.title'),
  meta: [
    { name: 'description', content: () => t('compare.supertext.meta.description') },
  ],
})

useSeoMeta({
  ogTitle: () => t('compare.supertext.meta.title'),
  ogDescription: () => t('compare.supertext.meta.description'),
  ogType: 'article',
})
</script>
