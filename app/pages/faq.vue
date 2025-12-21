<!--
  Dedicated FAQ page with categorized questions and schema markup.
-->
<template>
  <div class="max-w-4xl mx-auto px-4 py-8 md:py-12">
    <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
      {{ $t('faqPage.title') }}
    </h1>
    <p class="text-neutral-600 mb-8">
      {{ $t('faqPage.subtitle') }}
    </p>

    <!-- Category navigation -->
    <div class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="category in categories"
        :key="category.id"
        type="button"
        class="px-4 py-2 rounded-full text-sm transition-colors"
        :class="activeCategory === category.id
          ? 'bg-swiss-red text-white'
          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'"
        @click="activeCategory = category.id"
      >
        {{ $t(`faqPage.categories.${category.id}`) }}
      </button>
    </div>

    <!-- FAQ accordion -->
    <div class="space-y-0">
      <div
        v-for="item in filteredFaqs"
        :key="item.key"
        class="border-b border-neutral-200"
      >
        <button
          type="button"
          class="w-full py-6 text-left flex items-center justify-between gap-4 text-black hover:text-swiss-red transition-colors"
          @click="toggleItem(item.key)"
        >
          <span class="font-medium">{{ $t(`marketing.faq.items.${item.key}.q`) }}</span>
          <svg
            class="w-5 h-5 flex-shrink-0 transition-transform duration-300"
            :class="{ 'rotate-45': openKey === item.key }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <div
          class="overflow-hidden transition-all duration-300"
          :class="openKey === item.key ? 'max-h-96 pb-6' : 'max-h-0'"
        >
          <p
            class="text-neutral-600 leading-relaxed"
            v-html="$t(`marketing.faq.items.${item.key}.a`)"
          />
        </div>
      </div>
    </div>

    <!-- Show all link when filtered -->
    <div v-if="activeCategory !== 'all'" class="mt-8 text-center">
      <button
        type="button"
        class="text-swiss-red hover:underline"
        @click="activeCategory = 'all'"
      >
        {{ $t('faqPage.showAll') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { getFAQSchema, useJsonLd } = useSchemaOrg()

const openKey = ref<string | null>(null)
const activeCategory = ref('all')

const categories = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'privacy', label: 'Privacy & Security' },
  { id: 'languages', label: 'Languages & Dialects' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'technical', label: 'Technical' },
]

const allFaqs = [
  // General
  { key: 'different', category: 'general' },
  { key: 'free', category: 'general' },
  { key: 'mobile', category: 'general' },
  { key: 'contribute', category: 'general' },
  // Privacy
  { key: 'dataStorage', category: 'privacy' },
  { key: 'dataTraining', category: 'privacy' },
  // Languages
  { key: 'languages', category: 'languages' },
  { key: 'swissGerman', category: 'languages' },
  { key: 'accuracy', category: 'languages' },
  { key: 'dialects', category: 'languages' },
  { key: 'vsGoogle', category: 'languages' },
  { key: 'formality', category: 'languages' },
  // Pricing
  // (free is already in general)
  // Technical
  { key: 'apertus', category: 'technical' },
  { key: 'infomaniak', category: 'technical' },
  { key: 'api', category: 'technical' },
]

const filteredFaqs = computed(() => {
  if (activeCategory.value === 'all') return allFaqs
  return allFaqs.filter(faq => faq.category === activeCategory.value)
})

// Generate FAQ schema from all translated content
const faqSchemaItems = computed(() =>
  allFaqs.map(item => ({
    question: t(`marketing.faq.items.${item.key}.q`),
    answer: t(`marketing.faq.items.${item.key}.a`).replace(/<[^>]*>/g, ''),
  }))
)

useJsonLd(getFAQSchema(faqSchemaItems.value))

function toggleItem(key: string) {
  openKey.value = openKey.value === key ? null : key
}

useHead({
  title: () => `${t('faqPage.title')} - Helvetra`,
  meta: [
    {
      name: 'description',
      content: () => t('faqPage.subtitle'),
    },
  ],
})
</script>
