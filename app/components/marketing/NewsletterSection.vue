<!--
  Simple newsletter signup section (pre-footer).
  Integrates with Infomaniak newsletter service.
-->
<template>
  <section class="py-12 bg-[#F5F5F5] border-t border-neutral-200">
    <div class="max-w-[1200px] mx-auto px-4 md:px-8">
      <div class="max-w-xl mx-auto text-center">
        <h2 class="text-xl font-normal text-black mb-2">
          {{ $t('marketing.newsletter.title') }}
        </h2>
        <p class="text-neutral-600 mb-6">
          {{ $t('marketing.newsletter.subtitle') }}
        </p>

        <form
          class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          method="post"
          action="https://newsletter.infomaniak.com/v3/api/1/newsletters/webforms/22271/submit"
          @submit="handleSubmit"
        >
          <!-- Honeypot field -->
          <input type="email" name="email" style="display: none" tabindex="-1" autocomplete="off">
          <input type="hidden" name="key" value="eyJpdiI6IkJmTFlpMEUrdjlYU3hTUGZXTnprQmJadTluVFFLcXdMZ3BOTnV2eFhhU1E9IiwibWFjIjoiYjA0ODJlMGNkMzg3NTgxOGRlYjRjNDJiZGIwM2JkZWViNmU5MWYwMzE4MjRkZmI4MmJjZmYxNjUzMTI0YzNiZSIsInZhbHVlIjoiNEtsK0k4UE1Ka3Azd2drOHJPZ0MrYldUU0dVK0pLZzREWFFveUhKVkVmaz0ifQ==">
          <input type="hidden" name="webform_id" value="22271">

          <input
            type="email"
            name="inf[1]"
            :placeholder="$t('marketing.newsletter.placeholder')"
            required
            class="flex-1 px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-black text-base"
          >
          <button
            type="submit"
            class="px-6 py-3 bg-swiss-red text-white font-medium rounded hover:bg-red-700 transition-colors text-base whitespace-nowrap"
          >
            {{ $t('marketing.newsletter.button') }}
          </button>

          <!-- Altcha widget for spam protection -->
          <altcha-widget
            hidelogo
            hidefooter
            floating
            challengeurl="https://newsletter.infomaniak.com/v3/altcha-challenge"
          />
        </form>

        <p class="text-sm text-neutral-500 mt-4">
          {{ $t('marketing.newsletter.privacy') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Load Altcha script for spam protection
useHead({
  script: [
    {
      src: 'https://eu.altcha.org/js/latest/altcha.min.js',
      type: 'module',
      defer: true,
    },
  ],
})

function handleSubmit() {
  // Form submits natively to Infomaniak
}
</script>
