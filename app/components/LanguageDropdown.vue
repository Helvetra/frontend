<!--
  Accessible custom dropdown for language selection.
  Supports keyboard navigation and screen readers.
-->
<template>
  <div class="relative" ref="containerRef">
    <button
      type="button"
      class="flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-swiss-red focus-visible:ring-offset-2 rounded"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="toggle"
      @keydown="handleButtonKeydown"
    >
      <span>{{ currentLabel }}</span>
      <svg
        class="h-4 w-4 text-neutral-500 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <ul
        v-if="isOpen"
        ref="listRef"
        role="listbox"
        :aria-activedescendant="activeId"
        tabindex="-1"
        class="absolute z-50 mt-1 min-w-[140px] bg-white border border-neutral-200 rounded-lg shadow-lg py-1 focus:outline-none"
        :class="align === 'right' ? 'right-0' : 'left-0'"
        @keydown="handleListKeydown"
      >
        <li
          v-for="(option, index) in options"
          :key="option.value"
          :id="`${uid}-option-${index}`"
          role="option"
          :aria-selected="option.value === modelValue"
          class="px-3 py-2 text-sm cursor-pointer transition-colors"
          :class="[
            option.value === modelValue
              ? 'bg-red-50 text-swiss-red font-medium'
              : 'text-neutral-700 hover:bg-neutral-100',
            focusedIndex === index ? 'bg-neutral-100' : ''
          ]"
          @click="select(option.value)"
          @mouseenter="focusedIndex = index"
        >
          {{ option.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
}

const props = withDefaults(defineProps<{
  modelValue: string
  options: Option[]
  align?: 'left' | 'right'
}>(), {
  align: 'left'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const uid = useId()
const isOpen = ref(false)
const focusedIndex = ref(-1)
const containerRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)

const currentLabel = computed(() => {
  const option = props.options.find(o => o.value === props.modelValue)
  return option?.label || props.modelValue
})

const activeId = computed(() => {
  if (focusedIndex.value >= 0) {
    return `${uid}-option-${focusedIndex.value}`
  }
  return undefined
})

function toggle() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    focusedIndex.value = props.options.findIndex(o => o.value === props.modelValue)
    nextTick(() => listRef.value?.focus())
  }
}

function close() {
  isOpen.value = false
  focusedIndex.value = -1
}

function select(value: string) {
  emit('update:modelValue', value)
  close()
}

function handleButtonKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    if (!isOpen.value) {
      toggle()
    }
  }
}

function handleListKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusedIndex.value = Math.min(focusedIndex.value + 1, props.options.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusedIndex.value = Math.max(focusedIndex.value - 1, 0)
      break
    case 'Enter':
    case ' ': {
      event.preventDefault()
      const selectedOption = props.options[focusedIndex.value]
      if (focusedIndex.value >= 0 && selectedOption) {
        select(selectedOption.value)
      }
      break
    }
    case 'Escape':
      event.preventDefault()
      close()
      break
    case 'Tab':
      close()
      break
  }
}

// Close on click outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
      close()
    }
  }
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>
