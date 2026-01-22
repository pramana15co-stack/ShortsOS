'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { testimonials } from '@/data/testimonials'
import Hero3D from '@/components/Hero3D'
import LightPillar from '@/components/LightPillar'

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
      {/* Hero Section with Beautiful Background */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/20 pointer-events-none"></div>
        
        {/* LightPillar Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={0.8}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.3}
            pillarRotation={25}
            interactive={true}
            mixBlendMode="screen"
            quality="high"
          />
        </div>
        
        {/* React Three Fiber Hero 3D Model */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
          <Hero3D modelPath="/models/hero-model.gltf" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
          <div className={`max-w-4xl mx-auto text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`}>
            {/* Simple Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-indigo-200/50 rounded-full mb-6 md:mb-8 shadow-sm">
              <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">YouTube Shorts & Reels Platform</span>
            </div>
            
            {/* Main Heading with Trust Indicators */}
            <div className="mb-4 md:mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 text-gray-900 leading-tight px-4">
                <span className="block mb-2">Create Viral Shorts & Reels</span>
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">That Actually Convert</span>
              </h1>
              
              {/* Trust Badge Row - Cleaner Colors */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4 px-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full">
                  <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-bold text-indigo-700">100 Free Credits</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full">
                  <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-bold text-indigo-700">SSL Secured</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full">
                  <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-bold text-indigo-700">4.9/5 Rating</span>
                </div>
              </div>
            </div>
            
            {/* Description with Value Prop */}
            <div className="mb-8 md:mb-10 px-4">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-3 max-w-2xl mx-auto leading-relaxed">
                Stop guessing what works. Get proven formats, AI-powered hooks, and step-by-step scripts 
                designed for <span className="font-bold text-indigo-600">60-second vertical videos</span>.
              </p>
              
              {/* Value Proposition - Cleaner Design */}
              <div className="mt-6 max-w-3xl mx-auto">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-indigo-100/50 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <div className="text-center sm:text-left">
                      <div className="text-3xl font-extrabold text-indigo-600 mb-1">100 Credits</div>
                      <div className="text-sm text-gray-600">Free to try all features</div>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
                    <div className="text-center sm:text-left">
                      <div className="text-3xl font-extrabold text-indigo-600 mb-1">No Card</div>
                      <div className="text-sm text-gray-600">Required to start</div>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
                    <div className="text-center sm:text-left">
                      <div className="text-3xl font-extrabold text-indigo-600 mb-1">Instant</div>
                      <div className="text-sm text-gray-600">Access after signup</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons with Enhanced Trust */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 md:mb-10 px-4">
              <Link 
                href="/signup" 
                className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Start Free with 100 Credits</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              <Link 
                href="/execution-paths" 
                className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300 hover:shadow-lg"
              >
                Watch Demo
              </Link>
            </div>
            
            {/* Money-Back Guarantee - Cleaner Design */}
            <div className="mb-8 md:mb-10 px-4">
              <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-indigo-200/50 shadow-sm">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="font-bold text-gray-900 text-sm sm:text-base">30-Day Money-Back Guarantee</div>
                    <div className="text-xs sm:text-sm text-gray-600">Try risk-free. If you're not satisfied, get a full refund.</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Credibility Signals - Enhanced */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 mb-12 px-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Builder-first</span>
              </div>
            </div>
            
            {/* Shorts/Reels Workflow - Cleaner Design */}
            <div 
              className={`mt-12 md:mt-16 max-w-5xl mx-auto transition-all duration-1000 ${
                visibleSections.has('features-section')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 border border-indigo-200/50 shadow-xl">
                <div className="text-center mb-8 md:mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 rounded-full mb-3 md:mb-4">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span className="text-xs md:text-sm font-bold text-indigo-700">4-Step Creation Process</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-4">
                    From Idea to Viral Video
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                    Complete workflow for creating engaging 60-second vertical videos
                  </p>
                </div>

                {/* Workflow Steps - Responsive Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                  {[
                    { step: '1', title: 'Choose Format', desc: '20+ proven formats', icon: '📋', color: 'from-blue-500 to-cyan-500' },
                    { step: '2', title: 'Generate Hook', desc: 'AI-powered suggestions', icon: '🎣', color: 'from-purple-500 to-pink-500' },
                    { step: '3', title: 'Write Script', desc: 'Template-based writing', icon: '📝', color: 'from-indigo-500 to-purple-500' },
                    { step: '4', title: 'Export & Publish', desc: 'Platform-optimized', icon: '🚀', color: 'from-emerald-500 to-teal-500' },
                  ].map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="relative bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="flex flex-col items-center text-center mb-3">
                          <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${item.color} rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-2xl shadow-md mb-3`}>
                            {item.icon}
                          </div>
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                            <span className="text-xs md:text-sm font-extrabold text-indigo-600">{item.step}</span>
                          </div>
                        </div>
                        <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 md:mb-2">{item.title}</h3>
                        <p className="text-xs md:text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats Bar - Responsive */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 pt-6 md:pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-indigo-600 mb-1">20+</div>
                    <div className="text-xs md:text-sm text-gray-600 font-medium">Formats</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-purple-600 mb-1">60s</div>
                    <div className="text-xs md:text-sm text-gray-600 font-medium">Length</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-emerald-600 mb-1">9:16</div>
                    <div className="text-xs md:text-sm text-gray-600 font-medium">Aspect</div>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Help - Simplified */}
            <div 
              id="features-section"
              ref={(el) => { sectionRefs.current['features-section'] = el }}
              className={`mt-12 md:mt-16 max-w-5xl mx-auto transition-all duration-1000 ${
                visibleSections.has('features-section')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-center mb-8 md:mb-12 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-4">
                  How We Help You Create Better Content
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                  Everything you need to go from idea to published video, without the confusion
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
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

              {/* Quick Stats - Removed to reduce clutter */}
            </div>

            {/* Trust Indicators - Simplified */}
            <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center pt-8 md:pt-12 border-t border-gray-200/50 mt-8 md:mt-12 px-4">
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

      {/* Planning & Creation Section - Enhanced */}
      <section 
        id="tools-section"
        ref={(el) => { sectionRefs.current['tools-section'] = el }}
        className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-indigo-50/20 to-white"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('tools-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold text-indigo-700 uppercase tracking-wider">Planning & Creation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Professional-Grade Content Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Not just AI outputs—complete workflows with stage-aware recommendations, proven templates, and execution frameworks that adapt to your creator journey.
            </p>
          </div>
        
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Content Planner", 
                description: "Stage-aware format recommendations that evolve with your channel. Get personalized suggestions based on your niche, subscriber count, and content goals—not generic AI responses.",
                icon: "🎯", 
                href: "/planner",
                features: ["Stage-specific recommendations", "Niche-aware suggestions", "Goal-based planning"],
                badge: "Intelligent"
              },
              { 
                title: "Format Library", 
                description: "20+ battle-tested formats with complete execution playbooks. Each format includes hook structures, script templates, pacing guides, and what to avoid at your stage.",
                icon: "📚", 
                href: "/formats",
                features: ["20+ proven formats", "Complete playbooks", "Stage constraints"],
                badge: "Comprehensive"
              },
              { 
                title: "Hook Templates", 
                description: "Data-driven hook structures based on top-performing Shorts. Each template includes timing breakdowns, emotional triggers, and retention optimization strategies.",
                icon: "🎣", 
                href: "/hooks",
                features: ["Data-backed patterns", "Timing breakdowns", "Retention optimization"],
                badge: "Data-Driven"
              },
              { 
                title: "Script Templates", 
                description: "Format-specific scripts with pacing markers, transition cues, and retention hooks. Built for 30-60 second Shorts with precise timing guidance.",
                icon: "📝", 
                href: "/scripts",
                features: ["Pacing markers", "Transition cues", "Timing guidance"],
                badge: "Precision"
              },
              { 
                title: "AI Prompt Studio", 
                description: "Generate production-ready prompts for Sora, Veo, and Runway. Includes shot composition, camera movements, lighting, and style specifications—not just text-to-video.",
                icon: "✨", 
                href: "/prompt-studio",
                features: ["Production-ready prompts", "Multi-tool support", "Technical specs"],
                badge: "Professional"
              },
              { 
                title: "Hook & Caption Engine", 
                description: "Create hooks with precise timing suggestions, caption placement, and retention analysis. Includes A/B testing recommendations and performance predictions.",
                icon: "💬", 
                href: "/hook-caption-engine",
                features: ["Timing suggestions", "A/B testing", "Performance predictions"],
                badge: "Advanced"
              },
              { 
                title: "Post-Processing Analysis", 
                description: "Get intelligent feedback on pacing, retention curves, hook effectiveness, and optimization opportunities. Includes frame-by-frame analysis recommendations.",
                icon: "🔧", 
                href: "/post-processing",
                features: ["Retention analysis", "Pacing feedback", "Frame-level insights"],
                badge: "Analytical"
              },
              { 
                title: "Export Instructions", 
                description: "Platform-specific export guides for CapCut, Premiere Pro, and VN Editor. Includes resolution settings, aspect ratios, compression tips, and upload optimization.",
                icon: "📤", 
                href: "/export-instructions",
                features: ["Platform-specific", "Compression tips", "Upload optimization"],
                badge: "Practical"
              },
              { 
                title: "SEO Optimizer", 
                description: "Real-time SEO scoring with keyword density analysis, title optimization (30-60 chars), description templates, and tag suggestions based on trending searches.",
                icon: "🔍", 
                href: "/seo-optimizer",
                features: ["Real-time scoring", "Keyword analysis", "Trending tags"],
                badge: "Real-Time"
              },
            ].map((tool, idx) => (
              <div
                key={idx}
                className={`group transition-all duration-700 ${
                  visibleSections.has('tools-section')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <EnhancedFeatureCard
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  href={tool.href}
                  features={tool.features}
                  badge={tool.badge}
                />
              </div>
            ))}
          </div>

          {/* Value Proposition Footer */}
          <div 
            className={`mt-16 text-center transition-all duration-1000 delay-500 ${
              visibleSections.has('tools-section')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-6 px-8 py-6 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-indigo-200/50 shadow-lg">
              <div className="text-left">
                <div className="text-2xl font-extrabold text-gray-900 mb-1">Not Just AI Outputs</div>
                <div className="text-sm text-gray-600">Complete workflows with context, constraints, and execution frameworks</div>
              </div>
              <div className="hidden md:flex items-center gap-4 pl-6 border-l border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-indigo-600">20+</div>
                  <div className="text-xs text-gray-600">Proven Formats</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-purple-600">Stage-Aware</div>
                  <div className="text-xs text-gray-600">Recommendations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-emerald-600">Complete</div>
                  <div className="text-xs text-gray-600">Playbooks</div>
                </div>
              </div>
            </div>
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
                Join creators using Pramana to make better content decisions. Free to start, no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="group relative bg-white text-indigo-600 px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10">Start Free</span>
                  <span className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
                <Link
                  href="/execution-paths"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-xl"
                >
                  See How It Works
                </Link>
              </div>
              <p className="mt-8 text-base text-white/80">
                No credit card • Free forever • Start creating today
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

function EnhancedFeatureCard({ 
  title, 
  description, 
  icon, 
  href, 
  features, 
  badge 
}: { 
  title: string
  description: string
  icon: string
  href: string
  features: string[]
  badge: string
}) {
  return (
    <Link
      href={href}
      className="group relative block h-full"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
      
      {/* Card */}
      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
            {badge}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-extrabold mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4 text-sm flex-grow">
          {description}
        </p>
        
        {/* Features List */}
        <ul className="space-y-2 mb-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-gray-700">
              <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
          <span className="text-indigo-600 font-bold text-sm group-hover:text-indigo-700">
            Explore Tool
          </span>
          <svg 
            className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
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
