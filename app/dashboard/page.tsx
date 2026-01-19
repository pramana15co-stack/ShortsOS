'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRequireAuth } from '@/lib/requireAuth'
import { useAuth } from '@/app/providers/AuthProvider'
import { getLastPlannerResult, PlannerHistoryItem } from '@/lib/getPlannerHistory'
import SuccessBanner from '@/components/SuccessBanner'
import EmailVerificationBanner from '@/components/EmailVerificationBanner'
import SubscriptionManagement from '@/components/SubscriptionManagement'

function DashboardContent() {
  const { loading } = useRequireAuth()
  const { user, session, refreshSession } = useAuth()
  const searchParams = useSearchParams()
  const showSuccessBanner = searchParams.get('payment') === 'success'
  const [lastPlan, setLastPlan] = useState<PlannerHistoryItem | null>(null)
  const [loadingPlan, setLoadingPlan] = useState(true)
  const [bannerDismissed, setBannerDismissed] = useState(false)

  // Refresh profile data after successful payment
  useEffect(() => {
    if (showSuccessBanner && session?.access_token) {
      console.log('🔄 [DASHBOARD] Payment success detected, refreshing profile...')
      // Refresh session to get updated profile data
      refreshSession().then(() => {
        console.log('✅ [DASHBOARD] Profile refreshed after payment')
      }).catch((error) => {
        console.error('❌ [DASHBOARD] Failed to refresh profile:', error)
      })
    }
  }, [showSuccessBanner, session?.access_token, refreshSession])

  // Profile bootstrap is now handled in AuthProvider, no need to duplicate here

  useEffect(() => {
    if (user && !loading) {
      setLoadingPlan(true)
      getLastPlannerResult(user.id)
        .then((result) => {
          if (result.success) {
            setLastPlan(result.data)
          } else {
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
      <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

  const quickActions = [
    { title: 'Content Planner', description: 'Get format recommendations', icon: '🎯', href: '/planner', color: 'from-blue-500 to-indigo-600' },
    { title: 'Creator Audit', description: 'Get personalized guidance', icon: '🔍', href: '/creator-audit', color: 'from-indigo-500 to-purple-600', premium: true },
    { title: 'Format Library', description: 'Browse proven formats', icon: '📚', href: '/formats', color: 'from-purple-500 to-pink-600' },
    { title: 'Prompt Studio', description: 'Generate AI video prompts', icon: '🎬', href: '/prompt-studio', color: 'from-violet-500 to-purple-600' },
    { title: 'Hook & Caption Engine', description: 'Create hooks and captions', icon: '🎣', href: '/hook-caption-engine', color: 'from-orange-500 to-amber-600' },
    { title: 'Post-Processing', description: 'Get optimization feedback', icon: '⚡', href: '/post-processing', color: 'from-emerald-500 to-teal-600' },
    { title: 'Generate Scripts', description: 'Create structured scripts', icon: '📝', href: '/scripts', color: 'from-indigo-500 to-blue-600' },
  ]

  const tools = [
    { title: 'Saved Scripts', description: 'View your saved scripts', icon: '📝', href: '/saved-scripts' },
    { title: 'Saved Hooks', description: 'View your saved hooks', icon: '🎣', href: '/saved-hooks' },
    { title: 'Content Calendar', description: 'Plan your content schedule', icon: '📅', href: '/calendar' },
    { title: 'Content Ideas', description: 'Generate content ideas', icon: '💡', href: '/content-ideas' },
    { title: 'Creator Tools', description: 'Discover tools & resources', icon: '🛠️', href: '/tools' },
    { title: 'Execution Paths', description: 'Step-by-step playbooks', icon: '🗺️', href: '/execution-paths' },
  ]

  return (
    <main className="min-h-screen py-8 md:py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
                Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Welcome back, {user?.email?.split('@')[0] || 'Creator'}! Here's your content planning control center.
              </p>
            </div>
            <Link href="/pricing" className="hidden md:block btn-primary px-6 py-3 text-sm">
              View Packages
            </Link>
          </div>
        </div>

        {/* Success Banner - Shows after payment */}
        <EmailVerificationBanner />
        {(showSuccessBanner || user?.subscription_status === 'active') && !bannerDismissed && (
          <SuccessBanner
            show={true}
            onDismiss={() => setBannerDismissed(true)}
          />
        )}

        {/* Current Plan Status */}
        {lastPlan ? (
          <div className="card p-8 mb-8 border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/30 to-white">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl font-bold">✓</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-gray-900">Your Current Plan</h2>
                    <p className="text-sm text-gray-600">Last updated {new Date(lastPlan.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-1">Niche</div>
                    <div className="text-lg font-bold text-gray-900">{lastPlan.niche}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-1">Goal</div>
                    <div className="text-lg font-bold text-gray-900">{lastPlan.goal}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-1">Experience</div>
                    <div className="text-lg font-bold text-gray-900">{lastPlan.experience_level}</div>
                  </div>
                </div>
                {lastPlan.recommended_formats && lastPlan.recommended_formats.length > 0 && (
                  <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-2">Recommended Format</div>
                    <div className="text-lg font-bold text-gray-900">{lastPlan.recommended_formats[0].format_name}</div>
                  </div>
                )}
                <Link
                  href="/planner"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
                >
                  <span>View full plan</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="card p-8 mb-8 border-2 border-dashed border-gray-300 bg-gray-50/50">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">Get Started with Your First Plan</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Create a personalized content plan based on your niche, goals, and experience level.
              </p>
              <Link
                href="/planner"
                className="btn-primary px-8 py-4 inline-block"
              >
                Create Your First Plan
              </Link>
            </div>
          </div>
        )}

        {/* Quick Actions - Main Tools */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Quick Actions</h2>
              <p className="text-gray-600">Start creating with these essential tools</p>
            </div>
            <Link href="/tools" className="text-indigo-600 hover:text-indigo-700 font-bold text-sm">
              View All Tools →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, idx) => (
              <Link
                key={idx}
                href={action.href}
                className="group card p-6 hover:scale-[1.02] transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="text-3xl">{action.icon}</span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-gradient transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                <div className="flex items-center text-indigo-600 font-bold text-sm group-hover:translate-x-2 transition-transform">
                  <span>Get started</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Subscription Management */}
        {user && (
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Subscription</h2>
            <SubscriptionManagement />
          </div>
        )}

        {/* Tools & Resources */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Tools & Resources</h2>
              <p className="text-gray-600">Additional tools to support your content creation</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="group card p-6 text-center hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{tool.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{tool.title}</h3>
                <p className="text-xs text-gray-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recommended Next Steps */}
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Recommended Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {lastPlan && lastPlan.recommended_formats?.[0]?.format_slug ? (
              <>
                <Link
                  href={`/formats/${lastPlan.recommended_formats[0].format_slug}`}
                  className="card p-6 hover:scale-[1.02] transition-transform border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/30 to-white"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-bold">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-extrabold text-gray-900 mb-2">Learn Your Recommended Format</h3>
                      <p className="text-gray-600 mb-4">{lastPlan.recommended_formats[0].format_name}</p>
                      <div className="flex items-center text-indigo-600 font-bold text-sm">
                        <span>Study format guide</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/scripts"
                  className="card p-6 hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-extrabold text-gray-900 mb-2">Create Your First Script</h3>
                      <p className="text-gray-600 mb-4">Use our script generator to create structured content for your Shorts</p>
                      <div className="flex items-center text-indigo-600 font-bold text-sm">
                        <span>Generate script</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/planner"
                  className="card p-6 hover:scale-[1.02] transition-transform border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/30 to-white"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-bold">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-extrabold text-gray-900 mb-2">Create Your First Plan</h3>
                      <p className="text-gray-600 mb-4">Get personalized format recommendations based on your niche and goals</p>
                      <div className="flex items-center text-indigo-600 font-bold text-sm">
                        <span>Start planning</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/formats"
                  className="card p-6 hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-extrabold text-gray-900 mb-2">Explore Format Library</h3>
                      <p className="text-gray-600 mb-4">Browse proven formats with execution guides and templates</p>
                      <div className="flex items-center text-indigo-600 font-bold text-sm">
                        <span>Browse formats</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Execution Paths CTA */}
        <div className="gradient-bg rounded-3xl p-10 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready for Structured Guidance?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Execution Paths provide step-by-step, stage-aware playbooks that eliminate decision fatigue and guide you toward specific goals.
            </p>
            <Link
              href="/execution-paths"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
            >
              Explore Execution Paths →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      </main>
    }>
      <DashboardContent />
    </Suspense>
  )
}
