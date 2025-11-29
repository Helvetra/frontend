<!--
  Application footer with links and Swiss branding.
-->
<template>
  <footer class="bg-white border-t border-neutral-200 py-6">
    <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2 text-neutral-500 text-sm">
        <span class="text-swiss-red">+</span>
        <span>{{ $t('footer.madeIn') }}</span>
      </div>

      <nav class="flex gap-6 text-sm">
        <NuxtLink to="/privacy" class="text-neutral-500 hover:text-neutral-900">
          {{ $t('footer.privacy') }}
        </NuxtLink>
      </nav>
    </div>
  </footer>
</template>
