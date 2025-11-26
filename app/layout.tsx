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
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon-96x96.png',
        type: 'image/png',
        sizes: '96x96',
      },
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        sizes: '32x32',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
      },
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icon.svg',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
