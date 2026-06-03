import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'FaborMe — AI Communication Coaching', template: '%s — FaborMe' },
  description: 'AI-powered professional communication performance. Sound clearer, more confident, and more authoritative — measurably.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://faborme.com'),
  openGraph: { siteName: 'FaborMe', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: 'var(--font-ui)', color: 'var(--text)' }}>
        {children}
      </body>
    </html>
  )
}
