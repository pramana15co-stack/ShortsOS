'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/providers/AuthProvider'

export default function PricingPage() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pramana grows with you. Start free, upgrade when you're ready for the next step.
          </p>
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
                <div className="text-5xl font-extrabold text-gray-900">$0</div>
                <div className="text-sm text-gray-500 mt-1">Forever</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Who this is for</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Creators who are just starting out or want to understand how Pramana works. 
                You're exploring, building confidence, and establishing a planning routine.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What you can do</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Format Library</div>
                    <div className="text-sm text-gray-600">Browse proven formats and execution guides</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Basic Planning</div>
                    <div className="text-sm text-gray-600">Get format recommendations for your niche</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Hook & Script Templates</div>
                    <div className="text-sm text-gray-600">Access basic templates and generators</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Limited AI Tools</div>
                    <div className="text-sm text-gray-600">5 prompt generations per day</div>
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
          <div className="card p-10 max-w-5xl mx-auto border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/30 to-white">
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
                <div className="text-5xl font-extrabold text-gray-900">Pricing TBD</div>
                <div className="text-sm text-gray-500 mt-1">Coming Soon</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Who this is for</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Creators who've tried the free plan and want to move past confusion. 
                You're ready to commit to a structured approach but need clear, step-by-step guidance.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What changes</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Execution Paths</div>
                    <div className="text-sm text-gray-600">Step-by-step playbooks that eliminate "what do I do next?" moments</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Unlimited AI Tools</div>
                    <div className="text-sm text-gray-600">No daily limits on prompt generation and optimization</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Advanced Caption Timing</div>
                    <div className="text-sm text-gray-600">Precise timing suggestions for better retention</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Export Instructions</div>
                    <div className="text-sm text-gray-600">Step-by-step guides for CapCut, Premiere Pro, VN Editor</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Outcome:</strong> You'll know exactly what to create, when to create it, and how to execute it correctly.
              </p>
              <button
                onClick={() => setSelectedPlan('starter')}
                className="btn-primary w-full text-center py-4"
              >
                Join Waitlist
              </button>
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
                <div className="text-5xl font-extrabold text-gray-900">Pricing TBD</div>
                <div className="text-sm text-gray-500 mt-1">Coming Soon</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Who this is for</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Creators who've established a routine and want to scale. You're posting consistently, 
                seeing results, and ready to optimize for growth and monetization.
              </p>
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
                    <div className="font-semibold text-gray-900">Advanced Analytics</div>
                    <div className="text-sm text-gray-600">Performance insights and optimization recommendations</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Monetization Strategies</div>
                    <div className="text-sm text-gray-600">Complete guides for affiliate marketing and revenue optimization</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Priority Support</div>
                    <div className="text-sm text-gray-600">Faster response times and direct access to our team</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Outcome:</strong> You'll scale efficiently, optimize consistently, and build sustainable growth.
              </p>
              <button
                onClick={() => setSelectedPlan('pro')}
                className="btn-secondary w-full text-center py-4"
              >
                Join Waitlist
              </button>
            </div>
          </div>

          {/* Tier 4: Operator / Agency */}
          <div className="card p-10 max-w-5xl mx-auto opacity-90">
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <div className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-bold mb-4">
                  Advanced
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Operator</h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Batch workflows and client execution. For agencies and operators managing multiple channels.
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-extrabold text-gray-900">Pricing TBD</div>
                <div className="text-sm text-gray-500 mt-1">Coming Soon</div>
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
                    <div className="font-semibold text-gray-900">Multi-Channel Management</div>
                    <div className="text-sm text-gray-600">Manage multiple creator accounts and channels from one dashboard</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Batch Processing</div>
                    <div className="text-sm text-gray-600">Generate prompts, hooks, and scripts for multiple videos at once</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Team Collaboration</div>
                    <div className="text-sm text-gray-600">Share plans, templates, and workflows with team members</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">API Access</div>
                    <div className="text-sm text-gray-600">Integrate Pramana into your existing workflows</div>
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
            </div>
          </div>
        </div>

        {/* Waitlist Modal */}
        {selectedPlan && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="card max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Join Waitlist</h3>
              <p className="text-gray-600 mb-6">
                We'll notify you when {selectedPlan === 'starter' ? 'Starter' : selectedPlan === 'pro' ? 'Creator Pro' : 'Operator'} is available.
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
                      alert('Waitlist signup would be processed here')
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
