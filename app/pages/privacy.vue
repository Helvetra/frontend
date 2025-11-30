<!--
  Privacy policy page.
  Explains data collection, usage, and user rights.
-->
<template>
  <div class="max-w-3xl mx-auto px-4 py-8 md:py-12">
    <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
      {{ $t('privacy.title') }}
    </h1>

    <div class="prose prose-neutral max-w-none">
      <!-- Last updated -->
      <p class="text-sm text-neutral-500 mb-8">
        {{ $t('privacy.lastUpdated') }}: 2025-11-30
      </p>

      <!-- Introduction -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('privacy.intro.title') }}
        </h2>
        <p class="text-neutral-600 mb-4">
          {{ $t('privacy.intro.text') }}
        </p>
      </section>

      <!-- Data Collection -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('privacy.collection.title') }}
        </h2>
        <p class="text-neutral-600 mb-4">
          {{ $t('privacy.collection.text') }}
        </p>
        <ul class="list-disc list-inside text-neutral-600 space-y-2">
          <li>{{ $t('privacy.collection.item1') }}</li>
          <li>{{ $t('privacy.collection.item2') }}</li>
          <li>{{ $t('privacy.collection.item3') }}</li>
        </ul>
      </section>

      <!-- Data NOT Collected -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('privacy.notCollected.title') }}
        </h2>
        <p class="text-neutral-600 mb-4">
          {{ $t('privacy.notCollected.text') }}
        </p>
        <ul class="list-disc list-inside text-neutral-600 space-y-2">
          <li>{{ $t('privacy.notCollected.item1') }}</li>
          <li>{{ $t('privacy.notCollected.item2') }}</li>
          <li>{{ $t('privacy.notCollected.item3') }}</li>
          <li>{{ $t('privacy.notCollected.item4') }}</li>
        </ul>
      </section>

      <!-- Data Storage -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('privacy.storage.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('privacy.storage.text') }}
        </p>
      </section>

      <!-- Data Usage -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('privacy.usage.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('privacy.usage.text') }}
        </p>
      </section>

      <!-- Your Rights -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('privacy.rights.title') }}
        </h2>
        <p class="text-neutral-600 mb-4">
          {{ $t('privacy.rights.text') }}
        </p>
        <ul class="list-disc list-inside text-neutral-600 space-y-2">
          <li>{{ $t('privacy.rights.item1') }}</li>
          <li>{{ $t('privacy.rights.item2') }}</li>
          <li>{{ $t('privacy.rights.item3') }}</li>
        </ul>
      </section>

      <!-- Contact -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('privacy.contact.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('privacy.contact.text') }}
          <a href="mailto:gruezi@helvetra.ch" class="text-swiss-red hover:underline">
            gruezi@helvetra.ch
          </a>
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => `${t('privacy.title')} - Helvetra`,
})
</script>
