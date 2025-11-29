<!--
  Application header with logo and language selector.
-->
<template>
  <header class="bg-white border-b border-neutral-200">
    <div class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="text-swiss-red font-bold text-xl">+</span>
        <span class="font-semibold text-neutral-900">{{ $t('app.title') }}</span>
      </NuxtLink>

      <div class="flex items-center gap-4">
        <LanguageSelector />
      </div>
    </div>
  </header>
</template>
