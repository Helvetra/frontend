<!--
  Landing page targeting "english to swiss german" / "translate english to
  swiss german" (top search queries by impressions). Renders the translator
  preset English -> Swiss German.
-->
<template>
  <TranslatePairLanding
    source="en"
    target="gsw"
    dialect="bern"
    tkey="translatePages.enToGsw"
    slug="english-to-swiss-german"
    :related-links="relatedLinks"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const relatedLinks = computed(() => [
  { label: t('translatePages.enToGsw.related.reverse'), to: localePath('/swiss-german-to-english') },
  { label: t('translatePages.enToGsw.related.compare'), to: localePath('/compare') },
])
</script>
