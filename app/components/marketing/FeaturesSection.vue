<!--
  Features section with numbered items: Focus, Simplicity, Privacy.
-->
<template>
  <section class="py-24 bg-neutral-50">
    <div class="max-w-[1200px] mx-auto px-4 md:px-8">
      <div class="grid md:grid-cols-3 gap-8 md:gap-12">
        <!-- Focus -->
        <div>
          <div class="text-xs text-swiss-red font-medium tracking-[0.05em] uppercase mb-4">01</div>
          <h3 class="text-xl font-normal text-black mb-3">
            {{ $t('marketing.features.focus.title') }}
          </h3>
          <p class="text-neutral-600 leading-relaxed">
            {{ $t('marketing.features.focus.text') }}
          </p>
        </div>

        <!-- Simplicity -->
        <div>
          <div class="text-xs text-swiss-red font-medium tracking-[0.05em] uppercase mb-4">02</div>
          <h3 class="text-xl font-normal text-black mb-3">
            {{ $t('marketing.features.simplicity.title') }}
          </h3>
          <p class="text-neutral-600 leading-relaxed">
            {{ $t('marketing.features.simplicity.text') }}
          </p>
        </div>

        <!-- Privacy -->
        <div>
          <div class="text-xs text-swiss-red font-medium tracking-[0.05em] uppercase mb-4">03</div>
          <h3 class="text-xl font-normal text-black mb-3">
            {{ $t('marketing.features.privacy.title') }}
          </h3>
          <p class="text-neutral-600 leading-relaxed">
            {{ $t('marketing.features.privacy.text') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
