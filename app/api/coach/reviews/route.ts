import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { sendEmail, FROM } from '@/lib/integrations/resend'
import CoachRequestedEmail from '@/emails/CoachRequestedEmail'
import { NextResponse } from 'next/server'
import React from 'react'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const serviceClient = createServiceClient()

  const { data: sub } = await serviceClient.from('subscriptions').select('tier, status').eq('user_id', user.id).single()
  if (!sub || sub.tier !== 'premium' || sub.status !== 'active') {
    return NextResponse.json({ error: 'Premium plan required' }, { status: 403 })
  }

  const startOfMonth = new Date()
  startOfMonth.setDate(1); startOfMonth.setHours(0, 0, 0, 0)
  const { count } = await serviceClient.from('coach_reviews').select('id', { count: 'exact' }).eq('user_id', user.id).gte('requested_at', startOfMonth.toISOString())
  if ((count ?? 0) >= 1) return NextResponse.json({ error: 'Monthly review quota reached' }, { status: 429 })

  const { data: latestSession } = await serviceClient.from('speech_sessions').select('id').eq('user_id', user.id).eq('status', 'complete').order('created_at', { ascending: false }).limit(1).single()
  if (!latestSession) return NextResponse.json({ error: 'No completed sessions to review' }, { status: 400 })

  const { data: review } = await serviceClient.from('coach_reviews').insert({ user_id: user.id, source_type: 'speech_session', source_id: latestSession.id, sla_breached: false }).select().single()

  const { data: profile } = await serviceClient.from('user_profiles').select('first_name').eq('user_id', user.id).single()
  if (user.email) {
    await sendEmail({ to: user.email, subject: 'Your coach review is in the queue', from: FROM.coach, react: React.createElement(CoachRequestedEmail, { firstName: profile?.first_name ?? undefined }) })
  }

  return NextResponse.json({ reviewId: review?.id })
}
