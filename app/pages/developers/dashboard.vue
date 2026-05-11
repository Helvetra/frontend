<!--
  B2B customer dashboard.
  Guarded for users with an active B2B subscription. Shows plan/trial
  status, API key management (list/create/revoke/rotate), usage with a
  progress bar, plus shortcuts to the Stripe Customer Portal and docs.
-->
<template>
  <div class="max-w-3xl mx-auto px-4 py-8 md:py-12">
    <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">
      {{ $t('apiDashboard.title') }}
    </h1>
    <p class="text-neutral-500 text-sm mb-8">{{ $t('apiDashboard.subtitle') }}</p>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-neutral-500 text-sm">{{ $t('auth.loading') }}</p>
    </div>

    <!-- No active subscription: route to /developers -->
    <div v-else-if="!subscription?.has_subscription" class="bg-white border border-neutral-200 rounded-xl p-8 text-center">
      <p class="text-neutral-700 mb-4">{{ $t('apiDashboard.noSubscription') }}</p>
      <NuxtLink
        :to="localePath('/developers')"
        class="inline-flex items-center gap-2 px-4 py-2 bg-swiss-red text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
      >
        {{ $t('apiDashboard.viewPlans') }}
      </NuxtLink>
    </div>

    <template v-else>
      <!-- Plan + usage card -->
      <section class="bg-white border border-neutral-200 rounded-xl p-6 mb-6">
        <div class="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-lg font-semibold text-neutral-900">
                {{ tierLabel }}
              </span>
              <span
                v-if="subscription.is_trialing"
                class="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded"
              >
                {{ $t('apiDashboard.trialing') }}
              </span>
              <span
                v-else
                class="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded"
              >
                {{ $t('apiDashboard.active') }}
              </span>
            </div>
            <p class="text-sm text-neutral-500">
              {{ subscription.is_trialing
                ? $t('apiDashboard.trialEndsOn', { date: formatDate(subscription.current_period_end) })
                : $t('apiDashboard.renewsOn', { date: formatDate(subscription.current_period_end) }) }}
            </p>
          </div>
          <button
            type="button"
            :disabled="isOpeningPortal"
            class="px-3 py-1.5 border border-neutral-300 text-sm text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50"
            @click="openBillingPortal"
          >
            {{ isOpeningPortal ? $t('auth.loading') : $t('apiDashboard.manageBilling') }}
          </button>
        </div>

        <!-- Usage progress -->
        <div class="mt-6">
          <div class="flex justify-between text-sm text-neutral-700 mb-1.5">
            <span>{{ $t('apiDashboard.usageLabel') }}</span>
            <span class="tabular-nums">
              {{ subscription.characters_used.toLocaleString() }} /
              {{ subscription.characters_limit.toLocaleString() }}
            </span>
          </div>
          <div class="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all"
              :class="usagePercent >= 90 ? 'bg-amber-500' : 'bg-swiss-red'"
              :style="{ width: `${Math.min(100, usagePercent)}%` }"
            />
          </div>
          <p class="text-xs text-neutral-500 mt-1.5">
            {{ usagePercent >= 100
              ? $t('apiDashboard.usageOver')
              : $t('apiDashboard.usageRemaining', { count: subscription.characters_remaining.toLocaleString() }) }}
          </p>
        </div>
      </section>

      <!-- API keys card -->
      <section class="bg-white border border-neutral-200 rounded-xl p-6 mb-6">
        <div class="flex items-start justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 class="text-lg font-semibold text-neutral-900">{{ $t('apiDashboard.keys.title') }}</h2>
            <p class="text-sm text-neutral-500 mt-1">
              {{ $t('apiDashboard.keys.subtitle', { used: keys.length, max: subscription.max_api_keys }) }}
            </p>
          </div>
          <button
            type="button"
            :disabled="isCreatingKey || keys.length >= subscription.max_api_keys"
            class="px-3 py-1.5 bg-swiss-red text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            @click="showCreateForm = true"
          >
            {{ $t('apiDashboard.keys.create') }}
          </button>
        </div>

        <!-- New key (shown once) -->
        <div v-if="newKey" class="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p class="text-sm text-amber-900 font-medium mb-2">
            {{ $t('apiDashboard.keys.newKeyTitle') }}
          </p>
          <p class="text-xs text-amber-800 mb-3">
            {{ $t('apiDashboard.keys.newKeyWarning') }}
          </p>
          <div class="bg-white border border-amber-300 rounded p-2 font-mono text-xs break-all flex items-center gap-2">
            <span class="flex-1">{{ newKey }}</span>
            <button
              type="button"
              class="text-xs text-swiss-red hover:underline shrink-0"
              @click="copyToClipboard(newKey)"
            >
              {{ copiedKey ? $t('apiDocs.copied') : $t('apiDocs.copy') }}
            </button>
          </div>
          <button
            type="button"
            class="mt-3 text-xs text-amber-900 hover:underline"
            @click="newKey = null"
          >
            {{ $t('apiDashboard.keys.dismiss') }}
          </button>
        </div>

        <!-- Create form -->
        <div v-if="showCreateForm" class="mb-4 bg-neutral-50 border border-neutral-200 rounded-lg p-4">
          <label class="block text-sm font-medium text-neutral-700 mb-2">
            {{ $t('apiDashboard.keys.nameLabel') }}
          </label>
          <input
            v-model="newKeyName"
            type="text"
            maxlength="100"
            :placeholder="$t('apiDashboard.keys.namePlaceholder')"
            class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-swiss-red"
          >
          <div class="flex gap-2 mt-3">
            <button
              type="button"
              :disabled="isCreatingKey || !newKeyName.trim()"
              class="px-3 py-1.5 bg-swiss-red text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              @click="handleCreateKey"
            >
              {{ isCreatingKey ? $t('auth.loading') : $t('apiDashboard.keys.confirmCreate') }}
            </button>
            <button
              type="button"
              class="px-3 py-1.5 text-sm text-neutral-600 hover:text-neutral-900"
              @click="cancelCreate"
            >
              {{ $t('apiDashboard.keys.cancel') }}
            </button>
          </div>
        </div>

        <!-- Keys list -->
        <div v-if="keys.length === 0 && !showCreateForm" class="text-center py-8 text-sm text-neutral-500">
          {{ $t('apiDashboard.keys.empty') }}
        </div>
        <ul v-else class="divide-y divide-neutral-100">
          <li v-for="key in keys" :key="key.id" class="py-3 flex items-center justify-between gap-3">
            <div class="min-w-0">
              <p class="text-sm font-medium text-neutral-900 truncate">{{ key.name }}</p>
              <p class="text-xs text-neutral-500 font-mono">
                {{ key.key_prefix }}••••••••
              </p>
              <p class="text-xs text-neutral-400 mt-0.5">
                {{ key.last_used_at
                  ? $t('apiDashboard.keys.lastUsed', { date: formatDate(key.last_used_at) })
                  : $t('apiDashboard.keys.neverUsed') }}
              </p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <button
                type="button"
                class="text-xs text-neutral-600 hover:text-neutral-900"
                @click="handleRotateKey(key.id)"
              >
                {{ $t('apiDashboard.keys.rotate') }}
              </button>
              <button
                type="button"
                class="text-xs text-red-600 hover:text-red-800"
                @click="handleRevokeKey(key.id)"
              >
                {{ $t('apiDashboard.keys.revoke') }}
              </button>
            </div>
          </li>
        </ul>

        <p v-if="actionError" class="mt-3 text-sm text-red-600">
          {{ actionError }}
        </p>
      </section>

      <!-- Resources -->
      <section class="bg-white border border-neutral-200 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">{{ $t('apiDashboard.resources.title') }}</h2>
        <div class="grid sm:grid-cols-2 gap-3">
          <NuxtLink
            :to="localePath('/developers/docs')"
            class="block p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <p class="text-sm font-semibold text-neutral-900">{{ $t('apiDashboard.resources.quickstart') }}</p>
            <p class="text-xs text-neutral-500 mt-1">{{ $t('apiDashboard.resources.quickstartHint') }}</p>
          </NuxtLink>
          <a
            href="/api/public/v1/docs"
            class="block p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <p class="text-sm font-semibold text-neutral-900">{{ $t('apiDashboard.resources.reference') }}</p>
            <p class="text-xs text-neutral-500 mt-1">{{ $t('apiDashboard.resources.referenceHint') }}</p>
          </a>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const { isAuthenticated, getAuthHeader } = useAuth()

