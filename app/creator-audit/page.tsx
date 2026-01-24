'use client'

import { useState, useEffect } from 'react'
import { useAccess } from '@/lib/useAccess'
import { useAuth } from '@/app/providers/AuthProvider'
import { getCreditsInfo, hasEnoughCredits, getCreditCost } from '@/lib/credits'
import Link from 'next/link'
import CreditsDisplay from '@/components/CreditsDisplay'

interface CreatorStage {
  stage: string
  description: string
  subscriber_range: string
  next_milestone: string
  time_to_next: string
}

interface ContentRecommendation {
  title: string
  reason: string
  priority: string
}

interface Mistake {
  mistake: string
  impact: string
  alternative: string
}

interface MonetizationRoadmap {
  current_readiness: string
  requirements_met: string[]
  requirements_missing: string[]
  next_steps: string[]
  potential_revenue: string
}

interface AlgorithmOptimization {
  retention_strategies: string[]
  ctr_improvements: string[]
  engagement_tactics: string[]
  posting_schedule: string
}

interface PlatformStrategy {
  youtube: {
    primary_focus: string
    shorts_strategy: string
    long_form_strategy: string
    community_tab: string
  }
  instagram: {
    reels_strategy: string
    cross_promotion: string
    stories_tactics: string
  }
  tiktok?: {
    strategy: string
  }
}

interface GrowthProjections {
  current_trajectory: string
  optimized_trajectory: string
  key_levers: string[]
  timeline_to_10k: string
  timeline_to_100k: string
}

interface ActionPlan {
  immediate_actions: string[]
  '30_day_plan': string[]
  '90_day_vision': string
}

interface AuditData {
  creator_stage: CreatorStage | string
  content_analysis?: {
    strengths: string[]
    weaknesses: string[]
    content_gaps: string[]
    niche_positioning: string
  }
  content_gaps?: string[] // Legacy support
  content_recommendations?: {
    what_to_post_next: ContentRecommendation[]
    trending_opportunities: string[]
    evergreen_content: string[]
  }
  what_to_post_next?: string[] | ContentRecommendation[] // Legacy support
  what_to_avoid?: string[] | Mistake[] // Legacy support
  monetization_roadmap?: MonetizationRoadmap
  monetization_readiness?: string // Legacy support
  algorithm_optimization?: AlgorithmOptimization | string[] // Legacy support
  platform_strategy?: PlatformStrategy | { youtube: string; instagram: string } // Legacy support
  growth_projections?: GrowthProjections
  action_plan?: ActionPlan
}

