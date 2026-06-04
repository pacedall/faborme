import { createServiceClient } from '@/lib/supabase/service'
import { stripe, PLAN_AMOUNTS, PLAN_LABELS } from '@/lib/integrations/stripe'
import { sendEmail, FROM } from '@/lib/integrations/resend'
import SubscriptionConfirmedEmail from '@/emails/SubscriptionConfirmedEmail'
import SubscriptionCancelledEmail from '@/emails/SubscriptionCancelledEmail'
import { fmt } from '@/lib/fmt'
import { NextResponse } from 'next/server'
import React from 'react'
import type { Stripe } from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  const supabase = createServiceClient()

  async function getRecipient(userId: string) {
    const { data: u } = await supabase.from('users').select('email').eq('id', userId).single()
    const { data: p } = await supabase.from('user_profiles').select('first_name').eq('user_id', userId).single()
    return { email: u?.email as string | undefined, firstName: p?.first_name as string | undefined }
  }

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.userId
      if (!userId) break
      const tier = sub.metadata?.tier || 'starter'
      const item = sub.items.data[0]
      const periodEnd = new Date(item.current_period_end * 1000).toISOString()

      await supabase.from('subscriptions').upsert({
        user_id: userId, stripe_sub_id: sub.id, tier, status: sub.status as any,
        current_period_end: periodEnd, cancel_at_period_end: sub.cancel_at_period_end,
      }, { onConflict: 'user_id' })

      if (event.type === 'customer.subscription.created' && sub.status === 'active') {
        const r = await getRecipient(userId)
        if (r.email) {
          await sendEmail({
            to: r.email, subject: `You're on FaborMe ${PLAN_LABELS[tier] ?? tier}`, from: FROM.billing,
            react: React.createElement(SubscriptionConfirmedEmail, {
              firstName: r.firstName, planLabel: PLAN_LABELS[tier] ?? tier,
              amount: fmt.money(PLAN_AMOUNTS[tier] ?? 0), nextBillingDate: fmt.date(periodEnd),
            }),
          })
        }
      }
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.userId
      if (!userId) break
      await supabase.from('subscriptions').update({ status: 'canceled' }).eq('stripe_sub_id', sub.id)

      const periodEnd = sub.items?.data?.[0]?.current_period_end
      const r = await getRecipient(userId)
      if (r.email) {
        await sendEmail({
          to: r.email, subject: 'Your FaborMe plan is cancelled', from: FROM.billing,
          react: React.createElement(SubscriptionCancelledEmail, {
            firstName: r.firstName,
            accessUntil: periodEnd ? fmt.date(new Date(periodEnd * 1000).toISOString()) : 'the end of your billing period',
          }),
        })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
