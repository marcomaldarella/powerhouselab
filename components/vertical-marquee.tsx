"use client"

import React, { useEffect, useRef, useState } from 'react'

export default function VerticalMarquee() {
  const leftInnerRef = useRef<HTMLDivElement | null>(null)
  const rightInnerRef = useRef<HTMLDivElement | null>(null)

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

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <div className="vertical-marquee">
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

      <style jsx>{`
        .vertical-marquee { pointer-events: none; }

        .marquee-side {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 40px; /* tighter, closer to the edge */
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          background: rgb(219,225,212); /* user supplied fade color */
          pointer-events: none;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .marquee-left { left: 4px; }
        .marquee-right { right: 4px; transform: translateY(-50%); }

        .marquee-track {
          display: flex;
          flex-direction: column;
          gap: 0;
          /* use the runtime-calculated shift so the animation moves exactly one duplicated length */
          --marquee-duration: 48s;
          animation: scrollUp var(--marquee-duration) linear infinite;
          will-change: transform;
        }

        .marquee-inner { display: flex; flex-direction: column; }

        .marquee-item {
          font-family: 'Brown Light', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          font-weight: 300;
          font-size: 18px;
          /* tighter kerning per request */
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #000;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          white-space: nowrap;
          margin: 0; /* avoid default h1 margins creating gaps */
          line-height: 1; /* tighter line height for consistent measurement */
          padding-bottom: 4px; /* slightly reduced spacing between lines */
        }

        /* Right side should appear capovolto: rotate the container but keep each item unrotated so letters are inverted */
        .marquee-right .marquee-item { transform: rotate(0deg); }

        /* Right animation: move downwards by the calculated shift (fallback to 50% if var not available) */
        @keyframes scrollDown {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(var(--marquee-shift, 50%) )); }
        }

        .marquee-right .marquee-track { animation: scrollDown 18s linear infinite; }

        @keyframes scrollUp {
          0% { transform: translateY(0); }
          /* use calculated pixel shift when available, otherwise move -50% of the track */
          100% { transform: translateY(calc(var(--marquee-shift, 50%) * -1)); }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }

      `}</style>
    </>
  )
}
