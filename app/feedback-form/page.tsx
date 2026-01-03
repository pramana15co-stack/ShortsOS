'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FeedbackFormPage() {
  const [formData, setFormData] = useState({
    goal: '',
    confusion: '',
    helpfulFeature: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In production, this would be sent to a backend endpoint
    // For now, we silently handle the submission
    if (process.env.NODE_ENV === 'development') {
      console.log('Feedback submitted:', {
        goal: formData.goal,
        confusion: formData.confusion,
        helpfulFeature: formData.helpfulFeature,
        timestamp: new Date().toISOString(),
      })
    }

    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setFormData({
      goal: '',
      confusion: '',
      helpfulFeature: '',
    })
    setIsSubmitted(false)
  }

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Share Your Feedback
        </h1>
        <p className="text-xl text-gray-600">
          Help us improve ShortsOS. Your input shapes the future of the platform.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 md:p-10">
          <div className="space-y-8">
            {/* Question 1: What are you trying to build? */}
            <div>
              <label htmlFor="goal" className="block text-lg font-semibold text-gray-900 mb-3">
                What are you trying to build with Shorts?
              </label>
              <p className="text-sm text-gray-500 mb-4">
                Tell us about your goals and what you're hoping to achieve with your YouTube Shorts channel.
              </p>
              <textarea
                id="goal"
                value={formData.goal}
                onChange={(e) => handleChange('goal', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="e.g., I want to build a fitness channel and help people get in shape..."
                required
              />
              <div className="mt-2 text-sm text-gray-500">
                {formData.goal.length} characters
              </div>
            </div>

            {/* Question 2: What confused you? */}
            <div>
              <label htmlFor="confusion" className="block text-lg font-semibold text-gray-900 mb-3">
                What confused you?
              </label>
              <p className="text-sm text-gray-500 mb-4">
                Help us identify areas that need clarification or improvement. Nothing is too small!
              </p>
              <textarea
                id="confusion"
                value={formData.confusion}
                onChange={(e) => handleChange('confusion', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="e.g., I wasn't sure how to use the script generator with my format..."
                required
              />
              <div className="mt-2 text-sm text-gray-500">
                {formData.confusion.length} characters
              </div>
            </div>

            {/* Question 3: What feature helped you most? */}
            <div>
              <label htmlFor="helpfulFeature" className="block text-lg font-semibold text-gray-900 mb-3">
                What feature helped you most?
              </label>
              <p className="text-sm text-gray-500 mb-4">
                Let us know which tools or features made the biggest difference for you.
              </p>
              <textarea
                id="helpfulFeature"
                value={formData.helpfulFeature}
                onChange={(e) => handleChange('helpfulFeature', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="e.g., The format library helped me understand which structure works best..."
                required
              />
              <div className="mt-2 text-sm text-gray-500">
                {formData.helpfulFeature.length} characters
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
              <p className="text-sm text-gray-500 text-center mt-4">
                Your feedback is anonymous and helps us improve ShortsOS for everyone.
              </p>
            </div>
          </div>
        </form>
      ) : (
        /* Thank You Message */
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Thank You!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Your feedback has been received. The Pramana team reads every submission and uses it to make ShortsOS better.
            </p>
            <div className="bg-primary-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-gray-700 leading-relaxed">
                The Pramana team is constantly improving based on feedback from creators like you. 
                Your insights help us understand what's working, what's confusing, and what features matter most.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition"
            >
              Submit More Feedback
            </button>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      )}

      {/* Help Text */}
      {!isSubmitted && (
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Why we ask these questions</h3>
              <p className="text-blue-800 text-sm">
                Understanding your goals helps us prioritize features. Knowing what's confusing helps us improve documentation and UX. 
                Learning what works best helps us double down on the most valuable tools.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
