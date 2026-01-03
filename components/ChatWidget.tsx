'use client'

import { useState } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import { saveChatMessage } from '@/lib/saveChatMessage'

export default function ChatWidget() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const result = await saveChatMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        user_id: user?.id,
      })

      if (result.success) {
        setIsSubmitted(true)
      } else {
        setError(result.error || 'Failed to send message. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    })
    setIsSubmitted(false)
    setError(null)
  }

  const handleClose = () => {
    setIsOpen(false)
    if (isSubmitted) {
      handleReset()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-600 to-accent-600 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
          aria-label="Open support chat"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
          <div className="glass-effect rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Support Chat</h3>
                <p className="text-sm text-primary-100">We're here to help</p>
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:text-primary-100 transition p-1"
                aria-label="Close chat"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 bg-white">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="chat-name"
                      className="block text-sm font-semibold text-gray-900 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="chat-name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 text-sm"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="chat-email"
                      className="block text-sm font-semibold text-gray-900 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="chat-email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 text-sm"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="chat-message"
                      className="block text-sm font-semibold text-gray-900 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="chat-message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, message: e.target.value }))
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-gray-900 text-sm"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              ) : (
                /* Success Message */
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    The Pramana15 team will get back to you within 24–48 hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="text-sm text-primary-600 font-semibold hover:text-primary-700"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

