'use client'

import { useState } from 'react'
import { useAccess } from '@/lib/useAccess'
import Link from 'next/link'

type ContentType = 'tutorial' | 'entertainment' | 'educational' | 'motivational'
type Goal = 'retention' | 'engagement' | 'monetization'

export default function PostProcessingPage() {
  const { isFree } = useAccess()
  const [formData, setFormData] = useState({
    duration: '',
    contentType: 'tutorial' as ContentType,
    goal: 'retention' as Goal,
  })
  const [output, setOutput] = useState<{
    hookSpeed: string
    pacing: string[]
    captionDensity: string
    mistakes: string[]
    improvements: string[]
  } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyze = () => {
    if (!formData.duration) {
      alert('Please enter video duration')
      return
    }

    setIsAnalyzing(true)

    setTimeout(() => {
      const duration = parseInt(formData.duration)
      
      const hookSpeed = duration <= 15 
        ? 'Fast hook (0-1.5s): Get to the point immediately. No slow build-up.'
        : duration <= 30
        ? 'Medium hook (0-2s): Quick setup, then immediate value delivery.'
        : 'Standard hook (0-3s): Brief context, then hook into main content.'

      const pacing = [
        `0-${Math.floor(duration * 0.1)}s: Hook - immediate attention grab`,
        `${Math.floor(duration * 0.1)}-${Math.floor(duration * 0.4)}s: Setup - establish context quickly`,
        `${Math.floor(duration * 0.4)}-${Math.floor(duration * 0.85)}s: Main content - deliver value consistently`,
        `${Math.floor(duration * 0.85)}-${duration}s: CTA - clear call to action`,
      ]

      const captionDensity = formData.goal === 'retention'
        ? 'High density: Captions should appear for 80-90% of video duration. Every spoken word should be captioned.'
        : formData.goal === 'engagement'
        ? 'Medium density: Captions for key phrases and emphasis words. 60-70% coverage.'
        : 'Strategic density: Captions for value propositions and CTAs. 50-60% coverage with emphasis on monetization points.'

      const mistakes = [
        'Hook takes too long - viewers drop off before value',
        'Inconsistent pacing - some sections too fast, others too slow',
        'Captions appear too late or miss key phrases',
        'No clear CTA or CTA appears too late',
        'Transitions are jarring or confusing',
      ]

      const improvements = [
        `Speed up first ${Math.floor(duration * 0.1)} seconds by 10-15% for better retention`,
        `Add captions to hook within first 1 second`,
        `Ensure smooth transitions between scenes - use crossfade or match cuts`,
        `Place CTA at ${Math.floor(duration * 0.85)}s mark for optimal timing`,
        `Add emphasis captions to key value propositions`,
      ]

      setOutput({ hookSpeed, pacing, captionDensity, mistakes, improvements })
      setIsAnalyzing(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Post-Processing Intelligence
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Get actionable feedback and recommendations to improve your videos after generation or recording. Rule-based guidance to enhance retention and engagement.
          </p>
          {isFree && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Free Preview:</strong> You're viewing basic recommendations. Upgrade for detailed analysis and advanced optimization strategies.
              </p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Video Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Video Duration (seconds)
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  placeholder="e.g., 20"
                  min="5"
                  max="60"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Content Type
                </label>
                <select
                  value={formData.contentType}
                  onChange={(e) => setFormData({ ...formData, contentType: e.target.value as ContentType })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="tutorial">Tutorial</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="educational">Educational</option>
                  <option value="motivational">Motivational</option>
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
                  <option value="retention">Retention</option>
                  <option value="engagement">Engagement</option>
                  <option value="monetization">Monetization</option>
                </select>
              </div>

              <button
                onClick={analyze}
                disabled={isAnalyzing}
                className="btn-primary w-full py-4 disabled:opacity-50"
              >
                {isAnalyzing ? 'Analyzing...' : 'Get Recommendations'}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Recommendations</h2>
            
            {!output ? (
              <div className="text-center py-16 text-gray-500">
                <p>Enter your video details to get optimization recommendations.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Hook Speed */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Hook Speed Feedback</label>
                  <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm">
                    {output.hookSpeed}
                  </div>
                </div>

                {/* Pacing */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Pacing Recommendations</label>
                  <div className="space-y-2">
                    {output.pacing.map((pace, idx) => (
                      <div key={idx} className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm">
                        {pace}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Caption Density */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Caption Density Advice</label>
                  <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm">
                    {output.captionDensity}
                  </div>
                </div>

                {/* Common Mistakes */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Common Mistakes to Avoid</label>
                  <div className="space-y-2">
                    {output.mistakes.map((mistake, idx) => (
                      <div key={idx} className="flex items-start gap-3 px-4 py-2 border border-red-200 rounded-lg bg-red-50">
                        <span className="text-red-600 font-bold">✗</span>
                        <span className="text-gray-900 text-sm">{mistake}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improvements */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Practical Improvements</label>
                  <div className="space-y-2">
                    {output.improvements.map((improvement, idx) => (
                      <div key={idx} className="flex items-start gap-3 px-4 py-2 border border-green-200 rounded-lg bg-green-50">
                        <span className="text-green-600 font-bold">✓</span>
                        <span className="text-gray-900 text-sm">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 card">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">How This Works</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Pramana provides rule-based recommendations based on video duration, content type, and your goals. 
                We don't analyze your video files—instead, we offer structured guidance based on proven patterns.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                These recommendations are advisory and based on best practices for short-form content. 
                Results may vary based on your specific content and audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}




