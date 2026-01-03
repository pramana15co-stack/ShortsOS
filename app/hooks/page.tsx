'use client'

import { useState } from 'react'
import { generateHooks, HookInput, Emotion, AudienceLevel, GeneratedHook } from '@/lib/hookTemplates'

export default function HooksPage() {
  const [formData, setFormData] = useState<HookInput>({
    topic: '',
    emotion: 'curiosity',
    audienceLevel: 'beginner',
  })
  const [generatedHooks, setGeneratedHooks] = useState<GeneratedHook[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.topic.trim()) {
      alert('Please enter a topic')
      return
    }
    const hooks = generateHooks(formData)
    setGeneratedHooks(hooks)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setFormData({
      topic: '',
      emotion: 'curiosity',
      audienceLevel: 'beginner',
    })
    setGeneratedHooks([])
    setIsSubmitted(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Hook Generator
        </h1>
        <p className="text-xl text-gray-600">
          Generate compelling opening hooks for your YouTube Shorts. Each hook is optimized for the first 3-8 seconds.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
          <div className="space-y-6">
            {/* Topic Input */}
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                Topic <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="topic"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., productivity, fitness, cooking, coding..."
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Enter the main topic or subject for your Shorts video
              </p>
            </div>

            {/* Emotion Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Emotion <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {(['curiosity', 'shock', 'urgency', 'inspiration'] as Emotion[]).map((emotion) => (
                  <label
                    key={emotion}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      formData.emotion === emotion
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="emotion"
                      value={emotion}
                      checked={formData.emotion === emotion}
                      onChange={(e) => setFormData({ ...formData, emotion: e.target.value as Emotion })}
                      className="mr-3 text-primary-600 focus:ring-primary-500"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 capitalize">{emotion}</div>
                      <div className="text-sm text-gray-600">
                        {emotion === 'curiosity' && 'Creates intrigue and questions'}
                        {emotion === 'shock' && 'Surprises and captivates'}
                        {emotion === 'urgency' && 'Creates immediate action need'}
                        {emotion === 'inspiration' && 'Motivates and uplifts'}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Audience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Audience Level <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {(['beginner', 'intermediate', 'advanced'] as AudienceLevel[]).map((level) => (
                  <label
                    key={level}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      formData.audienceLevel === level
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="audienceLevel"
                      value={level}
                      checked={formData.audienceLevel === level}
                      onChange={(e) =>
                        setFormData({ ...formData, audienceLevel: e.target.value as AudienceLevel })
                      }
                      className="mr-3 text-primary-600 focus:ring-primary-500"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 capitalize">{level}</div>
                      <div className="text-sm text-gray-600">
                        {level === 'beginner' && 'Simple, easy-to-understand language'}
                        {level === 'intermediate' && 'Balanced complexity and clarity'}
                        {level === 'advanced' && 'Professional, expert-level terminology'}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition text-lg"
            >
              Generate Hooks
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Generated Hooks</h2>
                <p className="opacity-90">
                  {formData.topic} • {formData.emotion} • {formData.audienceLevel}
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition text-sm font-medium"
              >
                Generate New
              </button>
            </div>
          </div>

          {/* Generated Hooks */}
          <div className="space-y-4">
            {generatedHooks.map((hook, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-lg font-medium text-gray-900 leading-relaxed">
                          "{hook.text}"
                        </p>
                      </div>
                    </div>
                    <div className="ml-11 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ~{hook.estimatedSeconds}s
                      </span>
                      {hook.estimatedSeconds <= 8 && (
                        <span className="text-green-600 font-medium">✓ Under 8s</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(hook.text)}
                    className="ml-4 px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition text-sm font-medium"
                    title="Copy to clipboard"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Pro Tips
            </h3>
            <ul className="text-blue-800 text-sm space-y-1 mb-4">
              <li>• Test different hooks to see which performs best</li>
              <li>• The first 3 seconds are critical - make them count</li>
              <li>• Match your hook's emotion to your video's content</li>
              <li>• Keep it under 8 seconds to maximize retention</li>
            </ul>
            <div className="pt-4 border-t border-blue-200">
              <p className="text-blue-900 text-sm font-medium mb-2">Continue your workflow:</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/formats" className="text-blue-700 hover:text-blue-900 hover:underline">
                  Choose a format →
                </Link>
                <span className="text-blue-400">•</span>
                <Link href="/scripts" className="text-blue-700 hover:text-blue-900 hover:underline">
                  Generate full script →
                </Link>
                <span className="text-blue-400">•</span>
                <Link href="/planner" className="text-blue-700 hover:text-blue-900 hover:underline">
                  Get personalized plan →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
