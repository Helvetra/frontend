<!--
  About page with transparency sections about Helvetra.
-->
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <main class="flex-1 py-16 md:py-24">
      <div class="max-w-[800px] mx-auto px-4 md:px-8">
        <h1 class="text-[2.5rem] font-normal text-black mb-12">
          {{ $t('about.title') }}
        </h1>

        <!-- No Pretensions -->
        <section class="mb-12">
          <h2 class="text-xl font-medium text-black mb-4">
            {{ $t('about.pretensions.title') }}
          </h2>
          <p class="text-neutral-600 leading-relaxed mb-4">
            {{ $t('about.pretensions.text1') }}
          </p>
          <p class="text-neutral-600 leading-relaxed">
            {{ $t('about.pretensions.text2') }}
          </p>
        </section>

        <!-- Swiss-Made, AI-Powered -->
        <section class="mb-12">
          <h2 class="text-xl font-medium text-black mb-4">
            {{ $t('about.swiss.title') }}
          </h2>
          <p class="text-neutral-600 leading-relaxed mb-4">
            {{ $t('about.swiss.text1') }}
          </p>
          <p class="text-neutral-600 leading-relaxed">
            {{ $t('about.swiss.text2') }}
          </p>
        </section>

        <!-- We Don't Control the Output -->
        <section class="mb-12">
          <h2 class="text-xl font-medium text-black mb-4">
            {{ $t('about.output.title') }}
          </h2>
          <p class="text-neutral-600 leading-relaxed mb-4">
            {{ $t('about.output.text1') }}
          </p>
          <p class="text-neutral-600 leading-relaxed">
            {{ $t('about.output.text2') }}
            <a href="mailto:gruezi@helvetra.ch" class="text-swiss-red hover:underline">
              {{ $t('about.output.tellUs') }}
            </a>
          </p>
        </section>

        <!-- Where the Money Goes -->
        <section class="mb-12">
          <h2 class="text-xl font-medium text-black mb-4">
            {{ $t('about.money.title') }}
          </h2>
          <p class="text-neutral-600 leading-relaxed">
            {{ $t('about.money.text') }}
          </p>
        </section>

        <!-- A Fun Project -->
        <section class="mb-12">
          <h2 class="text-xl font-medium text-black mb-4">
            {{ $t('about.fun.title') }}
          </h2>
          <p class="text-neutral-600 leading-relaxed mb-4">
            {{ $t('about.fun.text1') }}
          </p>
          <p class="text-neutral-600 leading-relaxed">
            {{ $t('about.fun.text2') }}
          </p>
        </section>

        <!-- Back link -->
        <NuxtLink
          :to="localePath('/')"
          class="inline-flex items-center gap-2 text-swiss-red hover:underline"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {{ $t('about.backLink') }}
        </NuxtLink>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

useHead({
  title: 'About — Helvetra',
  meta: [
    { name: 'description', content: 'What Helvetra is about: a small Swiss experiment in translation, powered by Swiss AI.' },
  ],
})
</script>
