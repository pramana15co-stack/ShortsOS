'use client'

import { useState, useEffect } from 'react'
import { useAccess } from '@/lib/useAccess'
import { useAuth } from '@/app/providers/AuthProvider'
import { getCreditsInfo, hasEnoughCredits, getCreditCost } from '@/lib/credits'
import Link from 'next/link'
import CreditsDisplay from '@/components/CreditsDisplay'

interface AuditData {
  creator_stage: string
  content_gaps: string[]
  what_to_post_next: string[]
  what_to_avoid: string[]
  monetization_readiness: string
  algorithm_optimization?: string[]
  platform_strategy?: {
    youtube: string
    instagram: string
  }
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

    // Check credits for free users
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
        
        // Update credits
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

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
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

        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                Creator Intelligence Audit
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-4">
                {isPaid 
                  ? 'Get AI-powered personalized insights about your channel, content strategy, and monetization opportunities.'
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
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 rounded-lg p-4 max-w-3xl animate-fade-in">
                  <p className="text-sm font-bold text-purple-900 mb-1">🚀 AI-Powered Analysis</p>
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
        </div>

        <div className="mb-8">
          <button
            onClick={generateAudit}
            disabled={loading}
            className="btn-primary text-lg px-8 py-4 disabled:opacity-50"
          >
            {loading ? 'Generating Audit...' : isPaid ? 'Generate AI-Powered Audit' : 'Generate Free Audit'}
          </button>
        </div>

        {audit && (
          <div className="space-y-6">
            {/* Creator Stage */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Creator Stage</h2>
              <p className="text-lg text-gray-700">{audit.creator_stage}</p>
            </div>

            {/* Content Gaps */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Content Gaps</h2>
              <ul className="space-y-2">
                {audit.content_gaps.map((gap, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold mt-1">•</span>
                    <span className="text-gray-700">{gap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Post Next */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">What to Post Next</h2>
              <ul className="space-y-2">
                {audit.what_to_post_next.map((idea, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-gray-700">{idea}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Avoid */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">What to Avoid</h2>
              <ul className="space-y-2">
                {audit.what_to_avoid.map((warning, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">✗</span>
                    <span className="text-gray-700">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Monetization Readiness */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Monetization Readiness</h2>
              <p className="text-gray-700">{audit.monetization_readiness}</p>
            </div>

            {/* Algorithm Optimization */}
            {audit.algorithm_optimization && audit.algorithm_optimization.length > 0 && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Algorithm Optimization Tips</h2>
                <ul className="space-y-2">
                  {audit.algorithm_optimization.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold mt-1">⚡</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Platform Strategy */}
            {audit.platform_strategy && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Platform Strategy</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">YouTube</h3>
                    <p className="text-gray-700">{audit.platform_strategy.youtube}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Instagram</h3>
                    <p className="text-gray-700">{audit.platform_strategy.instagram}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!audit && !loading && (
          <div className="card">
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg mb-2">Ready to get your Creator Audit?</p>
              <p className="text-sm">Click the button above to generate your personalized analysis.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
