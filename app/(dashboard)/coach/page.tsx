import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { fmt } from '@/lib/fmt'

export const metadata = { title: 'Coach Review' }

export default async function CoachPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: sub } = await supabase.from('subscriptions').select('tier').eq('user_id', user!.id).single()
  const isPremium = sub?.tier === 'premium'
  const { data: reviews } = await supabase.from('coach_reviews').select('*').eq('user_id', user!.id).order('requested_at', { ascending: false }).limit(10)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold" style={{ color: 'var(--purple)' }}>Coach Review</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Human experts review your sessions and record video feedback — delivered within 48 hours.</p>
      </div>

      {!isPremium ? (
        <div className="card text-center py-12">
          <div className="text-4xl mb-4">◆</div>
          <h2 className="font-display text-2xl font-semibold mb-2" style={{ color: 'var(--purple)' }}>Premium feature</h2>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--muted)' }}>Human coach review is included in the Premium plan at £49/month. One review per month, 48-hour turnaround, video feedback.</p>
          <Link href="/account/billing" className="btn-gold">Upgrade to Premium — £49/mo</Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="card p-6 border-l-4" style={{ borderLeftColor: 'var(--violet)' }}>
            <h2 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--purple)' }}>Request a review</h2>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>A coach will review one of your recent speech sessions and record personalised video feedback. Delivered within 48 hours.</p>
            <form action="/api/coach/reviews" method="POST"><button type="submit" className="btn-primary">Request coach review</button></form>
          </div>

          {reviews && reviews.length > 0 ? (
            <div className="card">
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--purple)' }}>Your reviews</h2>
              <div className="space-y-3">
                {reviews.map((r: any) => (
                  <div key={r.id} className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: 'var(--line)' }}>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--purple)' }}>{fmt.date(r.requested_at)}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{r.completed_at ? 'Completed' : r.claimed_at ? 'In progress' : r.sla_breached ? '⚠ SLA breached' : 'Queued'}</div>
                    </div>
                    {r.completed_at && r.video_r2_key ? (
                      <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: '#e8f5e9', color: '#2e7d32' }}>Video ready</span>
                    ) : (
                      <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'var(--lilac)', color: 'var(--muted)' }}>Pending</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card text-center py-8"><p className="text-sm" style={{ color: 'var(--muted)' }}>No reviews yet. Request your first one above.</p></div>
          )}
        </div>
      )}
    </div>
  )
}
