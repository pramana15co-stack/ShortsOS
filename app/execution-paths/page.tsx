'use client'

import Link from 'next/link'
import { useAuth } from '@/app/providers/AuthProvider'

interface ExecutionPath {
  slug: string
  name: string
  description: string
  goal: string
  duration: string
  targetAudience: string
}

const executionPaths: ExecutionPath[] = [
  {
    slug: 'beginner-shorts-path',
    name: 'Beginner Shorts Path',
    description: 'Go from 0 to your first consistent views (100-500 views per video)',
    goal: 'Achieve consistent views and establish a posting foundation',
    duration: '6-8 weeks',
    targetAudience: 'Creators with 0-100 subscribers, no consistent posting history',
  },
]

export default function ExecutionPathsPage() {
  const { user } = useAuth()

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Execution Paths
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Step-by-step, stage-aware playbooks that guide you toward specific goals. Each path provides a clear sequence of actions, format recommendations, and constraints tailored to your creator stage.
          </p>
        </div>

        {/* Paths Grid */}
        <div className="space-y-6">
          {executionPaths.map((path) => (
            <Link
              key={path.slug}
              href={`/execution-paths/${path.slug}`}
              className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {path.name}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {path.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{path.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span>{path.targetAudience}</span>
                    </div>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-900 mb-1">Goal</p>
                <p className="text-sm text-gray-600">{path.goal}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gray-50 rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            How Execution Paths Work
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Structured Guidance</h3>
              <p className="text-sm text-gray-600">
                Each path breaks down your journey into weekly focuses, eliminating decision fatigue and ensuring steady progress.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Stage-Aware</h3>
              <p className="text-sm text-gray-600">
                Recommendations adapt to your experience level, with explicit constraints on what to avoid at your stage.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Clear Progress Tracking</h3>
              <p className="text-sm text-gray-600">
                Weekly checkpoints and success criteria help you know if you're on track or need to adjust.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Time-Saving</h3>
              <p className="text-sm text-gray-600">
                Instead of piecing together advice from multiple sources, you get a complete, ordered sequence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

