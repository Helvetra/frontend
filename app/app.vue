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
</script>
