import Link from 'next/link'
import Image from 'next/image'

export default function SiteFooter() {
  return (
    <footer style={{ background: 'var(--purple-deep)' }} className="text-white">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Image src="/faborme-logo-white.png" alt="FaborMe" width={160} height={58} className="h-10 w-auto mb-5" />
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
              AI-powered professional communication performance. Sound clearer, more confident, and more authoritative — measurably.
            </p>
            <Link href="/signup" className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg text-white" style={{ background: 'var(--violet)' }}>
              Start free →
            </Link>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Product</p>
            <ul className="space-y-3">
              {[['How it works', '/how-it-works'], ['Pricing', '/pricing'], ['Speech coaching', '/how-it-works#speech'], ['CV review', '/how-it-works#cv'], ['Interview practice', '/how-it-works#interview']].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Company</p>
            <ul className="space-y-3">
              {[['About', '/about'], ['Sign in', '/login'], ['Create account', '/signup']].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>© {new Date().getFullYear()} FaborMe Ltd. All rights reserved.</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>No promotional pricing. No auto-converting trials. Cancel anytime in 3 clicks.</p>
        </div>
      </div>
    </footer>
  )
}
