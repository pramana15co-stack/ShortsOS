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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-gray-900">
            Welcome back!
          </h1>
          <p className="text-xl text-gray-600">
            {user?.email ? (
              <>
                Signed in as <span className="font-semibold text-primary-600">{user.email}</span>
              </>
            ) : (
              'Ready to plan your next YouTube Shorts?'
            )}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Built by <span className="font-semibold">Pramana15</span>
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/planner"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-primary-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                🎯
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Create New Plan</h3>
                <p className="text-gray-600 text-sm">Get personalized format recommendations</p>
              </div>
            </div>
          </Link>

          <Link
            href="/saved-scripts"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-primary-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                📝
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Saved Scripts</h3>
                <p className="text-gray-600 text-sm">View all your generated scripts</p>
              </div>
            </div>
          </Link>

          <Link
            href="/saved-hooks"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-primary-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                🎣
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Saved Hooks</h3>
                <p className="text-gray-600 text-sm">View all your generated hooks</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Last Saved Plan */}
        {loadingPlan ? (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-center py-8">
              <svg className="animate-spin h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-3 text-gray-600">Loading your plan...</span>
            </div>
          </div>
        ) : lastPlan ? (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Last Saved Plan</h2>
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-5 border border-primary-100">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Niche</div>
                  <div className="font-semibold text-gray-900 capitalize">{lastPlan.niche}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Goal</div>
                  <div className="font-semibold text-gray-900 capitalize">{lastPlan.goal}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Experience</div>
                  <div className="font-semibold text-gray-900 capitalize">{lastPlan.experience_level}</div>
                </div>
              </div>
              {lastPlan.recommended_formats && lastPlan.recommended_formats.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Top Recommended Format</div>
                  <div className="font-semibold text-gray-900">
                    {lastPlan.recommended_formats[0].format_name}
                  </div>
                </div>
              )}
              <div className="text-sm text-gray-500 mb-4">
                Created on {new Date(lastPlan.created_at).toLocaleDateString()}
              </div>
              <Link
                href="/planner"
                className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition text-sm"
              >
                View Plan →
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No saved plans yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Create your first content plan to get personalized format recommendations based on your niche, goals, and experience level.
              </p>
              <Link
                href="/planner"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Plan
              </Link>
            </div>
          </div>
        )}

        {/* All Tools Link */}
        <div className="text-center">
          <Link
            href="/formats"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Browse All Tools →
          </Link>
        </div>
      </div>
    </main>
  )
}
