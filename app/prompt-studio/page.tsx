'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import { useAccess } from '@/lib/useAccess'
import { getCreditsInfo, hasEnoughCredits, getCreditCost } from '@/lib/credits'
import Link from 'next/link'
import CreditsDisplay from '@/components/CreditsDisplay'

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
  const { user, session } = useAuth()
  const { isFree, isPaid } = useAccess()
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
  const [credits, setCredits] = useState<number | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  // Check credits on mount and when user changes
  useEffect(() => {
    if (user) {
      checkCredits()
    }
  }, [user, isPaid])

  const checkCredits = async () => {
    if (!user?.id) return

    try {
      const info = await getCreditsInfo(user.id, isPaid)
      setCredits(info.credits)
    } catch (error) {
      console.error('Error checking credits:', error)
    }
  }

  const generatePrompt = async () => {
    if (!formData.topic.trim()) {
      alert('Please enter a topic or video idea')
      return
    }

    // Check credits for free users (admin bypass handled in API)
    if (!isPaid && user) {
      await checkCredits()
      const creditCost = getCreditCost('prompt-studio')
      const currentCredits = credits !== null ? credits : 0
      if (!hasEnoughCredits(currentCredits, 'prompt-studio', isPaid)) {
        setShowUpgradeModal(true)
        return
      }
    }

    setIsGenerating(true)

    try {
      // Call the AI generation endpoint (handles credits + generation)
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          feature: 'prompt-studio',
          data: formData
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setIsGenerating(false)
        if (result.error === 'Insufficient credits') {
          setShowUpgradeModal(true)
        } else {
          alert(result.error || 'Failed to generate prompt')
        }
        return
      }

      // Handle successful generation
      if (result.success && result.data) {
        setOutput(result.data)
        
        // Update credits if returned
        if (typeof result.creditsRemaining === 'number') {
          setCredits(result.creditsRemaining)
          window.dispatchEvent(new CustomEvent('credits-updated', { detail: { credits: result.creditsRemaining } }))
        }
      }
    } catch (error) {
      console.error('Error generating prompt:', error)
      alert('Failed to process request. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  // Helper functions moved to backend or deprecated
  // const generateScenes...
  // const generateHook...
  // const generatePacing...

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="card max-w-md w-full">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 text-center">Insufficient Credits</h3>
              <p className="text-gray-600 mb-4 text-center">
                This feature costs <span className="font-bold text-indigo-600">{getCreditCost('prompt-studio')} credits</span>. 
                You have <span className="font-bold">{credits || 0} credits</span> remaining.
              </p>
              <p className="text-sm text-gray-500 mb-6 text-center">
                Upgrade to Starter or Pro for unlimited access to all features.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="btn-secondary flex-1 py-3"
                >
                  Maybe Later
                </button>
                <Link
                  href="/pricing"
                  className="btn-primary flex-1 py-3 text-center"
                  onClick={() => setShowUpgradeModal(false)}
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                AI Video Prompt Studio
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-4">
                Generate professional-grade prompts for AI video tools like Sora, Veo, and Runway. 
                Our structured approach ensures better results than generic AI tools.
              </p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-4 max-w-3xl">
                <p className="text-sm font-semibold text-green-900 mb-1">💰 How This Helps You Profit:</p>
                <p className="text-sm text-green-800">
                  Create production-ready AI video prompts that generate higher-quality content, leading to better engagement rates, 
                  more views, and increased monetization potential. Save hours of trial-and-error with structured, topic-aware prompts 
                  that actually work for Shorts and Reels.
                </p>
              </div>
            </div>
            <div className="ml-4">
              <CreditsDisplay feature="prompt-studio" />
            </div>
          </div>
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
        <div className="mt-12 space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-gray-900">How to Use This Prompt</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold mb-2">1. Main Prompt Usage</p>
                <p className="text-sm">Copy the main prompt and paste it directly into your AI video generator (Sora, Veo, Runway, Pika, etc.). This prompt is optimized for the style, tone, and duration you selected. The prompt includes technical specifications that help AI tools generate better results.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">2. Scene-by-Scene Generation</p>
                <p className="text-sm">If your AI video tool supports multi-scene generation or you're creating a sequence, use each scene description individually. Generate each scene separately, then combine them in your video editor. This approach gives you more control over each moment.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">3. Hook Optimization</p>
                <p className="text-sm">The hook description tells you exactly what should appear in the first 2 seconds. This is critical for retention—most viewers decide whether to continue watching in the first 2-3 seconds. Use this guidance to ensure your generated video starts strong.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">4. Pacing Reference</p>
                <p className="text-sm">Reference the visual pacing guidance when editing or when generating multiple scenes. The timing breakdown ensures your video maintains viewer attention throughout. Each section has a specific purpose: hook (attention), setup (context), main content (value), and CTA (action).</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Best Practices for AI Video Prompts</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Be Specific, Not Vague</p>
                <p className="text-sm text-gray-700">Instead of "a video about productivity," use "a morning routine showing specific actions." The more specific your topic, the better the AI can generate relevant visuals.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Match Style to Content</p>
                <p className="text-sm text-gray-700">Cinematic works for dramatic transformations. Storytelling suits narratives. Explainer fits educational content. Motivation works for inspiring content. Choose the style that matches your content's purpose.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Consider Platform Differences</p>
                <p className="text-sm text-gray-700">YouTube Shorts viewers expect different pacing than Instagram Reels. Shorts can be slightly longer and more detailed. Reels benefit from faster hooks and more visual appeal. The prompts are optimized for each platform.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Iterate and Refine</p>
                <p className="text-sm text-gray-700">If your first generation doesn't match your vision, adjust the topic description or try a different style/tone combination. AI video generation often requires iteration to get the perfect result.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Common Mistakes to Avoid</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <div>
                  <p className="font-semibold text-gray-900">Too Generic Topics</p>
                  <p className="text-sm text-gray-700">"Productivity tips" is too vague. Use "5-minute morning routine that boosts energy" instead.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <div>
                  <p className="font-semibold text-gray-900">Ignoring the Hook</p>
                  <p className="text-sm text-gray-700">The first 2 seconds determine retention. Don't skip the hook guidance—it's the most important part.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <div>
                  <p className="font-semibold text-gray-900">Mismatched Style and Tone</p>
                  <p className="text-sm text-gray-700">Using "dramatic" tone for a calm meditation video creates confusion. Match tone to your content's actual mood.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <div>
                  <p className="font-semibold text-gray-900">Not Using Scene Breakdown</p>
                  <p className="text-sm text-gray-700">The scene breakdown helps you create better sequences. Use it to plan your video structure before generation.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Important Note:</strong> Pramana does not generate videos or images. This tool helps you create better, more structured prompts for external AI video generators like Sora, Veo, Runway, Pika, and others. The prompts are designed to produce better results when used with these tools.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}





