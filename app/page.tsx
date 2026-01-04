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
            <span className="text-sm font-medium text-gray-700">Free Forever • No Credit Card Required</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="block text-gray-900">Master YouTube Shorts</span>
            <span className="block gradient-text mt-2">Without the Overwhelm</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            The all-in-one platform that helps creators <span className="font-bold text-primary-600">plan, optimize, and grow</span> their YouTube Shorts channels faster
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Join thousands of creators using proven formats, smart planning, and data-driven insights to build successful Shorts channels.
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
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              Trusted by <span className="gradient-text">Creators Worldwide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built on proven strategies and real creator success stories
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
            <h3 className="text-3xl font-bold mb-4">Why Creators Choose ShortsOS</h3>
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
                    <h4 className="font-semibold mb-1">No Learning Curve</h4>
                    <p className="text-sm opacity-90">Start creating immediately, no tutorials needed</p>
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
                    <h4 className="font-semibold mb-1">Regular Updates</h4>
                    <p className="text-sm opacity-90">New formats and features added based on creator feedback</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold mb-1">Community-Driven</h4>
                    <p className="text-sm opacity-90">Features and improvements based on real creator needs</p>
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
            number="10x"
            label="Faster Growth"
            desc="Compared to going solo"
            delay="0.1s"
          />
          <StatCard
            number="50K+"
            label="Content Ideas Generated"
            desc="Never run out of topics"
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Tired of <span className="gradient-text">Guessing What Works</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Most beginners struggle with these problems. We solve them all.
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
                  <span>Smart planner suggests best formats</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>6 proven formats with complete guides</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Generate scripts in seconds</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Performance feedback explains results</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Hook generator creates viral openings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional tools used by successful creators to plan, create, and grow their channels
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            title="Smart Planner"
            description="Get personalized format recommendations based on your niche and goals. Start earning faster."
            icon="🎯"
            href="/planner"
            delay="0.1s"
          />
          <FeatureCard
            title="Format Library"
            description="6 proven formats with complete guides, scripts, and best practices. Learn what actually works."
            icon="📚"
            href="/formats"
            delay="0.2s"
          />
          <FeatureCard
            title="Hook Generator"
            description="Create viral-worthy hooks in seconds. Increase retention and keep viewers watching longer."
            icon="🎣"
            href="/hooks"
            delay="0.3s"
          />
          <FeatureCard
            title="Script Generator"
            description="Complete 30-45 second scripts ready to film. Save hours, create more content consistently."
            icon="📝"
            href="/scripts"
            delay="0.4s"
          />
          <FeatureCard
            title="SEO Optimizer"
            description="Maximize discoverability with optimized titles, descriptions, and tags. Get more views."
            icon="🔍"
            href="/seo-optimizer"
            delay="0.5s"
          />
          <FeatureCard
            title="Performance Analytics"
            description="Understand what works. Get actionable insights to improve your content strategy."
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Ready to <span className="gradient-text">Grow Your Channel</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of creators using ShortsOS to plan smarter, create better content, and grow their YouTube Shorts channels faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-10 py-5 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start Free Forever →
              </Link>
              <Link
                href="/pricing"
                className="px-10 py-5 glass-effect border-2 border-primary-200 text-primary-700 rounded-xl font-semibold text-lg hover:border-primary-400 transition-all duration-300"
              >
                View Plans
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