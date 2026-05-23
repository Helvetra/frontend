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
          From the team
        </h2>
        <NuxtLink
          :to="localePath('/news')"
          class="text-sm text-swiss-red hover:text-swiss-red-dark underline underline-offset-2 decoration-2 hover:underline-offset-4"
        >
          All news →
        </NuxtLink>
      </div>

      <NuxtLink
        :to="localePath(`/news/${latest.slug}`)"
        class="group block p-6 md:p-8 bg-white border border-neutral-200 rounded-xl hover:border-swiss-red hover:shadow-lg transition-all"
      >
        <time
          :datetime="latest.date"
          class="text-sm text-neutral-500 mb-2 block"
        >
          {{ formatDate(latest.date) }}
        </time>
        <h3 class="text-xl md:text-2xl font-semibold text-neutral-900 group-hover:text-swiss-red transition-colors mb-2">
          {{ latest.title }}
        </h3>
        <p class="text-neutral-600">
          {{ latest.summary }}
        </p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

// Keep in sync with app/pages/news/index.vue. Listed newest first; this
// component only renders the first entry (the most recent article).
// When a third article exists, consider rendering the top 2 or 3.
const latest = {
  slug: 'apertus-at-uphill-conf-2026',
  title: 'Apertus at Uphill Conf 2026: what it means for Helvetra',
  summary:
    "Notes from Imanol Schlag's keynote on the fully-open Swiss AI model behind Helvetra. Why a single PhD student took Apertus from zero to ~40% Swiss German performance in a day.",
  date: '2026-05-22',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>
