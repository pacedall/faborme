'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AudioRecorder from '@/components/speech/AudioRecorder'
import Link from 'next/link'

const PROMPTS = [
  "Tell me about a time you had to persuade someone to change their view.",
  "Describe your biggest professional achievement in the last 12 months.",
  "Walk me through how you approach a complex problem at work.",
  "What makes you particularly effective in your role?",
  "Describe a situation where you had to communicate under pressure.",
]

export default function SpeechPage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState(PROMPTS[0])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleRecordingComplete = async (blob: Blob) => {
    setUploading(true); setError('')
    try {
      const formData = new FormData()
      formData.append('audio', blob, 'recording.webm')
      formData.append('prompt', prompt)
      const res = await fetch('/api/speech/sessions', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Upload failed')
      const { sessionId } = await res.json()
      router.push(`/speech/sessions/${sessionId}`)
    } catch (e: any) {
      setError(e.message || 'Something went wrong'); setUploading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold" style={{ color: 'var(--purple)' }}>Speech session</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Speak for 60–120 seconds. Your response is analysed across 8 dimensions.</p>
      </div>

      <div className="card mb-6">
        <h2 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--purple)' }}>Choose your prompt</h2>
        <div className="space-y-2">
          {PROMPTS.map((p) => (
            <button key={p} onClick={() => setPrompt(p)} className="w-full text-left px-4 py-3 rounded-lg border text-sm transition-all"
              style={{ borderColor: prompt === p ? 'var(--purple)' : 'var(--line)', background: prompt === p ? 'var(--lilac)' : 'transparent', color: 'var(--text)' }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-6 mb-6 border-l-4" style={{ background: 'var(--lilac)', borderLeftColor: 'var(--violet)' }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: 'var(--violet)' }}>Your prompt</p>
        <p className="font-display text-lg font-semibold leading-snug" style={{ color: 'var(--purple)' }}>{prompt}</p>
      </div>

      {!uploading ? (
        <AudioRecorder onRecordingComplete={handleRecordingComplete} maxSeconds={120} />
      ) : (
        <div className="card text-center py-12">
          <div className="text-4xl mb-4 animate-spin">◎</div>
          <p className="font-medium" style={{ color: 'var(--purple)' }}>Analysing your session…</p>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Transcribing → Measuring → Scoring — usually about 20 seconds</p>
        </div>
      )}

      {error && <div className="mt-4 p-4 rounded-lg text-sm text-red-700" style={{ background: '#fce4ec' }}>{error}</div>}

      <div className="mt-8 card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--purple)' }}>Structured curriculum</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>60 exercises across 8 modules</p>
          </div>
          <Link href="/speech/exercises" className="btn-secondary text-sm py-2 px-4">View exercises</Link>
        </div>
      </div>
    </div>
  )
}
