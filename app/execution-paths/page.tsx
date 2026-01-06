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
  status: 'available' | 'coming-soon'
}

const executionPaths: ExecutionPath[] = [
  {
    slug: 'beginner-shorts-path',
    name: 'Beginner Shorts Path',
    description: 'Go from 0 to your first consistent views (100-500 views per video)',
    goal: 'Achieve consistent views and establish a posting foundation',
    duration: '6-8 weeks',
    targetAudience: 'Creators with 0-100 subscribers, no consistent posting history',
    status: 'available',
  },
  {
    slug: 'growing-shorts-path',
    name: 'Growing Shorts Path',
    description: 'Scale from first views to consistent growth (500-5K views per video)',
    goal: 'Build audience engagement and establish growth patterns',
    duration: '8-12 weeks',
    targetAudience: 'Creators with 100-1,000 subscribers, posting 2-3x per week',
    status: 'coming-soon',
  },
  {
    slug: 'scaling-shorts-path',
    name: 'Scaling Shorts Path',
    description: 'Optimize for monetization and sustainable growth (5K+ views per video)',
    goal: 'Scale efficiently and build multiple revenue streams',
    duration: '12-16 weeks',
    targetAudience: 'Creators with 1,000+ subscribers, consistent posting, ready to monetize',
    status: 'coming-soon',
  },
]

export default function ExecutionPathsPage() {
  const { user } = useAuth()

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="accent-line mx-auto mb-6"></div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            Execution Paths
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Step-by-step, stage-aware playbooks that guide you toward specific goals. Each path provides a clear sequence of actions, format recommendations, and constraints tailored to your creator stage.
          </p>
        </div>

        {/* How Execution Paths Work - Enhanced */}
        <div className="card p-10 mb-16">
          <h2 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">How Execution Paths Work</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Structured Guidance</h3>
                <p className="text-gray-700 leading-relaxed">
                  Each path breaks down your journey into weekly focuses, eliminating decision fatigue and ensuring steady progress. 
                  You'll know exactly what to do each week, with clear actions and format recommendations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Stage-Aware</h3>
                <p className="text-gray-700 leading-relaxed">
                  Recommendations adapt to your experience level, with explicit constraints on what to avoid at your stage. 
                  What works for beginners differs from what works for established creators.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Clear Progress Tracking</h3>
                <p className="text-gray-700 leading-relaxed">
                  Weekly checkpoints and success criteria help you know if you're on track or need to adjust. 
                  Objective metrics prevent self-doubt and provide clear feedback on your progress.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Time-Saving</h3>
                <p className="text-gray-700 leading-relaxed">
                  Instead of piecing together advice from multiple sources, you get a complete, ordered sequence. 
                  This eliminates trial and error and ensures you're focusing on the right actions at the right time.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Execution Paths Work</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most creators fail not because they're lazy, but because they're overwhelmed by conflicting advice and unclear next steps. 
                Execution Paths solve this by providing a structured, stage-aware sequence that eliminates decision fatigue.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Each path is designed for a specific creator stage and goal. You'll know not just what to do, but when to do it, 
                why it works at your stage, and what to avoid. This clarity is what separates successful creators from those who give up.
              </p>
            </div>
          </div>
        </div>

        {/* Paths Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">Available Paths</h2>
          <div className="space-y-6">
            {executionPaths.filter(path => path.status === 'available').map((path) => (
              <div
                key={path.slug}
                className={`card p-8 ${path.status === 'coming-soon' ? 'opacity-75' : 'hover:scale-[1.01] transition-transform'} ${path.status === 'available' ? 'border-2 border-indigo-200' : ''}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-3xl font-extrabold text-gray-900">
                        {path.name}
                      </h2>
                      {path.status === 'coming-soon' && (
                        <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-bold">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                      {path.description}
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">Duration</div>
                          <div className="text-sm text-gray-600">{path.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">For</div>
                          <div className="text-sm text-gray-600">{path.targetAudience}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">Goal</div>
                          <div className="text-sm text-gray-600">{path.goal}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {path.status === 'available' && (
                    <Link
                      href={`/execution-paths/${path.slug}`}
                      className="ml-6 flex-shrink-0"
                    >
                      <div className="btn-primary px-6 py-3 whitespace-nowrap">
                        View Path →
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="gradient-bg rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Start Your Path?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Execution Paths are available for Starter plan and above. Start with the Beginner Path to establish your foundation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="bg-white text-indigo-600 px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
              >
                View Pricing
              </Link>
              <Link
                href="/dashboard"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all shadow-xl"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
