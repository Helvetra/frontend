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

/* Make inline links visibly clickable — Tailwind's preflight reset
   strips link styling by default, and the codebase doesn't ship the
   Typography plugin, so .prose alone doesn't style anchors. */
.article-content :deep(.prose a) {
  @apply text-swiss-red underline underline-offset-2 decoration-2;
}

.article-content :deep(.prose a:hover) {
  @apply text-swiss-red-dark underline-offset-4;
}

/* List items inside prose blocks should also wrap and space sensibly. */
.article-content :deep(.prose ul) {
  @apply list-disc pl-6 space-y-2 mb-4;
}

.article-content :deep(.prose blockquote) {
  @apply my-6;
}

.article-content :deep(.prose figcaption a),
.article-content :deep(figcaption a) {
  @apply text-swiss-red underline underline-offset-2 decoration-2;
}

.article-content :deep(.prose figcaption a:hover),
.article-content :deep(figcaption a:hover) {
  @apply text-swiss-red-dark underline-offset-4;
}
</style>
