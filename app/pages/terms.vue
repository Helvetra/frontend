<!--
  Terms and conditions page.
  Covers service tiers, pricing, cancellation, data handling, and jurisdiction.
-->
<template>
  <div class="max-w-3xl mx-auto px-4 py-8 md:py-12">
    <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
      {{ $t('terms.title') }}
    </h1>

    <div class="prose prose-neutral max-w-none">
      <!-- Last updated -->
      <p class="text-sm text-neutral-500 mb-8">
        {{ $t('terms.lastUpdated') }}: 2026-01-14
      </p>

      <!-- 1. Scope -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          1. {{ $t('terms.scope.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('terms.scope.text') }}
        </p>
      </section>

      <!-- 2. Service Description -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          2. {{ $t('terms.service.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('terms.service.text') }}
        </p>
      </section>

      <!-- 3. Service Tiers -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          3. {{ $t('terms.tiers.title') }}
        </h2>
        <p class="text-neutral-600 mb-4">
          {{ $t('terms.tiers.intro') }}
        </p>
        <ul class="list-disc list-inside text-neutral-600 space-y-2">
          <li><strong>{{ $t('terms.tiers.anonymous.name') }}</strong>: {{ $t('terms.tiers.anonymous.desc') }}</li>
          <li><strong>{{ $t('terms.tiers.free.name') }}</strong>: {{ $t('terms.tiers.free.desc') }}</li>
          <li><strong>{{ $t('terms.tiers.plus.name') }}</strong>: {{ $t('terms.tiers.plus.desc') }}</li>
        </ul>
      </section>

      <!-- 4. Pricing -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          4. {{ $t('terms.pricing.title') }}
        </h2>
        <p class="text-neutral-600 mb-4">
          {{ $t('terms.pricing.text') }}
        </p>
        <ul class="list-disc list-inside text-neutral-600 space-y-2">
          <li>{{ $t('terms.pricing.yearly') }}</li>
          <li>{{ $t('terms.pricing.monthly') }}</li>
        </ul>
      </section>

      <!-- 5. Cancellation -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          5. {{ $t('terms.cancellation.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('terms.cancellation.text') }}
        </p>
      </section>

      <!-- 6. Refunds -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          6. {{ $t('terms.refunds.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('terms.refunds.text') }}
        </p>
      </section>

      <!-- 7. Data Handling -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          7. {{ $t('terms.data.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('terms.data.text') }}
        </p>
      </section>

      <!-- 8. Limitation of Liability -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          8. {{ $t('terms.liability.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('terms.liability.text') }}
        </p>
      </section>

      <!-- 9. Changes to Terms -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          9. {{ $t('terms.changes.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('terms.changes.text') }}
        </p>
      </section>

      <!-- 10. Jurisdiction -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          10. {{ $t('terms.jurisdiction.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('terms.jurisdiction.text') }}
        </p>
      </section>

      <!-- Contact -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">
          {{ $t('terms.contact.title') }}
        </h2>
        <p class="text-neutral-600">
          {{ $t('terms.contact.text') }}
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
  title: () => `${t('terms.title')} - Helvetra`,
})
</script>
