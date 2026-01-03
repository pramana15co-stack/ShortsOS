'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/providers/AuthProvider'
import { saveWaitlistEntry } from '@/lib/saveWaitlist'

export default function PricingPage() {
  const { user } = useAuth()
  const [waitlistData, setWaitlistData] = useState({
    email: '',
    tier: 'pro' as 'pro' | 'agency',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedTier, setSubmittedTier] = useState<'pro' | 'agency' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittingTier, setSubmittingTier] = useState<'pro' | 'agency' | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleWaitlistSubmit = async (e: React.FormEvent, tier: 'pro' | 'agency') => {
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
        tier,
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">Start Free, Scale When Ready</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Everything you need to plan and learn. Upgrade when you&apos;re ready to scale.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          {/* Free Tier - Highlighted */}
          <div className="relative glass-effect rounded-3xl p-8 premium-shadow hover-lift animate-fade-in border-2 border-primary-300 transform scale-105" style={{ animationDelay: '0.1s' }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              RECOMMENDED
            </div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Free</h2>
              <div className="mb-4">
                <span className="text-6xl font-extrabold gradient-text">₹0</span>
                <span className="text-gray-600 text-lg">/forever</span>
              </div>
              <p className="text-gray-600 font-medium">Planning + Learning</p>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                'Content planning tools',
                'Format library & guides',
                'Hook & script generators',
                'SEO optimizer',
                'Performance feedback',
                'Content ideas generator',
                'Pre-publish checklist',
                'Learning resources',
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard"
              className="block w-full text-center px-6 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started Free →
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="relative glass-effect rounded-3xl p-8 premium-shadow hover-lift animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              COMING SOON
            </div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Pro</h2>
              <div className="mb-4">
                <span className="text-6xl font-extrabold gradient-text">₹2,499</span>
                <span className="text-gray-600 text-lg">/month</span>
              </div>
              <p className="text-gray-600 font-medium">Advanced Formats + Unlimited Saves</p>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                'Everything in Free',
                'Advanced format templates',
                'Unlimited plan saves',
                'Unlimited script saves',
                'Bulk script generation',
                'Advanced analytics',
                'Export to Google Calendar',
                'Priority support',
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            {isSubmitted && submittedTier === 'pro' ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">✓</div>
                <p className="text-green-800 font-semibold">You&apos;re on the waitlist!</p>
                <p className="text-green-700 text-sm mt-1">We&apos;ll notify you when Pro launches.</p>
              </div>
            ) : (
              <form onSubmit={(e) => handleWaitlistSubmit(e, 'pro')} className="space-y-3">
                <input
                  type="email"
                  value={waitlistData.email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-gray-900 placeholder-gray-400"
                  required
                  disabled={isSubmitting && submittingTier === 'pro'}
                />
                {error && submittingTier === 'pro' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting && submittingTier === 'pro'}
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting && submittingTier === 'pro' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
            )}
          </div>

          {/* Agency Tier */}
          <div className="relative glass-effect rounded-3xl p-8 premium-shadow hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              COMING LATER
            </div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Agency</h2>
              <div className="mb-4">
                <span className="text-6xl font-extrabold gradient-text">₹8,499</span>
                <span className="text-gray-600 text-lg">/month</span>
              </div>
              <p className="text-gray-600 font-medium">Teams + Batch Planning</p>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                'Everything in Pro',
                'Team collaboration',
                'Batch planning tools',
                'Multiple channel management',
                'Client reporting dashboard',
                'White-label options',
                'API access',
                'Dedicated support',
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            {isSubmitted && submittedTier === 'agency' ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">✓</div>
                <p className="text-green-800 font-semibold">You&apos;re on the waitlist!</p>
                <p className="text-green-700 text-sm mt-1">We&apos;ll notify you when Agency launches.</p>
              </div>
            ) : (
              <form onSubmit={(e) => handleWaitlistSubmit(e, 'agency')} className="space-y-3">
                <input
                  type="email"
                  value={waitlistData.email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-gray-900 placeholder-gray-400"
                  required
                  disabled={isSubmitting && submittingTier === 'agency'}
                />
                {error && submittingTier === 'agency' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting && submittingTier === 'agency'}
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting && submittingTier === 'agency' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Compare Plans</h2>
          <div className="glass-effect rounded-2xl p-8 premium-shadow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">Free</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">Pro</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { feature: 'Content Planning', free: '✓', pro: '✓', agency: '✓' },
                  { feature: 'Format Library', free: '✓', pro: '✓', agency: '✓' },
                  { feature: 'Hook & Script Generators', free: '✓', pro: '✓', agency: '✓' },
                  { feature: 'Advanced Format Templates', free: '—', pro: '✓', agency: '✓' },
                  { feature: 'Unlimited Saves', free: 'Limited', pro: '✓', agency: '✓' },
                  { feature: 'Batch Planning', free: '—', pro: '—', agency: '✓' },
                  { feature: 'Team Collaboration', free: '—', pro: '—', agency: '✓' },
                  { feature: 'Multiple Channels', free: '—', pro: '—', agency: '✓' },
                  { feature: 'Priority Support', free: '—', pro: '✓', agency: '✓' },
                  { feature: 'API Access', free: '—', pro: '—', agency: '✓' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{row.free}</td>
                    <td className="py-4 px-4 text-center text-primary-600 font-semibold">{row.pro}</td>
                    <td className="py-4 px-4 text-center text-primary-600 font-semibold">{row.agency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'What&apos;s included in the Free plan?',
                a: 'The Free plan includes all planning and learning tools: content planning, format library, hook & script generators, SEO optimizer, performance feedback, and learning resources. Perfect for creators who want to learn and plan their Shorts content.',
              },
              {
                q: 'What makes Pro different?',
                a: 'Pro adds advanced format templates, unlimited saves for plans and scripts, bulk script generation, advanced analytics, calendar exports, and priority support. Ideal for creators ready to scale their content production.',
              },
              {
                q: 'When will Pro and Agency launch?',
                a: 'Pramana15 is building Pro features now and plans to launch soon. Agency tier will come later as we add team collaboration and batch planning features. Join the waitlist to be notified when each tier launches.',
              },
              {
                q: 'Do I need to pay to succeed?',
                a: 'Absolutely not! The Free plan has everything you need to plan, create, and optimize your Shorts. Many successful creators use only the free features. Paid plans are optional upgrades for scaling and advanced features.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="glass-effect rounded-2xl p-6 premium-shadow hover-lift animate-fade-in" style={{ animationDelay: `${0.1 * idx}s` }}>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-3xl p-12 premium-shadow animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready to Start Creating?</h2>
            <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
              Start with our free plan. No credit card required. No time limits. 
              Build your channel, grow your audience, then upgrade when you&apos;re ready to scale.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started Free Forever →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
