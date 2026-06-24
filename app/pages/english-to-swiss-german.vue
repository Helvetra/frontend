<!--
  Landing page targeting "english to swiss german" / "translate english to
  swiss german" (top search queries by impressions). Renders the translator
  preset English -> Swiss German. Localized slugs target the German/French/
  Italian phrasings of the query.
-->
<template>
  <TranslatePairLanding
    source="en"
    target="gsw"
    dialect="bern"
    tkey="translatePages.enToGsw"
    :related-links="relatedLinks"
  />
</template>

<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/english-to-swiss-german',
    de: '/englisch-schweizerdeutsch-uebersetzer',
    fr: '/traducteur-anglais-suisse-allemand',
    it: '/traduttore-inglese-svizzero-tedesco',
  },
})

const { t } = useI18n()
const localePath = useLocalePath()

const relatedLinks = computed(() => [
  { label: t('translatePages.enToGsw.related.reverse'), to: localePath({ name: 'swiss-german-to-english' }) },
  { label: t('translatePages.enToGsw.related.hub'), to: localePath({ name: 'swiss-german-translator' }) },
  { label: t('translatePages.enToGsw.related.compare'), to: localePath({ name: 'compare' }) },
])
</script>
