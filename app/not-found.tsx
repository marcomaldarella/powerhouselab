import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Powerhouse Lab',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        flexDirection: 'column',
        gap: '1rem',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 'clamp(100px, 20vw, 220px)', fontWeight: 700, lineHeight: 1, color: '#111' }}>
        404
      </div>
      <Link href="/" style={{ fontSize: '14px', color: '#111', textDecoration: 'none', opacity: 0.6 }}>
        ← back
      </Link>
    </div>
  )
}
