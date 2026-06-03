import Link from 'next/link'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'

export const metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing. No promotional pricing. No auto-converting trials. Cancel anytime in 3 clicks.',
}

const PLANS = [
  { tier: 'starter', label: 'Starter', price: 15, tagline: 'For professionals building the habit.', features: ['10 speech sessions per month', 'Full AI scoring — all 8 dimensions', 'Progress dashboard', 'Weekly summary emails', 'Structured curriculum access', 'Filler word tracking'], cta: 'Start with Starter', featured: false },
  { tier: 'practitioner', label: 'Practitioner', price: 29, tagline: 'For professionals in active preparation.', features: ['25 speech sessions per month', 'Everything in Starter', 'CV review with UK ATS scoring', 'LinkedIn profile optimisation', 'Interview practice (3 modes)', 'Sector-specific question banks'], cta: 'Start with Practitioner', featured: true },
  { tier: 'premium', label: 'Premium', price: 49, tagline: 'For leaders who want the human layer.', features: ['Unlimited speech sessions', 'Everything in Practitioner', 'One human coach review per month', 'Video feedback within 48 hours', 'Priority support', 'Coach session history archive'], cta: 'Start with Premium', featured: false },
]

const FAQS = [
  { q: 'Is there a free trial?', a: 'Your first diagnostic session is free with no card required. You\u2019ll see your full scores before deciding whether to subscribe.' },
  { q: 'Can I cancel anytime?', a: 'Yes. There are exactly 3 clicks between your dashboard and a confirmed cancellation. No exit interview. No retention modal. You keep access until the end of the billing period.' },
  { q: 'What happens to my audio recordings?', a: 'Your audio files are deleted from our servers 24 hours after processing. We retain your transcript and scores — not your voice.' },
  { q: 'How does the human coach review work?', a: 'Premium subscribers can request one review per calendar month. A real coach watches your most recent session, records a personalised video response, and delivers it within 48 hours.' },
  { q: 'Is this GDPR compliant?', a: 'Yes. We\u2019re hosted in the EU. Audio is deleted after 24 hours. You can export or delete all your data at any time from your account settings.' },
  { q: 'Can I switch plans?', a: 'Yes — upgrade or downgrade at any time. Changes take effect at the start of the next billing period.' },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <section className="pt-40 pb-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--violet)' }}>Pricing</p>
          <h1 className="font-display font-semibold leading-tight tracking-tight mb-5" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--purple)' }}>Honest pricing.<br />No tricks.</h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>No promotional pricing that auto-converts. No hidden downgrade fees. No dark patterns. Just a fair monthly subscription you can cancel in 3 clicks.</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.tier} className="rounded-2xl p-8 flex flex-col relative" style={{ border: plan.featured ? '2px solid var(--purple)' : '1px solid var(--line)', background: plan.featured ? 'var(--purple)' : 'white', boxShadow: plan.featured ? '0 20px 60px rgba(63,13,162,0.2)' : 'none' }}>
                {plan.featured && (<div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold" style={{ background: 'var(--violet-light)', color: 'var(--purple)' }}>Most popular</div>)}
                <div className="mb-6">
                  <p className="font-semibold text-sm mb-1" style={{ color: plan.featured ? 'rgba(255,255,255,0.6)' : 'var(--muted)' }}>{plan.label}</p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-mono font-bold" style={{ fontSize: '3rem', lineHeight: 1, color: plan.featured ? 'var(--violet-light)' : 'var(--purple)' }}>£{plan.price}</span>
                    <span className="text-sm" style={{ color: plan.featured ? 'rgba(255,255,255,0.45)' : 'var(--muted)' }}>/mo</span>
                  </div>
                  <p className="text-sm" style={{ color: plan.featured ? 'rgba(255,255,255,0.55)' : 'var(--muted)' }}>{plan.tagline}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 shrink-0" style={{ color: 'var(--violet-light)' }}>✓</span>
                      <span style={{ color: plan.featured ? 'rgba(255,255,255,0.75)' : 'var(--text)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-150" style={plan.featured ? { background: 'var(--violet-light)', color: 'var(--purple)' } : { background: 'var(--purple)', color: 'white' }}>{plan.cta}</Link>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm" style={{ color: 'var(--muted)' }}>All plans include a free diagnostic session. No card required to start.</p>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: 'var(--lilac)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-semibold text-center mb-12" style={{ color: 'var(--purple)' }}>Compare plans</h2>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--lilac)' }}>
                  <th className="text-left p-5 text-sm font-semibold" style={{ color: 'var(--purple)' }}>Feature</th>
                  {['Starter', 'Practitioner', 'Premium'].map((t) => (<th key={t} className="p-5 text-sm font-semibold" style={{ color: 'var(--purple)' }}>{t}</th>))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Monthly sessions', '10', '25', 'Unlimited'],
                  ['AI scoring — 8 dimensions', '✓', '✓', '✓'],
                  ['Progress dashboard', '✓', '✓', '✓'],
                  ['Speech curriculum (60 exercises)', '✓', '✓', '✓'],
                  ['CV review', '—', '✓', '✓'],
                  ['LinkedIn optimiser', '—', '✓', '✓'],
                  ['Interview practice', '—', '✓', '✓'],
                  ['Human coach review', '—', '—', '1/month'],
                  ['Video feedback (48hr)', '—', '—', '✓'],
                  ['Priority support', '—', '—', '✓'],
                ].map(([feature, ...vals]) => (
                  <tr key={feature} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td className="p-5 text-sm font-medium" style={{ color: 'var(--purple)' }}>{feature}</td>
                    {vals.map((v, i) => (<td key={i} className="p-5 text-sm text-center" style={{ color: v === '—' ? 'var(--line)' : v === '✓' ? '#2e7d32' : 'var(--purple)' }}>{v}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl font-semibold text-center mb-16" style={{ color: 'var(--purple)' }}>Questions</h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border-b pb-6" style={{ borderColor: 'var(--line)' }}>
                <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--purple)' }}>{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center" style={{ background: 'var(--purple)' }}>
        <h2 className="font-display text-4xl font-semibold text-white mb-4">Start your first session free.</h2>
        <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>No card. No commitment. Cancel whenever you want.</p>
        <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm" style={{ background: 'var(--violet-light)', color: 'var(--purple)' }}>Create account →</Link>
      </section>

      <SiteFooter />
    </div>
  )
}
