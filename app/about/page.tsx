import Link from 'next/link'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'

export const metadata = {
  title: 'About',
  description: 'Why FaborMe exists, who it\u2019s for, and the principles that guide how we build it.',
}

const VALUES = [
  { title: 'Measurable, not motivational', body: 'Every claim FaborMe makes is backed by a number you can see change. We don\u2019t do "confidence tips". We tell you your executive presence score is 67 and show you the three drills most likely to move it.' },
  { title: 'Coaching frame, not copilot frame', body: 'There is no live overlay. No real-time whisper in your ear. FaborMe is a practice tool — and practice is the only thing that actually builds the skill. We help you become someone who performs better in every moment.' },
  { title: 'Transparent by design', body: 'Cancel in 3 clicks. No exit interview. No retention modal. No promotional pricing that auto-converts. This isn\u2019t generosity — it\u2019s positioning. If FaborMe doesn\u2019t earn your renewal every month, you should leave.' },
  { title: 'UK-native, not globally generic', body: 'Every template, benchmark, question bank, and accent target is built against UK professional conventions. British English, British recruiter expectations, British ATS systems. Specificity is the product.' },
  { title: 'Privacy as a feature', body: 'Your audio is deleted 24 hours after processing. We store your scores and transcript — not your voice. GDPR compliance isn\u2019t a checkbox for us; it\u2019s table stakes for anyone serious about professional trust.' },
]

const PRINCIPLES = [
  { num: '01', label: 'Speech is the moat', body: 'The speech engine gets the engineering investment. Everything else is built to a solid standard. The moat gets exceptional.' },
  { num: '02', label: 'The curriculum matters', body: 'Sixty exercises in a deliberate sequence — not a random drill library. Foundation before performance. Breath before pitch.' },
  { num: '03', label: 'Human-in-the-loop', body: 'The Premium tier isn\u2019t AI trying to simulate a coach. It\u2019s a real coach. The infrastructure to support that relationship is built from day one.' },
  { num: '04', label: 'Multi-tenant from day one', body: 'Every individual subscriber is inside an organisation record. When an employer wants seats, the schema is already ready.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <section className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--violet)' }}>About FaborMe</p>
          <h1 className="font-display font-semibold leading-[1.08] tracking-tight" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'var(--purple)' }}>The gap between how you think you sound and how you actually sound is the problem we solve.</h1>
        </div>
      </section>

      <section className="py-16 px-6 border-y" style={{ borderColor: 'var(--line)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: '68%', label: 'of professionals say communication is their biggest career barrier' },
              { stat: '£0', label: 'cost to self-improve — until FaborMe gave you a way to measure it' },
              { stat: '4 weeks', label: 'average time to see measurable improvement in filler word frequency' },
            ].map((s) => (
              <div key={s.stat} className="text-center">
                <div className="font-mono text-4xl font-bold mb-2" style={{ color: 'var(--purple)' }}>{s.stat}</div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--violet)' }}>Why we exist</p>
            <h2 className="font-display text-5xl font-semibold leading-tight tracking-tight" style={{ color: 'var(--purple)' }}>Communication coaching used to cost a fortune.</h2>
          </div>
          <div className="space-y-6">
            <p className="text-base leading-relaxed" style={{ color: 'var(--text)' }}>Elocution coaches. Voice coaches. Executive communication consultants. The kind of feedback that moves careers has always been available — to the people who could pay for it.</p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text)' }}>FaborMe is the version available to everyone else. The same diagnostic rigour. The same structured curriculum. The same measurable improvement path. At the price of a monthly coffee.</p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text)' }}>The product is unapologetically focused on professional English — the register that gets people hired, promoted, and listened to in UK workplaces. It is additive, not corrective. We are not suggesting your current voice is wrong. We are offering an additional capability.</p>
            <div className="pl-5 border-l-2 py-1" style={{ borderLeftColor: 'var(--violet)' }}>
              <p className="font-display text-xl font-semibold italic" style={{ color: 'var(--purple)' }}>"From unclear to commanding — every word lands with precision and confidence."</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6" style={{ background: 'var(--lilac)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-center" style={{ color: 'var(--violet)' }}>What we stand for</p>
          <h2 className="font-display text-5xl font-semibold tracking-tight text-center mb-16" style={{ color: 'var(--purple)' }}>Five things we refuse to compromise on.</h2>
          <div className="space-y-6">
            {VALUES.map((v, i) => (
              <div key={v.title} className="bg-white rounded-2xl p-8 grid md:grid-cols-4 gap-6 items-start" style={{ border: '1px solid var(--line)' }}>
                <div><span className="font-mono text-4xl font-bold" style={{ color: 'var(--line)' }}>{String(i + 1).padStart(2, '0')}</span></div>
                <div className="md:col-span-3">
                  <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--purple)' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6" style={{ background: 'var(--purple)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-center" style={{ color: 'var(--violet-light)' }}>Build principles</p>
          <h2 className="font-display text-5xl font-semibold tracking-tight text-center mb-16 text-white">How the product is made.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PRINCIPLES.map((p) => (
              <div key={p.num} className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="font-mono text-3xl font-bold mb-4" style={{ color: 'rgba(169,139,239,0.5)' }}>{p.num}</div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">{p.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-5xl font-semibold tracking-tight mb-6" style={{ color: 'var(--purple)' }}>Hear the difference.</h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--muted)' }}>One free diagnostic session. No card. No commitment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-sm" style={{ background: 'var(--purple)' }}>Get started free →</Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border" style={{ borderColor: 'var(--line)', color: 'var(--purple)' }}>View pricing</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
