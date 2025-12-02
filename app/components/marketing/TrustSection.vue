<!--
  Trust section highlighting Swiss data privacy & security.
-->
<template>
  <section class="py-24 bg-white">
    <div class="max-w-[1200px] mx-auto px-4 md:px-8">
      <div class="text-center mb-12">
        <h2 class="text-2xl font-normal text-black mb-3">
          {{ $t('marketing.trust.title') }}
        </h2>
        <p class="text-neutral-600 text-lg">
          {{ $t('marketing.trust.subtitle') }}
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 md:gap-12">
        <!-- Apertus -->
        <div class="text-center">
          <div class="w-14 h-14 mx-auto mb-5 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="8" width="32" height="32" rx="4" stroke="#DA291C" stroke-width="2"/>
              <path d="M24 16v16M16 24h16" stroke="#DA291C" stroke-width="2"/>
            </svg>
          </div>
          <h3 class="text-xl font-normal text-black mb-3">
            {{ $t('marketing.trust.apertus.title') }}
          </h3>
          <p class="text-neutral-600 leading-relaxed">
            {{ $t('marketing.trust.apertus.text') }}
          </p>
        </div>

        <!-- Infomaniak -->
        <div class="text-center">
          <div class="w-14 h-14 mx-auto mb-5 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4L4 14v16c0 10 20 14 20 14s20-4 20-14V14L24 4z" stroke="#DA291C" stroke-width="2" fill="none"/>
              <path d="M16 24l6 6 10-12" stroke="#DA291C" stroke-width="2"/>
            </svg>
          </div>
          <h3 class="text-xl font-normal text-black mb-3">
            {{ $t('marketing.trust.infomaniak.title') }}
          </h3>
          <p class="text-neutral-600 leading-relaxed">
            {{ $t('marketing.trust.infomaniak.text') }}
          </p>
        </div>

        <!-- Swiss Made -->
        <div class="text-center">
          <div class="w-14 h-14 mx-auto mb-5 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="16" stroke="#DA291C" stroke-width="2"/>
              <path d="M24 14v10l7 7" stroke="#DA291C" stroke-width="2"/>
            </svg>
          </div>
          <h3 class="text-xl font-normal text-black mb-3">
            {{ $t('marketing.trust.swiss.title') }}
          </h3>
          <p class="text-neutral-600 leading-relaxed">
            {{ $t('marketing.trust.swiss.text') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
