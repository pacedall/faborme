import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button } from './_layout'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://faborme.com'

export default function SubscriptionCancelledEmail({ firstName, accessUntil }: { firstName?: string; accessUntil: string }) {
  return (
    <EmailLayout preview={`Your FaborMe plan is cancelled — access until ${accessUntil}`}>
      <Heading>Your plan is cancelled.</Heading>
      <Paragraph>{firstName ? `${firstName}, we've` : "We've"} processed your cancellation — no questions, no friction. You'll keep full access until <strong>{accessUntil}</strong>, and you won't be charged again.</Paragraph>
      <Paragraph>If you change your mind before then, you can reactivate in a single click. Your progress, scores, and history will be waiting exactly where you left them.</Paragraph>
      <Button href={`${APP_URL}/account/billing`}>Reactivate my plan →</Button>
      <Paragraph>Either way — thank you for giving FaborMe a try. We'd love to hear what we could have done better.</Paragraph>
    </EmailLayout>
  )
}

SubscriptionCancelledEmail.PreviewProps = { firstName: 'Alex', accessUntil: '02/07/2026' }
