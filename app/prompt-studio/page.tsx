'use client'

import { useState } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import { useAccess } from '@/lib/useAccess'
import Link from 'next/link'

type Platform = 'youtube-shorts' | 'instagram-reels'
type VideoStyle = 'cinematic' | 'storytelling' | 'motivation' | 'explainer'
type Tone = 'dramatic' | 'calm' | 'energetic'
type Duration = '10s' | '20s' | '30s'

interface PromptOutput {
  mainPrompt: string
  scenes: string[]
  hook: string
  pacing: string[]
}

export default function PromptStudioPage() {
  const { user } = useAuth()
  const { isFree, promptStudioRemaining } = useAccess()
  const [formData, setFormData] = useState({
    platform: 'youtube-shorts' as Platform,
    style: 'storytelling' as VideoStyle,
    tone: 'calm' as Tone,
    duration: '20s' as Duration,
    topic: '',
  })
  const [output, setOutput] = useState<PromptOutput | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const generatePrompt = () => {
    if (!formData.topic.trim()) {
      alert('Please enter a topic or video idea')
      return
    }

    if (isFree && typeof promptStudioRemaining === 'number' && promptStudioRemaining <= 0) {
      // Show upgrade prompt
      return
    }

    setIsGenerating(true)

    // Simulate generation delay
    setTimeout(() => {
      const styleMap = {
        cinematic: 'cinematic, high production value, professional lighting',
        storytelling: 'narrative-driven, character-focused, emotional depth',
        motivation: 'energetic, inspiring, dynamic movement',
        explainer: 'clear, educational, well-lit, professional',
      }

      const toneMap = {
        dramatic: 'dramatic lighting, intense atmosphere, high contrast',
        calm: 'soft lighting, peaceful atmosphere, smooth transitions',
        energetic: 'fast-paced, vibrant colors, dynamic camera movement',
      }

      const durationMap = {
        '10s': '10 seconds, fast-paced, quick cuts',
        '20s': '20 seconds, balanced pacing, 3-4 key moments',
        '30s': '30 seconds, detailed storytelling, 4-5 scenes',
      }

      const platformMap = {
        'youtube-shorts': 'vertical 9:16 format, optimized for mobile viewing',
        'instagram-reels': 'vertical 9:16 format, Instagram-optimized',
      }

      const mainPrompt = `Create a ${formData.style} style video about "${formData.topic}" in ${formData.tone} tone. ${styleMap[formData.style]}. ${toneMap[formData.tone]}. ${durationMap[formData.duration]}. ${platformMap[formData.platform]}. High quality, professional production.`

      const scenes = generateScenes(formData)
      const hook = generateHook(formData)
      const pacing = generatePacing(formData)

      setOutput({ mainPrompt, scenes, hook, pacing })
      setIsGenerating(false)
    }, 1500)
  }

  const generateScenes = (data: typeof formData): string[] => {
    const sceneCount = data.duration === '10s' ? 2 : data.duration === '20s' ? 3 : 4
    return Array.from({ length: sceneCount }, (_, i) => {
      return `Scene ${i + 1}: [Describe visual for this moment in the ${data.topic} narrative, ${data.tone} tone, ${data.style} style]`
    })
  }

  const generateHook = (data: typeof formData): string => {
    return `Hook (0-2s): Start with [${data.tone} visual/action] that immediately captures attention. Show [key element related to ${data.topic}] in the first 2 seconds to maximize retention.`
  }

  const generatePacing = (data: typeof formData): string[] => {
    const duration = parseInt(data.duration)
    return [
      `0-${Math.floor(duration * 0.1)}s: Hook - immediate visual impact`,
      `${Math.floor(duration * 0.1)}-${Math.floor(duration * 0.4)}s: Setup - establish context`,
      `${Math.floor(duration * 0.4)}-${Math.floor(duration * 0.9)}s: Main content - deliver value`,
      `${Math.floor(duration * 0.9)}-${duration}s: CTA - call to action`,
    ]
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            AI Video Prompt Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Generate high-quality prompts for AI video tools like Sora and Veo. Pramana helps you structure prompts that produce better results.
          </p>
          {isFree && (
            <div className="mt-4 text-sm text-gray-600">
              Free tier: {typeof promptStudioRemaining === 'number' ? `${promptStudioRemaining} generations remaining today` : 'Unlimited'}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Prompt Configuration</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Video Topic or Idea
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  placeholder="e.g., Morning productivity routine"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="youtube-shorts">YouTube Shorts</option>
                  <option value="instagram-reels">Instagram Reels</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Video Style
                </label>
                <select
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value as VideoStyle })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="cinematic">Cinematic</option>
                  <option value="storytelling">Storytelling</option>
                  <option value="motivation">Motivation</option>
                  <option value="explainer">Explainer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Tone
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value as Tone })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="dramatic">Dramatic</option>
                  <option value="calm">Calm</option>
                  <option value="energetic">Energetic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value as Duration })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="10s">10 seconds</option>
                  <option value="20s">20 seconds</option>
                  <option value="30s">30 seconds</option>
                </select>
              </div>

              <button
                onClick={generatePrompt}
                disabled={isGenerating}
                className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate Prompt'}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Generated Prompt</h2>
            
            {!output ? (
              <div className="text-center py-16 text-gray-500">
                <p>Configure your prompt settings and click "Generate Prompt" to create your AI video prompt.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Main Prompt */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-900">Main Prompt</label>
                    <button
                      onClick={() => copyToClipboard(output.mainPrompt, 'main')}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
                    >
                      {copied === 'main' ? '✓ Copied' : 'Copy Prompt'}
                    </button>
                  </div>
                  <textarea
                    readOnly
                    value={output.mainPrompt}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-mono text-sm"
                    rows={4}
                  />
                </div>

                {/* Hook Description */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-900">Hook (First 2 Seconds)</label>
                    <button
                      onClick={() => copyToClipboard(output.hook, 'hook')}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
                    >
                      {copied === 'hook' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm">
                    {output.hook}
                  </div>
                </div>

                {/* Scene Breakdown */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Scene-by-Scene Breakdown</label>
                  <div className="space-y-3">
                    {output.scenes.map((scene, idx) => (
                      <div key={idx} className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm">
                        {scene}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pacing Guidance */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Visual Pacing Guidance</label>
                  <div className="space-y-2">
                    {output.pacing.map((pace, idx) => (
                      <div key={idx} className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm">
                        {pace}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 card">
          <h3 className="text-xl font-bold mb-4 text-gray-900">How to Use This Prompt</h3>
          <div className="space-y-3 text-gray-700">
            <p>1. Copy the main prompt and paste it into your AI video generator (Sora, Veo, Runway, etc.)</p>
            <p>2. Use the scene breakdown to generate individual scenes if your tool supports multi-scene generation</p>
            <p>3. Reference the pacing guidance when editing to ensure optimal viewer retention</p>
            <p>4. The hook description helps you understand what should appear in the first 2 seconds</p>
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Pramana does not generate videos. This tool helps you create better prompts for external AI video generators.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}




