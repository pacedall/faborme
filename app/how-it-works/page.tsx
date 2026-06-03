import Link from 'next/link'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'

export const metadata = {
  title: 'How it works',
  description: 'How FaborMe analyses your speech and builds a personalised coaching plan to improve your professional communication.',
}

const STEPS = [
  { number: '01', title: 'Record a session', body: 'Speak for 60–120 seconds. Answer a coaching prompt, deliver a presentation opening, or speak freely. The app records directly in your browser — no downloads, no hardware.', detail: 'Sessions work on desktop or mobile. Use structured prompts from our curriculum or speak freely.' },
  { number: '02', title: 'AI transcribes and analyses', body: 'Your audio is processed by Deepgram\u2019s UK English speech model — trained on British accents, not US English. Every word is timestamped and phonetically analysed.', detail: 'The pipeline measures words per minute, filler word frequency, pause distribution, and articulation.' },
  { number: '03', title: 'Scores across 8 dimensions', body: 'Our AI scores your session on confidence, clarity, articulation, pace, persuasiveness, professional tone, executive presence, and sentence flow. Numbers, not adjectives.', detail: 'Scores are calibrated against professional communication benchmarks — so 80 means something concrete.' },
  { number: '04', title: 'Receive specific coaching', body: 'Not "speak more clearly" — but "you used sort of 14 times, which is reducing your authority score by an estimated 8 points. Here\u2019s a drill."', detail: 'Coaching is tied to your specific patterns, not generic best-practice advice.' },
  { number: '05', title: 'Track your improvement', body: 'Your dashboard shows every dimension over time. The goal isn\u2019t a good session — it\u2019s a measurably better you over 4, 8, 12 weeks.', detail: 'Progress tracking includes streaks, week-over-week comparisons, and module completion.' },
]

const MODULES = [
  { num: '01', title: 'Breath, support & projection', exercises: 8 },
  { num: '02', title: 'Consonant articulation', exercises: 10 },
  { num: '03', title: 'Vowel placement & rounding', exercises: 8 },
  { num: '04', title: 'Pace & pause architecture', exercises: 6 },
  { num: '05', title: 'Pitch variance & intonation', exercises: 8 },
  { num: '06', title: 'Filler elimination', exercises: 6 },
  { num: '07', title: 'Accent softening', exercises: 8 },
  { num: '08', title: 'Performance under pressure', exercises: 6 },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <section className="pt-40 pb-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--violet)' }}>How it works</p>
          <h1 className="font-display font-semibold leading-tight tracking-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--purple)' }}>From recording to coaching in under 30 seconds.</h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>A five-stage pipeline processes your voice and turns it into measurable, actionable intelligence about how you communicate.</p>
        </div>
      </section>

      <section className="py-12 px-6 border-y" style={{ background: 'var(--purple)', borderColor: 'var(--purple)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {['Record', 'Transcribe', 'Analyse', 'Score', 'Coach'].map((stage, i) => (
              <div key={stage} className="flex items-center gap-3">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-sm font-bold mx-auto mb-2" style={{ background: 'rgba(169,139,239,0.15)', color: 'var(--violet-light)', border: '1px solid rgba(169,139,239,0.3)' }}>{String(i + 1).padStart(2, '0')}</div>
                  <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{stage}</p>
                </div>
                {i < 4 && <div className="hidden md:block w-8 h-px" style={{ background: 'rgba(255,255,255,0.2)' }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-24">
            {STEPS.map((step) => (
              <div key={step.number} className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <span className="font-mono text-5xl font-bold" style={{ color: 'var(--line)' }}>{step.number}</span>
                  <h2 className="font-display text-4xl font-semibold mt-2 mb-5" style={{ color: 'var(--purple)' }}>{step.title}</h2>
                  <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text)' }}>{step.body}</p>
                  <p className="text-sm leading-relaxed pl-4 border-l-2" style={{ color: 'var(--muted)', borderLeftColor: 'var(--violet)' }}>{step.detail}</p>
                </div>
                <div className="rounded-2xl p-8 flex items-center justify-center min-h-48" style={{ background: 'var(--lilac)', border: '1px solid var(--line)' }}>
                  <div className="text-center">
                    <div className="font-mono text-6xl font-bold mb-2" style={{ color: 'var(--purple)', opacity: 0.12 }}>{step.number}</div>
                    <div className="font-display text-xl font-semibold" style={{ color: 'var(--purple)' }}>{step.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="speech" className="py-32 px-6" style={{ background: 'var(--lilac)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--violet)' }}>The curriculum</p>
            <h2 className="font-display text-5xl font-semibold tracking-tight" style={{ color: 'var(--purple)' }}>60 exercises. 8 modules.<br />One clear sequence.</h2>
            <p className="text-base mt-4 max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>Structured like a real elocution programme — not a random collection of drills. The order is intentional. Foundation skills come before performance skills.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {MODULES.map((m) => (
              <div key={m.num} className="bg-white rounded-xl p-5 flex items-center gap-5" style={{ border: '1px solid var(--line)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-sm font-bold shrink-0" style={{ background: 'var(--purple)', color: 'var(--violet-light)' }}>{m.num}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: 'var(--purple)' }}>{m.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{m.exercises} exercises</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cv" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-center" style={{ color: 'var(--violet)' }}>The full suite</p>
          <h2 className="font-display text-5xl font-semibold tracking-tight text-center mb-16" style={{ color: 'var(--purple)' }}>Communication is more than how you speak.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: 'cv', icon: '◈', title: 'CV Review', body: 'Upload your CV. Our AI scores it against UK ATS conventions and gives you line-level edits — tailored to your target sector and role.' },
              { id: 'linkedin', icon: '◇', title: 'LinkedIn Optimiser', body: 'Paste your current profile. We rewrite your headline, About section, and experience bullets in UK recruiter idiom.' },
              { id: 'interview', icon: '◉', title: 'Interview Practice', body: 'Behavioural, technical, and speech-led practice sessions. Scored on STAR structure, evidence, clarity, and relevance.' },
            ].map((m) => (
              <div key={m.id} id={m.id} className="rounded-2xl p-8" style={{ background: 'var(--lilac)', border: '1px solid var(--line)' }}>
                <div className="text-3xl mb-5" style={{ color: 'var(--violet)' }}>{m.icon}</div>
                <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--purple)' }}>{m.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center" style={{ background: 'var(--purple)' }}>
        <h2 className="font-display text-4xl font-semibold text-white mb-6">Ready to start?</h2>
        <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm" style={{ background: 'var(--violet-light)', color: 'var(--purple)' }}>Create your free account →</Link>
      </section>

      <SiteFooter />
    </div>
  )
}
