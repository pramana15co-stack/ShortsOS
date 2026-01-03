'use client'

import { useState } from 'react'
import { analyzePerformance, PerformanceInput } from '@/lib/feedbackLogic'
import { formats } from '@/data/formats'
import Link from 'next/link'

export default function FeedbackPage() {
  const [formData, setFormData] = useState<PerformanceInput>({
    views: 0,
    averageWatchTime: 0,
    likes: 0,
    formatSlug: '',
  })
  const [feedback, setFeedback] = useState<ReturnType<typeof analyzePerformance> | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.formatSlug) {
      alert('Please select a format')
      return
    }
    if (formData.views < 0 || formData.averageWatchTime < 0 || formData.likes < 0) {
      alert('Please enter valid numbers')
      return
    }
    const result = analyzePerformance(formData)
    setFeedback(result)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setFormData({
      views: 0,
      averageWatchTime: 0,
      likes: 0,
      formatSlug: '',
    })
    setFeedback(null)
    setIsSubmitted(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-blue-600 bg-blue-100'
    if (score >= 40) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Work'
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Performance Feedback
        </h1>
        <p className="text-xl text-gray-600">
          Get actionable insights on your Shorts performance. Learn what worked, what didn't, and what to try next.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
          <div className="space-y-6">
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format Used <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.formatSlug}
                onChange={(e) => setFormData({ ...formData, formatSlug: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select the format you used...</option>
                {formats.map((format) => (
                  <option key={format.slug} value={format.slug}>
                    {format.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Views Input */}
            <div>
              <label htmlFor="views" className="block text-sm font-medium text-gray-700 mb-2">
                Total Views
              </label>
              <input
                type="number"
                id="views"
                min="0"
                value={formData.views || ''}
                onChange={(e) => setFormData({ ...formData, views: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 5000"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Total number of views your Short received
              </p>
            </div>

            {/* Average Watch Time */}
            <div>
              <label htmlFor="watchTime" className="block text-sm font-medium text-gray-700 mb-2">
                Average Watch Time (seconds)
              </label>
              <input
                type="number"
                id="watchTime"
                min="0"
                max="60"
                value={formData.averageWatchTime || ''}
                onChange={(e) => setFormData({ ...formData, averageWatchTime: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 35"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Average time viewers watched your video (in seconds, max 60)
              </p>
            </div>

            {/* Likes Input */}
            <div>
              <label htmlFor="likes" className="block text-sm font-medium text-gray-700 mb-2">
                Total Likes
              </label>
              <input
                type="number"
                id="likes"
                min="0"
                value={formData.likes || ''}
                onChange={(e) => setFormData({ ...formData, likes: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 250"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Total number of likes your Short received
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition text-lg"
            >
              Analyze Performance
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Score Card */}
          {feedback && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Performance Score</h2>
                <div className={`px-4 py-2 rounded-lg font-bold text-lg ${getScoreColor(feedback.score)}`}>
                  {feedback.score}/100
                </div>
              </div>
              <div className="text-center">
                <div className={`inline-block px-6 py-3 rounded-lg font-semibold text-lg ${getScoreColor(feedback.score)}`}>
                  {getScoreLabel(feedback.score)}
                </div>
              </div>
            </div>
          )}

          {/* Overall Assessment */}
          {feedback && (
            <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-3">Overall Assessment</h2>
              <p className="text-lg leading-relaxed opacity-95">
                {feedback.overallAssessment}
              </p>
            </div>
          )}

          {/* What Worked */}
          {feedback && feedback.whatWorked.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
                <span className="text-3xl mr-3">✅</span>
                What Likely Worked
              </h2>
              <ul className="space-y-3">
                {feedback.whatWorked.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                      ✓
                    </span>
                    <span className="text-gray-700 flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What Failed */}
          {feedback && feedback.whatFailed.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
                <span className="text-3xl mr-3">⚠️</span>
                What Might Have Failed
              </h2>
              <p className="text-gray-600 mb-4 text-sm">
                These areas need attention. Don't worry - every creator faces these challenges. Use this feedback to improve your next video.
              </p>
              <ul className="space-y-3">
                {feedback.whatFailed.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                      !
                    </span>
                    <span className="text-gray-700 flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next Format Suggestion */}
          {feedback && (
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
                <span className="text-3xl mr-3">💡</span>
                Suggested Next Format
              </h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feedback.nextFormatSuggestion.format.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feedback.nextFormatSuggestion.format.description}
                </p>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-gray-800 leading-relaxed">
                    {feedback.nextFormatSuggestion.reason}
                  </p>
                </div>
                <Link
                  href={`/formats/${feedback.nextFormatSuggestion.format.slug}`}
                  className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Learn This Format →
                </Link>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Analyze Another Video
            </button>
            <Link
              href="/formats"
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition text-center"
            >
              Browse Formats
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
