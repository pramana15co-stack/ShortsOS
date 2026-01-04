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
            <svg className="animate-spin h-12 w-12 text-gray-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
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
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="goal"
                      value={goal}
                      checked={formData.goal === goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value as Goal })}
                      className="mr-3 text-gray-900 focus:ring-gray-900"
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
                        ? 'border-gray-900 bg-gray-50'
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
                      className="mr-3 text-gray-900 focus:ring-gray-900"
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
              Get My Plan
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-8">
          {/* Plan Header */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your Content Plan</h2>
                <p className="text-sm text-gray-600">
                  Based on the Creator Execution Framework • {formData.niche} • {formData.goal} • {formData.experienceLevel}
                </p>
              </div>
              {saving && (
                <span className="text-xs text-gray-500">Saving...</span>
              )}
            </div>
          </div>

          {/* Content Goal */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Content Goal</h3>
            <p className="text-lg font-semibold text-gray-900 capitalize">{formData.goal}</p>
            <p className="text-sm text-gray-600 mt-2">
              Your plan is optimized for this goal. Formats and posting frequency are aligned accordingly.
            </p>
          </div>

          {/* Recommended Formats */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recommended Formats</h3>
                <p className="text-sm text-gray-600 mt-1">
                  These formats are stage-appropriate for your {formData.experienceLevel} level
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {result?.recommendations.map((rec, idx) => (
                <div
                  key={rec.format.slug}
                  className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-900 text-white flex items-center justify-center text-xs font-medium">
                          {idx + 1}
                        </span>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {rec.format.name}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 ml-9 mb-3">{rec.format.description}</p>
                      <div className="ml-9 bg-blue-50 border border-blue-100 rounded p-3">
                        <div className="text-xs font-medium text-gray-700 mb-1">
                          Why this format works for you:
                        </div>
                        <p className="text-sm text-gray-700">{rec.reason}</p>
                      </div>
                    </div>
                    <Link
                      href={`/formats/${rec.format.slug}`}
                      className="ml-4 text-sm text-gray-600 hover:text-gray-900 font-medium whitespace-nowrap"
                    >
                      View guide →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Posting Frequency */}
          <div className="border border-gray-200 rounded-lg p-5 mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Recommended Posting Frequency</h3>
            <p className="text-lg font-semibold text-gray-900 mb-2">{result?.postingFrequency}</p>
            <p className="text-sm text-gray-600">{result?.frequencyReason}</p>
          </div>

          {/* What to Avoid */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6">
            <h3 className="text-sm font-medium text-amber-900 mb-2">What to avoid at this stage</h3>
            <p className="text-sm text-amber-800">
              At the {formData.experienceLevel} level, avoid complex formats that require advanced editing or large audiences. 
              Focus on mastering the recommended formats first before experimenting with advanced strategies.
            </p>
          </div>

          {/* Next Recommended Action */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Next recommended action</h3>
            {result?.recommendations?.[0]?.format?.slug ? (
              <Link
                href={`/formats/${result.recommendations[0].format.slug}`}
                className="block p-4 border-2 border-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-semibold text-gray-900 mb-1">Study {result.recommendations[0].format.name}</div>
                <div className="text-sm text-gray-600">Review the format structure, pacing guidelines, and execution guide</div>
              </Link>
            ) : (
              <Link
                href="/formats"
                className="block p-4 border-2 border-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-semibold text-gray-900 mb-1">Browse Format Library</div>
                <div className="text-sm text-gray-600">Explore all available formats and their execution guides</div>
              </Link>
            )}
          </div>

          {/* Additional Actions */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Link
              href="/scripts"
              className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div className="text-sm font-medium text-gray-900 mb-1">Create Script Template</div>
              <div className="text-xs text-gray-600">Use structured templates for your recommended format</div>
            </Link>
            <Link
              href="/hooks"
              className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div className="text-sm font-medium text-gray-900 mb-1">Get Hook Templates</div>
              <div className="text-xs text-gray-600">Access hook templates based on successful patterns</div>
            </Link>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Create New Plan
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/calendar"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Plan in Calendar
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
