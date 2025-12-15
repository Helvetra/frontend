<!--
  Legal notice (Impressum) page.
  Required for Swiss websites, displays responsible person and contact info.
-->
<template>
  <div class="max-w-3xl mx-auto px-4 py-8 md:py-12">
    <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
      {{ $t('impressum.title') }}
    </h1>

    <div class="prose prose-neutral max-w-none">
      <!-- Responsible Person -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('impressum.responsible.title') }}
        </h2>
        <p class="text-neutral-600">Alex Margot</p>
        <p class="text-neutral-600">Königweg</p>
        <p class="text-neutral-600">3006 Bern</p>
        <p class="text-neutral-600">{{ $t('impressum.responsible.country') }}</p>
      </section>

      <!-- Contact -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('impressum.contact.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('impressum.contact.email') }}:
          <a href="mailto:gruezi@helvetra.ch" class="text-swiss-red hover:underline">
            gruezi@helvetra.ch
          </a>
        </p>
      </section>

      <!-- Disclaimer -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('impressum.disclaimer.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('impressum.disclaimer.text') }}
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => `${t('impressum.title')} - Helvetra`,
  robots: 'noindex, nofollow',
})
</script>
