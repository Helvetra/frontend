<!--
  Support page for app users.
  Provides contact info and links to FAQ.
-->
<template>
  <div class="max-w-3xl mx-auto px-4 py-8 md:py-12">
    <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
      {{ $t('support.title') }}
    </h1>
    <p class="text-neutral-600 mb-8">
      {{ $t('support.subtitle') }}
    </p>

    <!-- Contact Section -->
    <section class="mb-10 p-6 bg-neutral-50 rounded-xl">
      <h2 class="text-xl font-semibold text-neutral-900 mb-3">
        {{ $t('support.contact.title') }}
      </h2>
      <p class="text-neutral-600 mb-4">
        {{ $t('support.contact.text') }}
      </p>
      <a
        href="mailto:gruezi@helvetra.ch?subject=Helvetra%20Support"
        class="inline-flex items-center gap-2 px-5 py-3 bg-swiss-red text-white rounded-lg hover:bg-swiss-red-dark transition-colors"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        gruezi@helvetra.ch
      </a>
    </section>

    <!-- Quick Help -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold text-neutral-900 mb-4">
        {{ $t('support.quickHelp.title') }}
      </h2>
      <div class="space-y-4">
        <div
          v-for="item in quickHelpItems"
          :key="item.key"
          class="border-b border-neutral-200 pb-4"
        >
          <button
            type="button"
            class="w-full text-left flex items-center justify-between gap-4 text-black hover:text-swiss-red transition-colors"
            @click="toggleItem(item.key)"
          >
            <span class="font-medium">{{ $t(`support.quickHelp.items.${item.key}.q`) }}</span>
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
            :class="openKey === item.key ? 'max-h-96 pt-3' : 'max-h-0'"
          >
            <p
              class="text-neutral-600 leading-relaxed"
              v-html="$t(`support.quickHelp.items.${item.key}.a`)"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Link -->
    <section class="p-6 bg-neutral-50 rounded-xl">
      <h2 class="text-xl font-semibold text-neutral-900 mb-3">
        {{ $t('support.faq.title') }}
      </h2>
      <p class="text-neutral-600 mb-4">
        {{ $t('support.faq.text') }}
      </p>
      <NuxtLink
        to="/faq"
        class="inline-flex items-center gap-2 text-swiss-red hover:underline font-medium"
      >
        {{ $t('support.faq.link') }}
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const openKey = ref<string | null>(null)

const quickHelpItems = [
  { key: 'upgrade' },
  { key: 'language' },
  { key: 'dialect' },
  { key: 'account' },
  { key: 'restore' },
]

function toggleItem(key: string) {
  openKey.value = openKey.value === key ? null : key
}

useHead({
  title: () => `${t('support.title')} - Helvetra`,
  meta: [
    {
      name: 'description',
      content: () => t('support.subtitle'),
    },
  ],
})
</script>
