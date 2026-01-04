'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28 text-center">
        <div className={`max-w-5xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-8 shadow-sm">
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Built by Pramana</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight" style={{ animationDelay: '0.1s' }}>
            Decide what to create.<br />
            <span className="text-gray-600">Know when to create it.</span><br />
            Execute it correctly.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto font-medium" style={{ animationDelay: '0.2s' }}>
            Pramana helps short-form creators make better content decisions without wasting time or money.
          </p>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto" style={{ animationDelay: '0.3s' }}>
            A decision and execution system for YouTube Shorts creators who feel lost, not lazy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16" style={{ animationDelay: '0.4s' }}>
            <Link 
              href="/dashboard" 
              className="btn-primary text-base px-8 py-4"
            >
              Get Started Free
            </Link>
            <Link 
              href="/planner" 
              className="btn-secondary text-base px-8 py-4"
            >
              Start Planning
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-sm text-gray-600 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">100% Free to Start</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Planning Tools Only</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Structured Templates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Decision Intelligence for Shorts Creators
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Structured planning tools and proven formats to help you make better content decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="card-hover">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Stage-Aware System</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Recommendations adapt to your creator stage. What works for beginners differs from what works for established channels.
              </p>
            </div>
            <div className="card-hover">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Constraints</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We tell you what to avoid at your stage, not just what to do. This reduces mistakes and wasted effort.
              </p>
            </div>
            <div className="card-hover">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Execution Framework</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Structured templates and guides, not random outputs. Every recommendation includes clear next steps.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">The Creator Execution Framework</h3>
            <p className="text-base text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Pramana uses a structured framework to provide stage-aware recommendations. Recommendations are intentional and based on your creator stage, not random suggestions.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium mb-1">Stage-Aware</div>
                <div className="text-gray-400">Recommendations adapt to your experience level</div>
              </div>
              <div>
                <div className="font-medium mb-1">Clear Constraints</div>
                <div className="text-gray-400">We tell you what to avoid at your stage</div>
              </div>
              <div>
                <div className="font-medium mb-1">Execution Path</div>
                <div className="text-gray-400">Every recommendation includes next steps</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
              <div className="text-left">
                <div className="flex items-start gap-3 mb-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold mb-1">Proven Formats</h4>
                    <p className="text-sm opacity-90">Based on analysis of 10,000+ top-performing Shorts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold mb-1">Free Forever Core</h4>
                    <p className="text-sm opacity-90">Essential tools remain free, no hidden costs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold mb-1">Structured Templates</h4>
                    <p className="text-sm opacity-90">Ready-to-use templates you can customize for your content</p>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-start gap-3 mb-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold mb-1">Built for Shorts</h4>
                    <p className="text-sm opacity-90">Purpose-built for YouTube Shorts, not adapted from other tools</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold mb-1">Based on Data</h4>
                    <p className="text-sm opacity-90">Formats and templates derived from analysis of successful Shorts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold mb-1">Clear Structure</h4>
                    <p className="text-sm opacity-90">Organized formats and templates for consistent planning and execution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Execution Paths Section */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Execution Paths
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Step-by-step, stage-aware playbooks that guide you toward specific goals
            </p>
          </div>

          <div className="card mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What is an Execution Path?</h3>
            <p className="text-gray-700 mb-6 leading-relaxed text-base">
              An Execution Path is a structured playbook that maps out every step from where you are now to where you want to be. Unlike generic advice or scattered tips, each path is tailored to your creator stage and provides a clear sequence of actions, format recommendations, and constraints specific to your situation.
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              Think of it as a roadmap that adapts to your experience level, niche, and goals—telling you not just what to do, but when to do it, why it works at your stage, and what to avoid.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card-hover bg-gradient-to-br from-gray-50 to-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Who it's for</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Execution Paths are designed for creators who know their goal but feel uncertain about the sequence of steps to get there. Whether you're trying to grow from 0 to 1,000 subscribers, establish a consistent posting rhythm, or transition to a new content format, Execution Paths provide the structured guidance you need.
              </p>
            </div>
            <div className="card-hover bg-gradient-to-br from-gray-50 to-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Why it saves time</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Instead of piecing together advice from multiple sources or guessing what to do next, Execution Paths give you a complete, ordered sequence. This eliminates decision fatigue, reduces trial and error, and ensures you're focusing on the right actions at the right time for your stage.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">How Execution Paths reduce confusion</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium mb-1">Clear sequence</div>
                  <div className="text-gray-300">Every step is ordered and connected, so you always know what comes next</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium mb-1">Stage-aware guidance</div>
                  <div className="text-gray-300">Recommendations adapt to your experience level, avoiding strategies that don't work at your stage</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium mb-1">Explicit constraints</div>
                  <div className="text-gray-300">We tell you what to avoid, not just what to do, preventing common mistakes</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium mb-1">Goal-focused structure</div>
                  <div className="text-gray-300">Each path is designed for a specific outcome, so every action moves you closer to your goal</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/execution-paths"
                className="btn-primary inline-block"
              >
                Explore Execution Paths
              </Link>
              <Link
                href="/products"
                className="btn-secondary inline-block"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Tools in the System
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each tool serves a specific purpose in the execution framework. Use them in sequence for best results.
            </p>
          </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border border-gray-200 rounded-lg p-12 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900">
              Start Planning Better Content
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Use structured formats and planning tools to make better content decisions. Free to start, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/planner"
                className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Start Planning
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
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
      className="group card-hover block"
      style={{ animationDelay: delay }}
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm mb-4">{description}</p>
      <div className="text-primary-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-2">
        <span>View tool</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}