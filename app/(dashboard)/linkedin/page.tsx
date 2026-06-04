'use client'

import { useState } from 'react'

export default function LinkedInPage() {
  const [headline, setHeadline] = useState('')
  const [about, setAbout] = useState('')
  const [experience, setExperience] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/linkedin/rewrite', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ headline, about, experience }) })
      if (!res.ok) throw new Error('Rewrite failed')
      setResult(await res.json())
    } catch (e: any) { setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold" style={{ color: 'var(--purple)' }}>LinkedIn Optimiser</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Paste in your current profile. Get a rewrite tuned for UK recruiters.</p>
      </div>

      <div className={result ? 'grid md:grid-cols-2 gap-6' : ''}>
        <form onSubmit={handleSubmit} className="card space-y-5">
          <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--purple)' }}>Your current profile</h2>
          <div>
            <label className="label">Headline</label>
            <input type="text" className="input" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="e.g. Senior Product Manager at Barclays" required />
          </div>
          <div>
            <label className="label">About section</label>
            <textarea className="input min-h-32" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Your current about text…" required />
          </div>
          <div>
            <label className="label">Recent experience summary</label>
            <textarea className="input min-h-24" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Key bullet points from your most recent role…" required />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Rewriting…' : 'Rewrite for UK recruiters'}</button>
        </form>

        {result && (
          <div className="card space-y-5">
            <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--purple)' }}>Optimised profile</h2>
            <div>
              <label className="label text-xs uppercase tracking-widest" style={{ color: 'var(--violet)' }}>New headline</label>
              <p className="text-sm font-medium p-3 rounded-lg" style={{ background: 'var(--lilac)', color: 'var(--purple)' }}>{result.headline}</p>
            </div>
            <div>
              <label className="label text-xs uppercase tracking-widest" style={{ color: 'var(--violet)' }}>New about</label>
              <p className="text-sm leading-relaxed p-3 rounded-lg whitespace-pre-line" style={{ background: 'var(--lilac)', color: 'var(--text)' }}>{result.about}</p>
            </div>
            <div>
              <label className="label text-xs uppercase tracking-widest" style={{ color: 'var(--violet)' }}>Experience bullets</label>
              <ul className="space-y-1">{result.experience_bullets?.map((b: string, i: number) => (<li key={i} className="flex gap-2 text-sm p-2 rounded" style={{ background: 'var(--lilac)' }}><span style={{ color: 'var(--violet)' }}>•</span> {b}</li>))}</ul>
            </div>
            {result.changes_summary && <div className="p-3 rounded-lg text-sm" style={{ background: '#e8f5e9', color: '#2e7d32' }}>{result.changes_summary}</div>}
            <button onClick={() => setResult(null)} className="btn-secondary text-sm">Start over</button>
          </div>
        )}
      </div>
    </div>
  )
}
