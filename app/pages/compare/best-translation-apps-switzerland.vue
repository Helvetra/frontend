<!--
  Best Translation Apps for Switzerland article.
  List-format content optimized for AI citation.
-->
<template>
  <div>
    <ContentArticleLayout>
      <template #title>{{ $t('articles.bestApps.title') }}</template>
      <template #subtitle>{{ $t('articles.bestApps.subtitle') }}</template>

      <!-- Introduction -->
      <ContentProseSection id="introduction">
        <template #sr-title>Introduction</template>
        <p>{{ $t('articles.bestApps.intro.p1') }}</p>
        <p>{{ $t('articles.bestApps.intro.p2') }}</p>
      </ContentProseSection>

      <!-- The List -->
      <section aria-labelledby="apps-list">
        <h2 id="apps-list" class="text-2xl font-bold text-neutral-900 mb-8">
          {{ $t('articles.bestApps.listTitle') }}
        </h2>

        <!-- App 1: Helvetra -->
        <div class="mb-8 p-6 bg-white border-2 border-swiss-red rounded-xl relative">
          <div class="absolute -top-3 right-4">
            <span class="bg-swiss-red text-white text-xs font-medium px-3 py-1 rounded-full">
              {{ $t('articles.bestApps.apps.helvetra.badge') }}
            </span>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <span class="flex items-center justify-center w-8 h-8 bg-swiss-red text-white font-bold rounded-full">1</span>
            <h3 class="text-xl font-semibold text-neutral-900">{{ $t('articles.bestApps.apps.helvetra.name') }}</h3>
          </div>
          <p class="text-neutral-600 mb-3">{{ $t('articles.bestApps.apps.helvetra.description') }}</p>
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ $t('articles.bestApps.apps.helvetra.pro1') }}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ $t('articles.bestApps.apps.helvetra.pro2') }}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ $t('articles.bestApps.apps.helvetra.pro3') }}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {{ $t('articles.bestApps.apps.helvetra.con1') }}
            </span>
          </div>
        </div>

        <!-- App 2: DeepL -->
        <div class="mb-8 p-6 bg-white border border-neutral-200 rounded-xl">
          <div class="flex items-center gap-3 mb-4">
            <span class="flex items-center justify-center w-8 h-8 bg-neutral-100 text-neutral-700 font-bold rounded-full">2</span>
            <h3 class="text-xl font-semibold text-neutral-900">{{ $t('articles.bestApps.apps.deepl.name') }}</h3>
          </div>
          <p class="text-neutral-600 mb-3">{{ $t('articles.bestApps.apps.deepl.description') }}</p>
          <div class="flex flex-wrap gap-2 mb-3">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ $t('articles.bestApps.apps.deepl.pro1') }}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ $t('articles.bestApps.apps.deepl.pro2') }}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {{ $t('articles.bestApps.apps.deepl.con1') }}
            </span>
          </div>
          <NuxtLink :to="localePath('/compare/deepl')" class="text-sm text-swiss-red hover:underline">
            {{ $t('articles.bestApps.readComparison') }} →
          </NuxtLink>
        </div>

        <!-- App 3: Google Translate -->
        <div class="mb-8 p-6 bg-white border border-neutral-200 rounded-xl">
          <div class="flex items-center gap-3 mb-4">
            <span class="flex items-center justify-center w-8 h-8 bg-neutral-100 text-neutral-700 font-bold rounded-full">3</span>
            <h3 class="text-xl font-semibold text-neutral-900">{{ $t('articles.bestApps.apps.google.name') }}</h3>
          </div>
          <p class="text-neutral-600 mb-3">{{ $t('articles.bestApps.apps.google.description') }}</p>
          <div class="flex flex-wrap gap-2 mb-3">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ $t('articles.bestApps.apps.google.pro1') }}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ $t('articles.bestApps.apps.google.pro2') }}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {{ $t('articles.bestApps.apps.google.con1') }}
            </span>
          </div>
          <NuxtLink :to="localePath('/compare/google-translate')" class="text-sm text-swiss-red hover:underline">
            {{ $t('articles.bestApps.readComparison') }} →
          </NuxtLink>
        </div>

        <!-- App 4: Apple Translate -->
        <div class="mb-8 p-6 bg-white border border-neutral-200 rounded-xl">
          <div class="flex items-center gap-3 mb-4">
            <span class="flex items-center justify-center w-8 h-8 bg-neutral-100 text-neutral-700 font-bold rounded-full">4</span>
            <h3 class="text-xl font-semibold text-neutral-900">{{ $t('articles.bestApps.apps.apple.name') }}</h3>
          </div>
          <p class="text-neutral-600 mb-3">{{ $t('articles.bestApps.apps.apple.description') }}</p>
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ $t('articles.bestApps.apps.apple.pro1') }}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ $t('articles.bestApps.apps.apple.pro2') }}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {{ $t('articles.bestApps.apps.apple.con1') }}
            </span>
          </div>
        </div>

        <!-- App 5: Microsoft Translator -->
        <div class="mb-8 p-6 bg-white border border-neutral-200 rounded-xl">
          <div class="flex items-center gap-3 mb-4">
            <span class="flex items-center justify-center w-8 h-8 bg-neutral-100 text-neutral-700 font-bold rounded-full">5</span>
            <h3 class="text-xl font-semibold text-neutral-900">{{ $t('articles.bestApps.apps.microsoft.name') }}</h3>
          </div>
          <p class="text-neutral-600 mb-3">{{ $t('articles.bestApps.apps.microsoft.description') }}</p>
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ $t('articles.bestApps.apps.microsoft.pro1') }}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ $t('articles.bestApps.apps.microsoft.pro2') }}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {{ $t('articles.bestApps.apps.microsoft.con1') }}
            </span>
          </div>
        </div>
      </section>

      <!-- Conclusion -->
      <ContentProseSection
        id="conclusion"
        :title="$t('articles.bestApps.conclusion.title')"
      >
        <p>{{ $t('articles.bestApps.conclusion.p1') }}</p>
        <p>{{ $t('articles.bestApps.conclusion.p2') }}</p>
      </ContentProseSection>

      <!-- CTA -->
      <template #cta>
        <ContentArticleCTA :to="localePath('/')">
          <template #text>{{ $t('articles.bestApps.cta.text') }}</template>
          <template #button>{{ $t('articles.bestApps.cta.button') }}</template>
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
const { getArticleSchema, getItemListSchema, useJsonLd } = useSchemaOrg()