export default function CreatorAuditPage() {
  const { isFree, isPaid } = useAccess()
  const { user } = useAuth()
  const [audit, setAudit] = useState<AuditData | null>(null)
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState<number | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  useEffect(() => {
    if (user) {
      checkCredits()
    }
  }, [user, isPaid])

  const checkCredits = async () => {
    if (!user?.id) return

    try {
      const info = await getCreditsInfo(user.id, isPaid)
      setCredits(info.credits)
    } catch (error) {
      console.error('Error checking credits:', error)
    }
  }

  const generateAudit = async () => {
    if (!user?.id) return

    if (!isPaid && user) {
      await checkCredits()
      const currentCredits = credits !== null ? credits : 0
      if (!hasEnoughCredits(currentCredits, 'creator-audit', isPaid)) {
        setShowUpgradeModal(true)
        return
      }
    }

    setLoading(true)

    try {
      const response = await fetch('/api/creator-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.error === 'Insufficient credits') {
          setShowUpgradeModal(true)
        } else {
          alert(result.error || 'Failed to generate audit')
        }
        setLoading(false)
        return
      }

      if (result.success && result.audit) {
        setAudit(result.audit)
        
        if (typeof result.creditsRemaining === 'number') {
          setCredits(result.creditsRemaining)
          window.dispatchEvent(new CustomEvent('credits-updated', { detail: { credits: result.creditsRemaining } }))
        }
      }
    } catch (error) {
      console.error('Error generating audit:', error)
      alert('Failed to generate audit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isLegacyFormat = (audit: AuditData): boolean => {
    return typeof audit.creator_stage === 'string' || !audit.content_analysis
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="card max-w-md w-full">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 text-center">Insufficient Credits</h3>
              <p className="text-gray-600 mb-4 text-center">
                This feature costs <span className="font-bold text-indigo-600">{getCreditCost('creator-audit')} credits</span>. 
                You have <span className="font-bold">{credits || 0} credits</span> remaining.
              </p>
              <p className="text-sm text-gray-500 mb-6 text-center">
                Upgrade to Starter or Pro for AI-powered personalized audits.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="btn-secondary flex-1 py-3"
                >
                  Maybe Later
                </button>
                <Link
                  href="/pricing"
                  className="btn-primary flex-1 py-3 text-center"
                  onClick={() => setShowUpgradeModal(false)}
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                  Creator Intelligence Audit
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-4">
                {isPaid 
                  ? 'Get AI-powered, comprehensive insights about your channel strategy, growth opportunities, and monetization roadmap.'
                  : 'Get a comprehensive audit of your creator journey with actionable recommendations. Upgrade for AI-powered personalized insights.'}
              </p>
              {isFree && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-3xl">
                  <p className="text-sm text-blue-900">
                    <strong>Free Mode:</strong> You're viewing a generic audit. Upgrade to get personalized AI-powered insights based on your actual channel data.
                  </p>
                </div>
              )}
              {isPaid && (
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 rounded-lg p-4 max-w-3xl">
                  <p className="text-sm font-bold text-purple-900 mb-1">🚀 Premium AI Analysis</p>
                  <p className="text-sm text-purple-800">
                    This audit uses advanced AI to analyze your channel and provide personalized recommendations. 
                    Link your YouTube channel in <Link href="/analytics" className="underline font-bold">Analytics</Link> for even deeper insights.
                  </p>
                </div>
              )}
            </div>
            <div className="ml-4">
              <CreditsDisplay feature="creator-audit" />
            </div>
          </div>

          <div className="mb-8">
            <button
              onClick={generateAudit}
              disabled={loading}
              className="btn-primary text-lg px-8 py-4 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Comprehensive Audit...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>{isPaid ? 'Generate AI-Powered Audit' : 'Generate Free Audit'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Audit Results */}
        {audit && (
          <div className="space-y-8">
            {/* Creator Stage - Enhanced */}
            <div className="card bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2 text-gray-900">Creator Stage Analysis</h2>
                  {typeof audit.creator_stage === 'object' && audit.creator_stage.stage ? (
                    <>
                      <div className="mb-4">
                        <div className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-lg mb-2">
                          {audit.creator_stage.stage}
                        </div>
                        <p className="text-gray-700 text-lg mb-2">{audit.creator_stage.description}</p>
                        <div className="flex flex-wrap gap-4 mt-4">
                          <div className="px-4 py-2 bg-white rounded-lg border border-indigo-200">
                            <span className="text-sm text-gray-600">Subscriber Range:</span>
                            <span className="ml-2 font-bold text-indigo-700">{audit.creator_stage.subscriber_range}</span>
                          </div>
                          <div className="px-4 py-2 bg-white rounded-lg border border-indigo-200">
                            <span className="text-sm text-gray-600">Next Milestone:</span>
                            <span className="ml-2 font-bold text-indigo-700">{audit.creator_stage.next_milestone}</span>
                          </div>
                          <div className="px-4 py-2 bg-white rounded-lg border border-indigo-200">
                            <span className="text-sm text-gray-600">Timeline:</span>
                            <span className="ml-2 font-bold text-indigo-700">{audit.creator_stage.time_to_next}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : typeof audit.creator_stage === 'string' ? (
                    <p className="text-lg text-gray-700">{audit.creator_stage}</p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Content Analysis */}
            {audit.content_analysis && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card border-2 border-green-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">✅</span> Strengths
                  </h3>
                  <ul className="space-y-3">
                    {audit.content_analysis.strengths.map((strength, idx) => {
                      const strengthText = typeof strength === 'string' ? strength : JSON.stringify(strength);
                      return (
                        <li key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <span className="text-green-600 font-bold mt-1">✓</span>
                          <span className="text-gray-700">{strengthText}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="card border-2 border-orange-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span> Areas for Improvement
                  </h3>
                  <ul className="space-y-3">
                    {audit.content_analysis.weaknesses.map((weakness, idx) => {
                      const weaknessText = typeof weakness === 'string' ? weakness : JSON.stringify(weakness);
                      return (
                        <li key={idx} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                          <span className="text-orange-600 font-bold mt-1">•</span>
                          <span className="text-gray-700">{weaknessText}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            {/* Content Gaps */}
            {(audit.content_analysis?.content_gaps || audit.content_gaps) && (
              <div className="card border-2 border-blue-200">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">🔍</span> Content Gaps & Opportunities
                </h2>
                <div className="space-y-3">
                  {(audit.content_analysis?.content_gaps || audit.content_gaps || []).map((gap, idx) => {
                    // Handle both string and object formats
                    const gapText = typeof gap === 'string' ? gap : (gap as any)?.gap || (gap as any)?.explanation || JSON.stringify(gap);
                    const gapExplanation = typeof gap === 'object' && (gap as any)?.explanation ? (gap as any).explanation : null;
                    
                    return (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-blue-600 font-bold text-xl mt-1">{idx + 1}.</span>
                        <div className="flex-1">
                          <span className="text-gray-700">{gapText}</span>
                          {gapExplanation && gapExplanation !== gapText && (
                            <p className="text-sm text-gray-600 mt-1">{gapExplanation}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {audit.content_analysis?.niche_positioning && (
                  <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="font-semibold text-gray-900 mb-2">Niche Positioning:</p>
                    <p className="text-gray-700">{audit.content_analysis.niche_positioning}</p>
                  </div>
                )}
              </div>
            )}

            {/* Content Recommendations */}
            {audit.content_recommendations && (
              <div className="card border-2 border-purple-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">💡</span> Strategic Content Recommendations
                </h2>
                
                {/* What to Post Next */}
                {audit.content_recommendations.what_to_post_next && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Priority Video Ideas</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {audit.content_recommendations.what_to_post_next.map((rec, idx) => {
                        const isObject = typeof rec === 'object'
                        const title = isObject ? rec.title : rec
                        const reason = isObject ? rec.reason : ''
                        const priority = isObject ? rec.priority : 'Medium'
                        
                        return (
                          <div key={idx} className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-bold text-gray-900">{title}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                priority === 'High' ? 'bg-red-100 text-red-700' :
                                priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {priority}
                              </span>
                            </div>
                            {reason && <p className="text-sm text-gray-600 mt-2">{reason}</p>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Trending Opportunities */}
                {audit.content_recommendations.trending_opportunities && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-3 text-gray-900">🔥 Trending Opportunities</h3>
                    <div className="flex flex-wrap gap-2">
                      {audit.content_recommendations.trending_opportunities.map((topic, idx) => (
                        <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Evergreen Content */}
                {audit.content_recommendations.evergreen_content && (
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-gray-900">🌲 Evergreen Content Ideas</h3>
                    <div className="flex flex-wrap gap-2">
                      {audit.content_recommendations.evergreen_content.map((idea, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {idea}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* What to Avoid */}
            {audit.what_to_avoid && audit.what_to_avoid.length > 0 && (
              <div className="card border-2 border-red-200">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">🚫</span> Critical Mistakes to Avoid
                </h2>
                <div className="space-y-4">
                  {audit.what_to_avoid.map((item, idx) => {
                    const isObject = typeof item === 'object' && 'mistake' in item
                    if (isObject) {
                      const mistake = item as Mistake
                      return (
                        <div key={idx} className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex items-start gap-3 mb-2">
                            <span className="text-red-600 font-bold text-xl">✗</span>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-1">{mistake.mistake}</h4>
                              <p className="text-sm text-gray-600 mb-2">{mistake.impact}</p>
                              <p className="text-sm text-green-700 font-medium">
                                <span className="font-bold">Better:</span> {mistake.alternative}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                          <span className="text-red-600 font-bold mt-1">✗</span>
                          <span className="text-gray-700">{item as string}</span>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            )}

            {/* Monetization Roadmap */}
            {audit.monetization_roadmap && (
              <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">💰</span> Monetization Roadmap
                </h2>
                
                <div className="mb-6 p-4 bg-white rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600 mb-2">Current Readiness</p>
                  <p className="text-2xl font-bold text-green-700">{audit.monetization_roadmap.current_readiness}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">✅ Requirements Met</h3>
                    <ul className="space-y-2">
                      {audit.monetization_roadmap.requirements_met.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-green-700">
                          <span>✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">⏳ Requirements Missing</h3>
                    <ul className="space-y-2">
                      {audit.monetization_roadmap.requirements_missing.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-orange-700">
                          <span>•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">📈 Next Steps to Monetization</h3>
                  <div className="space-y-2">
                    {audit.monetization_roadmap.next_steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
                        <span className="font-bold text-green-600">{idx + 1}.</span>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {audit.monetization_roadmap.potential_revenue && (
                  <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-white">
                    <p className="text-sm opacity-90 mb-1">Potential Revenue Estimate</p>
                    <p className="text-2xl font-bold">{audit.monetization_roadmap.potential_revenue}</p>
                  </div>
                )}
              </div>
            )}

            {/* Algorithm Optimization */}
            {audit.algorithm_optimization && (
              <div className="card border-2 border-purple-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">⚡</span> Algorithm Optimization Strategy
                </h2>
                
                {Array.isArray(audit.algorithm_optimization) ? (
                  // Legacy format: array of strings
                  <ul className="space-y-2">
                    {audit.algorithm_optimization.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                        <span className="text-purple-600 font-bold mt-1">⚡</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  // New format: AlgorithmOptimization object
                  <>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      {audit.algorithm_optimization.retention_strategies && (
                        <div>
                          <h3 className="font-bold text-gray-900 mb-3">📊 Retention Strategies</h3>
                          <ul className="space-y-2">
                            {audit.algorithm_optimization.retention_strategies.map((strategy, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{strategy}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {audit.algorithm_optimization.ctr_improvements && (
                        <div>
                          <h3 className="font-bold text-gray-900 mb-3">👆 CTR Improvements</h3>
                          <ul className="space-y-2">
                            {audit.algorithm_optimization.ctr_improvements.map((tip, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {audit.algorithm_optimization.engagement_tactics && (
                        <div>
                          <h3 className="font-bold text-gray-900 mb-3">💬 Engagement Tactics</h3>
                          <ul className="space-y-2">
                            {audit.algorithm_optimization.engagement_tactics.map((tactic, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{tactic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {audit.algorithm_optimization.posting_schedule && (
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="font-bold text-gray-900 mb-1">📅 Optimal Posting Schedule</p>
                        <p className="text-gray-700">{audit.algorithm_optimization.posting_schedule}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Platform Strategy */}
            {audit.platform_strategy && (
              <div className="card border-2 border-indigo-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">🌐</span> Multi-Platform Strategy
                </h2>
                
                {typeof audit.platform_strategy === 'object' && 'youtube' in audit.platform_strategy && typeof audit.platform_strategy.youtube === 'object' && 'primary_focus' in audit.platform_strategy.youtube ? (
                  // New format: PlatformStrategy object with detailed properties
                  <div className="space-y-6">
                    {/* YouTube */}
                    {audit.platform_strategy.youtube && (
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                          <span>▶️</span> YouTube Strategy
                        </h3>
                        <div className="space-y-3">
                          {audit.platform_strategy.youtube.primary_focus && (
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">Primary Focus:</p>
                              <p className="text-gray-700">{audit.platform_strategy.youtube.primary_focus}</p>
                            </div>
                          )}
                          {audit.platform_strategy.youtube.shorts_strategy && (
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">Shorts Strategy:</p>
                              <p className="text-gray-700">{audit.platform_strategy.youtube.shorts_strategy}</p>
                            </div>
                          )}
                          {audit.platform_strategy.youtube.long_form_strategy && (
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">Long-Form Strategy:</p>
                              <p className="text-gray-700">{audit.platform_strategy.youtube.long_form_strategy}</p>
                            </div>
                          )}
                          {audit.platform_strategy.youtube.community_tab && (
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">Community Engagement:</p>
                              <p className="text-gray-700">{audit.platform_strategy.youtube.community_tab}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Instagram */}
                    {audit.platform_strategy.instagram && typeof audit.platform_strategy.instagram === 'object' && (
                      <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                          <span>📷</span> Instagram Strategy
                        </h3>
                        <div className="space-y-3">
                          {audit.platform_strategy.instagram.reels_strategy && (
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">Reels Strategy:</p>
                              <p className="text-gray-700">{audit.platform_strategy.instagram.reels_strategy}</p>
                            </div>
                          )}
                          {audit.platform_strategy.instagram.cross_promotion && (
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">Cross-Promotion:</p>
                              <p className="text-gray-700">{audit.platform_strategy.instagram.cross_promotion}</p>
                            </div>
                          )}
                          {audit.platform_strategy.instagram.stories_tactics && (
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">Stories Tactics:</p>
                              <p className="text-gray-700">{audit.platform_strategy.instagram.stories_tactics}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Legacy format: simple object with youtube and instagram strings
                  <div className="space-y-4">
                    {audit.platform_strategy.youtube && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">YouTube</h3>
                        <p className="text-gray-700">{typeof audit.platform_strategy.youtube === 'string' ? audit.platform_strategy.youtube : JSON.stringify(audit.platform_strategy.youtube)}</p>
                      </div>
                    )}
                    {audit.platform_strategy.instagram && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Instagram</h3>
                        <p className="text-gray-700">{typeof audit.platform_strategy.instagram === 'string' ? audit.platform_strategy.instagram : JSON.stringify(audit.platform_strategy.instagram)}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Growth Projections */}
            {audit.growth_projections && (
              <div className="card bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">📈</span> Growth Projections
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-white rounded-lg border border-indigo-200">
                    <p className="text-sm text-gray-600 mb-2">Current Trajectory</p>
                    <p className="text-gray-700">{audit.growth_projections.current_trajectory}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-indigo-200">
                    <p className="text-sm text-gray-600 mb-2">Optimized Trajectory</p>
                    <p className="text-gray-700">{audit.growth_projections.optimized_trajectory}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">🎯 Key Growth Levers</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {audit.growth_projections.key_levers.map((lever, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-lg border border-indigo-200">
                        <span className="text-indigo-600 font-bold mr-2">{idx + 1}.</span>
                        <span className="text-gray-700">{lever}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-indigo-200">
                    <p className="text-sm text-gray-600 mb-1">Timeline to 10K</p>
                    <p className="text-lg font-bold text-indigo-700">{audit.growth_projections.timeline_to_10k}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-indigo-200">
                    <p className="text-sm text-gray-600 mb-1">Timeline to 100K</p>
                    <p className="text-lg font-bold text-indigo-700">{audit.growth_projections.timeline_to_100k}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Plan */}
            {audit.action_plan && (
              <div className="card border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">✅</span> Your Action Plan
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-gray-900">🚀 Immediate Actions (This Week)</h3>
                    <div className="space-y-2">
                      {audit.action_plan.immediate_actions.map((action, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
                          <span className="font-bold text-green-600">{idx + 1}.</span>
                          <span className="text-gray-700">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3 text-gray-900">📅 30-Day Plan</h3>
                    <div className="space-y-2">
                      {audit.action_plan['30_day_plan'].map((goal, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
                          <span className="font-bold text-green-600">{idx + 1}.</span>
                          <span className="text-gray-700">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-white">
                    <p className="font-bold mb-2">🎯 90-Day Vision</p>
                    <p className="text-lg">{audit.action_plan['90_day_vision']}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Legacy Format Support */}
            {isLegacyFormat(audit) && (
              <>
                {audit.content_gaps && (
                  <div className="card">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Content Gaps</h2>
                    <ul className="space-y-2">
                      {audit.content_gaps.map((gap, idx) => {
                        const gapText = typeof gap === 'string' ? gap : (gap as any)?.gap || (gap as any)?.explanation || JSON.stringify(gap);
                        return (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-indigo-600 font-bold mt-1">•</span>
                            <span className="text-gray-700">{gapText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {audit.what_to_post_next && Array.isArray(audit.what_to_post_next) && audit.what_to_post_next.length > 0 && typeof audit.what_to_post_next[0] === 'string' && (
                  <div className="card">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">What to Post Next</h2>
                    <ul className="space-y-2">
                      {audit.what_to_post_next.map((idea, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-green-600 font-bold mt-1">✓</span>
                          <span className="text-gray-700">{idea as string}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {audit.monetization_readiness && (
                  <div className="card">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Monetization Readiness</h2>
                    <p className="text-gray-700">{audit.monetization_readiness}</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {!audit && !loading && (
          <div className="card">
            <div className="text-center py-16 text-gray-500">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📊</span>
              </div>
              <p className="text-xl font-semibold mb-2 text-gray-700">Ready to get your Creator Audit?</p>
              <p className="text-sm">Click the button above to generate your comprehensive, AI-powered analysis.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
