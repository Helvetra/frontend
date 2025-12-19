<!--
  Compare landing page: Hub for all Helvetra comparison articles.
  Dynamically generates cards from useComparisons config.
-->
<template>
  <div>
    <article class="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <!-- Header -->
      <header class="mb-10 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          {{ $t('compare.hub.title') }}
        </h1>
        <p class="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          {{ $t('compare.hub.subtitle') }}
        </p>
      </header>

      <!-- Comparison Cards (auto-generated from config) -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <NuxtLink
          v-for="item in comparisons"
          :key="item.slug"
          :to="localePath(`/compare/${item.slug}`)"
          class="group block p-6 bg-white border border-neutral-200 rounded-xl hover:border-swiss-red hover:shadow-lg transition-all"
        >
          <div class="flex items-center gap-3 mb-3">
            <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', item.bgColor]">
              <span :class="['font-bold text-lg', item.color]">{{ item.letter }}</span>
            </div>
            <h2 class="text-lg font-semibold text-neutral-900 group-hover:text-swiss-red transition-colors">
              {{ $t(`compare.hub.${item.translationKey}.title`) }}
            </h2>
          </div>
          <p class="text-neutral-600 text-sm mb-4">
            {{ $t(`compare.hub.${item.translationKey}.description`) }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded"
            >
              {{ $t(`compare.hub.tags.${tag}`) }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Why Compare Section -->
      <section class="bg-neutral-50 rounded-xl p-6 md:p-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-4">
          {{ $t('compare.hub.why.title') }}
        </h2>
        <div class="prose prose-neutral max-w-none">
          <p class="text-neutral-600">
            {{ $t('compare.hub.why.p1') }}
          </p>
          <p class="text-neutral-600">
            {{ $t('compare.hub.why.p2') }}
          </p>
        </div>
      </section>
    </article>

    <!-- Newsletter -->
    <MarketingNewsletterSection />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { comparisons } = useComparisons()

useHead({
  title: () => t('compare.hub.meta.title'),
  meta: [
    { name: 'description', content: () => t('compare.hub.meta.description') },
  ],
})

useSeoMeta({
  ogTitle: () => t('compare.hub.meta.title'),
  ogDescription: () => t('compare.hub.meta.description'),
  ogType: 'website',
})
</script>
