<!--
  Non-directional hub targeting the head terms "swiss german translator" and
  "schweizerdeutsch übersetzer" (the German slug below matches that query
  exactly). Presets German -> Swiss German and links out to the directional
  pages.
-->
<template>
  <TranslatePairLanding
    source="de"
    target="gsw"
    dialect="bern"
    tkey="translatePages.hub"
    :related-links="relatedLinks"
  />
</template>

<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/swiss-german-translator',
    de: '/schweizerdeutsch-uebersetzer',
    fr: '/traducteur-suisse-allemand',
    it: '/traduttore-svizzero-tedesco',
  },
})

const { t } = useI18n()
const localePath = useLocalePath()

const relatedLinks = computed(() => [
  { label: t('translatePages.hub.related.toEnGsw'), to: localePath({ name: 'english-to-swiss-german' }) },
  { label: t('translatePages.hub.related.toGswEn'), to: localePath({ name: 'swiss-german-to-english' }) },
  { label: t('translatePages.hub.related.compare'), to: localePath({ name: 'compare' }) },
])
</script>
