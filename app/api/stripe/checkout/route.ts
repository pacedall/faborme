import { createClient } from '@/lib/supabase/server'
import { stripe, PLAN_PRICES } from '@/lib/integrations/stripe'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect('/login')

  const formData = await request.formData()
  const tier = formData.get('tier') as string
  const priceId = PLAN_PRICES[tier]
  if (!priceId) return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://faborme.com'

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/account/billing?success=1`,
    cancel_url: `${appUrl}/account/billing`,
    metadata: { userId: user.id, tier },
    subscription_data: { metadata: { userId: user.id, tier } },
    payment_method_types: ['card'],
    currency: 'gbp',
  })

  return NextResponse.redirect(session.url!, 303)
}
