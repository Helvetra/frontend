<!--
  Developer quickstart for the Helvetra public API. Pairs with the
  interactive Swagger UI at /api/public/v1/docs by spelling out the
  flow in prose and showing the same call in three languages.
-->
<template>
  <div class="max-w-4xl mx-auto px-4 py-8 md:py-12">
    <!-- Hero -->
    <div class="mb-10">
      <p class="text-sm text-swiss-red font-medium mb-2 uppercase tracking-wide">
        {{ $t('apiDocs.eyebrow') }}
      </p>
      <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
        {{ $t('apiDocs.title') }}
      </h1>
      <p class="text-neutral-600 max-w-2xl">
        {{ $t('apiDocs.subtitle') }}
      </p>
      <div class="mt-5 flex flex-wrap gap-3">
        <a
          href="/api/public/v1/docs"
          class="inline-flex items-center gap-2 px-4 py-2 bg-swiss-red text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          {{ $t('apiDocs.referenceCta') }}
          <span aria-hidden="true">&rarr;</span>
        </a>
        <NuxtLink
          :to="localePath('/developers')"
          class="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors"
        >
          {{ $t('apiDocs.pricingCta') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Step 1: subscribe + create key -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold text-neutral-900 mb-3">
        {{ $t('apiDocs.steps.subscribe.title') }}
      </h2>
      <p class="text-neutral-700 mb-3 leading-relaxed">
        {{ $t('apiDocs.steps.subscribe.body') }}
      </p>
      <ul class="space-y-2 text-sm text-neutral-700">
        <li class="flex items-start gap-2">
          <span class="text-swiss-red font-semibold">1.</span>
          <span>{{ $t('apiDocs.steps.subscribe.bullet1') }}</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-swiss-red font-semibold">2.</span>
          <span>{{ $t('apiDocs.steps.subscribe.bullet2') }}</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-swiss-red font-semibold">3.</span>
          <span>{{ $t('apiDocs.steps.subscribe.bullet3') }}</span>
        </li>
      </ul>
    </section>

    <!-- Step 2: auth -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold text-neutral-900 mb-3">
        {{ $t('apiDocs.steps.auth.title') }}
      </h2>
      <p class="text-neutral-700 mb-4 leading-relaxed">
        {{ $t('apiDocs.steps.auth.body') }}
      </p>
      <CodeBlock
        :code="`X-API-Key: hv_live_••••••••••••••••••••••••••••••••`"
        language="http"
      />
    </section>

    <!-- Step 3: first translation with tabs -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold text-neutral-900 mb-3">
        {{ $t('apiDocs.steps.translate.title') }}
      </h2>
      <p class="text-neutral-700 mb-4 leading-relaxed">
        {{ $t('apiDocs.steps.translate.body') }}
      </p>

      <!-- Language tabs -->
      <div class="border-b border-neutral-200 mb-3">
        <div class="flex gap-1" role="tablist">
          <button
            v-for="lang in codeLanguages"
            :key="lang.id"
            type="button"
            role="tab"
            :aria-selected="activeLang === lang.id"
            class="px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px"
            :class="activeLang === lang.id
              ? 'border-swiss-red text-swiss-red'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'"
            @click="activeLang = lang.id"
          >
            {{ lang.label }}
          </button>
        </div>
      </div>

      <CodeBlock :code="examples[activeLang]" :language="activeLang" />
    </section>

    <!-- Languages and options -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold text-neutral-900 mb-3">
        {{ $t('apiDocs.languages.title') }}
      </h2>
      <p class="text-neutral-700 mb-4 leading-relaxed">
        {{ $t('apiDocs.languages.body') }}
      </p>
      <div class="grid sm:grid-cols-2 gap-3">
        <div
          v-for="lang in supportedLanguages"
          :key="lang.code"
          class="flex items-center gap-3 bg-neutral-50 rounded-lg px-3 py-2"
        >
          <code class="text-sm font-mono text-swiss-red shrink-0">{{ lang.code }}</code>
          <span class="text-sm text-neutral-700">{{ lang.name }}</span>
        </div>
      </div>

      <h3 class="text-base font-semibold text-neutral-900 mt-6 mb-2">
        {{ $t('apiDocs.languages.formalityTitle') }}
      </h3>
      <p class="text-sm text-neutral-700 mb-2 leading-relaxed">
        {{ $t('apiDocs.languages.formalityBody') }}
      </p>

      <h3 class="text-base font-semibold text-neutral-900 mt-4 mb-2">
        {{ $t('apiDocs.languages.dialectTitle') }}
      </h3>
      <p class="text-sm text-neutral-700 mb-2 leading-relaxed">
        {{ $t('apiDocs.languages.dialectBody') }}
      </p>
      <div class="flex flex-wrap gap-2">
        <code
          v-for="dialect in dialects"
          :key="dialect"
          class="text-xs font-mono bg-neutral-100 px-2 py-1 rounded"
        >{{ dialect }}</code>
      </div>
    </section>

    <!-- Limits + errors -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold text-neutral-900 mb-3">
        {{ $t('apiDocs.limits.title') }}
      </h2>
      <p class="text-neutral-700 mb-3 leading-relaxed">
        {{ $t('apiDocs.limits.body') }}
      </p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border border-neutral-200 rounded-lg">
          <thead class="bg-neutral-50 text-left">
            <tr>
              <th class="px-3 py-2 font-semibold text-neutral-700">{{ $t('apiDocs.limits.colCode') }}</th>
              <th class="px-3 py-2 font-semibold text-neutral-700">{{ $t('apiDocs.limits.colStatus') }}</th>
              <th class="px-3 py-2 font-semibold text-neutral-700">{{ $t('apiDocs.limits.colMeaning') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="err in errorCodes" :key="err.code" class="border-t border-neutral-200">
              <td class="px-3 py-2"><code class="text-xs font-mono">{{ err.code }}</code></td>
              <td class="px-3 py-2 text-neutral-600">{{ err.status }}</td>
              <td class="px-3 py-2 text-neutral-700">{{ $t(`apiDocs.errors.${err.code}`) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Check usage -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold text-neutral-900 mb-3">
        {{ $t('apiDocs.usage.title') }}
      </h2>
      <p class="text-neutral-700 mb-4 leading-relaxed">
        {{ $t('apiDocs.usage.body') }}
      </p>
      <CodeBlock :code="usageExample" language="bash" />
    </section>

    <!-- Contact -->
    <section class="text-center pt-6 border-t border-neutral-200">
      <p class="text-sm text-neutral-500">
        {{ $t('apiDocs.contact') }}
        <a href="mailto:gruezi@helvetra.ch" class="text-swiss-red hover:underline">
          gruezi@helvetra.ch
        </a>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const codeLanguages = [
  { id: 'bash', label: 'curl' },
  { id: 'python', label: 'Python' },
  { id: 'javascript', label: 'JavaScript' },
] as const

type CodeLang = typeof codeLanguages[number]['id']
const activeLang = ref<CodeLang>('bash')

const examples: Record<CodeLang, string> = {
  bash: `curl -X POST https://helvetra.ch/api/public/v1/translate \\
  -H "X-API-Key: $HELVETRA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Grüezi mitenand!",
    "source_lang": "gsw",
    "target_lang": "en"
  }'`,
  python: `import os, requests

response = requests.post(
    "https://helvetra.ch/api/public/v1/translate",
    headers={"X-API-Key": os.environ["HELVETRA_API_KEY"]},
    json={
        "text": "Grüezi mitenand!",
        "source_lang": "gsw",
        "target_lang": "en",
    },
    timeout=30,
)
response.raise_for_status()
print(response.json()["translation"])`,
  javascript: `const response = await fetch(
  "https://helvetra.ch/api/public/v1/translate",
  {
    method: "POST",
    headers: {
      "X-API-Key": process.env.HELVETRA_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: "Grüezi mitenand!",
      source_lang: "gsw",
      target_lang: "en",
    }),
  },
);

if (!response.ok) {
  throw new Error(\`Translation failed: \${response.status}\`);
}
const data = await response.json();
console.log(data.translation);`,
}

const usageExample = `curl https://helvetra.ch/api/public/v1/usage \\
  -H "X-API-Key: $HELVETRA_API_KEY"`

const supportedLanguages = [
  { code: 'de', name: 'German' },
  { code: 'gsw', name: 'Swiss German' },
  { code: 'fr', name: 'French' },
  { code: 'it', name: 'Italian' },
  { code: 'en', name: 'English' },
  { code: 'rm', name: 'Romansh' },
]

const dialects = ['bern', 'zurich', 'basel', 'stgallen', 'wallis', 'luzern']

const errorCodes = [
  { code: 'UNSUPPORTED_LANGUAGE', status: '400' },
  { code: 'UNSUPPORTED_DIALECT', status: '400' },
  { code: 'TEXT_TOO_LONG', status: '400' },
  { code: 'INVALID_API_KEY', status: '401' },
  { code: 'SUSPICIOUS_OUTPUT', status: '422' },
  { code: 'USAGE_LIMIT_EXCEEDED', status: '429' },
  { code: 'INTERNAL_ERROR', status: '500' },
]

useHead({
  title: () => `${t('apiDocs.title')} - Helvetra`,
  meta: [{ name: 'description', content: () => t('apiDocs.subtitle') }],
})
</script>
