"use client"

import { useEffect, useState } from 'react'

export default function CookieBanner() {
    const [accepted, setAccepted] = useState<boolean | null>(null)

    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search)
            const forceShow = params.get('showCookies') === '1'
            const v = localStorage.getItem('phl_cookies_accepted')
            setAccepted(!forceShow && v === 'true')
        } catch (e) {
            setAccepted(false)
        }
    }, [])

    function acceptAll() {
        try {
            localStorage.setItem('phl_cookies_accepted', 'true')
        } catch (e) { }
        setAccepted(true)
    }

    function dismiss() {
        try {
            localStorage.setItem('phl_cookies_accepted', 'true')
        } catch (e) { }
        setAccepted(true)
    }

    if (accepted) return null

    return (
        <div aria-live="polite">
            <div className="cookie-wrapper">
                <div role="dialog" aria-label="Cookie banner" className="cookie-banner">
                    <div className="cookie-text">
                        We use cookies to improve your experience. By continuing you accept our use of cookies. See our <a href="/privacy" className="cookie-link">Privacy Policy</a>.
                    </div>

                    <div className="cookie-actions">
                        <button onClick={acceptAll} className="cookie-accept">
                            Accept
                        </button>
                        <button onClick={dismiss} className="cookie-dismiss">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
