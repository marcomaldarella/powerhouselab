'use client'

import VerticalMarquee from '@/components/vertical-marquee'
import ContactForm from '@/components/contact-form'
import CookieBanner from '@/components/cookie-banner'

export default function Page() {
  return (
    <main className="page-main">
      {/* Embedded Interactive Tool - Full Screen */}
      <iframe
        className="embed-fullscreen"
        src="https://app.endlesstools.io/embed/d137be1b-13b1-4384-a5df-746f9c16ff09"
        title="Endless Tools Editor"
        loading="eager"
        allow="clipboard-write; encrypted-media; gyroscope; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />

      <ContactForm />

      {/* Vertical Marquee - Fixed Right */}
      <VerticalMarquee />

      {/* Cookie Banner */}
      <CookieBanner />
    </main>
  )
}
