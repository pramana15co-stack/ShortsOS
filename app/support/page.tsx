'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/providers/AuthProvider'
import { saveSupportMessage } from '@/lib/saveSupportMessage'

export default function SupportPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const result = await saveSupportMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        user_id: user?.id,
      })

      if (result.success) {
        setIsSubmitted(true)
      } else {
        setError(result.error || 'Failed to submit support request. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
    setIsSubmitted(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
            Contact <span className="gradient-text">Pramana15 Support</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The Pramana15 support team is here to help. Submit your inquiry and the team will respond promptly.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-8 md:p-10 premium-shadow">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  placeholder="What can we help you with?"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-gray-900"
                  placeholder="Please provide details about your question or issue..."
                  required
                />
                <div className="mt-2 text-sm text-gray-500">
                  {formData.message.length} characters
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Support Request'}
                </button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  By submitting this form, you agree to Pramana15's privacy policy.
                </p>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation Message */
          <div className="glass-effect rounded-2xl p-12 premium-shadow text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Support Request Received
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                The Pramana15 team will get back to you within 24–48 hours.
              </p>
              <div className="bg-primary-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                <p className="text-gray-700 leading-relaxed">
                  Your support request has been logged and assigned a ticket number. 
                  The Pramana15 support team will review your inquiry and respond via email 
                  at the address you provided.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition"
              >
                Submit Another Request
              </button>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}

        {/* Alternative Contact Methods */}
        {!isSubmitted && (
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="glass-effect rounded-xl p-6 premium-shadow">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-3">
                Prefer to email directly?
              </p>
              <a
                href="mailto:pramana15@pramana15.com"
                className="text-primary-600 font-semibold hover:text-primary-700 text-sm"
              >
                pramana15@pramana15.com →
              </a>
            </div>
            <div className="glass-effect rounded-xl p-6 premium-shadow">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-semibold text-gray-900 mb-2">Product Feedback</h3>
              <p className="text-sm text-gray-600 mb-3">
                Have suggestions or feature requests?
              </p>
              <Link
                href="/feedback-form"
                className="text-primary-600 font-semibold hover:text-primary-700 text-sm"
              >
                Submit Feedback →
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

