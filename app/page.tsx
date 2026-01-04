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
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(217,70,239,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent_70%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-32 text-center">
        <div className={`max-w-5xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full mb-8 animate-slide-up">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">Free Planning Tools • No Credit Card Required</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="block text-gray-900">Plan and Execute</span>
            <span className="block text-primary-600 mt-2">Better Shorts Content</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Decision and execution intelligence for YouTube Shorts creators. Structure your planning, choose proven formats, and execute with clarity.
          </p>
          
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Templates, formats, and planning tools based on analysis of successful Shorts. No video generation. Just better decisions and clearer execution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link 
              href="/dashboard" 
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Get Started Free →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/pricing" 
              className="px-8 py-4 glass-effect border-2 border-primary-200 text-primary-700 rounded-xl font-semibold text-lg hover:border-primary-400 hover:shadow-lg transition-all duration-300"
            >
              See Pricing
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
              <span>No Video Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Instant Results</span>
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

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="glass-effect rounded-2xl p-8 premium-shadow text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Data-Driven</h3>
              <p className="text-gray-600">
                Our formats and strategies are based on analysis of thousands of successful YouTube Shorts
              </p>
            </div>
            <div className="glass-effect rounded-2xl p-8 premium-shadow text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Creator-First</h3>
              <p className="text-gray-600">
                Built by creators, for creators. Every feature is designed with real creator needs in mind
              </p>
            </div>
            <div className="glass-effect rounded-2xl p-8 premium-shadow text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Privacy-Focused</h3>
              <p className="text-gray-600">
                Your data stays yours. We don&apos;t sell or exploit creator information
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl p-12 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">What ShortsOS Provides</h3>
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

      {/* Stats Section */}
      <section className="relative container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <StatCard
            number="6"
            label="Proven Formats"
            desc="Based on successful Shorts analysis"
            delay="0.1s"
          />
          <StatCard
            number="100%"
            label="Free Planning Tools"
            desc="Core features always free"
            delay="0.2s"
          />
          <StatCard
            number="100%"
            label="Free to Start"
            desc="No credit card required"
            delay="0.3s"
          />
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="relative container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Better Decisions, Clearer Execution
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Structured planning and proven formats to help you make informed content decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-effect rounded-2xl p-8 premium-shadow hover-lift">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">The Old Way</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Post randomly without a plan</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Guess which formats work</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Spend hours writing scripts</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>No idea why videos fail</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Weak hooks that lose viewers</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-effect rounded-2xl p-8 premium-shadow hover-lift border-2 border-primary-200">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">With ShortsOS</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Planner recommends formats based on your goals</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Proven formats with structured templates</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Script templates you can customize</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Performance analysis to understand results</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Hook templates based on successful patterns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Planning and Execution Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Structured formats, templates, and planning tools to help you make better content decisions
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
                href="/dashboard"
                className="px-10 py-5 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200"
              >
                Get Started →
              </Link>
              <Link
                href="/pricing"
                className="px-10 py-5 glass-effect border-2 border-primary-200 text-primary-700 rounded-xl font-semibold text-lg hover:border-primary-400 transition-all duration-200"
              >
                See Pricing
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

function StatCard({ number, label, desc, delay }: { number: string; label: string; desc: string; delay: string }) {
  return (
    <div 
      className="glass-effect rounded-2xl p-8 text-center hover-lift premium-shadow"
      style={{ animationDelay: delay }}
    >
      <div className="text-5xl font-bold gradient-text mb-2">{number}</div>
      <div className="text-lg font-semibold text-gray-900 mb-1">{label}</div>
      <div className="text-sm text-gray-500">{desc}</div>
    </div>
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