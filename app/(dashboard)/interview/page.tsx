'use client'

import { useState } from 'react'

const MODES = [
  { value: 'behavioural', label: 'Behavioural', desc: 'STAR-method competency questions tailored to your sector' },
  { value: 'technical', label: 'Technical', desc: 'Sector-specific knowledge and case prompts' },
  { value: 'speech_led', label: 'Speech-led', desc: 'Behavioural questions with communication analysis' },
]
const SECTORS = ['Finance', 'Legal', 'Consulting', 'Technology', 'Public Sector', 'Other']

export default function InterviewPage() {
  const [mode, setMode] = useState('behavioural')
  const [sector, setSector] = useState('Consulting')
  const [stage, setStage] = useState<'setup' | 'session' | 'results'>('setup')
  const [questions, setQuestions] = useState<string[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [scores, setScores] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const startSession = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/interview/sessions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode, sector, action: 'generate_questions' }) })
      const data = await res.json()
      setQuestions(data.questions || []); setStage('session'); setCurrent(0); setAnswers([])
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  const submitAnswer = async () => {
    if (!currentAnswer.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/interview/sessions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'score_answer', question: questions[current], answer: currentAnswer, mode, sector }) })
      const data = await res.json()
      setAnswers([...answers, currentAnswer]); setScores([...scores, data.score]); setCurrentAnswer('')
      if (current + 1 >= questions.length) setStage('results')
      else setCurrent((c) => c + 1)
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold" style={{ color: 'var(--purple)' }}>Interview practice</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Coaching-frame practice. No live copilot. Build the skill, not the crutch.</p>
      </div>

      {stage === 'setup' && (
        <div className="card space-y-6">
          <div>
            <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--purple)' }}>Session mode</h2>
            <div className="space-y-3">
              {MODES.map((m) => (
                <button key={m.value} onClick={() => setMode(m.value)} className="w-full text-left p-4 rounded-lg border transition-all"
                  style={{ borderColor: mode === m.value ? 'var(--purple)' : 'var(--line)', background: mode === m.value ? 'var(--lilac)' : 'transparent' }}>
                  <div className="font-medium text-sm" style={{ color: 'var(--purple)' }}>{m.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{m.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--purple)' }}>Sector</h2>
            <div className="flex flex-wrap gap-2">
              {SECTORS.map((s) => (
                <button key={s} onClick={() => setSector(s)} className="px-4 py-2 rounded-lg text-sm border transition-all"
                  style={sector === s ? { background: 'var(--purple)', borderColor: 'var(--purple)', color: 'white' } : { borderColor: 'var(--line)' }}>{s}</button>
              ))}
            </div>
          </div>
          <button onClick={startSession} disabled={loading} className="btn-primary w-full">{loading ? 'Generating questions…' : 'Start session'}</button>
        </div>
      )}

      {stage === 'session' && questions.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Question {current + 1} of {questions.length}</span>
            <div className="flex gap-1">{questions.map((_, i) => (<div key={i} className="w-2 h-2 rounded-full" style={{ background: i < current ? 'var(--violet)' : i === current ? 'var(--purple)' : 'var(--line)' }} />))}</div>
          </div>
          <div className="rounded-xl p-6 mb-6 border-l-4" style={{ background: 'var(--lilac)', borderLeftColor: 'var(--violet)' }}>
            <p className="font-display text-xl font-semibold leading-snug" style={{ color: 'var(--purple)' }}>{questions[current]}</p>
          </div>
          <div>
            <label className="label">Your answer</label>
            <textarea className="input min-h-40" value={currentAnswer} onChange={(e) => setCurrentAnswer(e.target.value)} placeholder="Type your answer. Use STAR where applicable: Situation → Task → Action → Result" />
          </div>
          <button onClick={submitAnswer} disabled={loading || !currentAnswer.trim()} className="btn-primary w-full mt-4">{loading ? 'Scoring…' : current + 1 < questions.length ? 'Submit & next question' : 'Submit final answer'}</button>
        </div>
      )}

      {stage === 'results' && (
        <div className="space-y-6">
          <div className="card text-center p-8" style={{ background: 'var(--purple)' }}>
            <h2 className="font-display text-3xl font-semibold text-white mb-2">Session complete</h2>
            <div className="font-mono text-5xl font-semibold" style={{ color: 'var(--violet-light)' }}>{Math.round(scores.reduce((a, s) => a + (s?.overall ?? 0), 0) / scores.length)}</div>
            <p className="text-white/60 text-sm mt-1">Average score across {scores.length} answers</p>
          </div>
          {scores.map((score, i) => (
            <div key={i} className="card">
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Q{i + 1}: {questions[i]}</p>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {['structure', 'evidence', 'clarity', 'relevance'].map((k) => (
                  <div key={k} className="text-center">
                    <div className="font-mono text-xl font-semibold" style={{ color: 'var(--violet)' }}>{score?.[k] ?? 0}</div>
                    <div className="text-xs capitalize" style={{ color: 'var(--muted)' }}>{k}</div>
                  </div>
                ))}
              </div>
              {score?.improvements?.length > 0 && (
                <ul className="space-y-1">{score.improvements.map((imp: string, j: number) => (<li key={j} className="text-xs flex gap-2" style={{ color: 'var(--muted)' }}><span style={{ color: 'var(--violet)' }}>→</span> {imp}</li>))}</ul>
              )}
            </div>
          ))}
          <button onClick={() => { setStage('setup'); setScores([]); setAnswers([]) }} className="btn-secondary">New session</button>
        </div>
      )}
    </div>
  )
}
