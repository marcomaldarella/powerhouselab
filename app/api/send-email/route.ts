import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error('RESEND_API_KEY not set; skipping email send')
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 500 },
    )
  }

  const resend = new Resend(apiKey)

  try {
    const body = await request.json()
    const { fullName, email, to } = body

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Powerhouse Lab <hello@powerhouselab.co.uk>',
      to: to,
      subject: `Someone just signed up on Power House website`,
      html: `
        <h2>Someone just signed up on Power House website</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
      `
    })

    console.log('Email sent successfully:', data)

    return NextResponse.json(
      { message: 'Email sent successfully', id: data.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
