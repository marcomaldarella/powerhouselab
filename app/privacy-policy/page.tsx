import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Powerhouse Lab',
  description: 'Privacy policy for powerhouselab.co.uk',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-12 md:px-12 lg:px-20 max-w-5xl mx-auto">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-wide text-foreground/60">Powerhouse Lab</p>
        <h1 className="text-3xl md:text-4xl font-semibold mt-2">Privacy Policy</h1>
        <p className="mt-3 text-sm text-foreground/70">
          Last updated: {new Date().toLocaleDateString('en-GB')}
        </p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold mb-2">Data Controller</h2>
          <p>
            Powerhouse Lab – Site: powerhouselab.co.uk – Email: hello@powerhouselab.co.uk
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Data We Collect</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Contact details (name, email) submitted via site forms.</li>
            <li>Technical and browsing data collected via cookies or similar tools.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Purposes and Legal Bases</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Responding to requests sent through the site (pre-contractual steps).</li>
            <li>Sending updates about the project, with prior consent.</li>
            <li>Improving the site and its security (legitimate interest).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Processing and Retention</h2>
          <p>
            Data are processed with electronic tools and kept as long as needed to answer requests or until
            consent is withdrawn, with appropriate security measures in place.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Recipients and Transfers</h2>
          <p>
            We use cloud and email providers (e.g., Resend) to send communications. Data may be transferred
            outside the EEA with appropriate safeguards (e.g., Standard Contractual Clauses).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Cookies and Similar Technologies</h2>
          <p>
            We use technical cookies and, with your consent, measurement/analytics cookies. You can manage
            preferences via the cookie banner or your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Data Subject Rights</h2>
          <p>
            You can request access, rectification, erasure, restriction, objection, portability, and withdrawal
            of consent by writing to hello@powerhouselab.co.uk. You also have the right to lodge a complaint
            with the competent supervisory authority.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Contact</h2>
          <p>
            For any privacy-related request, email hello@powerhouselab.co.uk with the subject “Privacy”.
          </p>
        </section>
      </div>
    </main>
  )
}
