'use client'

import { useEffect, useState } from 'react'
import VerticalMarquee from '@/components/vertical-marquee'
import ContactForm from '@/components/contact-form'
import CookieBanner from '@/components/cookie-banner'

export default function Page() {
  const [isMobile, setIsMobile] = useState(false)
  const [shouldLoadEmbed, setShouldLoadEmbed] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // On desktop load immediately; on mobile wait for user tap
  useEffect(() => {
    if (!isMobile) {
      setShouldLoadEmbed(true)
    }
  }, [isMobile])

  return (
    <main className="page-main">
      {/* Embedded Interactive Tool - Full Screen */}
      {shouldLoadEmbed ? (
        <iframe
          className="embed-fullscreen"
          src="https://app.endlesstools.io/embed/a9bf618d-2151-400b-9a01-3dc02227ca5c"
          title="Endless Tools Editor"
          loading={isMobile ? 'lazy' : 'eager'}
          allow="clipboard-write; encrypted-media; gyroscope; web-share"
          allowTransparency
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div className="embed-placeholder">
          <div className="embed-placeholder__content">
            <p className="embed-placeholder__title">Powerhouse Lab 3D Experience</p>
            <p className="embed-placeholder__text">
              The interactive 3D scene is heavy on mobile. Tap below to load it.
            </p>
            <button
              className="embed-placeholder__button"
              onClick={() => setShouldLoadEmbed(true)}
            >
              Open 3D experience
            </button>
            <p className="embed-placeholder__note">
              If it fails to load, try opening in a new tab: <br />
              <a
                href="https://app.endlesstools.io/embed/a9bf618d-2151-400b-9a01-3dc02227ca5c"
                target="_blank"
                rel="noreferrer"
              >
                Open in new tab
              </a>
            </p>
          </div>
        </div>
      )}

      <ContactForm />

      {/* Vertical Marquee - Fixed Right */}
      <VerticalMarquee />

      {/* Cookie Banner */}
      <CookieBanner />
    </main>
  )
}
