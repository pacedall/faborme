import Link from 'next/link'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteNav />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="font-mono text-8xl font-bold mb-6" style={{ color: 'var(--line)' }}>404</div>
          <h1 className="font-display text-4xl font-semibold mb-4" style={{ color: 'var(--purple)' }}>Page not found.</h1>
          <p className="text-base mb-10" style={{ color: 'var(--muted)' }}>The page you're looking for doesn't exist.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-white" style={{ background: 'var(--purple)' }}>Go home</Link>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border" style={{ borderColor: 'var(--line)', color: 'var(--purple)' }}>Sign in</Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
