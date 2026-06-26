<!--
  Dialect landing page targeting "text auf berndeutsch übersetzen" and similar.
  Renders the translator preset German -> Swiss German with the Bern dialect.
-->
<template>
  <TranslatePairLanding
    source="de"
    target="gsw"
    dialect="bern"
    tkey="translatePages.berndeutsch"
    :related-links="relatedLinks"
  />
</template>

<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/bernese-german-translator',
    de: '/berndeutsch-uebersetzer',
    fr: '/traducteur-bernois',
    it: '/traduttore-bernese',
  },
})

const { t } = useI18n()
const localePath = useLocalePath()

const relatedLinks = computed(() => [
  { label: t('translatePages.berndeutsch.related.hub'), to: localePath({ name: 'swiss-german-translator' }) },
  { label: t('translatePages.berndeutsch.related.other'), to: localePath({ name: 'zurich-german-translator' }) },
  { label: t('translatePages.berndeutsch.related.compare'), to: localePath({ name: 'compare' }) },
])
</script>
