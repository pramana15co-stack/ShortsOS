'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRequireAuth } from '@/lib/requireAuth'
import { useAuth } from '@/app/providers/AuthProvider'
import { getLastPlannerResult, PlannerHistoryItem } from '@/lib/getPlannerHistory'

export default function Dashboard() {
  const { loading } = useRequireAuth()
  const { user } = useAuth()
  const [lastPlan, setLastPlan] = useState<PlannerHistoryItem | null>(null)
  const [loadingPlan, setLoadingPlan] = useState(true)

  useEffect(() => {
    if (user && !loading) {
      setLoadingPlan(true)
      getLastPlannerResult(user.id)
        .then((result) => {
          if (result.success) {
            setLastPlan(result.data)
          } else {
            console.error('Failed to load planner history:', result.error)
            // Don't show error to user, just set to null
            setLastPlan(null)
          }
        })
        .finally(() => {
          setLoadingPlan(false)
        })
    }
  }, [user, loading])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600">
            {user?.email || 'Your content planning control center'}
          </p>
        </div>

        {/* Current Status */}
        {lastPlan ? (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">Your Current Plan</h2>
                <p className="text-lg font-semibold text-gray-900">
                  {lastPlan.niche} • {lastPlan.goal} • {lastPlan.experience_level}
                </p>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(lastPlan.created_at).toLocaleDateString()}
              </span>
            </div>
            {lastPlan.recommended_formats && lastPlan.recommended_formats.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Recommended format:</p>
                <p className="font-medium text-gray-900">{lastPlan.recommended_formats[0].format_name}</p>
              </div>
            )}
            <Link
              href="/planner"
              className="text-sm text-gray-700 hover:text-gray-900 font-medium"
            >
              View full plan →
            </Link>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6">
            <p className="text-sm text-gray-600 mb-3">No plan yet. Start by identifying your creator stage.</p>
            <Link
              href="/planner"
              className="inline-block px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Create Your First Plan
            </Link>
          </div>
        )}

        {/* Execution Paths Introduction */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Execution Paths</h2>
              <p className="text-sm text-gray-600 mb-4">
                Step-by-step, stage-aware playbooks that guide you toward specific goals. Each path provides a clear sequence of actions, format recommendations, and constraints tailored to your creator stage.
              </p>
              <p className="text-xs text-gray-500">
                Execution Paths eliminate decision fatigue by giving you an ordered sequence of actions, reducing trial and error, and ensuring you focus on the right steps at the right time.
              </p>
            </div>
          </div>
          <Link
            href="/execution-paths"
            className="inline-block text-sm font-medium text-gray-900 hover:text-gray-700"
          >
            Explore Execution Paths →
          </Link>
        </div>

        {/* What to Do Next */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What to do next</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {lastPlan ? (
              <>
                {lastPlan.recommended_formats?.[0]?.format_slug ? (
                  <Link
                    href={`/formats/${lastPlan.recommended_formats[0].format_slug}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900 mb-1">Learn your recommended format</div>
                    <div className="text-xs text-gray-600">Study the format structure and execution guide</div>
                  </Link>
                ) : (
                  <Link
                    href="/formats"
                    className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900 mb-1">Browse formats</div>
                    <div className="text-xs text-gray-600">Explore all available formats</div>
                  </Link>
                )}
                <Link
                  href="/scripts"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 mb-1">Create a script</div>
                  <div className="text-xs text-gray-600">Use templates to structure your content</div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/planner"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 mb-1">Start planning</div>
                  <div className="text-xs text-gray-600">Identify your stage and get content direction</div>
                </Link>
                <Link
                  href="/formats"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 mb-1">Browse formats</div>
                  <div className="text-xs text-gray-600">Explore proven content structures</div>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Tools */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/saved-scripts"
              className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div className="text-sm font-medium text-gray-900 mb-1">Saved Scripts</div>
              <div className="text-xs text-gray-600">View your script templates</div>
            </Link>
            <Link
              href="/saved-hooks"
              className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div className="text-sm font-medium text-gray-900 mb-1">Saved Hooks</div>
              <div className="text-xs text-gray-600">View your hook templates</div>
            </Link>
            <Link
              href="/formats"
              className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div className="text-sm font-medium text-gray-900 mb-1">Format Library</div>
              <div className="text-xs text-gray-600">Browse all formats</div>
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
