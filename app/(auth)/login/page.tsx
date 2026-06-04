'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [magicSent, setMagicSent] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/dashboard'); router.refresh()
  }

  const handleMagicLink = async () => {
    if (!email) { setError('Enter your email address first.'); return }
    setLoading(true); setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/auth/callback` } })
    if (error) { setError(error.message); setLoading(false); return }
    setMagicSent(true); setLoading(false)
  }

  const handleGoogle = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${location.origin}/auth/callback` } })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--lilac)' }}>
      <div className="w-full max-w-md">
        <Link href="/" className="flex justify-center mb-10" aria-label="FaborMe home">
          <Image src="/faborme-logo.png" alt="FaborMe" width={170} height={61} priority className="h-11 w-auto" />
        </Link>
        <div className="card">
          <h1 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--purple)' }}>Sign in</h1>
          {magicSent ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-4">✉️</div>
              <p className="font-medium mb-2">Check your email</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>We sent a sign-in link to <strong>{email}</strong></p>
            </div>
          ) : (
            <>
              <form onSubmit={handleEmailLogin} className="space-y-4 mb-4">
                <div>
                  <label className="label">Email</label>
                  <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="label">Password</label>
                  <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Signing in…' : 'Sign in'}</button>
              </form>
              <div className="space-y-3 mt-4">
                <button onClick={handleMagicLink} disabled={loading} className="btn-secondary w-full">Send magic link</button>
                <button onClick={handleGoogle} className="btn-secondary w-full">Continue with Google</button>
              </div>
            </>
          )}
          <p className="mt-6 text-center text-sm" style={{ color: 'var(--muted)' }}>
            No account? <Link href="/signup" className="font-medium hover:underline" style={{ color: 'var(--purple)' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
