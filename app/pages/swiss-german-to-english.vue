<!--
  Landing page targeting "swiss german to english" / "translate swiss german to
  english". Renders the translator preset Swiss German -> English. Localized
  slugs target the German/French/Italian phrasings of the query.
-->
<template>
  <TranslatePairLanding
    source="gsw"
    target="en"
    tkey="translatePages.gswToEn"
    :related-links="relatedLinks"
  />
</template>

<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/swiss-german-to-english',
    de: '/schweizerdeutsch-englisch-uebersetzer',
    fr: '/traducteur-suisse-allemand-anglais',
    it: '/traduttore-svizzero-tedesco-inglese',
  },
})

const { t } = useI18n()
const localePath = useLocalePath()

const relatedLinks = computed(() => [
  { label: t('translatePages.gswToEn.related.reverse'), to: localePath({ name: 'english-to-swiss-german' }) },
  { label: t('translatePages.gswToEn.related.hub'), to: localePath({ name: 'swiss-german-translator' }) },
  { label: t('translatePages.gswToEn.related.compare'), to: localePath({ name: 'compare' }) },
])
</script>
