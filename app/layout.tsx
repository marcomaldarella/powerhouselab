import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Powerhouse Lab - Creative Innovation',
  description: 'Powerhouse Lab: Where innovation meets vision',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          @font-face {
            font-family: 'Brown Light';
            src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brown-Light-eCyEObvhGlE3GArGAovKqYG9TK2qCZ.ttf') format('truetype');
            font-weight: 300;
            font-display: swap;
          }
          @font-face {
            font-family: 'Kabel Black';
            src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kabel-Black-I3XJDKM3qZ9Ua764yowXmQOmhR3MUJ.ttf') format('truetype');
            font-weight: 900;
            font-display: swap;
          }
          html, body {
            background-color: #DBE1D4 !important;
          }
        `}</style>
      </head>
      <body className={`font-sans antialiased`} style={{ backgroundColor: '#DBE1D4' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
