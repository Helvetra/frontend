<!--
  Landing page targeting "swiss german to english" / "translate swiss german to
  english". Renders the translator preset Swiss German -> English.
-->
<template>
  <TranslatePairLanding
    source="gsw"
    target="en"
    tkey="translatePages.gswToEn"
    slug="swiss-german-to-english"
    :related-links="relatedLinks"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const relatedLinks = computed(() => [
  { label: t('translatePages.gswToEn.related.reverse'), to: localePath('/english-to-swiss-german') },
  { label: t('translatePages.gswToEn.related.compare'), to: localePath('/compare') },
])
</script>