interface B2BSubscription {
  has_subscription: boolean
  tier?: string
  status?: string
  current_period_start?: string | null
  current_period_end?: string | null
  is_trialing?: boolean
  characters_used: number
  characters_limit: number
  characters_remaining: number
  max_chars_per_request: number
  max_api_keys: number
}

interface ApiKey {
  id: string
  name: string
  key_prefix: string
  rate_limit: number
  last_used_at: string | null
  created_at: string
}

interface ApiKeyCreated extends ApiKey {
  key: string
}

interface PortalResponse {
  success: boolean
  portal_url?: string
  error?: string
}

const loading = ref(true)
const subscription = ref<B2BSubscription | null>(null)
const keys = ref<ApiKey[]>([])
const newKey = ref<string | null>(null)
const newKeyName = ref('')
const showCreateForm = ref(false)
const isCreatingKey = ref(false)
const isOpeningPortal = ref(false)
const copiedKey = ref(false)
const actionError = ref<string | null>(null)

const usagePercent = computed(() => {
  if (!subscription.value?.characters_limit) return 0
  return (subscription.value.characters_used / subscription.value.characters_limit) * 100
})

const tierLabel = computed(() => {
  const tier = subscription.value?.tier
  if (tier === 'starter') return t('api.tiers.starter.name')
  if (tier === 'business') return t('api.tiers.business.name')
  return ''
})

