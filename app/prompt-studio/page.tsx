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

    // Check credits for free users
    if (!isPaid && user) {
      await checkCredits()
      const creditCost = getCreditCost('prompt-studio')
      if (!hasEnoughCredits(credits || 0, 'prompt-studio', isPaid)) {
        setShowUpgradeModal(true)
        return
      }
    }

    setIsGenerating(true)

    // Use credits for free users
    if (!isPaid && user) {
      try {
        const response = await fetch('/api/credits/use', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            feature: 'prompt-studio',
          }),
        })

        const data = await response.json()
        if (!data.success) {
          setIsGenerating(false)
          if (data.error === 'Insufficient credits') {
            setShowUpgradeModal(true)
          } else {
            alert(data.error || 'Failed to use credits')
          }
          return
        }

        // Update credits display
        setCredits(data.creditsRemaining)
      } catch (error) {
        console.error('Error using credits:', error)
        setIsGenerating(false)
        alert('Failed to process request. Please try again.')
        return
      }
    }

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
    const topic = data.topic.toLowerCase()
    
    const sceneTemplates = {
      cinematic: [
        `Scene 1: Wide establishing shot with ${data.tone === 'dramatic' ? 'dramatic lighting and high contrast' : data.tone === 'energetic' ? 'vibrant colors and dynamic composition' : 'soft, natural lighting'}. Show the main subject or environment related to "${data.topic}" with professional camera movement.`,
        `Scene 2: Medium shot focusing on key action or transformation. ${data.tone === 'dramatic' ? 'Intense focus with shallow depth of field' : data.tone === 'energetic' ? 'Fast-paced movement with multiple angles' : 'Smooth, steady composition'}.`,
        `Scene 3: Close-up detail shot highlighting the most important element. ${data.tone === 'dramatic' ? 'Extreme close-up with dramatic shadows' : data.tone === 'energetic' ? 'Dynamic close-up with motion blur effects' : 'Clean, well-lit close-up'}.`,
        `Scene 4: Final reveal or outcome shot. ${data.tone === 'dramatic' ? 'Powerful conclusion with strong visual impact' : data.tone === 'energetic' ? 'Energetic finale with vibrant colors' : 'Peaceful resolution with balanced composition'}.`,
      ],
      storytelling: [
        `Scene 1: Opening moment that establishes the narrative context. Show the beginning state or problem related to "${data.topic}". ${data.tone === 'dramatic' ? 'Create tension through visual storytelling' : data.tone === 'energetic' ? 'Start with action or movement' : 'Begin with a calm, relatable moment'}.`,
        `Scene 2: Development of the story. Show the journey, process, or transformation. ${data.tone === 'dramatic' ? 'Build emotional intensity' : data.tone === 'energetic' ? 'Show progress with dynamic visuals' : 'Present the process clearly and smoothly'}.`,
        `Scene 3: Key moment or turning point in the narrative. This is where the main value or insight is revealed. ${data.tone === 'dramatic' ? 'Emphasize the significance of this moment' : data.tone === 'energetic' ? 'Make this moment visually exciting' : 'Present this moment clearly and understandably'}.`,
        `Scene 4: Resolution or outcome. Show the result, lesson learned, or transformation complete. ${data.tone === 'dramatic' ? 'End with a powerful visual conclusion' : data.tone === 'energetic' ? 'Conclude with energy and positivity' : 'End on a peaceful, satisfying note'}.`,
      ],
      motivation: [
        `Scene 1: High-energy opening that immediately grabs attention. Show someone taking action or a powerful visual related to "${data.topic}". ${data.tone === 'dramatic' ? 'Intense, powerful imagery' : data.tone === 'energetic' ? 'Fast-paced, vibrant visuals' : 'Inspiring but calm visual'}.`,
        `Scene 2: Show the process, effort, or journey. Demonstrate the work or steps involved. ${data.tone === 'dramatic' ? 'Emphasize the challenge and determination' : data.tone === 'energetic' ? 'Show dynamic movement and progress' : 'Present the process in an inspiring, clear way'}.`,
        `Scene 3: Highlight the transformation, achievement, or result. Show what's possible. ${data.tone === 'dramatic' ? 'Powerful before/after or result shot' : data.tone === 'energetic' ? 'Celebratory, energetic result visualization' : 'Peaceful, satisfying outcome'}.`,
        `Scene 4: Call to action or inspiring conclusion. Motivate viewers to take action. ${data.tone === 'dramatic' ? 'End with a powerful, memorable visual' : data.tone === 'energetic' ? 'Conclude with high energy and excitement' : 'End with calm inspiration'}.`,
      ],
      explainer: [
        `Scene 1: Clear introduction to the topic. Show what "${data.topic}" is or the problem it solves. ${data.tone === 'dramatic' ? 'Present the problem or concept with visual impact' : data.tone === 'energetic' ? 'Introduce with engaging, dynamic visuals' : 'Present clearly and understandably'}.`,
        `Scene 2: Break down the concept or show the first step. Use visual aids or demonstrations. ${data.tone === 'dramatic' ? 'Make the explanation visually compelling' : data.tone === 'energetic' ? 'Show the step with dynamic visuals' : 'Present the step clearly and simply'}.`,
        `Scene 3: Continue the explanation or show the main concept. Build understanding. ${data.tone === 'dramatic' ? 'Emphasize key points with strong visuals' : data.tone === 'energetic' ? 'Keep the explanation engaging and dynamic' : 'Present information clearly and calmly'}.`,
        `Scene 4: Summarize or show the complete picture. Reinforce the main takeaway. ${data.tone === 'dramatic' ? 'End with a memorable visual summary' : data.tone === 'energetic' ? 'Conclude with engaging, dynamic visuals' : 'End with a clear, peaceful summary'}.`,
      ],
    }

    const templates = sceneTemplates[data.style] || sceneTemplates.explainer
    return templates.slice(0, sceneCount).map((template, i) => `Scene ${i + 1}: ${template}`)
  }

  const generateHook = (data: typeof formData): string => {
    const hookTemplates = {
      dramatic: `Hook (0-2s): Open with a powerful, attention-grabbing visual that immediately establishes the intensity of "${data.topic}". Use high contrast, dramatic lighting, or a striking visual element that creates instant intrigue. The first frame should make viewers stop scrolling. Consider: a close-up of a key element, a dramatic transformation, or a visually striking moment that relates to your topic.`,
      calm: `Hook (0-2s): Begin with a visually pleasing, peaceful introduction to "${data.topic}" that draws viewers in through aesthetic appeal. Use soft lighting, smooth composition, or a beautiful visual that creates immediate interest. The opening should feel inviting and professional. Consider: a serene establishing shot, a smooth reveal, or an aesthetically pleasing detail related to your topic.`,
      energetic: `Hook (0-2s): Start with high-energy, dynamic visuals that immediately capture attention through movement and vibrancy. Show action, transformation, or an exciting moment related to "${data.topic}" in the first 2 seconds. Use fast cuts, vibrant colors, or dynamic camera movement. The opening should feel exciting and engaging. Consider: action in progress, a dynamic reveal, or energetic movement that relates to your topic.`,
    }
    
    return hookTemplates[data.tone] || hookTemplates.calm
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
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
                Generate professional-grade prompts for AI video tools like Sora, Veo, and Runway. 
                Our structured approach ensures better results than generic AI tools.
              </p>
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





