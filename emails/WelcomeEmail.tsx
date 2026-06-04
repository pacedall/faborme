import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button } from './_layout'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://faborme.com'

export default function WelcomeEmail({ firstName }: { firstName?: string }) {
  return (
    <EmailLayout preview="Welcome to FaborMe — your first session is free">
      <Heading>Welcome to FaborMe{firstName ? `, ${firstName}` : ''}.</Heading>
      <Paragraph>You've taken the first step towards communicating with more clarity, confidence, and authority. Your account is ready.</Paragraph>
      <Paragraph>Start with a free diagnostic session — speak for 90 seconds and we'll score you across eight dimensions, then show you exactly what to work on.</Paragraph>
      <Button href={`${APP_URL}/onboarding`}>Start your free diagnostic →</Button>
      <Paragraph>It takes about three minutes. The sooner you record, the sooner your coaching becomes personal.</Paragraph>
    </EmailLayout>
  )
}

WelcomeEmail.PreviewProps = { firstName: 'Alex' }