function apiUrl(path: string): string {
  return `${config.public.apiBase}/v1${path}`
}

function formatDate(iso?: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

async function loadAll(): Promise<void> {
  if (!isAuthenticated.value) {
    await navigateTo(localePath('/login?redirect=/developers/dashboard'))
    return
  }
  loading.value = true
  try {
    const [sub, keyList] = await Promise.all([
      $fetch<B2BSubscription>(apiUrl('/subscription/b2b'), { headers: getAuthHeader() }),
      $fetch<ApiKey[]>(apiUrl('/api-keys'), { headers: getAuthHeader() }).catch(() => []),
    ])
    subscription.value = sub
    keys.value = keyList
  } catch (e) {
    console.error('dashboard load failed', e)
  } finally {
    loading.value = false
  }
}

async function handleCreateKey(): Promise<void> {
  if (!newKeyName.value.trim() || isCreatingKey.value) return
  isCreatingKey.value = true
  actionError.value = null
  try {
    const created = await $fetch<ApiKeyCreated>(apiUrl('/api-keys'), {
      method: 'POST',
      headers: getAuthHeader(),
      body: { name: newKeyName.value.trim() },
    })
    newKey.value = created.key
    keys.value = [...keys.value, {
      id: created.id,
      name: created.name,
      key_prefix: created.key_prefix,
      rate_limit: created.rate_limit,
      last_used_at: created.last_used_at,
      created_at: created.created_at,
    }]
    showCreateForm.value = false
    newKeyName.value = ''
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string } }
    actionError.value = err.data?.detail || t('apiDashboard.keys.errorCreate')
  } finally {
    isCreatingKey.value = false
  }
}

async function handleRevokeKey(keyId: string): Promise<void> {
  if (!confirm(t('apiDashboard.keys.confirmRevoke'))) return
  actionError.value = null
  try {
    await $fetch(apiUrl(`/api-keys/${keyId}`), {
      method: 'DELETE',
      headers: getAuthHeader(),
    })
    keys.value = keys.value.filter(k => k.id !== keyId)
  } catch (e) {
    actionError.value = t('apiDashboard.keys.errorRevoke')
    console.error(e)
  }
}

async function handleRotateKey(keyId: string): Promise<void> {
  if (!confirm(t('apiDashboard.keys.confirmRotate'))) return
  actionError.value = null
  try {
    const rotated = await $fetch<ApiKeyCreated>(apiUrl(`/api-keys/${keyId}/rotate`), {
      method: 'POST',
      headers: getAuthHeader(),
    })
    newKey.value = rotated.key
    // Refresh the list — rotated key gets a new id
    keys.value = keys.value.map(k => k.id === keyId
      ? {
          id: rotated.id,
          name: rotated.name,
          key_prefix: rotated.key_prefix,
          rate_limit: rotated.rate_limit,
          last_used_at: rotated.last_used_at,
          created_at: rotated.created_at,
        }
      : k,
    )
  } catch (e) {
    actionError.value = t('apiDashboard.keys.errorRotate')
    console.error(e)
  }
}

async function openBillingPortal(): Promise<void> {
  isOpeningPortal.value = true
  try {
    const response = await $fetch<PortalResponse>(apiUrl('/payments/b2b-portal'), {
      method: 'POST',
      headers: getAuthHeader(),
    })
    if (response.success && response.portal_url) {
      window.location.href = response.portal_url
    } else {
      actionError.value = response.error || t('apiDashboard.errors.portal')
    }
  } catch (e) {
    actionError.value = t('apiDashboard.errors.portal')
    console.error(e)
  } finally {
    isOpeningPortal.value = false
  }
}

async function copyToClipboard(value: string): Promise<void> {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(value)
    copiedKey.value = true
    setTimeout(() => { copiedKey.value = false }, 1500)
  } catch (err) {
    console.error('Clipboard write failed', err)
  }
}

function cancelCreate(): void {
  showCreateForm.value = false
  newKeyName.value = ''
  actionError.value = null
}

onMounted(() => {
  loadAll()
})

useHead({
  title: () => `${t('apiDashboard.title')} - Helvetra`,
})
</script>
