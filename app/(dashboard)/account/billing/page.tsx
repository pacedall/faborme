import { createClient } from '@/lib/supabase/server'
import { fmt } from '@/lib/fmt'
import CancelButton from '@/components/billing/CancelButton'

export const metadata = { title: 'Billing' }

const PLANS = [
  { tier: 'starter', label: 'Starter', price: 1500, features: ['10 sessions/month', 'Full AI scoring', 'Progress dashboard'] },
  { tier: 'practitioner', label: 'Practitioner', price: 2900, features: ['25 sessions/month', 'CV review', 'LinkedIn optimiser', 'Interview practice'] },
  { tier: 'premium', label: 'Premium', price: 4900, features: ['Unlimited sessions', 'Human coach review', '48hr video feedback'] },
]

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: sub } = await supabase.from('subscriptions').select('*').eq('user_id', user!.id).single()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8"><h1 className="font-display text-4xl font-semibold" style={{ color: 'var(--purple)' }}>Billing</h1></div>

      {sub ? (
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--purple)' }}>Current plan</h2>
            <span className="px-3 py-1 text-sm rounded-full capitalize" style={{ background: 'var(--lilac)', color: 'var(--purple)' }}>{sub.status}</span>
          </div>
          <div className="text-3xl font-display font-semibold capitalize mb-1" style={{ color: 'var(--violet)' }}>{sub.tier}</div>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            {sub.cancel_at_period_end ? `Cancels ${fmt.date(sub.current_period_end)}` : `Renews ${fmt.date(sub.current_period_end)}`}
          </p>
          {!sub.cancel_at_period_end && <CancelButton subscriptionId={sub.id} periodEnd={sub.current_period_end} />}
          {sub.cancel_at_period_end && (
            <div className="p-4 rounded-lg text-sm" style={{ background: '#fff8e1', color: '#f57f17' }}>Your subscription will end on {fmt.date(sub.current_period_end)}. You retain access until then.</div>
          )}
        </div>
      ) : (
        <div className="card mb-8 text-center py-8"><p className="text-sm" style={{ color: 'var(--muted)' }}>No active subscription.</p></div>
      )}

      <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--purple)' }}>Plans</h2>
      <div className="space-y-4">
        {PLANS.map((p) => {
          const isCurrent = sub?.tier === p.tier
          return (
            <div key={p.tier} className="card flex items-center justify-between" style={isCurrent ? { borderColor: 'var(--purple)', borderWidth: 2 } : {}}>
              <div>
                <div className="font-semibold" style={{ color: 'var(--purple)' }}>{p.label}</div>
                <div className="font-mono text-lg font-medium mt-0.5" style={{ color: 'var(--violet)' }}>{fmt.moneyPounds(p.price / 100)}/mo</div>
                <div className="flex flex-wrap gap-2 mt-2">{p.features.map((f) => (<span key={f} className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--lilac)', color: 'var(--muted)' }}>{f}</span>))}</div>
              </div>
              <div>
                {isCurrent ? (<span className="text-sm font-medium" style={{ color: 'var(--violet)' }}>Current</span>) : (
                  <form action="/api/stripe/checkout" method="POST">
                    <input type="hidden" name="tier" value={p.tier} />
                    <button type="submit" className="btn-primary text-sm py-2 px-5">{sub ? 'Switch' : 'Subscribe'}</button>
                  </form>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-8 text-xs text-center" style={{ color: 'var(--muted)' }}>No promotional pricing. No auto-converting trials. Cancel anytime — 3 clicks, no exit interview.</p>
    </div>
  )
}
