<!--
  Home page with marketing sections and live translation interface.
  TranslationBox is the hero element.
-->
<template>
  <div>
    <!-- Newsletter confirmation banner (matches original website design) -->
    <Transition name="confirm-banner">
      <div
        v-if="showConfirmationBanner"
        class="confirm-banner-wrapper"
      >
        <div class="confirm-banner">
          <span>{{ $t('marketing.newsletter.confirmed') }}</span>
          <button class="confirm-banner-close" @click="closeBanner">&times;</button>
        </div>
      </div>
    </Transition>
    <MarketingHeroSection />
    <MarketingTaglineSection />
    <MarketingTrustSection />
    <MarketingFeaturesSection />
    <MarketingLanguagesSection />
    <MarketingFaqSection />
    <MarketingNewsletterSection />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

// Newsletter confirmation banner
const showConfirmationBanner = ref(false)

function closeBanner() {
  showConfirmationBanner.value = false
}

onMounted(() => {
  if (route.query.confirmed !== undefined) {
    showConfirmationBanner.value = true
    // Remove query param from URL without reload
    history.replaceState({}, '', window.location.pathname)
    // Auto-close after 5 seconds
    setTimeout(closeBanner, 5000)
  }
})

useHead({
  title: t('meta.title'),
  meta: [
    {
      name: 'description',
      content: t('meta.description'),
    },
  ],
})
</script>
