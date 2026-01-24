'use client'

import { useState, useEffect } from 'react'
import { useAccess } from '@/lib/useAccess'
import { useAuth } from '@/app/providers/AuthProvider'
import { getCreditsInfo, hasEnoughCredits, getCreditCost } from '@/lib/credits'
import Link from 'next/link'
import CreditsDisplay from '@/components/CreditsDisplay'

type ContentType = 'tutorial' | 'entertainment' | 'educational' | 'motivational'
type Goal = 'retention' | 'engagement' | 'monetization'

export default function PostProcessingPage() {
  const { isFree, isPaid } = useAccess()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    duration: '',
    contentType: 'tutorial' as ContentType,
    goal: 'retention' as Goal,
    niche: '',
    audience: '',
    hook: '',
  })
  const [output, setOutput] = useState<{
    hookSpeed: string
    pacing: string[]
    captionDensity: string
    mistakes: string[]
    improvements: string[]
  } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [credits, setCredits] = useState<number | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  // Check credits on mount
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

  const analyze = async () => {
    if (!formData.duration) {
      alert('Please enter video duration')
      return
    }
    if (!formData.niche.trim()) {
        alert('Please enter your niche/topic')
        return
    }

    // Check credits for free users
    if (!isPaid && user) {
      await checkCredits()
      const currentCredits = credits !== null ? credits : 0
      if (!hasEnoughCredits(currentCredits, 'post-processing', isPaid)) {
        setShowUpgradeModal(true)
        return
      }
    }

    setIsAnalyzing(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          feature: 'post-processing',
          data: formData
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setIsAnalyzing(false)
        if (result.error === 'Insufficient credits') {
          setShowUpgradeModal(true)
        } else {
          alert(result.error || 'Failed to analyze video')
        }
        return
      }

      if (result.success && result.data) {
        setOutput(result.data)
        
        // Update credits
        if (typeof result.creditsRemaining === 'number') {
          setCredits(result.creditsRemaining)
          window.dispatchEvent(new CustomEvent('credits-updated', { detail: { credits: result.creditsRemaining } }))
        }
      }
    } catch (error) {
      console.error('Error analyzing video:', error)
      alert('Failed to process request. Please try again.')
    } finally {
      setIsAnalyzing(false)
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
                This feature costs <span className="font-bold text-indigo-600">{getCreditCost('post-processing')} credits</span>. 
                You have <span className="font-bold">{credits || 0} credits</span> remaining.
              </p>
              <p className="text-sm text-gray-500 mb-6 text-center">
                Upgrade to Starter or Pro for unlimited access to all features.
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
                Post-Processing Intelligence
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-4">
                Get actionable feedback and recommendations to improve your videos after generation or recording. 
                Our AI analyzes your specific context to provide tailored advice for retention and engagement.
              </p>
              {isPaid && (
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 rounded-lg p-4 max-w-3xl animate-fade-in">
                    <p className="text-sm font-bold text-purple-900 mb-1">🚀 Exclusive for Pro Users:</p>
                    <p className="text-sm text-purple-800">
                        We are building advanced monetization tools! Soon you'll be able to analyze projected revenue 
                        and get sponsorship pitch templates. Learn how YouTube Shorts & Reels monetization works in our upcoming 
                        <Link href="/pricing" className="underline font-bold ml-1 hover:text-purple-900">Creator Academy</Link>.
                    </p>
                </div>
              )}
            </div>
            <div className="ml-4">
              <CreditsDisplay feature="post-processing" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Video Context</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Duration (seconds) <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., 20"
                    min="5"
                    max="60"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Content Type
                    </label>
                    <select
                    value={formData.contentType}
                    onChange={(e) => setFormData({ ...formData, contentType: e.target.value as ContentType })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                    <option value="tutorial">Tutorial</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="educational">Educational</option>
                    <option value="motivational">Motivational</option>
                    </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Topic / Niche <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  placeholder="e.g. Tech Reviews, Fitness for Beginners, Vegan Cooking"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={formData.audience}
                  onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  placeholder="e.g. College students, Busy moms, Gamers"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Key Hook / Opening Line
                </label>
                <input
                  type="text"
                  value={formData.hook}
                  onChange={(e) => setFormData({ ...formData, hook: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  placeholder="e.g. Stop making this mistake..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Primary Goal
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value as Goal })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="retention">Retention (Watch Time)</option>
                  <option value="engagement">Engagement (Comments/Shares)</option>
                  <option value="monetization">Monetization (Sales/Leads)</option>
                </select>
              </div>

              <button
                onClick={analyze}
                disabled={isAnalyzing}
                className="btn-primary w-full py-4 disabled:opacity-50"
              >
                {isAnalyzing ? 'Analyzing...' : 'Get AI Recommendations'}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">AI Analysis & Recommendations</h2>
            
            {!output ? (
              <div className="text-center py-16 text-gray-500">
                <p>Fill out the details to get a personalized retention analysis.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Hook Speed */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Hook Speed Feedback</label>
                  <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm">
                    {output.hookSpeed}
                  </div>
                </div>

                {/* Pacing */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Pacing Recommendations</label>
                  <div className="space-y-2">
                    {output.pacing.map((pace, idx) => (
                      <div key={idx} className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm">
                        {pace}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Caption Density */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Caption Density Advice</label>
                  <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm">
                    {output.captionDensity}
                  </div>
                </div>

                {/* Common Mistakes */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Potential Pitfalls</label>
                  <div className="space-y-2">
                    {output.mistakes.map((mistake, idx) => (
                      <div key={idx} className="flex items-start gap-3 px-4 py-2 border border-red-200 rounded-lg bg-red-50">
                        <span className="text-red-600 font-bold">✗</span>
                        <span className="text-gray-900 text-sm">{mistake}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improvements */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Actionable Improvements</label>
                  <div className="space-y-2">
                    {output.improvements.map((improvement, idx) => (
                      <div key={idx} className="flex items-start gap-3 px-4 py-2 border border-green-200 rounded-lg bg-green-50">
                        <span className="text-green-600 font-bold">✓</span>
                        <span className="text-gray-900 text-sm">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Understanding Video Monetization</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">YouTube Shorts Fund & Ads</p>
                <p className="text-sm text-gray-700">YouTube pays creators through the YouTube Partner Program (YPP). To qualify for Shorts ad revenue sharing, you generally need 1,000 subscribers and 10 million valid public Shorts views in the last 90 days. Revenue is shared based on your share of total views in the Creator Pool.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Instagram Reels Bonuses & Gifts</p>
                <p className="text-sm text-gray-700">Instagram monetization includes Reels Play Bonuses (invite-only), Gifts from viewers, and branded content partnerships. Engagement (reels, comments, shares) is the primary driver for algorithm push, which leads to monetization opportunities.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Sponsorships & Affiliates</p>
                <p className="text-sm text-gray-700">The most lucrative path for many creators is direct brand deals. Brands look for specific niches and engaged audiences rather than just raw view counts. Use our Post-Processing tool to optimize your content for specific "Monetization" goals to attract these opportunities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
