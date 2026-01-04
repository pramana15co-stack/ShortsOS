'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-white"></div>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-32 text-center">
        <div className={`max-w-5xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded mb-6">
            <span className="text-xs font-medium text-gray-700">Built by Pramana</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-gray-900" style={{ animationDelay: '0.1s' }}>
            Decide what to create.<br />
            Know when to create it.<br />
            Execute it correctly.
          </h1>
          
          <p className="text-xl text-gray-700 mb-3 max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Pramana helps short-form creators make better content decisions without wasting time or money.
          </p>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto" style={{ animationDelay: '0.3s' }}>
            A decision and execution system for YouTube Shorts creators who feel lost, not lazy. Built by Pramana.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animationDelay: '0.4s' }}>
            <Link 
              href="/dashboard" 
              className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
            <Link 
              href="/planner" 
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Start Planning
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Free to Start</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Planning Tools Only</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Structured Templates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="relative container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Decision Intelligence for Shorts Creators
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Structured planning tools and proven formats to help you make better content decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Stage-Aware System</h3>
              <p className="text-sm text-gray-600">
                Recommendations adapt to your creator stage. What works for beginners differs from what works for established channels.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Clear Constraints</h3>
              <p className="text-sm text-gray-600">
                We tell you what to avoid at your stage, not just what to do. This reduces mistakes and wasted effort.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Execution Framework</h3>
              <p className="text-sm text-gray-600">
                Structured templates and guides, not random outputs. Every recommendation includes clear next steps.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 text-white">
            <h3 className="text-lg font-semibold mb-4">The Creator Execution Framework</h3>
            <p className="text-sm text-gray-300 mb-6 max-w-2xl">
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
        </div>
      </section>


      {/* Features Grid */}
      <section className="relative container mx-auto px-4 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Tools in the System
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl">
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
      </section>

      {/* Social Proof / CTA Section */}
      <section className="relative container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-3xl p-12 premium-shadow">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
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
      className="group glass-effect rounded-2xl p-6 hover-lift premium-shadow block"
      style={{ animationDelay: delay }}
    >
      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <div className="mt-4 text-primary-600 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
        Try it now →
      </div>
    </Link>
  )
}