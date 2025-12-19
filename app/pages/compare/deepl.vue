<!--
  Comparison page: Helvetra vs DeepL.
  Balanced, honest comparison acknowledging DeepL's quality while highlighting Swiss advantages.
-->
<template>
  <div>
    <ContentArticleLayout>
      <template #title>{{ $t('compare.deepl.title') }}</template>
      <template #subtitle>{{ $t('compare.deepl.subtitle') }}</template>

      <!-- Quick Comparison Table -->
      <ContentComparisonTable
        primary-name="Helvetra"
        secondary-name="DeepL"
        primary-color="text-swiss-red"
        secondary-color="text-blue-700"
        :rows="comparisonRows"
      />

      <!-- Introduction -->
      <ContentProseSection id="introduction">
        <template #sr-title>Introduction</template>
        <p>{{ $t('compare.deepl.intro.p1') }}</p>
        <p>{{ $t('compare.deepl.intro.p2') }}</p>
      </ContentProseSection>

      <!-- Where DeepL Wins -->
      <ContentFeatureSection
        id="deepl-wins"
        :title="$t('compare.deepl.deeplWins.title')"
        :verdict="$t('compare.deepl.deeplWins.verdict')"
        verdict-variant="secondary"
      >
        <ContentFeatureItem :title="$t('compare.deepl.deeplWins.quality.title')">
          <p>{{ $t('compare.deepl.deeplWins.quality.p1') }}</p>
          <p>{{ $t('compare.deepl.deeplWins.quality.p2') }}</p>
        </ContentFeatureItem>

        <ContentFeatureItem :title="$t('compare.deepl.deeplWins.documents.title')">
          <p>{{ $t('compare.deepl.deeplWins.documents.p1') }}</p>
        </ContentFeatureItem>

        <ContentFeatureItem :title="$t('compare.deepl.deeplWins.api.title')">
          <p>{{ $t('compare.deepl.deeplWins.api.p1') }}</p>
        </ContentFeatureItem>

        <ContentFeatureItem :title="$t('compare.deepl.deeplWins.languages.title')">
          <p>{{ $t('compare.deepl.deeplWins.languages.p1') }}</p>
        </ContentFeatureItem>
      </ContentFeatureSection>

      <!-- Where Helvetra Wins -->
      <ContentFeatureSection
        id="helvetra-wins"
        :title="$t('compare.deepl.helvetraWins.title')"
        :verdict="$t('compare.deepl.helvetraWins.verdict')"
        verdict-variant="primary"
      >
        <ContentFeatureItem :title="$t('compare.deepl.helvetraWins.swissGerman.title')">
          <p>{{ $t('compare.deepl.helvetraWins.swissGerman.p1') }}</p>
          <p>{{ $t('compare.deepl.helvetraWins.swissGerman.p2') }}</p>
        </ContentFeatureItem>

        <ContentFeatureItem :title="$t('compare.deepl.helvetraWins.privacy.title')">
          <p>{{ $t('compare.deepl.helvetraWins.privacy.p1') }}</p>
          <p>{{ $t('compare.deepl.helvetraWins.privacy.p2') }}</p>
        </ContentFeatureItem>

        <ContentFeatureItem :title="$t('compare.deepl.helvetraWins.pricing.title')">
          <p>{{ $t('compare.deepl.helvetraWins.pricing.p1') }}</p>
          <p>{{ $t('compare.deepl.helvetraWins.pricing.p2') }}</p>
        </ContentFeatureItem>

        <ContentFeatureItem :title="$t('compare.deepl.helvetraWins.simplicity.title')">
          <p>{{ $t('compare.deepl.helvetraWins.simplicity.p1') }}</p>
        </ContentFeatureItem>
      </ContentFeatureSection>

      <!-- The Quality Question -->
      <section aria-labelledby="quality-question">
        <h2 id="quality-question" class="text-2xl font-bold text-neutral-900 mb-6">
          {{ $t('compare.deepl.qualityQuestion.title') }}
        </h2>

        <div class="prose prose-neutral prose-lg max-w-none mb-8">
          <p>{{ $t('compare.deepl.qualityQuestion.intro') }}</p>
        </div>

        <ContentInfoCards :cards="qualityCards" />

        <div class="prose prose-neutral prose-lg max-w-none mt-8">
          <p class="italic text-neutral-600">{{ $t('compare.deepl.qualityQuestion.honestTruth') }}</p>
        </div>
      </section>

      <!-- Pricing Comparison -->
      <section aria-labelledby="pricing-comparison">
        <h2 id="pricing-comparison" class="text-2xl font-bold text-neutral-900 mb-6">
          {{ $t('compare.deepl.pricingSection.title') }}
        </h2>

        <div class="prose prose-neutral prose-lg max-w-none mb-8">
          <p>{{ $t('compare.deepl.pricingSection.intro') }}</p>
        </div>

        <ContentInfoCards :cards="pricingCards" />

        <div class="prose prose-neutral prose-lg max-w-none mt-8">
          <p>{{ $t('compare.deepl.pricingSection.conclusion') }}</p>
        </div>
      </section>

      <!-- Which Should You Choose -->
      <section aria-labelledby="which-choose">
        <h2 id="which-choose" class="text-2xl font-bold text-neutral-900 mb-6">
          {{ $t('compare.deepl.useCases.title') }}
        </h2>

        <ContentChoiceCards
          :primary-title="$t('compare.deepl.useCases.chooseHelvetra.title')"
          :secondary-title="$t('compare.deepl.useCases.chooseDeepL.title')"
          :primary-points="helvetraPoints"
          :secondary-points="deeplPoints"
        />
      </section>

      <!-- Conclusion -->
      <ContentProseSection
        id="conclusion"
        :title="$t('compare.deepl.conclusion.title')"
      >
        <p>{{ $t('compare.deepl.conclusion.p1') }}</p>
        <p>{{ $t('compare.deepl.conclusion.p2') }}</p>
        <p>{{ $t('compare.deepl.conclusion.p3') }}</p>
      </ContentProseSection>

      <!-- CTA -->
      <template #cta>
        <ContentArticleCTA :to="localePath('/')">
          <template #text>{{ $t('compare.deepl.conclusion.cta') }}</template>
          <template #button>{{ $t('compare.deepl.conclusion.tryHelvetra') }}</template>
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

