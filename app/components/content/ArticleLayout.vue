<!--
  Reusable layout for comparison articles and blog content.
  Provides consistent styling and structure across all content pages.
-->
<template>
  <article class="max-w-4xl mx-auto px-4 py-8 md:py-12">
    <!-- Header -->
    <header class="mb-10">
      <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
        <slot name="title" />
      </h1>
      <p v-if="$slots.subtitle" class="text-xl text-neutral-600 leading-relaxed">
        <slot name="subtitle" />
      </p>
    </header>

    <!-- Main content -->
    <div class="article-content">
      <slot />
    </div>

    <!-- CTA Section -->
    <section v-if="$slots.cta" class="mt-12">
      <slot name="cta" />
    </section>
  </article>
</template>

<style scoped>
/* Prose styling for article content */
.article-content :deep(section) {
  @apply mb-12;
}

.article-content :deep(h2) {
  @apply text-2xl font-bold text-neutral-900 mb-6;
}

.article-content :deep(h3) {
  @apply text-xl font-semibold text-neutral-800 mb-3;
}

.article-content :deep(.prose) {
  @apply text-neutral-600 leading-relaxed;
}

.article-content :deep(.prose p) {
  @apply mb-4;
}

.article-content :deep(.prose p:last-child) {
  @apply mb-0;
}
</style>
