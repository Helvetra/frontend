<!--
  Permanent section promoting the Helvetra iOS app.
  Displayed between LanguagesSection and FaqSection on the homepage.
-->
<template>
  <section class="py-24 bg-neutral-50">
    <div class="max-w-[1200px] mx-auto px-4 md:px-8">
      <div class="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-3xl mx-auto">
        <img
          src="/img/app-icon.png"
          alt="Helvetra"
          width="160"
          height="160"
          class="w-32 h-32 md:w-40 md:h-40 rounded-[28px] shadow-lg flex-shrink-0"
        >

        <div class="text-center md:text-left">
          <h2 class="text-2xl font-normal text-black mb-3">
            {{ $t('marketing.app.title') }}
          </h2>
          <p class="text-neutral-600 leading-relaxed mb-6">
            {{ $t('marketing.app.text') }}
          </p>
          <a
            href="https://apps.apple.com/ch/app/helvetra-swiss-translator/id6755720087"
            target="_blank"
            rel="noopener"
          >
            <img
              src="/img/app-store-badge.svg"
              :alt="$t('marketing.app.downloadAlt')"
              width="120"
              height="40"
              class="h-10 inline-block"
            >
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
