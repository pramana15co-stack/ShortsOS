'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/providers/AuthProvider'
import UpgradeButton from '@/components/UpgradeButton'

export default function PricingPage() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [pricingRegion, setPricingRegion] = useState<'india' | 'global'>('global')

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-indigo-200/50 rounded-full mb-8 shadow-lg">
            <span className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Built by Pramana</span>
          </div>
          <div className="accent-line mx-auto mb-6"></div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            Choose Your Path
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Pramana grows with you. Start free, upgrade when you're ready for the next step.
          </p>

          {/* Pricing Region Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setPricingRegion('india')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                pricingRegion === 'india'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              India (₹)
            </button>
            <button
              onClick={() => setPricingRegion('global')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                pricingRegion === 'global'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              Global ($)
            </button>
          </div>
        </div>

        {/* Pricing Ladder - 4 Tiers */}
        <div className="space-y-12 mb-20">
          {/* Tier 1: Free */}
          <div className="card p-10 max-w-5xl mx-auto">
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">
                  Always Free
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Free</h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Build trust and establish habits. Explore what Pramana offers without commitment.
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-extrabold text-gray-900">₹0</div>
                <div className="text-2xl font-extrabold text-gray-900">$0</div>
                <div className="text-sm text-gray-500 mt-1">Forever</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Who this is for</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Creators who are just starting out or want to understand how Pramana works. 
                You're exploring, building confidence, and establishing a planning routine.
              </p>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">In 10 minutes, you can:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-0.5">•</span>
                    <span>Explore all planning tools and see how they work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-0.5">•</span>
                    <span>Understand what formats work for your niche</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-0.5">•</span>
                    <span>Build confidence in your content planning process</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What you can do</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Limited AI Video Prompt Studio</div>
                    <div className="text-sm text-gray-600">Daily limit on prompt generations</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Limited Hook & Caption Engine</div>
                    <div className="text-sm text-gray-600">Basic hooks and captions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Preview Execution Path</div>
                    <div className="text-sm text-gray-600">Outline only - see how paths work</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Basic Post-Processing Preview</div>
                    <div className="text-sm text-gray-600">Preview of optimization advice</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Next step:</strong> When you're ready to remove limits and get structured guidance, consider Starter.
              </p>
              <Link href="/dashboard" className="btn-secondary w-full text-center py-4">
                Start Free
              </Link>
            </div>
          </div>

          {/* Tier 2: Starter */}
          <div className="card p-10 max-w-5xl mx-auto border-2 border-indigo-300 bg-indigo-50/50 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-lg">
                Recommended
              </span>
            </div>
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-4">
                  Most Popular
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Starter</h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Remove beginner confusion. Get clear guidance that eliminates decision fatigue.
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-extrabold text-gray-900">
                  {pricingRegion === 'india' ? '₹799' : '$9'}
                </div>
                <div className="text-sm text-gray-500 mt-1">per month</div>
                {pricingRegion === 'india' && (
                  <div className="text-xs text-gray-400 mt-1">≈ $9 USD</div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Who this is for</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Creators who've tried the free plan and want to move past confusion. 
                You're ready to commit to a structured approach but need clear, step-by-step guidance.
              </p>
              
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-gray-900 mb-3">In 10 minutes, you can:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-0.5">•</span>
                    <span>Know exactly what to post next without decision fatigue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-0.5">•</span>
                    <span>Follow a clear execution path from planning to publishing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-0.5">•</span>
                    <span>Remove confusion and get structured guidance tailored to your stage</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What you get</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Unlimited AI Video Prompt Studio</div>
                    <div className="text-sm text-gray-600">No daily limits on prompt generation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Full Hook & Caption Engine</div>
                    <div className="text-sm text-gray-600">Complete access with caption timing suggestions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Export Instructions</div>
                    <div className="text-sm text-gray-600">Step-by-step guides for CapCut and VN Editor</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Full Beginner Execution Path</div>
                    <div className="text-sm text-gray-600">Complete step-by-step playbook for your first consistent views</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Outcome:</strong> You'll know exactly what to create, when to create it, and how to execute it correctly.
              </p>
              <div className="mb-3 text-xs text-gray-500 text-center">
                Early access pricing • No long-term commitment
              </div>
              <UpgradeButton className="btn-primary w-full text-center py-4">
                Unlock Full Clarity
              </UpgradeButton>
            </div>
          </div>

          {/* Tier 3: Creator Pro */}
          <div className="card p-10 max-w-5xl mx-auto">
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-4">
                  For Serious Creators
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Creator Pro</h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Scale with confidence. Build consistency and optimize for growth.
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-extrabold text-gray-900">
                  {pricingRegion === 'india' ? '₹2,499' : '$29'}
                </div>
                <div className="text-sm text-gray-500 mt-1">per month</div>
                {pricingRegion === 'india' && (
                  <div className="text-xs text-gray-400 mt-1">≈ $29 USD</div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Who this is for</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Creators who've established a routine and want to scale. You're posting consistently, 
                seeing results, and ready to optimize for growth and monetization.
              </p>
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-3">In 10 minutes, you can:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Access all execution paths to scale efficiently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Get advanced optimization recommendations for every video</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Build consistency and optimize for sustainable growth</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What you get</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Everything in Starter</div>
                    <div className="text-sm text-gray-600">All Starter features included</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Access to All Execution Paths</div>
                    <div className="text-sm text-gray-600">Beginner, Intermediate, and Advanced paths</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Advanced Post-Processing Intelligence</div>
                    <div className="text-sm text-gray-600">Full optimization recommendations and feedback</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Platform-Specific Optimization</div>
                    <div className="text-sm text-gray-600">Guidance tailored for YouTube Shorts and Instagram Reels</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Outcome:</strong> You'll scale efficiently, optimize consistently, and build sustainable growth.
              </p>
              <div className="mb-3 text-xs text-gray-500 text-center">
                Early access pricing • No long-term commitment
              </div>
              <button
                onClick={() => setSelectedPlan('pro')}
                className="btn-primary w-full text-center py-4"
              >
                Get Structured Guidance
              </button>
            </div>
          </div>

          {/* Tier 4: Operator / Agency */}
          <div className="card p-10 max-w-5xl mx-auto opacity-90 border-2 border-dashed border-gray-300">
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-bold mb-4">
                  <span>Advanced</span>
                  <span className="px-2 py-0.5 bg-gray-300 rounded text-xs">Coming Soon</span>
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Operator</h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Batch workflows and client execution. For agencies and operators managing multiple channels.
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-extrabold text-gray-900">
                  {pricingRegion === 'india' ? '₹7,999' : '$79'}
                </div>
                <div className="text-sm text-gray-500 mt-1">per month</div>
                {pricingRegion === 'india' && (
                  <div className="text-xs text-gray-400 mt-1">≈ $79 USD</div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Who this is for</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Freelancers, agencies, and operators managing multiple creator channels. 
                You need to scale workflows, maintain consistency across clients, and execute efficiently at volume.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What you get</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Everything in Creator Pro</div>
                    <div className="text-sm text-gray-600">All Pro features included</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Batch Workflows</div>
                    <div className="text-sm text-gray-600">Process multiple videos and channels simultaneously</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Multiple Niches/Projects</div>
                    <div className="text-sm text-gray-600">Manage different niches and client projects separately</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Client-Ready Exports</div>
                    <div className="text-sm text-gray-600">Professional exports and reports for client presentations</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Outcome:</strong> You'll execute at scale, maintain consistency across clients, and reduce time per channel.
              </p>
              <button
                onClick={() => setSelectedPlan('operator')}
                className="btn-secondary w-full text-center py-4"
              >
                Join Waitlist
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                We'll notify you when Operator is available
              </p>
            </div>
          </div>
        </div>

        {/* Waitlist Modal */}
        {selectedPlan && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="card max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Get Started</h3>
              <p className="text-gray-600 mb-6">
                {selectedPlan === 'starter' 
                  ? 'Starter plan is coming soon. We\'ll notify you when it\'s available.'
                  : selectedPlan === 'pro'
                  ? 'Creator Pro plan is coming soon. We\'ll notify you when it\'s available.'
                  : 'Operator plan is coming soon. We\'ll notify you when it\'s available.'}
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  required
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan(null)}
                    className="btn-secondary flex-1 py-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 py-3"
                    onClick={(e) => {
                      e.preventDefault()
                      alert('Payment integration will be added here. For now, this is a demo.')
                      setSelectedPlan(null)
                    }}
                  >
                    Join Waitlist
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* How to Choose */}
        <div className="mt-20 card p-10 max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">How to Choose</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Start with Free</h3>
              <p className="text-gray-700 leading-relaxed">
                Use the free plan to explore Pramana and establish a planning habit. There's no time limit, 
                and you can use it as long as you need to build confidence.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Upgrade to Starter when...</h3>
              <p className="text-gray-700 leading-relaxed">
                You're ready to remove confusion and get structured guidance. Starter is for creators who want 
                clear next steps and unlimited access to AI tools.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Move to Creator Pro when...</h3>
              <p className="text-gray-700 leading-relaxed">
                You're posting consistently and seeing results. Creator Pro helps you scale, optimize, and 
                monetize your channel more effectively.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Consider Operator if...</h3>
              <p className="text-gray-700 leading-relaxed">
                You're managing multiple channels or working with clients. Operator provides batch workflows 
                and team collaboration features for efficient execution at scale.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="card p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-4 text-gray-900">Ready to Start?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Begin with the free plan. Upgrade when you're ready for the next step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="btn-primary px-10 py-4">
                Start Free
              </Link>
              <Link href="/planner" className="btn-secondary px-10 py-4">
                Try Planner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
