// Live sats equivalents for USD prices.
// The page renders with a fallback price (works without JavaScript and in the
// pre-rendered HTML), then refreshes from a live BTC/USD feed in the browser.
// Every figure is rounded UP to the nearest 50,000 sats.

const FALLBACK_USD_PER_BTC = 77_850 // mempool.space, 2 Nov 2026 — refresh occasionally
const ROUND_TO = 50_000
const SATS_PER_BTC = 100_000_000

interface PriceSource {
  url: string
  read: (r: unknown) => number
}

const SOURCES: PriceSource[] = [
  {
    url: 'https://mempool.space/api/v1/prices',
    read: (r) => Number((r as { USD?: number } | null)?.USD)
  },
  {
    url: 'https://api.coinbase.com/v2/prices/BTC-USD/spot',
    read: (r) =>
      Number((r as { data?: { amount?: string } } | null)?.data?.amount)
  }
]

async function fetchPrice(): Promise<number | null> {
  for (const s of SOURCES) {
    try {
      const r = await $fetch(s.url, { timeout: 5000 })
      const p = s.read(r)
      if (Number.isFinite(p) && p > 1000) {
        return p
      }
    } catch {
      // try the next source
    }
  }
  return null
}

/** "$2,900" → 2900; returns null for non-numeric strings such as "Free". */
export function parseUsd(value: string): number | null {
  const n = Number(value.replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) && n > 0 ? n : null
}

export function useSats() {
  const { locale } = useI18n()
  const livePrice = useState<number | null>('btc-usd-price', () => null)

  onMounted(async () => {
    if (livePrice.value) {
      return
    }
    livePrice.value = await fetchPrice()
  })

  const price = computed(() => livePrice.value ?? FALLBACK_USD_PER_BTC)

  const toSats = (usd: number) =>
    Math.ceil((usd * SATS_PER_BTC) / price.value / ROUND_TO) * ROUND_TO

  const formatSats = (usd: number | null) => {
    if (!usd) {
      return ''
    }
    const n = new Intl.NumberFormat(
      locale.value === 'es' ? 'es-ES' : 'en-GB'
    ).format(toSats(usd))
    return `≈ ${n} sats`
  }

  return {
    price,
    isLive: computed(() => livePrice.value !== null),
    toSats,
    formatSats
  }
}
