<!--
  Default layout with header and footer.
  Used for all main application pages.
-->
<template>
  <div class="min-h-screen flex flex-col bg-neutral-50">
    <AppHeader />
    <EmailVerificationBanner />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
