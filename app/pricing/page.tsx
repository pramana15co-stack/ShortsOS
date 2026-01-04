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
        tier: tier === 'paths' ? 'pro' : 'agency', // Map to existing tier names in database
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
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded mb-6">
            <span className="text-xs font-medium text-gray-700">Built by Pramana</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
            Choose Your Path
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each plan is designed for a different stage of your creator journey. Start with what you need now.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Free Plan */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Free</h2>
              <div className="mb-4">
                <span className="text-4xl font-semibold text-gray-900">Free</span>
              </div>
              <p className="text-sm text-gray-600">Core planning & basic guidance</p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">Who this is for</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Creators who want to plan their content, learn proven formats, and get structured guidance without committing to a paid plan.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">What you get</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Content planning tools and format recommendations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Format library with execution guides</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Hook and script templates</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Basic guidance and learning resources</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Outcome</h3>
              <p className="text-sm text-gray-700">
                Make better content decisions, understand which formats work for your stage, and establish a planning foundation.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="block w-full text-center px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Paths Access Plan */}
          <div className="bg-white border-2 border-gray-900 rounded-lg p-8 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-medium">
                Available Soon
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Paths Access</h2>
              <div className="mb-4">
                <span className="text-4xl font-semibold text-gray-900">Pricing TBD</span>
              </div>
              <p className="text-sm text-gray-600">Access to all Execution Paths</p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">Who this is for</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Creators who know their goal but need a clear, step-by-step sequence to get there. You want structured guidance that eliminates decision fatigue and saves time.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">What you get</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Complete Execution Paths with weekly breakdowns</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Stage-aware format recommendations and constraints</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Progress checkpoints and evaluation criteria</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Clear guidance on when to move to the next stage</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Outcome</h3>
              <p className="text-sm text-gray-700">
                Follow a structured sequence that eliminates guesswork, reduces trial and error, and moves you toward your specific goal with clarity.
              </p>
            </div>

            {isSubmitted && submittedTier === 'paths' ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-gray-900 mb-1">Added to waitlist</p>
                <p className="text-xs text-gray-600">Pramana will notify you when Paths Access is available.</p>
              </div>
            ) : (
              <form onSubmit={(e) => handleWaitlistSubmit(e, 'paths')} className="space-y-3">
                <input
                  type="email"
                  value={waitlistData.email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 text-gray-900 placeholder-gray-400 text-sm"
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
                  className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isSubmitting && submittingTier === 'paths' ? 'Adding...' : 'Add to Waitlist'}
                </button>
              </form>
            )}
          </div>

          {/* Agency Mode Plan */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-xs font-medium">
                Coming Soon
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Agency Mode</h2>
              <p className="text-sm text-gray-600">For scaling content operations</p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">Who this is for</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Agency Mode is designed for professionals who manage content at scale:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span><strong>Freelancers</strong> managing multiple client channels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span><strong>Agencies</strong> handling content planning for multiple creators</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span><strong>Operators</strong> running multiple channels or brand accounts</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">What problem it solves</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-medium text-gray-900 mb-1">Scale</p>
                  <p className="leading-relaxed">
                    Plan content for multiple channels without duplicating work. Apply proven formats and Execution Paths across different accounts efficiently.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Reuse</p>
                  <p className="leading-relaxed">
                    Save and reuse planning templates, format structures, and successful strategies across channels. Build a library of what works.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Consistency</p>
                  <p className="leading-relaxed">
                    Maintain consistent planning quality and execution standards across all channels, even when working with different team members.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">Why it's different from individual use</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Individual plans focus on your personal creator journey. Agency Mode addresses the unique challenges of managing multiple channels:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Team collaboration instead of solo planning</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Batch operations for multiple channels at once</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Shared templates and workflows across accounts</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Centralized planning and reporting for all channels</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Outcome</h3>
              <p className="text-sm text-gray-700">
                Scale your content operations efficiently while maintaining quality and consistency across all channels. Reduce planning time per channel by reusing proven structures and workflows.
              </p>
            </div>

            {isSubmitted && submittedTier === 'agency' ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-gray-900 mb-1">Added to waitlist</p>
                <p className="text-xs text-gray-600">Pramana will notify you when Agency Mode is available.</p>
              </div>
            ) : (
              <form onSubmit={(e) => handleWaitlistSubmit(e, 'agency')} className="space-y-3">
                <input
                  type="email"
                  value={waitlistData.email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 text-gray-900 placeholder-gray-400 text-sm"
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
                  className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isSubmitting && submittingTier === 'agency' ? 'Adding...' : 'Add to Waitlist'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* How to Choose Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Choose</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Start with Free</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  If you're new to Shorts or want to establish a planning foundation, the Free plan gives you everything you need to make better content decisions. Many creators succeed using only the free tools.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Consider Paths Access when</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  You know your goal but feel uncertain about the sequence of steps to get there. Execution Paths provide the structured guidance that eliminates decision fatigue and saves time by giving you a clear, ordered sequence.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Agency Mode is for</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Freelancers, agencies, and operators managing multiple channels who need to scale efficiently, reuse proven structures, and maintain consistency across accounts. This solves the problem of duplicating planning work across channels.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Common Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Do I need to pay to succeed?</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                No. The Free plan includes all core planning tools and format guidance. Many successful creators use only the free features. Paid plans are for creators who want structured Execution Paths or team collaboration tools.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">What's the difference between Free and Paths Access?</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Free gives you planning tools and format recommendations. Paths Access adds complete Execution Paths—step-by-step, stage-aware playbooks with weekly breakdowns, progress checkpoints, and clear guidance on when to move to the next stage.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">When will Paths Access and Agency Mode be available?</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Pramana is building these features now. Add your email to the waitlist to be notified when each plan becomes available. Pricing will be announced closer to launch.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I change plans later?</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Yes. Start with Free and move to Paths Access or Agency Mode when you need structured Execution Paths or team collaboration features. You can change your plan based on your needs.
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Ready-to-Use Packages & Bundles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get complete packages with proven formats, execution paths, and strategies. Based on what's worked for thousands of creators.
            </p>
          </div>
          <div className="text-center">
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              View All Packages →
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Start Planning Better Content</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              Begin with the Free plan. No credit card required. Use Pramana's planning tools and format guidance to make better content decisions.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
