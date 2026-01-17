'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { testimonials } from '@/data/testimonials'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % Math.min(3, testimonials.length))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Removed inflated stats - keeping it honest and trustworthy

  const steps = [
    {
      number: '01',
      title: 'Tell Us Your Stage',
      description: 'Answer a few questions about your niche, goals, and experience level.',
      icon: '🎯',
    },
    {
      number: '02',
      title: 'Get Recommendations',
      description: 'Receive format recommendations tailored to your specific creator stage.',
      icon: '📋',
    },
    {
      number: '03',
      title: 'Use Templates',
      description: 'Access proven script templates, hook structures, and execution guides.',
      icon: '📝',
    },
    {
      number: '04',
      title: 'Create & Optimize',
      description: 'Generate content, optimize for SEO, and track your performance.',
      icon: '🚀',
    },
  ]

  const useCases = [
    {
      title: 'For Beginners',
      description: 'Start from zero with clear, step-by-step guidance. No confusion, no overwhelm.',
      features: ['Execution Paths', 'Format Library', 'Script Templates', 'Basic Tools'],
      icon: '🌱',
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'For Growing Creators',
      description: 'Scale your channel with advanced optimization and structured workflows.',
      features: ['AI Prompt Studio', 'Hook Engine', 'Post-Processing', 'Analytics'],
      icon: '📈',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'For Agencies',
      description: 'Manage multiple clients with batch workflows and professional exports.',
      features: ['Batch Processing', 'Client Management', 'Export Instructions', 'Team Features'],
      icon: '🏢',
      color: 'from-purple-500 to-pink-600',
    },
  ]

  const problems = [
    {
      problem: 'Decision Fatigue',
      solution: 'Get clear, stage-aware recommendations so you know exactly what to create next.',
      icon: '🤔',
    },
    {
      problem: 'Conflicting Advice',
      solution: 'We tell you what works at YOUR stage, not generic tips that might not apply.',
      icon: '⚡',
    },
    {
      problem: 'Time Wasted',
      solution: 'Structured templates and execution guides save hours every week.',
      icon: '⏱️',
    },
    {
      problem: 'Inconsistent Results',
      solution: 'Follow proven formats and paths that lead to predictable growth.',
      icon: '🎯',
    },
  ]

  const faqs = [
    {
      question: 'Is Pramana really free to start?',
      answer: 'Yes! All core planning tools are free forever. You can use the Content Planner, Format Library, Hook Generator, Script Templates, and SEO Optimizer without any payment. Premium features like Execution Paths are optional.',
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No account is required for most features. You can use planning tools, format guides, and generators without signing up. Creating a free account lets you save your work and access your dashboard.',
    },
    {
      question: 'What makes Pramana different from other tools?',
      answer: 'Pramana is stage-aware. We provide different recommendations based on whether you\'re a beginner, intermediate, or advanced creator. We also tell you what to avoid at your stage, not just what to do.',
    },
    {
      question: 'Can I use Pramana for platforms other than YouTube Shorts?',
      answer: 'Pramana is specifically designed for YouTube Shorts (vertical, 60-second videos). While some principles may apply to other platforms, our formats and templates are optimized for YouTube\'s algorithm and audience behavior.',
    },
    {
      question: 'How do I know which format to use?',
      answer: 'Use our Content Planner! It asks about your niche, goals, and experience level, then recommends the best formats for your situation. You can also browse the Format Library to see all available options.',
    },
  ]

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
              Clarity for short-form creators.<br />
              <span className="text-gray-700">Structure, not stress.</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed font-normal">
              Pramana helps you know what to create, when to create it, and how to execute it correctly. 
              Built for early-stage creators who want clarity, not hacks.
            </p>
            
            <p className="text-base text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Explore freely. Upgrade only when ready. No pressure.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/dashboard" 
                className="btn-primary text-lg px-10 py-5"
              >
                Get Started Free
              </Link>
              <Link 
                href="/planner" 
                className="btn-secondary text-lg px-10 py-5"
              >
                Explore Tools
              </Link>
            </div>
            
            {/* Value Proposition - 4 Questions */}
            <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                <div className="text-2xl font-bold text-gray-900 mb-2">Who this is for</div>
                <div className="text-gray-700">Early-stage creators who want clarity and structure, not more confusion.</div>
              </div>
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                <div className="text-2xl font-bold text-gray-900 mb-2">What problem it solves</div>
                <div className="text-gray-700">Decision fatigue, conflicting advice, and not knowing what to create next.</div>
              </div>
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                <div className="text-2xl font-bold text-gray-900 mb-2">Why it's different</div>
                <div className="text-gray-700">Stage-aware guidance that tells you what works at YOUR level, not generic tips.</div>
              </div>
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                <div className="text-2xl font-bold text-gray-900 mb-2">Why upgrade makes sense</div>
                <div className="text-gray-700">Remove limits, get structured paths, and unlock full clarity when you're ready.</div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 items-center justify-center pt-12 border-t border-gray-200/50">
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Free to start, no credit card</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Built for beginners</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Focused on clarity, not hacks</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Problem/Solution Section */}
      <section className="section">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              We Solve Real Problems
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every creator faces these challenges. Pramana provides clear solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {problems.map((item, idx) => (
              <div key={idx} className="card p-8">
                <div className="flex items-start gap-4">
                  <div className="text-5xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.problem}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
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

      {/* Use Cases Section */}
      <section className="section">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Built for Every Creator Stage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Whether you're just starting or scaling, Pramana adapts to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => (
              <div key={idx} className="card p-8 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${useCase.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{useCase.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="section-alt">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Get Started in 4 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From planning to publishing, we guide you every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map((step, idx) => (
              <div key={idx} className="card p-6 text-center relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                  {step.number}
                </div>
                <div className="text-5xl mb-4 mt-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/planner"
              className="btn-primary text-lg px-10 py-5 inline-block"
            >
              Start Your First Plan →
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
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
              title="AI Prompt Studio"
              description="Generate high-quality prompts for AI video tools like Sora and Veo."
              icon="✨"
              href="/prompt-studio"
            />
            <FeatureCard
              title="Hook & Caption Engine"
              description="Create engaging hooks and captions with timing suggestions."
              icon="💬"
              href="/hook-caption-engine"
            />
            <FeatureCard
              title="Post-Processing"
              description="Get intelligent feedback on pacing, retention, and optimization."
              icon="🔧"
              href="/post-processing"
            />
            <FeatureCard
              title="Export Instructions"
              description="Step-by-step guides for CapCut, Premiere Pro, and VN Editor."
              icon="📤"
              href="/export-instructions"
            />
            <FeatureCard
              title="SEO Optimizer"
              description="Optimize titles, descriptions, and tags for better discoverability."
              icon="🔍"
              href="/seo-optimizer"
            />
          </div>
        </div>
      </section>

      {/* Execution Paths CTA */}
      <section className="section-alt">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="gradient-bg rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Ready for Structured Growth?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Execution Paths are step-by-step playbooks that guide you from where you are to where you want to be. 
                No guesswork, just clear progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/execution-paths"
                  className="bg-white text-indigo-600 px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
                >
                  Explore Execution Paths
                </Link>
                <Link
                  href="/pricing"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all shadow-xl"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              What Creators Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real results from creators using Pramana to grow their channels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {testimonials.slice(0, 3).map((testimonial, idx) => (
              <div
                key={testimonial.id}
                className={`card p-8 transition-all duration-500 ${
                  idx === activeTestimonial ? 'scale-105 shadow-xl border-2 border-indigo-200' : 'opacity-75'
                }`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                  {testimonial.verified && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">
                      Verified
                    </span>
                  )}
                </div>
                {testimonial.results && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm font-bold text-gray-900">Results: {testimonial.results}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {testimonials.slice(0, 3).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === activeTestimonial ? 'bg-indigo-600 w-8' : 'bg-gray-300'
                }`}
                aria-label={`View testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/pricing"
              className="text-indigo-600 hover:text-indigo-700 font-bold text-lg"
            >
              See More Success Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-alt">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about getting started with Pramana
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="gradient-bg rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Ready to Start Creating?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of creators using Pramana to make better content decisions. Free to start, no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="bg-white text-indigo-600 px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/pricing"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all shadow-xl"
                >
                  View Pricing
                </Link>
              </div>
              <p className="mt-8 text-base text-white/80">
                No credit card • No time limits • Start creating today
              </p>
            </div>
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-center justify-between p-6 focus:outline-none"
      >
        <h3 className="text-lg font-bold text-gray-900 pr-8">{question}</h3>
        <svg
          className={`w-6 h-6 text-gray-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}
