'use client'

import { useState } from 'react'

export default function CVPage() {
  const [file, setFile] = useState<File | null>(null)
  const [targetRole, setTargetRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    setLoading(true); setError('')
    const formData = new FormData()
    formData.append('file', file)
    formData.append('targetRole', targetRole)
    try {
      const res = await fetch('/api/cv/upload', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Upload failed')
      setResult(await res.json())
    } catch (e: any) { setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold" style={{ color: 'var(--purple)' }}>CV Review</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Upload your CV. We'll score it against UK ATS conventions and give you line-level feedback.</p>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="card space-y-6">
          <div>
            <label className="label">Your CV (PDF or DOCX)</label>
            <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors"
              style={{ borderColor: file ? 'var(--purple)' : 'var(--line)', background: file ? 'var(--lilac)' : 'transparent' }}
              onClick={() => document.getElementById('cv-file')?.click()}>
              <input id="cv-file" type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              {file ? <p className="font-medium text-sm" style={{ color: 'var(--purple)' }}>✓ {file.name}</p> : (
                <>
                  <p className="text-sm font-medium" style={{ color: 'var(--purple)' }}>Click to upload or drag and drop</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>PDF or DOCX · max 10 MB</p>
                </>
              )}
            </div>
          </div>
          <div>
            <label className="label">Target role (optional)</label>
            <input type="text" className="input" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g. Senior Associate, Goldman Sachs" />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={!file || loading} className="btn-primary w-full">{loading ? 'Reviewing…' : 'Review my CV'}</button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="card text-center p-8" style={{ background: 'var(--purple)', borderColor: 'var(--purple)' }}>
            <p className="text-white/60 text-sm uppercase tracking-widest mb-2">ATS Score</p>
            <div className="font-mono text-6xl font-semibold" style={{ color: 'var(--violet-light)' }}>{result.ats_score}</div>
            <p className="text-white/70 text-sm mt-3 max-w-md mx-auto">{result.overall_impression}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--purple)' }}>Strengths</h2>
              <ul className="space-y-2">{result.strengths?.map((s: string, i: number) => (<li key={i} className="flex gap-2 text-sm"><span style={{ color: '#2e7d32' }}>✓</span> {s}</li>))}</ul>
            </div>
            <div className="card">
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--purple)' }}>Critical Issues</h2>
              <ul className="space-y-2">{result.critical_issues?.map((s: string, i: number) => (<li key={i} className="flex gap-2 text-sm"><span className="text-red-500">✗</span> {s}</li>))}</ul>
            </div>
          </div>

          {result.line_edits?.length > 0 && (
            <div className="card">
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--purple)' }}>Line edits</h2>
              <div className="space-y-4">
                {result.line_edits.map((edit: any, i: number) => (
                  <div key={i} className="border rounded-lg p-4" style={{ borderColor: 'var(--line)' }}>
                    <p className="text-sm line-through mb-1" style={{ color: 'var(--muted)' }}>{edit.original}</p>
                    <p className="text-sm font-medium mb-1" style={{ color: 'var(--purple)' }}>{edit.suggested}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{edit.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.likely_interview_questions?.length > 0 && (
            <div className="card">
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--purple)' }}>Likely interview questions from this CV</h2>
              <ol className="space-y-2">
                {result.likely_interview_questions.map((q: string, i: number) => (
                  <li key={i} className="flex gap-3 text-sm"><span className="font-mono font-medium" style={{ color: 'var(--violet)' }}>{String(i+1).padStart(2,'0')}</span> {q}</li>
                ))}
              </ol>
            </div>
          )}

          <button onClick={() => setResult(null)} className="btn-secondary">Upload another CV</button>
        </div>
      )}
    </div>
  )
}
