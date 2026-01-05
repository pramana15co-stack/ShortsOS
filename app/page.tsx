'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className={`max-w-5xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-indigo-200/50 rounded-full mb-8 shadow-lg hover:shadow-xl transition-shadow">
              <span className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Built by Pramana</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 text-gray-900 leading-[1.1]">
              Decide what to create.<br />
              <span className="text-gray-600">Know when to create it.</span><br />
              <span className="text-gradient">Execute it correctly.</span>
            </h1>
            
            {/* Description */}
            <p className="text-2xl md:text-3xl text-gray-700 mb-6 max-w-3xl leading-relaxed font-medium">
              Pramana helps short-form creators make better content decisions without wasting time or money.
            </p>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl leading-relaxed">
              A decision and execution system for YouTube Shorts creators who feel lost, not lazy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <Link 
                href="/dashboard" 
                className="btn-primary text-lg px-10 py-5"
              >
                Get Started Free →
              </Link>
              <Link 
                href="/planner" 
                className="btn-secondary text-lg px-10 py-5"
              >
                Start Planning
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 items-center pt-12 border-t border-gray-200/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-base font-semibold text-gray-800">100% Free to Start</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-base font-semibold text-gray-800">Planning Tools Only</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-base font-semibold text-gray-800">Structured Templates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="section-alt">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <div className="accent-line mx-auto mb-8"></div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-gray-900">
              Decision Intelligence for Shorts Creators
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Structured planning tools and proven formats to help you make better content decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="card-feature text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Stage-Aware System</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Recommendations adapt to your creator stage. What works for beginners differs from what works for established channels.
              </p>
            </div>
            <div className="card-feature text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Clear Constraints</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                We tell you what to avoid at your stage, not just what to do. This reduces mistakes and wasted effort.
              </p>
            </div>
            <div className="card-feature text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Execution Framework</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Structured templates and guides, not random outputs. Every recommendation includes clear next steps.
              </p>
            </div>
          </div>

          {/* Framework CTA */}
          <div className="gradient-bg rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
            <div className="max-w-5xl mx-auto relative z-10">
              <div className="w-16 h-2 bg-white/30 rounded-full mb-10"></div>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-8">The Creator Execution Framework</h3>
              <p className="text-xl text-white/90 mb-12 max-w-3xl leading-relaxed">
                Pramana uses a structured framework to provide stage-aware recommendations. Recommendations are intentional and based on your creator stage, not random suggestions.
              </p>
            <div className="grid md:grid-cols-3 gap-6 text-base mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="font-bold mb-2 text-lg">Stage-Aware</div>
                <div className="text-white/80">Recommendations adapt to your experience level</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="font-bold mb-2 text-lg">Clear Constraints</div>
                <div className="text-white/80">We tell you what to avoid at your stage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="font-bold mb-2 text-lg">Execution Path</div>
                <div className="text-white/80">Every recommendation includes next steps</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="text-left">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Proven Formats</h4>
                    <p className="text-sm text-white/90">Based on analysis of 10,000+ top-performing Shorts</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Free Forever Core</h4>
                    <p className="text-sm text-white/90">Essential tools remain free, no hidden costs</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Structured Templates</h4>
                    <p className="text-sm text-white/90">Ready-to-use templates you can customize for your content</p>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Built for Shorts</h4>
                    <p className="text-sm text-white/90">Purpose-built for YouTube Shorts, not adapted from other tools</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Based on Data</h4>
                    <p className="text-sm text-white/90">Formats and templates derived from analysis of successful Shorts</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Clear Structure</h4>
                    <p className="text-sm text-white/90">Organized formats and templates for consistent planning and execution</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Execution Paths Section */}
      <section className="section-alt">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <div className="accent-line mx-auto mb-8"></div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-gray-900">
              Execution Paths
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Step-by-step, stage-aware playbooks that guide you toward specific goals
            </p>
          </div>

          <div className="card mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What is an Execution Path?</h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              An Execution Path is a structured playbook that maps out every step from where you are now to where you want to be. Unlike generic advice or scattered tips, each path is tailored to your creator stage and provides a clear sequence of actions, format recommendations, and constraints specific to your situation.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Think of it as a roadmap that adapts to your experience level, niche, and goals—telling you not just what to do, but when to do it, why it works at your stage, and what to avoid.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Who it's for</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Execution Paths are designed for creators who know their goal but feel uncertain about the sequence of steps to get there. Whether you're trying to grow from 0 to 1,000 subscribers, establish a consistent posting rhythm, or transition to a new content format, Execution Paths provide the structured guidance you need.
              </p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why it saves time</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Instead of piecing together advice from multiple sources or guessing what to do next, Execution Paths give you a complete, ordered sequence. This eliminates decision fatigue, reduces trial and error, and ensures you're focusing on the right actions at the right time for your stage.
              </p>
            </div>
          </div>

          <div className="gradient-bg rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-extrabold mb-10">How Execution Paths reduce confusion</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <svg className="w-8 h-8 flex-shrink-0 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-bold mb-2 text-xl">Clear sequence</div>
                    <div className="text-white/90">Every step is ordered and connected, so you always know what comes next</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <svg className="w-8 h-8 flex-shrink-0 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-bold mb-2 text-xl">Stage-aware guidance</div>
                    <div className="text-white/90">Recommendations adapt to your experience level, avoiding strategies that don't work at your stage</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <svg className="w-8 h-8 flex-shrink-0 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-bold mb-2 text-xl">Explicit constraints</div>
                    <div className="text-white/90">We tell you what to avoid, not just what to do, preventing common mistakes</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <svg className="w-8 h-8 flex-shrink-0 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-bold mb-2 text-xl">Goal-focused structure</div>
                    <div className="text-white/90">Each path is designed for a specific outcome, so every action moves you closer to your goal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/execution-paths"
                className="btn-primary text-lg px-10 py-5"
              >
                Explore Execution Paths →
              </Link>
              <Link
                href="/products"
                className="btn-secondary text-lg px-10 py-5"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <div className="accent-line mx-auto mb-8"></div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-gray-900">
              Tools in the System
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Each tool serves a specific purpose in the execution framework. Use them in sequence for best results.
            </p>
          </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Content Planner"
            description="Get format recommendations based on your niche and goals. Structured planning for better decisions."
            icon="🎯"
            href="/planner"
            delay="0.1s"
          />
          <FeatureCard
            title="Format Library"
            description="Proven formats with structured templates, pacing guidelines, and execution guides."
            icon="📚"
            href="/formats"
            delay="0.2s"
          />
          <FeatureCard
            title="Hook Templates"
            description="Structured hook templates based on successful patterns. Customize for your content."
            icon="🎣"
            href="/hooks"
            delay="0.3s"
          />
          <FeatureCard
            title="Script Templates"
            description="Format-based script templates you can customize. Structured for 30-60 second Shorts."
            icon="📝"
            href="/scripts"
            delay="0.4s"
          />
          <FeatureCard
            title="SEO Guidance"
            description="Structured guidance for titles, descriptions, and tags based on successful Shorts patterns."
            icon="🔍"
            href="/seo-optimizer"
            delay="0.5s"
          />
          <FeatureCard
            title="Performance Analysis"
            description="Analyze your video performance. Understand what worked and what didn't."
            icon="📊"
            href="/feedback"
            delay="0.6s"
          />
          <FeatureCard
            title="Creator Tools Directory"
            description="Discover the best free and paid tools for video editing, scripts, and content creation."
            icon="🛠️"
            href="/tools"
            delay="0.7s"
          />
        </div>
        </div>
      </section>

      {/* Social Proof / CTA Section */}
      <section className="relative container mx-auto px-4 py-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="card p-12 md:p-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900">
              Start Planning Better Content
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Use structured formats and planning tools to make better content decisions. Free to start, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/planner"
                className="btn-primary text-lg px-10 py-5"
              >
                Start Planning
              </Link>
              <Link
                href="/dashboard"
                className="btn-secondary text-lg px-10 py-5"
              >
                Go to Dashboard
              </Link>
            </div>
            <p className="mt-8 text-base text-gray-500">
              No credit card • No time limits • Start creating today
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}


function FeatureCard({ title, description, icon, href, delay }: { title: string; description: string; icon: string; href: string; delay: string }) {
  return (
    <Link
      href={href}
      className="group card-feature block"
      style={{ animationDelay: delay }}
    >
      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gradient transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6 text-lg">{description}</p>
      <div className="text-gray-900 font-semibold text-base group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
        <span>View tool</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
