'use client'

import { useEffect, useState } from 'react'

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)

        // Check if user has already accepted cookies
        try {
            const cookieValue = document.cookie
                .split('; ')
                .find((row) => row.startsWith('cookiesAccepted='))
                ?.split('=')[1]

            const localValue = window.localStorage.getItem('cookiesAccepted')
            const storedConsent = cookieValue ?? localValue

            setIsVisible(storedConsent === null)
        } catch (error) {
            console.error('Cookie consent check failed', error)
            setIsVisible(true)
        }
    }, [])

    const persistConsent = (value: 'true' | 'false') => {
        const maxAge = 60 * 60 * 24 * 180 // 180 days
        try {
            document.cookie = `cookiesAccepted=${value}; path=/; max-age=${maxAge}; SameSite=Lax`
            window.localStorage.setItem('cookiesAccepted', value)
        } catch (error) {
            console.error('Cookie consent save failed', error)
        }
    }

    const acceptCookies = () => {
        persistConsent('true')
        setIsVisible(false)
    }

    const declineCookies = () => {
        persistConsent('false')
        setIsVisible(false)
    }

    // Don't render anything until mounted (prevents hydration mismatch)
    if (!isMounted) return null

    // Don't show if not visible
    if (!isVisible) return null

    return (
        <div className="cookie-wrapper">
            <div className="cookie-banner">
                <p className="cookie-text">
                    We use cookies to enhance your browsing experience. By clicking "Accept",
                    you consent to our use of cookies and agree to our{' '}
                    <a href="/privacy-policy" className="cookie-link">Privacy Policy</a>.
                    If you submit your email, you agree to receive updates from us and
                    acknowledge that your data will be processed in accordance with our privacy practices.
                </p>
                <div className="cookie-actions">
                    <button onClick={acceptCookies} className="cookie-accept">
                        Accept All
                    </button>
                    <button onClick={declineCookies} className="cookie-dismiss">
                        Decline
                    </button>
                </div>
            </div>
        </div>
    )
}
