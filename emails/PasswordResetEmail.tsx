import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, COLORS } from './_layout'
import { Text } from '@react-email/components'

export default function PasswordResetEmail({ resetUrl }: { resetUrl: string }) {
  return (
    <EmailLayout preview="Reset your FaborMe password">
      <Heading>Reset your password.</Heading>
      <Paragraph>We received a request to reset your FaborMe password. Click below to choose a new one. This link expires in 60 minutes.</Paragraph>
      <Button href={resetUrl}>Reset password →</Button>
      <Text style={{ fontSize: '13px', color: COLORS.muted, lineHeight: 1.6, margin: '16px 0 0' }}>If you didn't request this, you can safely ignore this email — your password won't change.</Text>
    </EmailLayout>
  )
}

PasswordResetEmail.PreviewProps = { resetUrl: 'https://faborme.com/reset?token=demo' }
