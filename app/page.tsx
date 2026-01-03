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
            <span className="block text-gray-900">Turn Your YouTube Shorts</span>
            <span className="block gradient-text mt-2">Into a Money Machine</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            The all-in-one platform that helps creators earn <span className="font-bold text-primary-600">₹2-3 Lakh per month</span> from YouTube Shorts
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Plan smarter, optimize better, grow faster. Join thousands of creators building profitable Shorts channels.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link 
              href="/dashboard" 
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Start Earning Free →</span>
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

      {/* Stats Section */}
      <section className="relative container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <StatCard
            number="₹2-3L"
            label="Average Monthly Earnings"
            desc="Creators using our system"
            delay="0.1s"
          />
          <StatCard
            number="10x"
            label="Faster Growth"
            desc="Compared to going solo"
            delay="0.2s"
          />
          <StatCard
            number="100%"
            label="Free to Start"
            desc="Earn first, pay later"
            delay="0.3s"
          />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Everything You Need to <span className="gradient-text">Earn More</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional tools used by creators earning ₹2-3 Lakh per month
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
            description="6 proven formats with complete guides. Learn what works for creators earning ₹2-3L/month."
            icon="📚"
            href="/formats"
            delay="0.2s"
          />
          <FeatureCard
            title="Hook Generator"
            description="Create viral-worthy hooks in seconds. Increase retention and boost your earnings."
            icon="🎣"
            href="/hooks"
            delay="0.3s"
          />
          <FeatureCard
            title="Script Generator"
            description="Complete 30-45 second scripts ready to film. Save hours, create more content."
            icon="📝"
            href="/scripts"
            delay="0.4s"
          />
          <FeatureCard
            title="SEO Optimizer"
            description="Maximize discoverability. Better SEO = more views = more money."
            icon="🔍"
            href="/seo-optimizer"
            delay="0.5s"
          />
          <FeatureCard
            title="Performance Analytics"
            description="Understand what works. Double down on winning content strategies."
            icon="📊"
            href="/feedback"
            delay="0.6s"
          />
        </div>
      </section>

      {/* Social Proof / CTA Section */}
      <section className="relative container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-3xl p-12 premium-shadow">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Ready to Build Your <span className="gradient-text">₹2-3 Lakh/Month</span> Channel?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join creators who are using ShortsOS to plan, optimize, and scale their YouTube Shorts channels.
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
              No credit card • No time limits • Start earning today
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