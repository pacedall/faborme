'use client'

import { useState } from 'react'
import { fmt } from '@/lib/fmt'

interface CancelButtonProps { subscriptionId: string; periodEnd: string }

export default function CancelButton({ subscriptionId, periodEnd }: CancelButtonProps) {
  const [confirming, setConfirming] = useState(false)
  const [cancelled, setCancelled] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCancel = async () => {
    setLoading(true)
    const res = await fetch('/api/stripe/cancel', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subscriptionId }) })
    if (res.ok) setCancelled(true)
    setLoading(false)
  }

  if (cancelled) {
    return <div className="p-4 rounded-lg text-sm" style={{ background: '#fff8e1', color: '#f57f17' }}>Subscription cancelled. You retain access until {fmt.date(periodEnd)}.</div>
  }

  return (
    <div>
      {!confirming ? (
        <button onClick={() => setConfirming(true)} className="text-sm underline" style={{ color: 'var(--muted)' }}>Cancel subscription</button>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-sm" style={{ color: 'var(--muted)' }}>Cancel at {fmt.date(periodEnd)}?</span>
          <button onClick={handleCancel} disabled={loading} className="btn-secondary text-sm py-1.5 px-4">{loading ? 'Cancelling…' : 'Confirm'}</button>
          <button onClick={() => setConfirming(false)} className="text-sm" style={{ color: 'var(--muted)' }}>Keep plan</button>
        </div>
      )}
    </div>
  )
}
