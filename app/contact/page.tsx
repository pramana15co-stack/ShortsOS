import Link from 'next/link'

export const metadata = {
  title: 'Contact Us - ShortsOS',
  description: 'Get in touch with the ShortsOS team. We\'re here to help you succeed with YouTube Shorts.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? Need help? We're here to support your YouTube Shorts journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="glass-effect rounded-2xl p-8 premium-shadow">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Email Support</h3>
            <p className="text-gray-600 mb-4">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <a
              href="mailto:support@shortsos.com"
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              support@shortsos.com →
            </a>
          </div>

          <div className="glass-effect rounded-2xl p-8 premium-shadow">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Feedback</h3>
            <p className="text-gray-600 mb-4">
              Share your thoughts, suggestions, or report issues.
            </p>
            <Link
              href="/feedback-form"
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              Submit Feedback →
            </Link>
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-8 premium-shadow mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">How quickly do you respond?</h3>
              <p className="text-gray-600">
                We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please mention it in your email subject line.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Do you offer custom solutions?</h3>
              <p className="text-gray-600">
                We're always open to discussing custom features or enterprise solutions. Reach out and let's talk about your needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Can I request a feature?</h3>
              <p className="text-gray-600">
                Absolutely! We love hearing from creators about what features would help them most. Use our feedback form or email us directly.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Back to Dashboard →
          </Link>
        </div>
      </div>
    </main>
  )
}

