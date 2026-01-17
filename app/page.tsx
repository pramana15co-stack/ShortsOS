'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { testimonials } from '@/data/testimonials'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % Math.min(3, testimonials.length))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
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
      <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/dashboard" 
                className="btn-primary text-lg px-10 py-5"
              >
                Get Started Free
              </Link>
              <Link 
                href="/creator-audit" 
                className="btn-secondary text-lg px-10 py-5"
              >
                Try Creator Audit
              </Link>
            </div>
            
            {/* How We Help - Visual Feature Preview */}
            <div 
              id="features-section"
              ref={(el) => { sectionRefs.current['features-section'] = el }}
              className={`mt-24 max-w-5xl mx-auto transition-all duration-1000 ${
                visibleSections.has('features-section')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                  How We Help You Create Better Content
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Everything you need to go from idea to published video, without the confusion
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Feature 1 */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Know What to Create</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Get personalized format recommendations based on your niche, goals, and creator stage. No more guessing.
                    </p>
                    <Link href="/creator-audit" className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-2 group/link">
                      Try Creator Audit
                      <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Execute It Correctly</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Access proven templates, hooks, scripts, and step-by-step guides. Follow a clear path, not random tips.
                    </p>
                    <Link href="/formats" className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-2 group/link">
                      Browse Formats
                      <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Optimize & Improve</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Get AI-powered prompts, hook suggestions, and post-processing feedback to make every video better.
                    </p>
                    <Link href="/prompt-studio" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-2 group/link">
                      Try AI Tools
                      <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quick Stats / Benefits */}
              <div 
                className={`grid md:grid-cols-4 gap-4 mt-12 transition-all duration-1000 delay-300 ${
                  visibleSections.has('features-section')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                  <div className="text-3xl font-extrabold text-indigo-600 mb-2">3 Steps</div>
                  <div className="text-sm text-gray-600">From idea to published video</div>
                </div>
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                  <div className="text-3xl font-extrabold text-purple-600 mb-2">10+ Tools</div>
                  <div className="text-sm text-gray-600">All in one platform</div>
                </div>
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                  <div className="text-3xl font-extrabold text-emerald-600 mb-2">100% Free</div>
                  <div className="text-sm text-gray-600">To get started</div>
                </div>
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                  <div className="text-3xl font-extrabold text-teal-600 mb-2">Stage-Aware</div>
                  <div className="text-sm text-gray-600">Guidance for your level</div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 items-center justify-center pt-16 border-t border-gray-200/50 mt-16">
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
      <section 
        id="problems-section"
        ref={(el) => { sectionRefs.current['problems-section'] = el }}
        className="py-16 md:py-20 lg:py-24"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('problems-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
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
              <div 
                key={idx} 
                className={`card p-8 transition-all duration-700 delay-${idx * 100} ${
                  visibleSections.has('problems-section')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
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
      <section 
        id="key-features-section"
        ref={(el) => { sectionRefs.current['key-features-section'] = el }}
        className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('key-features-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="accent-line mx-auto mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three core principles that make Pramana different
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Stage-Aware', desc: 'Recommendations adapt to your creator stage. What works for beginners differs from established channels.', color: 'from-blue-500 to-indigo-600' },
              { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'Clear Constraints', desc: 'We tell you what to avoid at your stage, not just what to do. This reduces mistakes and wasted effort.', color: 'from-purple-500 to-pink-600' },
              { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', title: 'Execution Framework', desc: 'Structured templates and guides, not random outputs. Every recommendation includes clear next steps.', color: 'from-emerald-500 to-teal-600' }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className={`card-feature text-center transition-all duration-700 ${
                  visibleSections.has('key-features-section')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section 
        id="use-cases-section"
        ref={(el) => { sectionRefs.current['use-cases-section'] = el }}
        className="py-16 md:py-20 lg:py-24"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('use-cases-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
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
              <div 
                key={idx} 
                className={`card p-8 relative overflow-hidden group transition-all duration-700 ${
                  visibleSections.has('use-cases-section')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
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
      <section 
        id="steps-section"
        ref={(el) => { sectionRefs.current['steps-section'] = el }}
        className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('steps-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
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
              <div 
                key={idx} 
                className={`card p-6 text-center relative transition-all duration-700 ${
                  visibleSections.has('steps-section')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
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
      <section 
        id="tools-section"
        ref={(el) => { sectionRefs.current['tools-section'] = el }}
        className="py-16 md:py-20 lg:py-24"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('tools-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="accent-line mx-auto mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Essential Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to plan, create, and optimize your Shorts content
            </p>
          </div>
        
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Content Planner", description: "Get format recommendations based on your niche and goals.", icon: "🎯", href: "/planner" },
              { title: "Format Library", description: "Proven formats with structured templates and execution guides.", icon: "📚", href: "/formats" },
              { title: "Hook Templates", description: "Structured hook templates based on successful patterns.", icon: "🎣", href: "/hooks" },
              { title: "Script Templates", description: "Format-based script templates for 30-60 second Shorts.", icon: "📝", href: "/scripts" },
              { title: "AI Prompt Studio", description: "Generate high-quality prompts for AI video tools like Sora and Veo.", icon: "✨", href: "/prompt-studio" },
              { title: "Hook & Caption Engine", description: "Create engaging hooks and captions with timing suggestions.", icon: "💬", href: "/hook-caption-engine" },
              { title: "Post-Processing", description: "Get intelligent feedback on pacing, retention, and optimization.", icon: "🔧", href: "/post-processing" },
              { title: "Export Instructions", description: "Step-by-step guides for CapCut, Premiere Pro, and VN Editor.", icon: "📤", href: "/export-instructions" },
              { title: "SEO Optimizer", description: "Optimize titles, descriptions, and tags for better discoverability.", icon: "🔍", href: "/seo-optimizer" },
            ].map((tool, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ${
                  visibleSections.has('tools-section')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <FeatureCard
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  href={tool.href}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Execution Paths CTA */}
      <section 
        id="execution-paths-cta"
        ref={(el) => { sectionRefs.current['execution-paths-cta'] = el }}
        className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div 
            className={`gradient-bg rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden transition-all duration-1000 ${
              visibleSections.has('execution-paths-cta')
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
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
      <section 
        id="testimonials-section"
        ref={(el) => { sectionRefs.current['testimonials-section'] = el }}
        className="py-16 md:py-20 lg:py-24"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('testimonials-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
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
                } ${
                  visibleSections.has('testimonials-section')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
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
      <section 
        id="faq-section"
        ref={(el) => { sectionRefs.current['faq-section'] = el }}
        className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white"
      >
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
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('faq-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
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
              <div
                key={idx}
                className={`transition-all duration-700 ${
                  visibleSections.has('faq-section')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section 
        id="final-cta-section"
        ref={(el) => { sectionRefs.current['final-cta-section'] = el }}
        className="py-16 md:py-20 lg:py-24"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <div 
            className={`gradient-bg rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden transition-all duration-1000 ${
              visibleSections.has('final-cta-section')
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
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
