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
    // Client-side only - just show success message
    setIsSubmitted(true)
    setSubmittedTier(tier)
    setWaitlistData({ email: '', tier })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaitlistData({ ...waitlistData, email: e.target.value })
  }

  return (
    <main className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
          Simple, Transparent Pricing
        </h1>
        <p className="text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
          Start free. Earn first. Pay when you're ready to scale.
        </p>
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 max-w-2xl mx-auto">
          <p className="text-green-800 text-lg font-semibold">
            💰 Our Philosophy: Earn First, Then Pay
          </p>
          <p className="text-green-700 mt-2">
            We believe you should make money from YouTube Shorts before paying for tools. 
            That's why our free tier includes everything you need to learn, plan, and start earning.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
        {/* Free Tier */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 relative">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Free</h2>
            <div className="mb-4">
              <span className="text-5xl font-bold text-gray-900">$0</span>
              <span className="text-gray-600">/forever</span>
            </div>
            <p className="text-gray-600">Perfect for learning and planning</p>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">All planning tools</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">Content calendar</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">Format library & guides</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">Hook & script generators</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">SEO optimizer</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">Performance feedback</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">Content ideas generator</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">Pre-publish checklist</span>
            </li>
          </ul>
          <Link
            href="/dashboard"
            className="block w-full text-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Get Started Free
          </Link>
        </div>

        {/* Pro Tier */}
        <div className="bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl shadow-xl p-8 relative transform scale-105">
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
            COMING SOON
          </div>
          <div className="text-center mb-6 text-white">
            <h2 className="text-3xl font-bold mb-2">Pro</h2>
            <div className="mb-4">
              <span className="text-5xl font-bold">$29</span>
              <span className="opacity-90">/month</span>
            </div>
            <p className="opacity-90">Scale your Shorts channel</p>
          </div>
          <ul className="space-y-4 mb-8 text-white">
            <li className="flex items-start">
              <span className="text-yellow-300 mr-3 text-xl">✓</span>
              <span>Everything in Free</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-300 mr-3 text-xl">✓</span>
              <span>Unlimited content planning</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-300 mr-3 text-xl">✓</span>
              <span>Advanced analytics & insights</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-300 mr-3 text-xl">✓</span>
              <span>Bulk script generation</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-300 mr-3 text-xl">✓</span>
              <span>Export to Google Calendar</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-300 mr-3 text-xl">✓</span>
              <span>Priority support</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-300 mr-3 text-xl">✓</span>
              <span>Advanced format templates</span>
            </li>
          </ul>
          {isSubmitted && submittedTier === 'pro' ? (
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <p className="text-white font-semibold">✓ You're on the waitlist!</p>
              <p className="text-white text-sm mt-1 opacity-90">We'll notify you when Pro launches.</p>
            </div>
          ) : (
            <form onSubmit={(e) => handleWaitlistSubmit(e, 'pro')} className="space-y-3">
              <input
                type="email"
                value={waitlistData.email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-300"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>

        {/* Agency Tier */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 relative">
          <div className="absolute top-4 right-4 bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-bold">
            COMING LATER
          </div>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Agency</h2>
            <div className="mb-4">
              <span className="text-5xl font-bold text-gray-900">$99</span>
              <span className="text-gray-600">/month</span>
            </div>
            <p className="text-gray-600">For teams and agencies</p>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">Everything in Pro</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">Team collaboration</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">Multiple channel management</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">Client reporting</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">White-label options</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">API access</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">Dedicated support</span>
            </li>
          </ul>
          {isSubmitted && submittedTier === 'agency' ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-800 font-semibold">✓ You're on the waitlist!</p>
              <p className="text-green-700 text-sm mt-1">We'll notify you when Agency launches.</p>
            </div>
          ) : (
            <form onSubmit={(e) => handleWaitlistSubmit(e, 'agency')} className="space-y-3">
              <input
                type="email"
                value={waitlistData.email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Why is the free tier so comprehensive?</h3>
            <p className="text-gray-600">
              We believe creators should be able to learn, plan, and start earning without paying upfront. 
              Our free tier includes everything you need to create successful YouTube Shorts. 
              Paid tiers are for when you're ready to scale and need advanced features.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">When will Pro and Agency launch?</h3>
            <p className="text-gray-600">
              We're building Pro features now and plan to launch soon. Agency tier will come later as we 
              add team collaboration features. Join the waitlist to be notified when each tier launches.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Do I need to pay to make money?</h3>
            <p className="text-gray-600">
              Absolutely not! The free tier has everything you need to plan, create, and optimize your Shorts. 
              Many successful creators use only the free features. Paid tiers are optional upgrades for scaling.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">What happens to my data if I upgrade?</h3>
            <p className="text-gray-600">
              All your data stays with you. When you upgrade, you'll have access to additional features 
              while keeping all your existing plans, scripts, and content ideas.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-12 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to Start Creating?</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Start with our free tier. No credit card required. No time limits. 
          Build your channel, earn money, then upgrade when you're ready to scale.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
        >
          Get Started Free Forever
        </Link>
      </div>
    </main>
  )
}
