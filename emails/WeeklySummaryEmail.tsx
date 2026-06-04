import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, COLORS } from './_layout'
import { Section, Text, Row, Column } from '@react-email/components'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://faborme.com'

interface Props { firstName?: string; sessionsThisWeek: number; avgScore: number; scoreDelta: number; streak: number }

export default function WeeklySummaryEmail({ firstName, sessionsThisWeek, avgScore, scoreDelta, streak }: Props) {
  const up = scoreDelta >= 0
  return (
    <EmailLayout preview={`Your week on FaborMe — ${sessionsThisWeek} sessions, score ${avgScore}`}>
      <Heading>Your week in review{firstName ? `, ${firstName}` : ''}.</Heading>
      <Paragraph>Here's how your communication practice went this week.</Paragraph>
      <Section style={{ margin: '8px 0 16px' }}>
        <Row>
          <Column style={cell}><Text style={stat}>{sessionsThisWeek}</Text><Text style={statLabel}>Sessions</Text></Column>
          <Column style={cell}><Text style={stat}>{avgScore}</Text><Text style={statLabel}>Avg score</Text></Column>
          <Column style={cell}><Text style={{ ...stat, color: up ? '#2e7d32' : '#c62828' }}>{up ? '+' : ''}{scoreDelta}</Text><Text style={statLabel}>vs last week</Text></Column>
          <Column style={cell}><Text style={stat}>{streak}</Text><Text style={statLabel}>Day streak</Text></Column>
        </Row>
      </Section>
      <Paragraph>{sessionsThisWeek === 0 ? "You didn't record a session this week — even one keeps your momentum going." : up ? 'Your score is trending up. Consistency is doing its job — keep going.' : 'A dip week happens. One focused session is the fastest way back up.'}</Paragraph>
      <Button href={`${APP_URL}/speech`}>Record this week's session →</Button>
    </EmailLayout>
  )
}

const cell: React.CSSProperties = { textAlign: 'center', padding: '12px 4px' }
const stat: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace", fontSize: '30px', fontWeight: 700, color: COLORS.purple, margin: 0, lineHeight: 1 }
const statLabel: React.CSSProperties = { fontSize: '11px', color: COLORS.muted, margin: '6px 0 0', textTransform: 'uppercase', letterSpacing: '0.5px' }

WeeklySummaryEmail.PreviewProps = { firstName: 'Alex', sessionsThisWeek: 4, avgScore: 82, scoreDelta: 6, streak: 12 }
