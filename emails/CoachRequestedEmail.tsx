import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button } from './_layout'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://faborme.com'

export default function CoachRequestedEmail({ firstName }: { firstName?: string }) {
  return (
    <EmailLayout preview="Your coach review is in the queue — expect feedback within 48 hours">
      <Heading>Your review is in the queue.</Heading>
      <Paragraph>{firstName ? `${firstName}, thanks` : 'Thanks'} for requesting a human coach review. One of our expert coaches will watch your session and record personalised video feedback for you.</Paragraph>
      <Paragraph><strong>You'll hear back within 48 hours.</strong> We'll email you the moment your feedback is ready to watch.</Paragraph>
      <Button href={`${APP_URL}/coach`}>View your review status →</Button>
    </EmailLayout>
  )
}

CoachRequestedEmail.PreviewProps = { firstName: 'Alex' }
