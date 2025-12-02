<!--
  FAQ accordion section.
-->
<template>
  <section class="py-24 bg-white border-t border-neutral-100">
    <div class="max-w-[1200px] mx-auto px-4 md:px-8">
      <h2 class="text-2xl font-normal text-black text-center mb-12">
        {{ $t('marketing.faq.title') }}
      </h2>

      <div class="max-w-3xl mx-auto">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="border-b border-neutral-200"
        >
          <button
            type="button"
            class="w-full py-6 text-left flex items-center justify-between gap-4 text-black hover:text-swiss-red transition-colors"
            @click="toggleItem(index)"
          >
            <span class="font-medium">{{ $t(`marketing.faq.items.${item.key}.q`) }}</span>
            <svg
              class="w-5 h-5 flex-shrink-0 transition-transform duration-300"
              :class="{ 'rotate-45': openIndex === index }"
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
            :class="openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'"
          >
            <p
              class="text-neutral-600 leading-relaxed"
              v-html="$t(`marketing.faq.items.${item.key}.a`)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const openIndex = ref<number | null>(null)

const faqItems = [
  { key: 'languages' },
  { key: 'dataStorage' },
  { key: 'free' },
  { key: 'different' },
  { key: 'swissGerman' },
  { key: 'dataTraining' },
  { key: 'apertus' },
  { key: 'infomaniak' },
  { key: 'api' },
  { key: 'contribute' },
]

function toggleItem(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>
