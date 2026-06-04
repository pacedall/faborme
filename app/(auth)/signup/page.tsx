'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/auth/callback` } })
    if (error) { setError(error.message); setLoading(false); return }
    setSuccess(true); setLoading(false)
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
          <h1 className="font-display text-2xl font-semibold mb-2" style={{ color: 'var(--purple)' }}>Create your account</h1>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Free to start. No credit card required.</p>
          {success ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-4">✉️</div>
              <p className="font-medium mb-2">Check your email</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Confirmation sent to <strong>{email}</strong></p>
            </div>
          ) : (
            <>
              <button onClick={handleGoogle} className="btn-secondary w-full mb-4">Continue with Google</button>
              <hr className="my-4" />
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="label">Email</label>
                  <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="label">Password</label>
                  <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8+ characters" minLength={8} required />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Creating account…' : 'Create account'}</button>
              </form>
            </>
          )}
          <p className="mt-6 text-center text-sm" style={{ color: 'var(--muted)' }}>
            Have an account? <Link href="/login" className="font-medium hover:underline" style={{ color: 'var(--purple)' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
