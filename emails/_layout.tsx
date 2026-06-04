import { Body, Container, Head, Hr, Html, Img, Link, Preview, Section, Text } from '@react-email/components'
import * as React from 'react'

export const COLORS = {
  purple: '#3F0DA2', purpleDark: '#2E0879', purpleDeep: '#1C0550',
  violet: '#6B3FD4', lilac: '#F3EEFC', text: '#1A1530', muted: '#6B6480', line: '#E4DEF2',
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://faborme.com'
const LOGO_URL = `${APP_URL}/faborme-logo.png`

export function EmailLayout({ preview, children }: { preview: string; children: React.ReactNode }) {
  return (
    <Html lang="en-GB">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Link href={APP_URL}><Img src={LOGO_URL} alt="FaborMe" width="150" style={{ margin: '0 auto' }} /></Link>
          </Section>
          <Section style={card}>{children}</Section>
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerText}>FaborMe — AI-powered professional communication coaching.</Text>
            <Text style={footerLinks}>
              <Link href={`${APP_URL}/dashboard`} style={footerLink}>Dashboard</Link>{'  ·  '}
              <Link href={`${APP_URL}/account/billing`} style={footerLink}>Billing</Link>{'  ·  '}
              <Link href={`${APP_URL}/pricing`} style={footerLink}>Pricing</Link>
            </Text>
            <Text style={footerFine}>© {new Date().getFullYear()} FaborMe Ltd. All rights reserved.<br />You're receiving this because you have a FaborMe account.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export function Heading({ children }: { children: React.ReactNode }) { return <Text style={heading}>{children}</Text> }
export function Paragraph({ children }: { children: React.ReactNode }) { return <Text style={paragraph}>{children}</Text> }
export function Button({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: '24px 0' }}>
      <tbody><tr><td style={btnCell}><Link href={href} style={btn}>{children}</Link></td></tr></tbody>
    </table>
  )
}

const body: React.CSSProperties = { backgroundColor: COLORS.lilac, fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", margin: 0, padding: '32px 0' }
const container: React.CSSProperties = { maxWidth: '560px', margin: '0 auto', padding: '0 16px' }
const header: React.CSSProperties = { textAlign: 'center', padding: '16px 0 24px' }
const card: React.CSSProperties = { backgroundColor: '#ffffff', borderRadius: '16px', padding: '40px', border: `1px solid ${COLORS.line}` }
const heading: React.CSSProperties = { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '28px', fontWeight: 600, color: COLORS.purple, margin: '0 0 16px', lineHeight: 1.2 }
const paragraph: React.CSSProperties = { fontSize: '15px', lineHeight: 1.65, color: COLORS.text, margin: '0 0 16px' }
const btnCell: React.CSSProperties = { borderRadius: '10px', backgroundColor: COLORS.purple }
const btn: React.CSSProperties = { display: 'inline-block', padding: '13px 28px', color: '#ffffff', fontSize: '14px', fontWeight: 600, textDecoration: 'none', borderRadius: '10px' }
const footer: React.CSSProperties = { padding: '24px 8px 0' }
const hr: React.CSSProperties = { borderColor: COLORS.line, margin: '0 0 16px' }
const footerText: React.CSSProperties = { fontSize: '13px', color: COLORS.muted, margin: '0 0 8px', textAlign: 'center' }
const footerLinks: React.CSSProperties = { fontSize: '13px', margin: '0 0 12px', textAlign: 'center' }
const footerLink: React.CSSProperties = { color: COLORS.violet, textDecoration: 'none' }
const footerFine: React.CSSProperties = { fontSize: '11px', color: COLORS.muted, margin: 0, textAlign: 'center', lineHeight: 1.6 }
