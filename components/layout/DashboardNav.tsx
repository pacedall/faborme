'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '⬡' },
  { href: '/speech', label: 'Speech', icon: '◎' },
  { href: '/cv', label: 'CV', icon: '◈' },
  { href: '/linkedin', label: 'LinkedIn', icon: '◇' },
  { href: '/interview', label: 'Interview', icon: '◉' },
  { href: '/coach', label: 'Coach Review', icon: '◆' },
]

export default function DashboardNav({ user }: { user: User }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col border-r bg-white z-40">
      <div className="p-6 border-b">
        <Link href="/dashboard" className="inline-flex items-center" aria-label="FaborMe home">
          <Image src="/faborme-logo.png" alt="FaborMe" width={140} height={50} priority className="h-10 w-auto" />
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${active ? 'text-white' : 'hover:bg-lilac'}`}
              style={active ? { background: 'var(--purple)', color: 'white' } : { color: 'var(--muted)' }}>
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t space-y-1">
        <Link href="/account/billing" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-lilac transition-all" style={{ color: 'var(--muted)' }}>
          <span>◐</span> Billing
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-lilac transition-all text-left" style={{ color: 'var(--muted)' }}>
          <span>→</span> Sign out
        </button>
        <div className="px-4 py-2 text-xs truncate" style={{ color: 'var(--muted)' }}>{user.email}</div>
      </div>
    </aside>
  )
}
