import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
  typescript: true,
})

export const PLAN_PRICES: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER!,
  practitioner: process.env.STRIPE_PRICE_PRACTITIONER!,
  premium: process.env.STRIPE_PRICE_PREMIUM!,
}

export const PLAN_AMOUNTS: Record<string, number> = { starter: 1500, practitioner: 2900, premium: 4900 }
export const PLAN_LABELS: Record<string, string> = { starter: 'Starter', practitioner: 'Practitioner', premium: 'Premium' }
