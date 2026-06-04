import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { fmt } from '@/lib/fmt'
import ScoreRing from '@/components/ui/ScoreRing'

export default async function SessionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return notFound()

  const { data: session } = await supabase.from('speech_sessions').select('*').eq('id', id).eq('user_id', user.id).single()
  if (!session) return notFound()

  const scores = session.semantic_scores_jsonb as any
  const metrics = session.metrics_jsonb as any
  const transcript = session.transcript_jsonb as any
  const isPending = ['pending', 'transcribing', 'analysing', 'scoring', 'synthesising'].includes(session.status)

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-16">
          <div className="text-5xl mb-6 animate-spin">◎</div>
          <h1 className="font-display text-2xl font-semibold mb-2" style={{ color: 'var(--purple)' }}>Analysing your session</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Status: {session.status} — this usually takes 15–25 seconds.</p>
          <p className="text-xs mt-4" style={{ color: 'var(--muted)' }}>Refresh the page in a moment to see your results.</p>
          <div className="mt-8"><Link href="/speech" className="btn-secondary text-sm py-2 px-5">Back to sessions</Link></div>
        </div>
      </div>
    )
  }

  if (session.status === 'failed') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-12">
          <p className="text-red-600 font-medium mb-4">This session failed to process.</p>
          <Link href="/speech" className="btn-primary text-sm py-2 px-5">Try again</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/speech" className="text-sm hover:underline" style={{ color: 'var(--muted)' }}>← Sessions</Link>
        <span style={{ color: 'var(--line)' }}>/</span>
        <span className="text-sm" style={{ color: 'var(--purple)' }}>{fmt.date(session.created_at)}</span>
      </div>

      <div className="card mb-6 p-8 text-center" style={{ background: 'var(--purple)', borderColor: 'var(--purple)' }}>
        <div className="flex justify-center mb-4"><ScoreRing score={scores?.overall ?? 0} size={100} colour="#A98BEF" /></div>
        <h1 className="font-display text-3xl font-semibold text-white mb-2">Overall score: {Math.round(scores?.overall ?? 0)}</h1>
        {scores?.summary && <p className="text-sm max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>{scores.summary}</p>}
        <div className="flex justify-center gap-6 mt-6 text-white/60 text-sm">
          {metrics?.wpm && <span>{metrics.wpm} wpm</span>}
          {metrics?.duration_seconds && <span>{fmt.duration(metrics.duration_seconds)}</span>}
          {metrics?.filler_count !== undefined && <span>{metrics.filler_count} filler word{metrics.filler_count !== 1 ? 's' : ''}</span>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="font-display text-xl font-semibold mb-6" style={{ color: 'var(--purple)' }}>Dimension scores</h2>
          <div className="grid grid-cols-2 gap-4">
            {[['confidence', 'Confidence'], ['clarity', 'Clarity'], ['professional_tone', 'Tone'], ['articulation', 'Articulation'], ['persuasiveness', 'Persuasion'], ['executive_presence', 'Presence'], ['sentence_flow', 'Flow']].map(([key, label]) => (
              <ScoreRing key={key} score={scores?.[key] ?? 0} size={64} label={label} />
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--purple)' }}>Coaching feedback</h2>
          {scores?.key_strengths?.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: 'var(--violet)' }}>Strengths</p>
              <ul className="space-y-1">{scores.key_strengths.map((s: string, i: number) => (<li key={i} className="text-sm flex gap-2"><span style={{ color: '#2e7d32' }}>✓</span> {s}</li>))}</ul>
            </div>
          )}
          {scores?.improvements?.length > 0 && (
            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>To improve</p>
              <ul className="space-y-1">{scores.improvements.map((s: string, i: number) => (<li key={i} className="text-sm flex gap-2"><span style={{ color: 'var(--violet)' }}>→</span> {s}</li>))}</ul>
            </div>
          )}
          {metrics?.filler_words?.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Filler words detected</p>
              <div className="flex flex-wrap gap-2">{metrics.filler_words.map((w: string) => (<span key={w} className="px-2 py-1 text-xs rounded-full" style={{ background: '#fce4ec', color: '#c62828' }}>"{w}"</span>))}</div>
            </div>
          )}
        </div>
      </div>

      {transcript?.transcript && (
        <div className="card mb-6">
          <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--purple)' }}>Transcript</h2>
          <p className="text-sm leading-relaxed prose-uk">{transcript.transcript}</p>
        </div>
      )}

      <div className="flex gap-3">
        <Link href="/speech" className="btn-secondary">Record another session</Link>
        <Link href="/coach" className="btn-gold text-sm py-3 px-5">Request coach review</Link>
      </div>
    </div>
  )
}
