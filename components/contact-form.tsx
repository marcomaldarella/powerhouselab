'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          to: 'hello@powerhouselab.co.uk',
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ fullName: '', email: '' })
        setTimeout(() => setSubmitStatus('idle'), 3000)
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Gradient overlay to cover marquees */}
      <div className="fixed inset-x-0 bottom-0 h-[45vh] md:h-[25vh] pointer-events-none z-45" style={{
        background: 'linear-gradient(to top, #F9F4EC 0%, #F9F4EC 35%, rgba(249, 244, 236, 0) 100%)'
      }}></div>

      <div className="fixed inset-x-0 bottom-8 md:bottom-4 z-50 flex items-start justify-center">
        <div className="w-full max-w-2xl px-4 pb-4 contact-container">
          <div className="bg-transparent text-center mb-1">
            <p className="text-sm contact-note uppercase">opening in London very soon</p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto flex flex-col md:flex-row items-stretch md:items-center gap-4 text-sm bg-transparent contact-form uppercase">
            {/* Corner markers */}
            <div className="corner-marker corner-tl" aria-hidden="true"></div>
            <input
              type="text"
              name="fullName"
              placeholder="Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full md:min-w-0 md:flex-1 bg-transparent border-b border-foreground text-foreground placeholder-foreground/40 focus:outline-none py-1 px-0 text-sm contact-input uppercase"
            />

            <div className="flex flex-row gap-4 w-full md:flex-1">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="min-w-0 flex-1 bg-transparent border-b border-foreground text-foreground placeholder-foreground/40 focus:outline-none py-1 px-0 text-sm contact-input uppercase"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="text-sm text-foreground px-6 py-1 bg-transparent border border-[rgba(51,61,69,0.5)] hover:border-[rgba(51,61,69,1)] active:border-[rgba(51,61,69,1)] transition-colors duration-200 contact-button uppercase relative disabled:opacity-50 whitespace-nowrap"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </div>

            {submitStatus === 'success' && (
              <p className="ml-4 text-green-600 text-xs">
                Thank you! We'll notify you soon.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="ml-4 text-red-600 text-xs">
                Error sending message. Please try again.
              </p>
            )}
          </form>

          <p className="text-xs text-center pt-4 pb-4 mt-2 opacity-60" style={{ textTransform: 'none' }}>
            By submitting, you agree to our{' '}
            <a href="/privacy-policy" className="underline">Privacy Policy</a>
            {' '}and consent to receive updates.
          </p>
        </div>
      </div>
    </>
  )
}
