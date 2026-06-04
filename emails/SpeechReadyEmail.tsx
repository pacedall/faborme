import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, COLORS } from './_layout'
import { Section, Text } from '@react-email/components'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://faborme.com'

interface Props { firstName?: string; sessionId: string; overallScore: number; topImprovement?: string }

export default function SpeechReadyEmail({ firstName, sessionId, overallScore, topImprovement }: Props) {
  return (
    <EmailLayout preview={`Your session scored ${overallScore} — see the full breakdown`}>
      <Heading>Your analysis is ready{firstName ? `, ${firstName}` : ''}.</Heading>
      <Paragraph>We've finished analysing your latest speech session. Here's your headline score:</Paragraph>
      <Section style={{ textAlign: 'center', padding: '8px 0 24px' }}>
        <Text style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '56px', fontWeight: 700, color: COLORS.purple, margin: 0, lineHeight: 1 }}>{overallScore}</Text>
        <Text style={{ fontSize: '13px', color: COLORS.muted, margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Overall communication score</Text>
      </Section>
      {topImprovement && (
        <Section style={{ backgroundColor: COLORS.lilac, borderRadius: '10px', padding: '16px 20px', margin: '0 0 8px' }}>
          <Text style={{ fontSize: '12px', fontWeight: 600, color: COLORS.violet, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Focus next on</Text>
          <Text style={{ fontSize: '14px', color: COLORS.text, margin: 0, lineHeight: 1.6 }}>{topImprovement}</Text>
        </Section>
      )}
      <Button href={`${APP_URL}/speech/sessions/${sessionId}`}>See full breakdown →</Button>
    </EmailLayout>
  )
}

SpeechReadyEmail.PreviewProps = { firstName: 'Alex', sessionId: 'demo', overallScore: 84, topImprovement: 'Reduce filler words — you used "sort of" 14 times, which is lowering your confidence score.' }
