import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button } from './_layout'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://faborme.com'

export default function CoachCompletedEmail({ firstName, coachName }: { firstName?: string; coachName?: string }) {
  return (
    <EmailLayout preview="Your coach feedback video is ready to watch">
      <Heading>Your feedback is ready.</Heading>
      <Paragraph>{firstName ? `${firstName}, your` : 'Your'} coach review is complete{coachName ? `, recorded by ${coachName}` : ''}. They've watched your session and recorded a personalised video walking through what's working and where to focus next.</Paragraph>
      <Button href={`${APP_URL}/coach`}>Watch your feedback →</Button>
      <Paragraph>Take your time with it — then put it into practice in your next session while it's fresh.</Paragraph>
    </EmailLayout>
  )
}

CoachCompletedEmail.PreviewProps = { firstName: 'Alex', coachName: 'Eleanor' }
