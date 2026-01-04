'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className={`${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium mb-8 text-gray-900 leading-tight">
              Decide what to create.<br />
              Know when to create it.<br />
              Execute it correctly.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
              Pramana helps short-form creators make better content decisions without wasting time or money. A decision and execution system for YouTube Shorts creators who feel lost, not lazy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link 
                href="/dashboard" 
                className="btn-primary"
              >
                Get Started
              </Link>
              <Link 
                href="/planner" 
                className="btn-secondary"
              >
                Start Planning
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 text-sm text-gray-500 border-t border-gray-200 pt-8">
              <span>Free to start</span>
              <span>Planning tools only</span>
              <span>Structured templates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="section border-t border-gray-200">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-6 text-gray-900">
              Decision Intelligence for Shorts Creators
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Structured planning tools and proven formats to help you make better content decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Stage-Aware System</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Recommendations adapt to your creator stage. What works for beginners differs from what works for established channels.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Clear Constraints</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We tell you what to avoid at your stage, not just what to do. This reduces mistakes and wasted effort.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Execution Framework</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Structured templates and guides, not random outputs. Every recommendation includes clear next steps.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-12 mb-16">
            <h3 className="text-2xl font-medium mb-6">The Creator Execution Framework</h3>
            <p className="text-base text-gray-300 mb-12 max-w-2xl leading-relaxed">
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
      <section className="section border-t border-gray-200">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-6 text-gray-900">
              Execution Paths
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Step-by-step, stage-aware playbooks that guide you toward specific goals
            </p>
          </div>

          <div className="card mb-12">
            <h3 className="text-2xl font-medium text-gray-900 mb-6">What is an Execution Path?</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              An Execution Path is a structured playbook that maps out every step from where you are now to where you want to be. Unlike generic advice or scattered tips, each path is tailored to your creator stage and provides a clear sequence of actions, format recommendations, and constraints specific to your situation.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Think of it as a roadmap that adapts to your experience level, niche, and goals—telling you not just what to do, but when to do it, why it works at your stage, and what to avoid.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Who it's for</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Execution Paths are designed for creators who know their goal but feel uncertain about the sequence of steps to get there. Whether you're trying to grow from 0 to 1,000 subscribers, establish a consistent posting rhythm, or transition to a new content format, Execution Paths provide the structured guidance you need.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Why it saves time</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Instead of piecing together advice from multiple sources or guessing what to do next, Execution Paths give you a complete, ordered sequence. This eliminates decision fatigue, reduces trial and error, and ensures you're focusing on the right actions at the right time for your stage.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-12">
            <h3 className="text-2xl font-medium mb-8">How Execution Paths reduce confusion</h3>
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
      <section className="section border-t border-gray-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-6 text-gray-900">
              Tools in the System
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
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
      className="group block border-b border-gray-200 pb-8 hover:border-gray-400 transition-colors"
    >
      <h3 className="text-lg font-medium mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm mb-4">{description}</p>
      <div className="text-gray-900 text-sm font-medium group-hover:underline flex items-center gap-2">
        <span>View tool</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}