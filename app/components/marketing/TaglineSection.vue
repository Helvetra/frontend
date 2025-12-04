<!--
  Main tagline section displayed below the translator.
  Contains the app title with emphasis and subtitle on white background.
-->
<template>
  <section class="pt-12 pb-8 md:pt-16 md:pb-12 bg-white">
    <div class="max-w-4xl mx-auto px-4 md:px-8 text-center">
      <h1 class="text-4xl md:text-6xl leading-tight font-normal text-black mb-4">
        {{ $t('marketing.hero.titleStart') }} <em class="italic">{{ $t('marketing.hero.titleEmphasis') }}</em> {{ $t('marketing.hero.titleEnd') }}
      </h1>
      <p class="text-base md:text-lg text-neutral-600 max-w-lg mx-auto">
        {{ $t('marketing.hero.subtitle') }}
      </p>
    </div>
  </section>
</template>
