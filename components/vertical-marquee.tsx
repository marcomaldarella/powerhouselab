"use client"

import React, { useEffect, useRef, useState } from 'react'

export default function VerticalMarquee() {
  const leftInnerRef = useRef<HTMLDivElement | null>(null)
  const rightInnerRef = useRef<HTMLDivElement | null>(null)
  const [isReady, setIsReady] = useState(false)

  const [repeatCount, setRepeatCount] = useState(14)
  const items = Array.from({ length: repeatCount }, () => 'COMING SOON')

  useEffect(() => {
    // estimate line height (font-size + spacing) and compute how many items are needed
    const calc = () => {
      const vh = window.innerHeight
      const estimatedLine = 28 // px (adjust if you change font-size/padding)
      const needed = Math.ceil((vh * 1.2) / estimatedLine)
      setRepeatCount(Math.max(needed, 14))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  useEffect(() => {
    const leftInner = leftInnerRef.current
    const rightInner = rightInnerRef.current
    if (!leftInner || !rightInner) return

    // Compute single-set height (one inner) so animation moves exactly that length
    const leftShift = leftInner.offsetHeight || leftInner.scrollHeight || 0
    const rightShift = rightInner.offsetHeight || rightInner.scrollHeight || 0
    // apply to the parent track via nearestElement (parentElement)
    const leftTrack = leftInner.parentElement as HTMLElement | null
    const rightTrack = rightInner.parentElement as HTMLElement | null
    if (leftTrack) leftTrack.style.setProperty('--marquee-shift', `${leftShift}px`)
    if (rightTrack) rightTrack.style.setProperty('--marquee-shift', `${rightShift}px`)

    let lastScrollY = window.scrollY

    function onScroll() {
      const y = window.scrollY
      const scrollingDown = y > lastScrollY
      if (!leftTrack || !rightTrack) {
        lastScrollY = y
        return
      }

      // When scrolling down: left -> down, right -> up
      // When scrolling up: left -> up, right -> down
      if (leftTrack) leftTrack.style.animationDirection = scrollingDown ? 'reverse' : 'normal'
      if (rightTrack) rightTrack.style.animationDirection = scrollingDown ? 'normal' : 'reverse'

      lastScrollY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // update shifts on resize in case layout changes
    const onResize = () => {
      const l = leftInnerRef.current
      const r = rightInnerRef.current
      const lt = l?.parentElement as HTMLElement | null
      const rt = r?.parentElement as HTMLElement | null
      if (l && lt) lt.style.setProperty('--marquee-shift', `${l.offsetHeight || l.scrollHeight || 0}px`)
      if (r && rt) rt.style.setProperty('--marquee-shift', `${r.offsetHeight || r.scrollHeight || 0}px`)
    }
    window.addEventListener('resize', onResize)

    // Mark as ready immediately after setup
    setIsReady(true)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <div className={`vertical-marquee ${isReady ? 'marquee-visible' : 'marquee-hidden'}`}>
        <div className="marquee-side marquee-left" aria-hidden>
          <div className="marquee-track">
            <div ref={leftInnerRef} className="marquee-inner">
              {items.map((t, i) => (
                <div className="marquee-item" key={i}>{t}</div>
              ))}
            </div>
            <div className="marquee-inner" aria-hidden>
              {items.map((t, i) => (
                <div className="marquee-item" key={`d-${i}`}>{t}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="marquee-side marquee-right" aria-hidden>
          <div className="marquee-track">
            <div ref={rightInnerRef} className="marquee-inner">
              {items.map((t, i) => (
                <div className="marquee-item" key={"r" + i}>{t}</div>
              ))}
            </div>
            <div className="marquee-inner" aria-hidden>
              {items.map((t, i) => (
                <div className="marquee-item" key={`rd-${i}`}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
