<!--
  Feedback consent modal.
  Shown when user wants to submit feedback for the first time.
-->
<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click.self="close"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h2 class="text-lg font-semibold text-neutral-900 mb-2">
          {{ $t('feedback.modalTitle') }}
        </h2>
        <p class="text-sm text-neutral-600 mb-4">
          {{ $t('feedback.modalDescription') }}
        </p>

        <!-- Region selector (only for Swiss German) -->
        <div v-if="showRegionSelector" class="mb-4">
          <label class="block text-sm font-medium text-neutral-700 mb-1">
            {{ $t('feedback.regionLabel') }}
          </label>
          <select
            v-model="selectedRegion"
            class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-swiss-red/50"
          >
            <option value="">{{ $t('feedback.regionPlaceholder') }}</option>
            <option v-for="region in regions" :key="region.code" :value="region.code">
              {{ region.name }}
            </option>
          </select>
        </div>

        <!-- Comment field -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-neutral-700 mb-1">
            {{ $t('feedback.commentLabel') }}
          </label>
          <textarea
            v-model="comment"
            :placeholder="$t('feedback.commentPlaceholder')"
            class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-swiss-red/50"
            rows="3"
            maxlength="1000"
          />
        </div>

        <!-- Remember choice checkbox -->
        <label class="flex items-center gap-2 mb-6 cursor-pointer">
          <input
            v-model="rememberChoice"
            type="checkbox"
            class="w-4 h-4 rounded border-neutral-300 text-swiss-red focus:ring-swiss-red/50"
          >
          <span class="text-sm text-neutral-600">
            {{ $t('feedback.rememberChoice') }}
          </span>
        </label>

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            type="button"
            class="flex-1 px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
            @click="close"
          >
            {{ $t('feedback.cancel') }}
          </button>
          <button
            type="button"
            class="flex-1 px-4 py-2 text-sm font-medium text-white bg-swiss-red rounded-lg hover:bg-swiss-red/90 transition-colors disabled:opacity-50"
            :disabled="isSubmitting"
            @click="submit"
          >
            {{ isSubmitting ? $t('feedback.submitting') : $t('feedback.submit') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  vote: 'like' | 'dislike'
  sourceText: string
  sourceLang: string
  translatedText: string
  targetLang: string
}>()

const emit = defineEmits<{
  close: []
  submitted: []
}>()

const { submitFeedback, saveConsent, isLoading: isSubmitting } = useFeedback()

const selectedRegion = ref('')
const comment = ref('')
const rememberChoice = ref(false)

const regions = [
  { code: 'bern', name: 'Bärndütsch (Bern)' },
  { code: 'zurich', name: 'Züritüütsch (Zürich)' },
  { code: 'basel', name: 'Baseldytsch (Basel)' },
  { code: 'stgallen', name: 'Sanggallerdütsch (St. Gallen)' },
  { code: 'wallis', name: 'Walliserdütsch (Wallis)' },
  { code: 'luzern', name: 'Luzärndütsch (Luzern)' },
]

const showRegionSelector = computed(() => {
  return props.sourceLang === 'gsw' || props.targetLang === 'gsw'
})

function close() {
  emit('close')
  resetForm()
}

function resetForm() {
  selectedRegion.value = ''
  comment.value = ''
  rememberChoice.value = false
}

async function submit() {
  const success = await submitFeedback({
    vote: props.vote,
    consent: true,
    sourceText: props.sourceText,
    sourceLang: props.sourceLang,
    translatedText: props.translatedText,
    targetLang: props.targetLang,
    region: selectedRegion.value || undefined,
    comment: comment.value || undefined,
  })

  if (success) {
    if (rememberChoice.value) {
      saveConsent()
    }
    emit('submitted')
    close()
  }
}
</script>