// Comparison table rows
const comparisonRows = computed(() => [
  {
    label: t('compare.deepl.table.price'),
    primaryValue: t('compare.deepl.table.helvetraPrice'),
    secondaryValue: t('compare.deepl.table.deeplPrice'),
  },
  {
    label: t('compare.deepl.table.freeTier'),
    primaryValue: t('compare.deepl.table.helvetraFree'),
    secondaryValue: t('compare.deepl.table.deeplFree'),
  },
  {
    label: t('compare.deepl.table.languages'),
    primaryValue: t('compare.deepl.table.helvetraLangs'),
    secondaryValue: t('compare.deepl.table.deeplLangs'),
  },
  {
    label: t('compare.deepl.table.swissGerman'),
    primaryValue: t('compare.deepl.table.yes'),
    secondaryValue: t('compare.deepl.table.no'),
    primaryCheck: true,
    secondaryCheck: false,
  },
  {
    label: t('compare.deepl.table.dataLocation'),
    primaryValue: t('compare.deepl.table.helvetraData'),
    secondaryValue: t('compare.deepl.table.deeplData'),
  },
  {
    label: t('compare.deepl.table.bestFor'),
    primaryValue: t('compare.deepl.table.helvetraBestFor'),
    secondaryValue: t('compare.deepl.table.deeplBestFor'),
  },
])

// Quality comparison cards
const qualityCards = computed(() => [
  {
    title: t('compare.deepl.qualityQuestion.deeplQuality.title'),
    points: [
      t('compare.deepl.qualityQuestion.deeplQuality.point1'),
      t('compare.deepl.qualityQuestion.deeplQuality.point2'),
      t('compare.deepl.qualityQuestion.deeplQuality.point3'),
    ],
    variant: 'neutral' as const,
  },
  {
    title: t('compare.deepl.qualityQuestion.helvetraQuality.title'),
    points: [
      t('compare.deepl.qualityQuestion.helvetraQuality.point1'),
      t('compare.deepl.qualityQuestion.helvetraQuality.point2'),
      t('compare.deepl.qualityQuestion.helvetraQuality.point3'),
    ],
    variant: 'positive' as const,
  },
])

// Pricing comparison cards
const pricingCards = computed(() => [
  {
    title: t('compare.deepl.pricingSection.deeplPricing.title'),
    points: [
      t('compare.deepl.pricingSection.deeplPricing.point1'),
      t('compare.deepl.pricingSection.deeplPricing.point2'),
      t('compare.deepl.pricingSection.deeplPricing.point3'),
      t('compare.deepl.pricingSection.deeplPricing.point4'),
    ],
    variant: 'neutral' as const,
  },
  {
    title: t('compare.deepl.pricingSection.helvetraPricing.title'),
    points: [
      t('compare.deepl.pricingSection.helvetraPricing.point1'),
      t('compare.deepl.pricingSection.helvetraPricing.point2'),
      t('compare.deepl.pricingSection.helvetraPricing.point3'),
    ],
    variant: 'positive' as const,
  },
])

// Choice cards points
const deeplPoints = computed(() => [
  t('compare.deepl.useCases.chooseDeepL.point1'),
  t('compare.deepl.useCases.chooseDeepL.point2'),
  t('compare.deepl.useCases.chooseDeepL.point3'),
  t('compare.deepl.useCases.chooseDeepL.point4'),
])

const helvetraPoints = computed(() => [
  t('compare.deepl.useCases.chooseHelvetra.point1'),
  t('compare.deepl.useCases.chooseHelvetra.point2'),
  t('compare.deepl.useCases.chooseHelvetra.point3'),
  t('compare.deepl.useCases.chooseHelvetra.point4'),
  t('compare.deepl.useCases.chooseHelvetra.point5'),
])

useHead({
  title: () => t('compare.deepl.meta.title'),
  meta: [
    { name: 'description', content: () => t('compare.deepl.meta.description') },
  ],
})

useSeoMeta({
  ogTitle: () => t('compare.deepl.meta.title'),
  ogDescription: () => t('compare.deepl.meta.description'),
  ogType: 'article',
})
</script>
