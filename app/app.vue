<!--
  Root application component.
  Wraps all pages with layout support and site-wide structured data.
-->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { getOrganizationSchema, getWebSiteSchema, useJsonLd } = useSchemaOrg()

useJsonLd([
  getOrganizationSchema(),
  getWebSiteSchema(),
])

// Inject hreflang alternate language links for SEO
const i18nHead = useLocaleHead({ addSeoAttributes: true })
useHead({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
})
</script>
