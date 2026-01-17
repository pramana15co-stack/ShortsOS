'use client'

import { useState } from 'react'
import { useAccess } from '@/lib/useAccess'
import UpgradeGate from '@/components/UpgradeGate'

type Platform = 'youtube' | 'instagram'
type Frequency = 'daily' | '3-4-per-week' | 'weekly' | 'occasional'
type Goal = 'growth' | 'engagement' | 'monetization' | 'consistency'

interface AuditResult {
  creatorStage: string
  whatToPostNext: string[]
  bestFormats: string[]
  postingRhythm: string
  whatNotToDo: string[]
  personalizedGuidance: string
}

export default function CreatorAuditPage() {
  const { canAccess, isFree } = useAccess()
  const hasAccess = canAccess('starter')
  
  const [step, setStep] = useState<'input' | 'questions' | 'result'>('input')
  const [formData, setFormData] = useState({
    link: '',
    platform: 'youtube' as Platform,
    frequency: '3-4-per-week' as Frequency,
    goal: 'growth' as Goal,
  })
  const [result, setResult] = useState<AuditResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Wrap content in UpgradeGate for clean access control

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.link.trim()) {
      alert('Please enter a channel or page link')
      return
    }
    setStep('questions')
  }

  const handleQuestionsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    
    // Simulate analysis
    setTimeout(() => {
      const auditResult = generateAudit(formData)
      setResult(auditResult)
      setIsAnalyzing(false)
      setStep('result')
    }, 2000)
  }

  const generateAudit = (data: typeof formData): AuditResult => {
    const isYouTube = data.platform === 'youtube'
    const isFrequent = data.frequency === 'daily' || data.frequency === '3-4-per-week'
    
    // Determine creator stage
    let creatorStage = 'Early Stage'
    if (isFrequent && data.goal !== 'consistency') {
      creatorStage = 'Growing'
    } else if (isFrequent && data.goal === 'monetization') {
      creatorStage = 'Established'
    }

    // What to post next
    const whatToPostNext = isYouTube ? [
      'Problem-solution format: Address a common question in your niche',
      'Before/after transformation: Show progress or results',
      'Quick tip or hack: Share actionable value in 30-60 seconds',
    ] : [
      'Behind-the-scenes: Show your process or daily routine',
      'Educational carousel: Break down a concept in multiple slides',
      'Story-driven content: Share a personal experience or lesson',
    ]

    // Best formats
    const bestFormats = isYouTube ? [
      'Problem-Solution (high retention, clear value)',
      'Before/After (visual impact, transformation story)',
      'Quick Tips (fast value delivery, shareable)',
    ] : [
      'Carousel Posts (high engagement, educational)',
      'Reels (algorithm-friendly, discoverable)',
      'Story Highlights (evergreen, reference-worthy)',
    ]

    // Posting rhythm
    const postingRhythm = data.frequency === 'daily' 
      ? 'Post daily at consistent times. Focus on one format for 2-3 weeks to establish patterns. Quality over quantity—ensure each post delivers clear value.'
      : data.frequency === '3-4-per-week'
      ? 'Post 3-4 times per week on consistent days. This frequency allows for quality while maintaining momentum. Batch create content to stay ahead.'
      : data.frequency === 'weekly'
      ? 'Post weekly with high-quality, well-planned content. Use the week to plan, create, and optimize. Focus on formats that have the highest impact.'
      : 'Post when you have valuable content ready. Focus on quality and consistency over frequency. Build a small library before increasing posting frequency.'

    // What not to do
    const whatNotToDo = [
      `Don't jump between formats too quickly—stick with 2-3 formats for at least 4-6 weeks`,
      `Don't post without a clear value proposition—every piece of content should answer "why should someone watch this?"`,
      `Don't ignore your audience's questions—use them as content ideas`,
      `Don't compare your early results to established creators—focus on your own progress`,
      `Don't skip the planning phase—structure reduces stress and improves results`,
    ]

    // Personalized guidance
    const personalizedGuidance = `Based on your ${data.platform === 'youtube' ? 'YouTube channel' : 'Instagram page'}, you're in the ${creatorStage} stage. Your primary goal is ${data.goal}, and you're posting ${data.frequency === 'daily' ? 'daily' : data.frequency === '3-4-per-week' ? '3-4 times per week' : data.frequency === 'weekly' ? 'weekly' : 'occasionally'}. 

${data.goal === 'growth' ? 'Focus on formats that maximize reach and discoverability. Problem-solution and educational content work well for growth.' : data.goal === 'engagement' ? 'Prioritize formats that encourage interaction. Ask questions, share relatable experiences, and create conversation starters.' : data.goal === 'monetization' ? 'Focus on formats that demonstrate value and build trust. Educational content and behind-the-scenes work well for monetization.' : 'Consistency is key. Focus on establishing a routine and building a content library before optimizing for specific goals.'}

Your next step: Choose one format from the recommendations above and create 3-4 pieces of content in that format. This will help you understand what resonates with your audience before expanding.`

    return {
      creatorStage,
      whatToPostNext,
      bestFormats,
      postingRhythm,
      whatNotToDo,
      personalizedGuidance,
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <UpgradeGate requiredTier="starter">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Creator Intelligence Audit
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Get personalized guidance based on your channel and goals. Understand your creator stage, 
            what to post next, and what to avoid. This is a decision system, not an analytics tool.
          </p>
        </div>

        {step === 'input' && (
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Step 1: Enter Your Channel or Page</h2>
            <form onSubmit={handleLinkSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  YouTube Channel Link, Instagram Page Link, or Shorts Link
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  placeholder="https://youtube.com/@yourchannel or https://instagram.com/yourpage"
                />
                <p className="text-xs text-gray-500 mt-2">
                  We don't analyze your data. This helps us provide personalized guidance based on your platform and goals.
                </p>
              </div>
              <button type="submit" className="btn-primary w-full py-4">
                Continue
              </button>
            </form>
          </div>
        )}

        {step === 'questions' && (
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Step 2: Tell Us About Your Content</h2>
            <form onSubmit={handleQuestionsSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="youtube">YouTube / YouTube Shorts</option>
                  <option value="instagram">Instagram / Instagram Reels</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  How often do you post?
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value as Frequency })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="daily">Daily</option>
                  <option value="3-4-per-week">3-4 times per week</option>
                  <option value="weekly">Weekly</option>
                  <option value="occasional">Occasionally (less than weekly)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Primary Goal
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value as Goal })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="growth">Growth (more views, subscribers, followers)</option>
                  <option value="engagement">Engagement (comments, shares, community)</option>
                  <option value="monetization">Monetization (build trust, demonstrate value)</option>
                  <option value="consistency">Consistency (establish routine, build habit)</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="btn-secondary flex-1 py-4"
                >
                  Back
                </button>
                <button type="submit" className="btn-primary flex-1 py-4" disabled={isAnalyzing}>
                  {isAnalyzing ? 'Analyzing...' : 'Get Guidance'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'result' && result && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Personalized Guidance</h2>
              <button
                onClick={() => {
                  setStep('input')
                  setResult(null)
                  setFormData({ ...formData, link: '' })
                }}
                className="btn-secondary px-6 py-2"
              >
                Start New Audit
              </button>
            </div>

            {/* Creator Stage */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Your Creator Stage</h3>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="text-2xl font-bold text-indigo-900 mb-2">{result.creatorStage}</div>
                <p className="text-gray-700 text-sm">
                  Based on your posting frequency and goals, this is where you are in your creator journey.
                </p>
              </div>
            </div>

            {/* What to Post Next */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-gray-900">What to Post Next</h3>
              <div className="space-y-3">
                {result.whatToPostNext.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-gray-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Formats */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Best Content Formats for You</h3>
              <div className="space-y-2">
                {result.bestFormats.map((format, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-900">{format}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Posting Rhythm */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Recommended Posting Rhythm</h3>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-gray-900 leading-relaxed">{result.postingRhythm}</p>
              </div>
            </div>

            {/* What Not to Do */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-gray-900">What NOT to Do</h3>
              <div className="space-y-2">
                {result.whatNotToDo.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-red-600 font-bold flex-shrink-0 mt-0.5">✗</span>
                    <span className="text-gray-900 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personalized Guidance */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Personalized Guidance</h3>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-900 leading-relaxed whitespace-pre-line">{result.personalizedGuidance}</p>
              </div>
              <button
                onClick={() => copyToClipboard(result.personalizedGuidance)}
                className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Copy Guidance
              </button>
            </div>
          </div>
        )}
      </div>
      </UpgradeGate>
    </main>
  )
}
