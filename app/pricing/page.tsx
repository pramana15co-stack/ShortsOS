'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/providers/AuthProvider'
import { saveWaitlistEntry } from '@/lib/saveWaitlist'

export default function PricingPage() {
  const { user } = useAuth()
  const [waitlistData, setWaitlistData] = useState({
    email: '',
    tier: 'paths' as 'paths' | 'agency',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedTier, setSubmittedTier] = useState<'paths' | 'agency' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittingTier, setSubmittingTier] = useState<'paths' | 'agency' | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleWaitlistSubmit = async (e: React.FormEvent, tier: 'paths' | 'agency') => {
    e.preventDefault()
    setError(null)
    setSubmittingTier(tier)
    
    if (!waitlistData.email.trim()) {
      setError('Please enter your email')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await saveWaitlistEntry({
        email: waitlistData.email.trim(),
        tier: tier === 'paths' ? 'pro' : 'agency',
        user_id: user?.id,
      })

      if (result.success) {
        setIsSubmitted(true)
        setSubmittedTier(tier)
        setWaitlistData({ email: '', tier })
        setError(null)
      } else {
        setError(result.error || 'Failed to join waitlist. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaitlistData({ ...waitlistData, email: e.target.value })
    setError(null)
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-indigo-200/50 rounded-full mb-8 shadow-lg">
            <span className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Built by Pramana</span>
          </div>
          <div className="accent-line mx-auto mb-6"></div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            Simple Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free. Upgrade when you're ready for the complete system.
          </p>
        </div>

        {/* Main Bundle - Featured */}
        <div className="mb-20">
          <div className="gradient-bg rounded-3xl p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                  Complete Creator Bundle
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Everything You Need to Make Shorts Hit</h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                  The complete system: proven formats, execution paths, monetization strategies, tools, and daily posting guidance.
                </p>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <span className="text-6xl font-extrabold">$97</span>
                  <span className="text-2xl text-white/70 line-through">$197</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Complete Path to Success</h3>
                  <ul className="space-y-3 text-white/90">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Step-by-step execution paths (0 to 10K+ subscribers)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>All 6 proven format guides with templates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>50+ ready-to-use script templates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>100+ hook variations for every niche</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Monetization & Growth</h3>
                  <ul className="space-y-3 text-white/90">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Complete affiliate marketing guide & strategies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Videos per day strategy (when & how many to post)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Curated tools directory (free & paid recommendations)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Growth strategy playbook & analytics guide</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/products/complete-shorts-bundle"
                  className="inline-block bg-white text-indigo-600 px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
                >
                  View Complete Bundle →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Free vs Paid Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Plan</h3>
            <p className="text-gray-600 mb-6">Perfect for getting started</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Format library access</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Basic planning tools</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Hook & script templates</span>
              </li>
            </ul>
            <Link href="/dashboard" className="btn-secondary w-full text-center py-4">
              Get Started Free
            </Link>
          </div>

          <div className="card p-8 border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/30 to-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Bundle</h3>
            <p className="text-gray-600 mb-6">Everything to make your Shorts hit</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Everything in Free, plus:</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Complete execution paths</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Affiliate marketing guide</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Videos per day strategy</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Curated tools directory</span>
              </li>
            </ul>
            <Link href="/products/complete-shorts-bundle" className="btn-primary w-full text-center py-4">
              Get Complete Bundle - $97
            </Link>
          </div>
        </div>

        {/* Coming Soon Plans */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-gray-600">Additional plans for advanced creators</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-8 opacity-75">
              <div className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
                Coming Soon
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Paths Access</h3>
              <p className="text-gray-600 mb-4">Access to all Execution Paths with weekly breakdowns and progress checkpoints.</p>
              {isSubmitted && submittedTier === 'paths' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-green-900">Added to waitlist!</p>
                </div>
              ) : (
                <form onSubmit={(e) => handleWaitlistSubmit(e, 'paths')} className="space-y-3">
                  <input
                    type="email"
                    value={waitlistData.email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400 text-sm"
                    required
                    disabled={isSubmitting && submittingTier === 'paths'}
                  />
                  {error && submittingTier === 'paths' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting && submittingTier === 'paths'}
                    className="w-full btn-secondary py-3 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting && submittingTier === 'paths' ? 'Adding...' : 'Join Waitlist'}
                  </button>
                </form>
              )}
            </div>

            <div className="card p-8 opacity-75">
              <div className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
                Coming Soon
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Agency Mode</h3>
              <p className="text-gray-600 mb-4">For freelancers and agencies managing multiple channels. Scale efficiently with team collaboration.</p>
              {isSubmitted && submittedTier === 'agency' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-green-900">Added to waitlist!</p>
                </div>
              ) : (
                <form onSubmit={(e) => handleWaitlistSubmit(e, 'agency')} className="space-y-3">
                  <input
                    type="email"
                    value={waitlistData.email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400 text-sm"
                    required
                    disabled={isSubmitting && submittingTier === 'agency'}
                  />
                  {error && submittingTier === 'agency' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting && submittingTier === 'agency'}
                    className="w-full btn-secondary py-3 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting && submittingTier === 'agency' ? 'Adding...' : 'Join Waitlist'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="card p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-4 text-gray-900">Ready to Make Your Shorts Hit?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Start with the free plan, or get the complete bundle with everything you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="btn-secondary px-8 py-4">
                Start Free
              </Link>
              <Link href="/products/complete-shorts-bundle" className="btn-primary px-8 py-4">
                Get Complete Bundle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
