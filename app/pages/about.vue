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

      <!-- Sustainable by Design -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('about.sustainability.title') }}
        </h2>
        <p class="text-neutral-600 mb-4">
          {{ $t('about.sustainability.text1') }}
        </p>
        <p class="text-neutral-600">
          {{ $t('about.sustainability.text2') }}
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

      <!-- For developers — discovery link to the B2B API -->
      <section class="mb-8 bg-neutral-50 border border-neutral-200 rounded-xl p-5">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('about.forDevelopers.title') }}
        </h2>
        <p class="text-neutral-700 mb-3">
          {{ $t('about.forDevelopers.body') }}
        </p>
        <NuxtLink
          :to="localePath('/developers')"
          class="inline-flex items-center gap-2 text-swiss-red hover:underline font-medium"
        >
          {{ $t('about.forDevelopers.cta') }}
          <span aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: () => `${t('about.title')} - Helvetra`,
})
</script>
