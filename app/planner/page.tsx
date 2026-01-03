'use client'

import { useState } from 'react'
import Link from 'next/link'
import { generatePlan, PlannerInput, Goal, ExperienceLevel } from '@/lib/plannerLogic'
import { useRequireAuth } from '@/lib/requireAuth'
import { useAuth } from '@/app/providers/AuthProvider'
import { savePlannerResult } from '@/lib/savePlannerResult'

export default function PlannerPage() {
  const { loading } = useRequireAuth()
  const { user } = useAuth()
  const [formData, setFormData] = useState<PlannerInput>({
    niche: '',
    goal: 'views',
    experienceLevel: 'beginner',
  })
  const [result, setResult] = useState<ReturnType<typeof generatePlan> | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.niche.trim()) {
      alert('Please enter your niche')
      return
    }
    const plan = generatePlan(formData)
    setResult(plan)
    setIsSubmitted(true)

    // Save to database
    if (user) {
      setSaving(true)
      const saveResult = await savePlannerResult(user.id, formData, plan)
      setSaving(false)
      
      if (!saveResult.success) {
        console.error('Failed to save planner result:', saveResult.error)
        // Don't show error to user, just log it
      }
    }
  }

  const handleReset = () => {
    setFormData({
      niche: '',
      goal: 'views',
      experienceLevel: 'beginner',
    })
    setResult(null)
    setIsSubmitted(false)
  }

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Shorts Planner
        </h1>
        <p className="text-xl text-gray-600">
          Get personalized format recommendations and posting strategy based on your goals and experience.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
          <div className="space-y-6">
            {/* Niche Input */}
            <div>
              <label htmlFor="niche" className="block text-sm font-medium text-gray-700 mb-2">
                Your Niche <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="niche"
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., fitness, tech tips, cooking, productivity..."
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Enter the main topic or category for your YouTube Shorts channel
              </p>
            </div>

            {/* Goal Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Primary Goal <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {(['views', 'subscribers', 'affiliate'] as Goal[]).map((goal) => (
                  <label
                    key={goal}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      formData.goal === goal
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="goal"
                      value={goal}
                      checked={formData.goal === goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value as Goal })}
                      className="mr-3 text-primary-600 focus:ring-primary-500"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 capitalize">{goal}</div>
                      <div className="text-sm text-gray-600">
                        {goal === 'views' && 'Maximize reach and viral potential'}
                        {goal === 'subscribers' && 'Build a loyal audience'}
                        {goal === 'affiliate' && 'Drive product sales'}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Experience Level <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {(['beginner', 'growing', 'earning'] as ExperienceLevel[]).map((level) => (
                  <label
                    key={level}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      formData.experienceLevel === level
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="experienceLevel"
                      value={level}
                      checked={formData.experienceLevel === level}
                      onChange={(e) =>
                        setFormData({ ...formData, experienceLevel: e.target.value as ExperienceLevel })
                      }
                      className="mr-3 text-primary-600 focus:ring-primary-500"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 capitalize">{level}</div>
                      <div className="text-sm text-gray-600">
                        {level === 'beginner' && 'Just starting out, learning the basics'}
                        {level === 'growing' && 'Have some videos, seeing growth'}
                        {level === 'earning' && 'Established channel, making money'}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition text-lg"
            >
              Generate My Plan
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-8">
          {/* Results Header */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Your Personalized Plan</h2>
            <p className="text-lg opacity-90">
              Based on your {formData.niche} niche, {formData.goal} goal, and {formData.experienceLevel} experience
            </p>
            {saving && (
              <p className="text-sm opacity-75 mt-2">Saving your plan...</p>
            )}
          </div>

          {/* Format Recommendations */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Top 3 Recommended Formats
            </h3>
            <div className="space-y-6">
              {result?.recommendations.map((rec, idx) => (
                <div
                  key={rec.format.slug}
                  className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <h4 className="text-2xl font-semibold text-gray-900">
                          {rec.format.name}
                        </h4>
                      </div>
                      <p className="text-gray-600 ml-11">{rec.format.description}</p>
                    </div>
                    <Link
                      href={`/formats/${rec.format.slug}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm whitespace-nowrap"
                    >
                      View Details →
                    </Link>
                  </div>
                  <div className="ml-11">
                    <div className="bg-primary-50 rounded-lg p-4">
                      <div className="text-sm font-semibold text-primary-900 mb-1">
                        Why this format fits you:
                      </div>
                      <p className="text-primary-800">{rec.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Posting Frequency */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
              <span className="text-3xl mr-3">📅</span>
              Recommended Posting Frequency
            </h3>
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
              <div className="text-2xl font-bold text-blue-900 mb-2">
                {result?.postingFrequency}
              </div>
              <p className="text-blue-800">{result?.frequencyReason}</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href={`/formats/${result?.recommendations[0]?.format.slug || ''}`}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
              >
                <div className="font-semibold text-gray-900 mb-1">Learn Your Top Format</div>
                <div className="text-sm text-gray-600">See detailed guide for {result?.recommendations[0]?.format.name}</div>
              </Link>
              <Link
                href="/hooks"
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
              >
                <div className="font-semibold text-gray-900 mb-1">Generate Hooks</div>
                <div className="text-sm text-gray-600">Create compelling opening hooks for your videos</div>
              </Link>
              <Link
                href="/scripts"
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
              >
                <div className="font-semibold text-gray-900 mb-1">Generate Scripts</div>
                <div className="text-sm text-gray-600">Create complete scripts using your recommended format</div>
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Plan Another Channel
            </button>
            <Link
              href="/formats"
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition text-center"
            >
              Browse All Formats
            </Link>
            <Link
              href="/calendar"
              className="flex-1 px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition text-center"
            >
              Plan in Calendar
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
