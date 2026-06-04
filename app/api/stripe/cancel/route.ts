import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { stripe } from '@/lib/integrations/stripe'
import { NextResponse } from 'next/server'

// Transparent billing — cancel at period end. No retention modal. No exit interview.
// TOTAL CLICKS FROM DASHBOARD TO CANCELLED: 3
export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { subscriptionId } = await request.json()

  const serviceClient = createServiceClient()
  const { data: sub } = await serviceClient.from('subscriptions').select('stripe_sub_id').eq('id', subscriptionId).eq('user_id', user.id).single()
  if (!sub) return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })

  await stripe.subscriptions.update(sub.stripe_sub_id, { cancel_at_period_end: true })
  await serviceClient.from('subscriptions').update({ cancel_at_period_end: true }).eq('id', subscriptionId)

  return NextResponse.json({ cancelled: true })
}
