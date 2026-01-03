'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PricingPage() {
  const [waitlistData, setWaitlistData] = useState({
    email: '',
    tier: 'pro' as 'pro' | 'agency',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedTier, setSubmittedTier] = useState<'pro' | 'agency' | null>(null)

  const handleWaitlistSubmit = (e: React.FormEvent, tier: 'pro' | 'agency') => {
    e.preventDefault()
    if (!waitlistData.email.trim()) {
      alert('Please enter your email')
      return
    }
    setIsSubmitted(true)
    setSubmittedTier(tier)
    setWaitlistData({ email: '', tier })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaitlistData({ ...waitlistData, email: e.target.value })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">Earn First, Pay Later</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Start free. Earn ₹2-3 Lakh per month. Pay when you&apos;re ready to scale.
          </p>
          <div className="glass-effect rounded-2xl p-8 max-w-3xl mx-auto premium-shadow animate-slide-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-4xl">💰</div>
              <h2 className="text-2xl font-bold text-gray-900">Our Philosophy: Earn First, Then Pay</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              We believe you should make money from YouTube Shorts before paying for tools. 
              That&apos;s why our free tier includes everything you need to learn, plan, and start earning ₹2-3 Lakh per month.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          {/* Free Tier */}
          <div className="glass-effect rounded-3xl p-8 premium-shadow hover-lift animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                Most Popular
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Free</h2>
              <div className="mb-4">
                <span className="text-6xl font-extrabold gradient-text">₹0</span>
                <span className="text-gray-600 text-lg">/forever</span>
              </div>
              <p className="text-gray-600 font-medium">Perfect for learning and earning</p>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                'All planning tools',
                'Content calendar',
                'Format library & guides',
                'Hook & script generators',
                'SEO optimizer',
                'Performance feedback',
                'Content ideas generator',
                'Pre-publish checklist',
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
          <div className="relative glass-effect rounded-3xl p-8 premium-shadow hover-lift transform scale-105 border-2 border-primary-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              COMING SOON
            </div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Pro</h2>
              <div className="mb-4">
                <span className="text-6xl font-extrabold gradient-text">₹2,499</span>
                <span className="text-gray-600 text-lg">/month</span>
              </div>
              <p className="text-gray-600 font-medium">Scale your Shorts channel</p>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                'Everything in Free',
                'Unlimited content planning',
                'Advanced analytics & insights',
                'Bulk script generation',
                'Export to Google Calendar',
                'Priority support',
                'Advanced format templates',
                'Revenue tracking tools',
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
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Join Waitlist
                </button>
              </form>
            )}
          </div>

          {/* Agency Tier */}
          <div className="glass-effect rounded-3xl p-8 premium-shadow hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              COMING LATER
            </div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Agency</h2>
              <div className="mb-4">
                <span className="text-6xl font-extrabold gradient-text">₹8,499</span>
                <span className="text-gray-600 text-lg">/month</span>
              </div>
              <p className="text-gray-600 font-medium">For teams and agencies</p>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                'Everything in Pro',
                'Team collaboration',
                'Multiple channel management',
                'Client reporting',
                'White-label options',
                'API access',
                'Dedicated support',
                'Custom integrations',
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
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Join Waitlist
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Why is the free tier so comprehensive?',
                a: 'We believe creators should be able to learn, plan, and start earning ₹2-3 Lakh per month without paying upfront. Our free tier includes everything you need to create successful YouTube Shorts. Paid tiers are for when you\'re ready to scale and need advanced features.',
              },
              {
                q: 'When will Pro and Agency launch?',
                a: 'We\'re building Pro features now and plan to launch soon. Agency tier will come later as we add team collaboration features. Join the waitlist to be notified when each tier launches.',
              },
              {
                q: 'Do I need to pay to make money?',
                a: 'Absolutely not! The free tier has everything you need to plan, create, and optimize your Shorts. Many successful creators earning ₹2-3 Lakh per month use only the free features. Paid tiers are optional upgrades for scaling.',
              },
              {
                q: 'What happens to my data if I upgrade?',
                a: 'All your data stays with you. When you upgrade, you\'ll have access to additional features while keeping all your existing plans, scripts, and content ideas.',
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
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready to Start Earning?</h2>
            <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
              Start with our free tier. No credit card required. No time limits. 
              Build your channel, earn ₹2-3 Lakh per month, then upgrade when you&apos;re ready to scale.
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