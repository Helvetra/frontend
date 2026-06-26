<!--
  Dialect landing page targeting "zürichdeutsch übersetzen" and similar.
  Renders the translator preset German -> Swiss German with the Zurich dialect.
-->
<template>
  <TranslatePairLanding
    source="de"
    target="gsw"
    dialect="zurich"
    tkey="translatePages.zuerichdeutsch"
    :related-links="relatedLinks"
  />
</template>

<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/zurich-german-translator',
    de: '/zuerichdeutsch-uebersetzer',
    fr: '/traducteur-zurichois',
    it: '/traduttore-zurighese',
  },
})

const { t } = useI18n()
const localePath = useLocalePath()

const relatedLinks = computed(() => [
  { label: t('translatePages.zuerichdeutsch.related.hub'), to: localePath({ name: 'swiss-german-translator' }) },
  { label: t('translatePages.zuerichdeutsch.related.other'), to: localePath({ name: 'bernese-german-translator' }) },
  { label: t('translatePages.zuerichdeutsch.related.compare'), to: localePath({ name: 'compare' }) },
])
</script>
