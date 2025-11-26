'use client'

import VerticalMarquee from '@/components/vertical-marquee'
import ContactForm from '@/components/contact-form'

export default function Page() {
  return (
    <main className="w-screen h-screen text-foreground relative overflow-hidden" style={{ backgroundColor: '#DBE1D4' }}>
      {/* Embedded Interactive Tool - Full Screen */}
      <iframe
        className="embed-fullscreen"
        src="https://app.endlesstools.io/embed/fc32f68b-a92f-48d3-bd01-dd95cd78d700"
        title="Endless Tools Editor"
        frameBorder="0"
        allow="clipboard-write; encrypted-media; gyroscope; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />

      <ContactForm />

      {/* Vertical Marquee - Fixed Right */}
      <VerticalMarquee />
    </main>
  )
}
