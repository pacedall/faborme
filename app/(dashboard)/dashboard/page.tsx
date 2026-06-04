import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { fmt } from '@/lib/fmt'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('users').select('segment').eq('id', user.id).single()
  if (!profile?.segment) redirect('/onboarding')

  const { data: recentSessions } = await supabase
    .from('speech_sessions').select('id, status, semantic_scores_jsonb, metrics_jsonb, created_at')
    .eq('user_id', user.id).eq('status', 'complete').order('created_at', { ascending: false }).limit(5)

  const { data: sub } = await supabase.from('subscriptions').select('tier, status, current_period_end').eq('user_id', user.id).single()

  const latestScore = recentSessions?.[0]?.semantic_scores_jsonb as any
  const overallScore = latestScore?.overall ?? null
  const hour = new Date().getHours()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold" style={{ color: 'var(--purple)' }}>
          Good {hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'}
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          {recentSessions && recentSessions.length > 0 ? `You have ${recentSessions.length} completed session${recentSessions.length !== 1 ? 's' : ''}.` : "Let's start your first session."}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { href: '/speech', label: 'New session', icon: '◎', desc: 'Record & analyse' },
          { href: '/cv', label: 'CV review', icon: '◈', desc: 'Score your CV' },
          { href: '/linkedin', label: 'LinkedIn', icon: '◇', desc: 'Optimise profile' },
          { href: '/interview', label: 'Practise', icon: '◉', desc: 'Interview prep' },
        ].map((action) => (
          <Link key={action.href} href={action.href} className="card-hover flex flex-col gap-2 p-5">
            <span className="text-2xl" style={{ color: 'var(--violet)' }}>{action.icon}</span>
            <span className="font-semibold text-sm" style={{ color: 'var(--purple)' }}>{action.label}</span>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>{action.desc}</span>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--purple)' }}>Communication score</h2>
            {overallScore !== null && <span className="font-mono text-3xl font-semibold" style={{ color: 'var(--violet)' }}>{Math.round(overallScore)}</span>}
          </div>
          {!overallScore ? (
            <div className="text-center py-8">
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>Record your first session to see your baseline score across 8 dimensions.</p>
              <Link href="/speech" className="btn-primary text-sm py-2 px-5">Start now</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {['confidence', 'clarity', 'professional_tone', 'articulation', 'persuasiveness', 'executive_presence', 'sentence_flow'].map((key) => {
                const val = (latestScore?.[key] ?? 0) as number
                return (
                  <div key={key} className="flex items-center gap-4">
                    <span className="text-xs w-36 capitalize" style={{ color: 'var(--muted)' }}>{key.replace(/_/g, ' ')}</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${val}%`, background: val >= 75 ? '#2e7d32' : val >= 50 ? '#f57f17' : '#c62828' }} />
                    </div>
                    <span className="font-mono text-sm w-8 text-right" style={{ color: 'var(--text)' }}>{Math.round(val)}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="card flex flex-col">
          <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--purple)' }}>Plan</h2>
          {sub ? (
            <>
              <div className="text-2xl font-mono font-semibold capitalize mb-1" style={{ color: 'var(--violet)' }}>{sub.tier}</div>
              <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>Renews {fmt.date(sub.current_period_end)}</p>
              <Link href="/account/billing" className="btn-secondary text-sm text-center mt-auto">Manage billing</Link>
            </>
          ) : (
            <>
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>No active subscription</p>
              <Link href="/account/billing" className="btn-primary text-sm text-center mt-auto">Upgrade</Link>
            </>
          )}
        </div>
      </div>

      {recentSessions && recentSessions.length > 0 && (
        <div className="card mt-6">
          <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--purple)' }}>Recent sessions</h2>
          <div className="space-y-3">
            {recentSessions.map((s) => {
              const scores = s.semantic_scores_jsonb as any
              const metrics = s.metrics_jsonb as any
              return (
                <Link key={s.id} href={`/speech/sessions/${s.id}`} className="flex items-center justify-between p-4 rounded-lg hover:bg-lilac transition-colors border" style={{ borderColor: 'var(--line)' }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--purple)' }}>{fmt.relativeDate(s.created_at)}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                      {metrics?.wpm ? `${metrics.wpm} wpm` : ''}{metrics?.duration_seconds ? ` · ${fmt.duration(metrics.duration_seconds)}` : ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {scores?.overall !== undefined && <span className="font-mono text-lg font-semibold" style={{ color: scores.overall >= 75 ? '#2e7d32' : scores.overall >= 50 ? '#f57f17' : '#c62828' }}>{Math.round(scores.overall)}</span>}
                    <span style={{ color: 'var(--muted)' }}>→</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