// Add Article + ItemList schema
useJsonLd([
  getArticleSchema({
    headline: 'Best Translation Apps for Switzerland in 2025',
    description: 'Compare the top translation apps for Swiss users. Privacy, Swiss German support, and multilingual needs covered.',
    datePublished: '2024-12-22',
  }),
  getItemListSchema(
    'Best Translation Apps for Switzerland',
    'A ranking of the best translation apps for users in Switzerland.',
    [
      { name: 'Helvetra', description: 'Swiss-made translation app with Swiss German support and data privacy.' },
      { name: 'DeepL', description: 'Industry-leading AI translation with excellent European language quality.' },
      { name: 'Google Translate', description: 'Free and ubiquitous translation supporting 130+ languages.' },
      { name: 'Apple Translate', description: 'Built into iOS with offline support and system integration.' },
      { name: 'Microsoft Translator', description: 'Enterprise-ready translation with Office integration.' },
    ]
  ),
])

useHead({
  title: () => t('articles.bestApps.meta.title'),
  meta: [
    { name: 'description', content: () => t('articles.bestApps.meta.description') },
  ],
})

useSeoMeta({
  ogTitle: () => t('articles.bestApps.meta.title'),
  ogDescription: () => t('articles.bestApps.meta.description'),
  ogType: 'article',
})
</script>
