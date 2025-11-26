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
    <div className="fixed inset-x-0 top-[90vh] z-50 flex items-start justify-center">
      <div className="w-full max-w-2xl px-4 pb-4 contact-container">
        <div className="bg-transparent text-center mb-1">
          <p className="text-sm contact-note uppercase">opening in London very soon</p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto flex flex-row items-center gap-4 text-sm bg-transparent contact-form uppercase">
          <input
            type="text"
            name="fullName"
            placeholder="Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="min-w-0 flex-1 bg-transparent border-b border-foreground text-foreground placeholder-foreground/40 focus:outline-none py-1 px-0 text-sm contact-input uppercase"
          />

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
            className="mt-0 text-sm text-foreground opacity-90 hover:opacity-100 transition-opacity px-6 py-1 bg-transparent contact-button uppercase"
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>

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
      </div>
    </div>
  )
}
