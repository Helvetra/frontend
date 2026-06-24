<!--
  Reusable landing page for a single translation direction (e.g. English to
  Swiss German). Renders the live translator preset for the pair plus
  answer-first supporting content and an FAQ, all driven by an i18n key prefix
  so each page file is a thin config wrapper. Targets exact-match search
  queries that the generic homepage ranks too low for.
-->
<template>
  <div>
    <!-- Tool-first hero: people who land here want to translate now. -->
    <section class="pt-8 pb-10 md:pt-12 md:pb-12">
      <div class="max-w-6xl mx-auto px-4 md:px-6">
        <header class="mb-6 text-center">
          <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            {{ t(`${tkey}.h1`) }}
          </h1>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            {{ t(`${tkey}.lead`) }}
          </p>
        </header>
        <TranslationBox
          :initial-source="source"
          :initial-target="target"
          :initial-dialect="dialect"
        />
      </div>
    </section>

    <!-- Supporting content: gives the page substance to rank on and answers
         the questions LLMs and searchers ask about this direction. -->
    <article class="max-w-3xl mx-auto px-4 pb-16 md:pb-24">
      <section class="mb-10">
        <h2 class="text-2xl font-bold text-neutral-900 mb-4">
          {{ t(`${tkey}.about.title`) }}
        </h2>
        <div class="text-neutral-600 leading-relaxed space-y-4">
          <p>{{ t(`${tkey}.about.p1`) }}</p>
          <p>{{ t(`${tkey}.about.p2`) }}</p>
          <p>{{ t(`${tkey}.about.p3`) }}</p>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6">
          {{ t(`${tkey}.faq.title`) }}
        </h2>
        <div class="space-y-6">
          <div v-for="item in faqItems" :key="item.question">
            <h3 class="text-lg font-semibold text-neutral-800 mb-2">{{ item.question }}</h3>
            <p class="text-neutral-600 leading-relaxed">{{ item.answer }}</p>
          </div>
        </div>
      </section>

      <section v-if="relatedLinks.length">
        <h2 class="text-2xl font-bold text-neutral-900 mb-4">
          {{ t(`${tkey}.related.title`) }}
        </h2>
        <ul class="space-y-2">
          <li v-for="link in relatedLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-swiss-red underline underline-offset-2 decoration-2 hover:text-red-700"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
interface RelatedLink {
  label: string
  to: string
}

const props = defineProps<{
  /** Source language code preset on the translator (e.g. 'en'). */
  source: string
  /** Target language code preset on the translator (e.g. 'gsw'). */
  target: string
  /** Optional Swiss German dialect preset when target is 'gsw'. */
  dialect?: string
  /** i18n key prefix holding this page's content (e.g. 'translatePages.enToGsw'). */
  tkey: string
  /** Route slug, used to build the canonical URL (e.g. 'english-to-swiss-german'). */
  slug: string
  /** Cross-links rendered at the foot of the page. */
  relatedLinks?: RelatedLink[]
}>()

const relatedLinks = computed(() => props.relatedLinks ?? [])

const { t } = useI18n()
const localePath = useLocalePath()
const { getFAQSchema, useJsonLd } = useSchemaOrg()

const canonical = computed(() => `https://helvetra.ch${localePath(`/${props.slug}`)}`)

// FAQ content doubles as FAQPage structured data — directly citable by search
// engines and LLMs.
const faqItems = [
  { question: t(`${props.tkey}.faq.q1`), answer: t(`${props.tkey}.faq.a1`) },
  { question: t(`${props.tkey}.faq.q2`), answer: t(`${props.tkey}.faq.a2`) },
  { question: t(`${props.tkey}.faq.q3`), answer: t(`${props.tkey}.faq.a3`) },
]

useJsonLd(getFAQSchema(faqItems))

useHead({
  title: () => t(`${props.tkey}.meta.title`),
  meta: [
    { name: 'description', content: () => t(`${props.tkey}.meta.description`) },
  ],
  link: [
    { rel: 'canonical', href: canonical.value },
  ],
})

useSeoMeta({
  ogTitle: () => t(`${props.tkey}.meta.title`),
  ogDescription: () => t(`${props.tkey}.meta.description`),
  ogType: 'website',
  ogUrl: () => canonical.value,
})
</script>
