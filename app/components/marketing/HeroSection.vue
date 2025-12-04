<!--
  Hero section with tagline and live TranslationBox.
  The TranslationBox replaces the static mockup from the marketing site.
-->
<template>
  <section class="py-16">
    <div class="max-w-[1200px] mx-auto px-4 md:px-8">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <!-- Left: Tagline -->
        <div class="text-center md:text-left">
          <h1 class="text-[3.5rem] leading-tight font-normal text-black mb-6">
            {{ $t('marketing.hero.titleStart') }} <em class="italic">{{ $t('marketing.hero.titleEmphasis') }}</em> {{ $t('marketing.hero.titleEnd') }}
          </h1>
          <p class="text-lg text-neutral-600 max-w-md mx-auto md:mx-0">
            {{ $t('marketing.hero.subtitle') }}
          </p>
        </div>

        <!-- Right: Live TranslationBox -->
        <div class="w-full max-w-lg mx-auto md:mx-0 md:ml-auto">
          <TranslationBox />
        </div>
      </div>
    </div>
  </section>
</template>
