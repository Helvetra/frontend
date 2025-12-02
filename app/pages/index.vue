<!--
  Home page with marketing sections and live translation interface.
  TranslationBox is the hero element.
-->
<template>
  <div>
    <MarketingHeroSection />
    <MarketingTrustSection />
    <MarketingFeaturesSection />
    <MarketingLanguagesSection />
    <MarketingFaqSection />
    <MarketingNewsletterSection />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: 'Helvetra - The very Swiss translation app',
  meta: [
    {
      name: 'description',
      content: 'A simple, private translation app built in Switzerland. Swiss German, French, German, Italian, English. Your words stay in Switzerland.',
    },
  ],
})

// Schema.org structured data for SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://helvetra.ch/#organization',
            name: 'Helvetra',
            url: 'https://helvetra.ch',
            logo: 'https://helvetra.ch/img/logo.svg',
            foundingLocation: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bern',
                addressCountry: 'CH',
              },
            },
            description: 'A simple, private translation app built in Switzerland. Swiss German, French, German, Italian, English. Your words stay in Switzerland.',
            sameAs: [
              'https://x.com/helvetra',
              'https://instagram.com/helvetra.ch',
            ],
          },
          {
            '@type': 'SoftwareApplication',
            '@id': 'https://helvetra.ch/#app',
            name: 'Helvetra',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web',
            description: 'A simple, private translation app built in Switzerland. Swiss German, French, German, Italian, English. Your words stay in Switzerland.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'CHF',
            },
            provider: {
              '@id': 'https://helvetra.ch/#organization',
            },
            featureList: [
              'Swiss German translation',
              'French translation',
              'German translation',
              'Italian translation',
              'Romansh translation',
              'English translation',
              '100% Swiss hosting',
              'Privacy-focused - no data training',
              'Swiss AI powered by ETHZ and EPFL',
            ],
            inLanguage: ['de', 'de-CH', 'fr', 'it', 'rm', 'en'],
          },
          {
            '@type': 'WebSite',
            '@id': 'https://helvetra.ch/#website',
            url: 'https://helvetra.ch',
            name: 'Helvetra',
            publisher: {
              '@id': 'https://helvetra.ch/#organization',
            },
          },
        ],
      }),
    } as any,
  ],
})
</script>
