<!--
  Newsletter confirmation page shown after signing up.
  Tells user to check their inbox for confirmation email.
-->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Simplified header with centered logo -->
    <header class="py-8">
      <div class="max-w-[1200px] mx-auto px-4 md:px-8">
        <div class="flex justify-center">
          <NuxtLink :to="localePath('/')" class="flex items-center gap-3">
            <img src="/favicon.svg" alt="Helvetra" class="h-10 w-auto">
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="flex-1 flex items-center justify-center px-4 py-8">
      <div class="text-center max-w-md">
        <!-- Icon -->
        <div class="w-20 h-20 mx-auto mb-8 bg-neutral-100 rounded-full flex items-center justify-center">
          <svg class="w-10 h-10 text-swiss-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9" />
            <path d="M22 10l-10 6L2 10" />
            <path d="M2 10l10-6 10 6" />
            <rect x="8" y="2" width="8" height="8" rx="1" fill="white" />
            <path d="M10 5h4" />
            <path d="M10 7h4" />
          </svg>
        </div>

        <!-- Title -->
        <h1 class="text-[2rem] font-normal text-black mb-4">
          {{ $t('confirm.title') }}
        </h1>

        <!-- Instruction -->
        <div class="bg-neutral-100 rounded-lg p-6 mb-8">
          <p class="text-neutral-600">
            {{ $t('confirm.instruction') }}
          </p>
        </div>

        <!-- Back button -->
        <NuxtLink
          :to="localePath('/')"
          class="inline-block px-8 py-3 bg-swiss-red text-white font-medium hover:bg-swiss-red-dark transition-colors"
        >
          {{ $t('confirm.backButton') }}
        </NuxtLink>
      </div>
    </main>

    <!-- Simplified footer -->
    <footer class="py-6 border-t border-neutral-200">
      <div class="text-center">
        <span class="text-sm text-neutral-500">© 2025 Helvetra</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

useHead({
  title: 'Almost there! — Helvetra',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})
</script>
