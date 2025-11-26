import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, to } = body

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Powerhouse Lab <onboarding@resend.dev>', // Usa il dominio verificato in produzione
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
