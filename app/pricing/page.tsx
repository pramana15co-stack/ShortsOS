'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/providers/AuthProvider'
import { saveWaitlistEntry } from '@/lib/saveWaitlist'
import { products } from '@/data/products'
import { testimonials } from '@/data/testimonials'

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
  const [activeTab, setActiveTab] = useState<'plans' | 'bundles' | 'courses'>('plans')

  const bundles = products.filter(p => p.type === 'bundle')
  const plans = products.filter(p => p.type === 'plan')
  const courses = products.filter(p => p.type === 'course')

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
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-indigo-200/50 rounded-full mb-8 shadow-lg">
            <span className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Built by Pramana</span>
          </div>
          <div className="accent-line mx-auto mb-6"></div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            Pricing & Packages
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that fits your creator journey. Start free, upgrade when ready.
          </p>
          
          {/* Success Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="card p-6 text-center">
              <div className="text-4xl font-extrabold text-gray-900 mb-2">10,000+</div>
              <div className="text-sm text-gray-600 font-medium">Active Creators</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-extrabold text-gray-900 mb-2">78%</div>
              <div className="text-sm text-gray-600 font-medium">Success Rate</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-extrabold text-gray-900 mb-2">$1.2M+</div>
              <div className="text-sm text-gray-600 font-medium">Creator Earnings</div>
            </div>
          </div>
        </div>

        {/* Free Plan */}
        <div className="mb-20">
          <div className="card p-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Free Plan</h2>
            <p className="text-xl text-gray-600 mb-8">Perfect for getting started with content planning</p>
            <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Core Tools</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Format library access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Content planner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Hook & script templates</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Learning Resources</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Format execution guides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>SEO guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Tools directory</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Outcome</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Make better content decisions, understand which formats work for your stage, and establish a planning foundation.
                </p>
              </div>
            </div>
            <Link href="/dashboard" className="btn-primary w-full py-4 text-lg">
              Get Started Free
            </Link>
          </div>
        </div>

        {/* Featured Bundle */}
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

        {/* Tabs for Products */}
        <div className="mb-12">
          <div className="flex justify-center gap-4 mb-10 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-6 py-3 font-bold text-lg transition-all ${
                activeTab === 'plans'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Execution Plans
            </button>
            <button
              onClick={() => setActiveTab('bundles')}
              className={`px-6 py-3 font-bold text-lg transition-all ${
                activeTab === 'bundles'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Complete Bundles
            </button>
            {courses.length > 0 && (
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-6 py-3 font-bold text-lg transition-all ${
                  activeTab === 'courses'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Courses
              </button>
            )}
          </div>

          {/* Plans Tab */}
          {activeTab === 'plans' && (
            <div className="grid md:grid-cols-2 gap-8">
              {plans.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <div className="card p-10 hover:scale-[1.02] transition-transform duration-300 h-full">
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
                    <div className="flex items-baseline gap-4 mb-8">
                      <span className="text-5xl font-extrabold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="space-y-3 mb-8">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-gray-700">
                          <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center text-indigo-600 font-bold text-base">
                      <span>View details</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Bundles Tab */}
          {activeTab === 'bundles' && (
            <div className="grid md:grid-cols-2 gap-8">
              {bundles.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <div className={`card p-10 hover:scale-[1.02] transition-transform duration-300 h-full ${product.popular ? 'border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-white' : ''}`}>
                    {product.popular && (
                      <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold mb-6 shadow-lg">
                        {product.badge}
                      </div>
                    )}
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
                    <div className="flex items-baseline gap-4 mb-8">
                      <span className="text-5xl font-extrabold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="space-y-3 mb-8">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-gray-700">
                          <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center text-indigo-600 font-bold text-base">
                      <span>View details</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && courses.length > 0 && (
            <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
              {courses.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <div className="card p-10 hover:scale-[1.02] transition-transform duration-300">
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
                    <div className="flex items-baseline gap-4 mb-8">
                      <span className="text-5xl font-extrabold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="space-y-3 mb-8">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-gray-700">
                          <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center text-indigo-600 font-bold text-base">
                      <span>View details</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Coming Soon Plans */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-gray-600">Additional plans for advanced creators</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

        {/* Testimonials */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">What Creators Are Saying</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.slice(0, 4).map((testimonial) => (
              <div key={testimonial.id} className="card p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                  {testimonial.verified && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">
                      Verified
                    </span>
                  )}
                </div>
                {testimonial.results && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm font-bold text-gray-900">Results: {testimonial.results}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

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
