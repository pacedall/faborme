'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/how-it-works', label: 'How it works' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: '80px' }}>
        <Link href="/" className="flex items-center group" aria-label="FaborMe home">
          <Image src="/faborme-logo.png" alt="FaborMe" width={200} height={72} priority className="h-12 w-auto transition-transform group-hover:scale-[1.02]" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium transition-colors duration-150 hover:opacity-70"
              style={{ color: pathname === l.href ? 'var(--purple)' : 'var(--muted)' }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: 'var(--muted)' }}>Sign in</Link>
          <Link href="/signup" className="text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-150 text-white" style={{ background: 'var(--purple)' }}>Get started</Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 transition-all duration-200" style={{ background: 'var(--purple)', transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span className="block w-6 h-0.5 transition-all duration-200" style={{ background: 'var(--purple)', opacity: open ? 0 : 1 }} />
            <span className="block w-6 h-0.5 transition-all duration-200" style={{ background: 'var(--purple)', transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t px-6 py-6 space-y-4 bg-white">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block text-sm font-medium" style={{ color: 'var(--purple)' }} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <hr style={{ borderColor: 'var(--line)' }} />
          <Link href="/login" className="block text-sm font-medium" style={{ color: 'var(--muted)' }} onClick={() => setOpen(false)}>Sign in</Link>
          <Link href="/signup" className="block text-sm font-semibold text-white text-center py-3 rounded-lg" style={{ background: 'var(--purple)' }} onClick={() => setOpen(false)}>Get started</Link>
        </div>
      )}
    </header>
  )
}
