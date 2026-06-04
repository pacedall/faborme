import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, COLORS } from './_layout'
import { Section, Text, Row, Column } from '@react-email/components'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://faborme.com'

interface Props { firstName?: string; planLabel: string; amount: string; nextBillingDate: string }

export default function SubscriptionConfirmedEmail({ firstName, planLabel, amount, nextBillingDate }: Props) {
  return (
    <EmailLayout preview={`You're on FaborMe ${planLabel} — receipt enclosed`}>
      <Heading>You're all set{firstName ? `, ${firstName}` : ''}.</Heading>
      <Paragraph>Thank you for subscribing to FaborMe. Your plan is active and every feature in your tier is unlocked.</Paragraph>
      <Section style={{ backgroundColor: COLORS.lilac, borderRadius: '12px', padding: '20px 24px', margin: '8px 0 16px' }}>
        <Row>
          <Column>
            <Text style={{ fontSize: '12px', color: COLORS.muted, margin: '0 0 2px' }}>Plan</Text>
            <Text style={{ fontSize: '16px', fontWeight: 600, color: COLORS.purple, margin: 0 }}>{planLabel}</Text>
          </Column>
          <Column style={{ textAlign: 'right' }}>
            <Text style={{ fontSize: '12px', color: COLORS.muted, margin: '0 0 2px' }}>Amount</Text>
            <Text style={{ fontSize: '16px', fontWeight: 600, color: COLORS.purple, margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>{amount}/mo</Text>
          </Column>
        </Row>
        <Text style={{ fontSize: '13px', color: COLORS.muted, margin: '16px 0 0' }}>Next billing date: {nextBillingDate}</Text>
      </Section>
      <Button href={`${APP_URL}/dashboard`}>Go to your dashboard →</Button>
      <Paragraph>You can manage or cancel your plan anytime from your billing page — three clicks, no exit interview. That's a promise.</Paragraph>
    </EmailLayout>
  )
}

SubscriptionConfirmedEmail.PreviewProps = { firstName: 'Alex', planLabel: 'Practitioner', amount: '£29.00', nextBillingDate: '02/07/2026' }
