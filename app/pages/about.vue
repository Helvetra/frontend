<!--
  About page explaining Helvetra's mission, technology, and values.
-->
<template>
  <div class="max-w-3xl mx-auto px-4 py-8 md:py-12">
    <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
      {{ $t('about.title') }}
    </h1>

    <div class="prose prose-neutral max-w-none">
      <!-- Our Mission -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('about.mission.title') }}
        </h2>
        <p class="text-neutral-600 mb-4">
          {{ $t('about.mission.text1') }}
        </p>
        <p class="text-neutral-600">
          {{ $t('about.mission.text2') }}
        </p>
      </section>

      <!-- Swiss Technology -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('about.technology.title') }}
        </h2>
        <p class="text-neutral-600 mb-4">
          {{ $t('about.technology.text1') }}
        </p>
        <p class="text-neutral-600">
          {{ $t('about.technology.text2') }}
        </p>
      </section>

      <!-- Privacy by Design -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('about.privacy.title') }}
        </h2>
        <p class="text-neutral-600 mb-4">
          {{ $t('about.privacy.text1') }}
        </p>
        <p class="text-neutral-600">
          {{ $t('about.privacy.text2') }}
        </p>
      </section>

      <!-- Independent & Transparent -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('about.independence.title') }}
        </h2>
        <p class="text-neutral-600 mb-4">
          {{ $t('about.independence.text1') }}
        </p>
        <p class="text-neutral-600">
          {{ $t('about.independence.text2') }}
        </p>
      </section>

      <!-- Built for Switzerland -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('about.vision.title') }}
        </h2>
        <p class="text-neutral-600 mb-4">
          {{ $t('about.vision.text1') }}
        </p>
        <p class="text-neutral-600" v-html="$t('about.vision.text2')" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => `${t('about.title')} - Helvetra`,
})
</script>
