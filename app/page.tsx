import Link from 'next/link'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'

export const metadata = {
  title: 'FaborMe — AI Communication Coaching for Professionals',
  description: 'AI-powered professional communication performance. Sound clearer, more confident, and more authoritative — measurably.',
}

const SCORES = [
  { label: 'Confidence', value: 84 },
  { label: 'Clarity', value: 91 },
  { label: 'Articulation', value: 76 },
  { label: 'Executive Presence', value: 88 },
  { label: 'Persuasiveness', value: 72 },
  { label: 'Sentence Flow', value: 95 },
]

const TESTIMONIALS = [
  { quote: 'After four weeks with FaborMe my speaking pace dropped from frantic to authoritative. I got the promotion.', name: 'Priya S.', role: 'Senior Manager, Big Four' },
  { quote: 'My filler-word count went from 22 per minute to 3. The before-and-after data alone was worth the subscription.', name: 'Marcus H.', role: 'Management Consultant, London' },
  { quote: 'As a non-native speaker, this gave me the specific feedback I needed — not generic confidence tips.', name: 'Yuki T.', role: 'Investment Analyst, City of London' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SiteNav />

      <section className="relative min-h-screen flex items-center pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5" style={{ background: 'radial-gradient(ellipse at 80% 20%, #6B3FD4 0%, transparent 60%)' }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 opacity-5 rounded-full" style={{ background: 'var(--purple)', filter: 'blur(80px)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="#3F0DA2" strokeWidth="1"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto w-full relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-8" style={{ borderColor: 'var(--violet)', color: 'var(--violet)', background: 'var(--lilac)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--violet)' }} />
                AI Communication Coaching
              </div>
              <h1 className="font-display font-semibold leading-[1.05] tracking-tight mb-8" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: 'var(--purple)' }}>
                Sound as good<br /><em className="not-italic" style={{ color: 'var(--violet)' }}>as you think.</em>
              </h1>
              <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: 'var(--muted)' }}>
                FaborMe analyses how you speak and delivers a personalised coaching plan to build clarity, confidence, and authority — with scores that move as you improve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-sm transition-all duration-150" style={{ background: 'var(--purple)', boxShadow: '0 4px 24px rgba(63,13,162,0.2)' }}>
                  Start your diagnostic — free <span>→</span>
                </Link>
                <Link href="/how-it-works" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border transition-all duration-150" style={{ borderColor: 'var(--line)', color: 'var(--purple)' }}>
                  See how it works
                </Link>
              </div>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>No credit card · Cancel anytime in 3 clicks · GDPR compliant</p>
            </div>

            <div className="relative hidden lg:block">
              <div className="rounded-2xl p-8 shadow-2xl" style={{ background: 'var(--purple)', boxShadow: '0 32px 80px rgba(63,13,162,0.35)' }}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Session score</p>
                    <div className="font-mono text-5xl font-semibold" style={{ color: 'var(--violet-light)' }}>84</div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>vs last session</p>
                    <p className="text-lg font-mono font-semibold mt-1" style={{ color: '#4ade80' }}>+7 ↑</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {SCORES.map((s) => (
                    <div key={s.label} className="flex items-center gap-4">
                      <span className="text-xs w-36" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</span>
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: s.value >= 85 ? 'var(--violet-light)' : 'rgba(255,255,255,0.5)' }} />
                      </div>
                      <span className="font-mono text-sm w-8 text-right" style={{ color: 'rgba(255,255,255,0.7)' }}>{s.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--violet-light)' }}>Coaching insight</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    Strong clarity and flow. Eliminate filler words ("sort of", "you know") to push confidence past 90. Pause before key points — your pace is slightly fast.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl text-sm font-medium shadow-lg" style={{ background: 'white', border: '1px solid var(--line)', color: 'var(--purple)' }}>
                <span style={{ color: '#4ade80' }}>●</span> 12 filler words eliminated this week
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative -mt-px" aria-hidden="true">
        <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64 C240,16 480,16 720,52 C960,88 1200,104 1440,56 L1440,120 L0,120 Z" fill="var(--lilac)" />
          <path d="M0,80 C260,40 520,40 760,68 C1000,96 1220,108 1440,72" fill="none" stroke="var(--violet)" strokeWidth="3" opacity="0.5" />
        </svg>
      </div>

      <section className="py-12 px-6 border-y" style={{ background: 'var(--lilac)', borderColor: 'var(--line)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-medium uppercase tracking-widest mb-8" style={{ color: 'var(--muted)' }}>Who uses FaborMe</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {['Graduates entering competitive roles', 'Professionals preparing for promotion', 'Executives in high-stakes presentations', 'Non-native English speakers', 'Sales teams', 'Consultants and advisors'].map((item) => (
              <span key={item} className="text-sm font-medium" style={{ color: 'var(--purple)' }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--violet)' }}>The eight dimensions</p>
              <h2 className="font-display text-5xl font-semibold leading-tight tracking-tight mb-6" style={{ color: 'var(--purple)' }}>Every session scored across what actually matters.</h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                Most people know they want to "sound more confident". FaborMe tells you exactly which dimension is holding you back — and by how much.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Confidence', desc: 'Do you sound certain and in control?' },
                { label: 'Clarity', desc: 'Are your words landing without confusion?' },
                { label: 'Professional Tone', desc: 'Is your register appropriate for the room?' },
                { label: 'Speaking Pace', desc: 'Are you rushing, or owning the silence?' },
                { label: 'Articulation', desc: 'Are consonants and vowels landing cleanly?' },
                { label: 'Persuasiveness', desc: 'Does your argument move people?' },
                { label: 'Executive Presence', desc: 'Does your voice carry weight?' },
                { label: 'Sentence Flow', desc: 'Do your ideas connect naturally?' },
              ].map((d, i) => (
                <div key={d.label} className="rounded-xl p-5 border transition-all duration-200" style={{ borderColor: 'var(--line)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold mb-3" style={{ background: 'var(--lilac)', color: 'var(--violet)' }}>{String(i + 1).padStart(2, '0')}</div>
                  <p className="font-semibold text-sm mb-1" style={{ color: 'var(--purple)' }}>{d.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6" style={{ background: 'var(--purple)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: 'var(--violet-light)' }}>Why FaborMe</p>
          <h2 className="font-display text-5xl font-semibold leading-tight tracking-tight mb-6 text-white">Not another confidence app.</h2>
          <p className="text-lg leading-relaxed mb-20 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            FaborMe combines structured curriculum, phonetic analysis, and semantic AI scoring in one platform. It's the difference between a gym membership and a personal trainer who tracks every session.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { icon: '◎', title: 'Structured curriculum', body: '60 exercises across 8 modules — breath, consonants, vowels, pace, pitch, fillers, accent, and pressure. The sequence matters.' },
              { icon: '◈', title: 'Scores that move', body: 'Every session updates your dashboard. You see the numbers improve week by week — not just encouragement, but evidence.' },
              { icon: '◆', title: 'Human coach review', body: 'Premium subscribers get one expert review per month. A real coach watches your session and records personalised video feedback within 48 hours.' },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-2xl mb-4" style={{ color: 'var(--violet-light)' }}>{f.icon}</div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6" style={{ background: 'var(--lilac)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-center mb-16" style={{ color: 'var(--violet)' }}>Results</p>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 4px 24px rgba(63,13,162,0.06)' }}>
                <div className="text-3xl mb-6" style={{ color: 'var(--violet)' }}>"</div>
                <p className="text-sm leading-relaxed mb-6 font-medium" style={{ color: 'var(--purple)' }}>{t.quote}</p>
                <div className="border-t pt-4" style={{ borderColor: 'var(--line)' }}>
                  <p className="text-sm font-semibold" style={{ color: 'var(--purple)' }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-6xl font-semibold leading-tight tracking-tight mb-6" style={{ color: 'var(--purple)' }}>Your baseline is one session away.</h2>
          <p className="text-lg leading-relaxed mb-12" style={{ color: 'var(--muted)' }}>Record 90 seconds. Get your scores. Know exactly what to work on.</p>
          <Link href="/signup" className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-semibold text-white text-base transition-all duration-150" style={{ background: 'var(--purple)', boxShadow: '0 8px 32px rgba(63,13,162,0.25)' }}>
            Start your free diagnostic <span className="text-lg" style={{ color: 'var(--violet-light)' }}>→</span>
          </Link>
          <p className="mt-6 text-sm" style={{ color: 'var(--muted)' }}>No credit card. No trial-to-paid auto-convert. Cancel in 3 clicks if you ever want to.</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
