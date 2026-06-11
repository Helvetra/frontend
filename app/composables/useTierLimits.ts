/**
 * Single source of truth for the current user's tier and limits.
 * One deduplicated fetch per auth state, shared by the character counter,
 * the upgrade wall, and length validation — so they can never disagree.
 */

interface TierLimits {
  tier: string
  max_chars_per_request: number
  period_limit: number
  period_type: string
}

// Module-scoped single-flight: concurrent consumers share one request.
let limitsInFlight: Promise<void> | null = null

export function useTierLimits() {
  const config = useRuntimeConfig()
  const { authedFetch, isAuthenticated, authReady } = useAuth()

  // null = unknown (not yet loaded, or the fetch failed). Consumers must
  // render a degraded state instead of assuming the anonymous plan.
  const limits = useState<TierLimits | null>('tier-limits', () => null)
  const failed = useState<boolean>('tier-limits-failed', () => false)
  // Auth state the current limits were fetched under, to detect staleness.
  const fetchedForAuth = useState<boolean | null>('tier-limits-auth', () => null)

  function refresh(): Promise<void> {
    if (!limitsInFlight) {
      const forAuth = isAuthenticated.value
      limitsInFlight = (async () => {
        try {
          limits.value = await authedFetch<TierLimits>(
            `${config.public.apiBase}/v1/subscription/limits`
          )
          failed.value = false
          fetchedForAuth.value = forAuth
        } catch {
          limits.value = null
          failed.value = true
        } finally {
          limitsInFlight = null
        }
      })()
    }
    return limitsInFlight
  }

  /**
   * Keep limits in sync with the session: fetch once the session restore
   * has settled, and again whenever the user logs in or out. Safe to call
   * from any number of components — the single-flight dedupes.
   */
  function ensureLoaded(): void {
    if (!import.meta.client) return

    watch(
      [authReady, isAuthenticated],
      ([ready, authed]) => {
        if (!ready) return
        const stale = limits.value === null || fetchedForAuth.value !== authed
        if (stale || failed.value) {
          refresh()
        }
      },
      { immediate: true }
    )
  }

  // Per-request character limit; null while unknown.
  const charLimit = computed(() => limits.value?.max_chars_per_request ?? null)

  // Effective tier; null while unknown.
  const tier = computed(() => limits.value?.tier ?? null)

  // Paid plans never see upgrade CTAs. Falls back to false while unknown.
  const isPaidTier = computed(
    () => !!tier.value && tier.value !== 'free' && tier.value !== 'anonymous'
  )

  return {
    limits,
    charLimit,
    tier,
    isPaidTier,
    limitsUnknown: computed(() => limits.value === null),
    ensureLoaded,
    refresh,
  }
}
