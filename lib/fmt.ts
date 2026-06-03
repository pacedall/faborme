// lib/fmt.ts — en-GB locale enforcement
// ALL formatted values in the app go through this helper.
const LOCALE = 'en-GB'
const CURRENCY = 'GBP'

export const fmt = {
  date: (d: string | Date) => new Date(d).toLocaleDateString(LOCALE),
  dateTime: (d: string | Date) => new Date(d).toLocaleString(LOCALE),
  money: (pence: number) => new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY }).format(pence / 100),
  moneyPounds: (pounds: number) => new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY }).format(pounds),
  score: (n: number) => `${Math.round(n)}`,
  wpm: (n: number) => `${Math.round(n)} wpm`,
  percent: (n: number) => `${Math.round(n * 100)}%`,
  duration: (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.round(seconds % 60)
    return m > 0 ? `${m}m ${s}s` : `${s}s`
  },
  relativeDate: (d: string | Date) => {
    const diff = Date.now() - new Date(d).getTime()
    const days = Math.floor(diff / 86_400_000)
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return fmt.date(d)
  },
}
