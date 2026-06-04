'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { SEGMENTS, SECTORS } from '@/lib/segments'
import type { UserSegment } from '@/types/database'

const STAGES = [
  { value: 'actively_looking', label: 'Actively job searching' },
  { value: 'preparing_promotion', label: 'Preparing for a promotion' },
  { value: 'general_improvement', label: 'Ongoing professional development' },
  { value: 'key_presentation', label: 'Preparing for a key presentation' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [segment, setSegment] = useState<UserSegment | ''>('')
  const [sector, setSector] = useState('')
  const [stage, setStage] = useState('')
  const [saving, setSaving] = useState(false)

  const handleComplete = async () => {
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('users').update({ segment }).eq('id', user.id)
    await supabase.from('user_profiles').upsert({ user_id: user.id, target_sector: sector })
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--lilac)' }}>
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: 'var(--violet)' }}>Quick setup</p>
          <h1 className="font-display text-4xl font-semibold" style={{ color: 'var(--purple)' }}>Tell us about yourself</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>3 quick questions so we can personalise your coaching</p>
        </div>

        <div className="card">
          {step === 0 && (
            <div>
              <h2 className="font-display text-xl font-semibold mb-6" style={{ color: 'var(--purple)' }}>How would you describe yourself?</h2>
              <div className="space-y-3">
                {(Object.entries(SEGMENTS) as [UserSegment, { label: string; description: string }][]).map(([key, val]) => (
                  <button key={key} onClick={() => { setSegment(key); setStep(1) }}
                    className="w-full text-left p-4 rounded-lg border transition-all" style={{ borderColor: segment === key ? 'var(--purple)' : 'var(--line)', background: segment === key ? 'var(--lilac)' : 'transparent' }}>
                    <div className="font-medium text-sm">{val.label}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{val.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <h2 className="font-display text-xl font-semibold mb-6" style={{ color: 'var(--purple)' }}>What sector do you work in?</h2>
              <div className="grid grid-cols-2 gap-3">
                {SECTORS.map((s) => (
                  <button key={s} onClick={() => { setSector(s); setStep(2) }}
                    className="text-left p-3 rounded-lg border text-sm transition-all" style={{ borderColor: sector === s ? 'var(--purple)' : 'var(--line)', background: sector === s ? 'var(--lilac)' : 'transparent' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="font-display text-xl font-semibold mb-6" style={{ color: 'var(--purple)' }}>What brings you to FaborMe right now?</h2>
              <div className="space-y-3">
                {STAGES.map((s) => (
                  <button key={s.value} onClick={() => setStage(s.value)}
                    className="w-full text-left p-4 rounded-lg border transition-all" style={{ borderColor: stage === s.value ? 'var(--purple)' : 'var(--line)', background: stage === s.value ? 'var(--lilac)' : 'transparent' }}>
                    <div className="font-medium text-sm">{s.label}</div>
                  </button>
                ))}
              </div>
              {stage && <button onClick={handleComplete} disabled={saving} className="btn-primary w-full mt-6">{saving ? 'Saving…' : 'Go to my dashboard →'}</button>}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (<div key={i} className="w-2 h-2 rounded-full transition-all" style={{ background: i <= step ? 'var(--purple)' : 'var(--line)' }} />))}
        </div>
      </div>
    </div>
  )
}
