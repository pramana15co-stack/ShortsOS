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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className={`max-w-4xl mx-auto text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-indigo-200/50 rounded-full mb-8 shadow-lg">
              <span className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Built by Pramana</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-gray-900 leading-[1.1]">
              Decide what to create.<br />
              <span className="text-gray-600">Know when to create it.</span><br />
              <span className="text-gradient">Execute it correctly.</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-2xl mx-auto leading-relaxed font-medium">
              Pramana helps short-form creators make better content decisions without wasting time or money.
            </p>
            
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              A decision and execution system for YouTube Shorts creators who feel lost, not lazy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
            <div className="flex flex-wrap gap-6 items-center justify-center pt-8 border-t border-gray-200/50">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-gray-800">100% Free to Start</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-gray-800">Planning Tools Only</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-gray-800">Structured Templates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features - Simplified */}
      <section className="section-alt">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three core principles that make Pramana different
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="card-feature text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Stage-Aware</h3>
              <p className="text-gray-600 leading-relaxed">
                Recommendations adapt to your creator stage. What works for beginners differs from established channels.
              </p>
            </div>
            <div className="card-feature text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Clear Constraints</h3>
              <p className="text-gray-600 leading-relaxed">
                We tell you what to avoid at your stage, not just what to do. This reduces mistakes and wasted effort.
              </p>
            </div>
            <div className="card-feature text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Execution Framework</h3>
              <p className="text-gray-600 leading-relaxed">
                Structured templates and guides, not random outputs. Every recommendation includes clear next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid - Simplified */}
      <section className="section">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Essential Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to plan, create, and optimize your Shorts content
            </p>
          </div>
        
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Content Planner"
              description="Get format recommendations based on your niche and goals."
              icon="🎯"
              href="/planner"
            />
            <FeatureCard
              title="Format Library"
              description="Proven formats with structured templates and execution guides."
              icon="📚"
              href="/formats"
            />
            <FeatureCard
              title="Hook Templates"
              description="Structured hook templates based on successful patterns."
              icon="🎣"
              href="/hooks"
            />
            <FeatureCard
              title="Script Templates"
              description="Format-based script templates for 30-60 second Shorts."
              icon="📝"
              href="/scripts"
            />
            <FeatureCard
              title="SEO Optimizer"
              description="Optimize titles, descriptions, and tags for better discoverability."
              icon="🔍"
              href="/seo-optimizer"
            />
            <FeatureCard
              title="Performance Analysis"
              description="Analyze your video performance and get actionable insights."
              icon="📊"
              href="/feedback"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-alt">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="card p-12 md:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Ready to Start Creating?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators using Pramana to make better content decisions. Free to start, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="btn-primary text-lg px-10 py-5"
              >
                Get Started Free
              </Link>
              <Link
                href="/pricing"
                className="btn-secondary text-lg px-10 py-5"
              >
                View Pricing
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

function FeatureCard({ title, description, icon, href }: { title: string; description: string; icon: string; href: string }) {
  return (
    <Link
      href={href}
      className="group card-feature block"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-gradient transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      <div className="text-gray-900 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
        <span>Try it</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
