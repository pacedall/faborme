import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY!)

export const FROM = {
  default: 'FaborMe <hello@mail.faborme.com>',
  billing: 'FaborMe Billing <billing@mail.faborme.com>',
  coach: 'FaborMe Coaching <coaching@mail.faborme.com>',
} as const

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://faborme.com'
export const LOGO_URL = `${APP_URL}/faborme-logo.png`

interface SendArgs { to: string; subject: string; react: React.ReactElement; from?: string; replyTo?: string }

export async function sendEmail({ to, subject, react, from = FROM.default, replyTo }: SendArgs) {
  try {
    const { data, error } = await resend.emails.send({ from, to, subject, react, replyTo })
    if (error) { console.error('Resend error:', error); return { ok: false, error } }
    return { ok: true, id: data?.id }
  } catch (err) {
    console.error('Email send failed:', err)
    return { ok: false, error: err }
  }
}
