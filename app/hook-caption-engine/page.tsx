'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import { useAccess } from '@/lib/useAccess'
import { getCreditsInfo, hasEnoughCredits, getCreditCost } from '@/lib/credits'
import Link from 'next/link'
import CreditsDisplay from '@/components/CreditsDisplay'

export default function HookCaptionEnginePage() {
  const { user, session } = useAuth()
  const { isFree, isPaid } = useAccess()
  const [formData, setFormData] = useState({
    topic: '',
    platform: 'youtube-shorts' as 'youtube-shorts' | 'instagram-reels',
  })
  const [output, setOutput] = useState<{
    hooks: string[]
    caption: string
    emphasis: string[]
    timing: string[]
    cta: string[]
  } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  // Check credits on mount
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

  const generate = async () => {
    if (!formData.topic.trim()) {
      alert('Please enter a video topic or idea')
      return
    }

    // Check credits for free users (admin bypass handled in API)
    if (!isPaid && user) {
      await checkCredits()
      const currentCredits = credits !== null ? credits : 0
      if (!hasEnoughCredits(currentCredits, 'hook-caption', isPaid)) {
        setShowUpgradeModal(true)
        return
      }
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          feature: 'hook-caption',
          data: formData
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setIsGenerating(false)
        if (result.error === 'Insufficient credits') {
          setShowUpgradeModal(true)
        } else {
          alert(result.error || 'Failed to generate content')
        }
        return
      }

      if (result.success && result.data) {
        setOutput(result.data)
        if (typeof result.creditsRemaining === 'number') {
          setCredits(result.creditsRemaining)
          window.dispatchEvent(new CustomEvent('credits-updated', { detail: { credits: result.creditsRemaining } }))
        }
      }
    } catch (error) {
      console.error('Error generating:', error)
      alert('Failed to process request. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="card max-w-md w-full">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 text-center">Insufficient Credits</h3>
              <p className="text-gray-600 mb-4 text-center">
                This feature costs <span className="font-bold text-indigo-600">{getCreditCost('hook-caption')} credits</span>. 
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

        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                Hook & Caption Engine
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-4">
                Generate high-converting hooks and optimized captions that improve retention and engagement. 
                Built specifically for Shorts creators, not generic AI tools.
              </p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-4 max-w-3xl">
                <p className="text-sm font-semibold text-green-900 mb-1">💰 How This Helps You Profit:</p>
                <p className="text-sm text-green-800">
                  Hooks that stop the scroll in the first 3 seconds can increase retention by 40-60%, directly boosting your 
                  video's performance in the algorithm. Better retention = more views, higher subscriber conversion, and 
                  increased ad revenue. Our hooks are tested for Shorts/Reels, not generic social media.
                </p>
              </div>
            </div>
            <div className="ml-4">
              <CreditsDisplay feature="hook-caption" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Input</h2>
            
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
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as typeof formData.platform })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="youtube-shorts">YouTube Shorts</option>
                  <option value="instagram-reels">Instagram Reels</option>
                </select>
              </div>

              <button
                onClick={generate}
                disabled={isGenerating}
                className="btn-primary w-full py-4 disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Generate Hooks & Caption'}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Output</h2>
            
            {!output ? (
              <div className="text-center py-16 text-gray-500">
                <p>Enter your video topic and generate hooks and captions.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Hooks */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-900">Hook Variations (3)</label>
                    {isFree && (
                      <span className="text-xs text-gray-500">Basic</span>
                    )}
                  </div>
                  <div className="space-y-3">
                    {output.hooks.map((hook, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm">
                          {hook}
                        </div>
                        <button
                          onClick={() => copyToClipboard(hook, `hook-${idx}`)}
                          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          {copied === `hook-${idx}` ? '✓' : 'Copy'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Caption */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-900">Primary Caption</label>
                    <button
                      onClick={() => copyToClipboard(output.caption, 'caption')}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      {copied === 'caption' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <textarea
                    readOnly
                    value={output.caption}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm"
                    rows={4}
                  />
                </div>

                {/* Emphasis Words */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Emphasis Words</label>
                  <div className="flex flex-wrap gap-2">
                    {output.emphasis.map((word, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        {word}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Highlight these words in your captions for better impact</p>
                </div>

                {/* Timing */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">Caption Timing Suggestions</label>
                  <div className="space-y-2">
                    {output.timing.map((time, idx) => (
                      <div key={idx} className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm">
                        {time}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 block">CTA Suggestions</label>
                  <div className="space-y-2">
                    {output.cta.map((cta, idx) => (
                      <div key={idx} className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm">
                        {cta}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Best Practices for Hooks & Captions</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Hook Selection Strategy</p>
                <p className="text-sm text-gray-700 mb-2">The first hook variation is typically the strongest for retention—it's designed to stop the scroll immediately. However, test different hooks to see what resonates with your audience. The question format works well for educational content, while transformation hooks work for before/after content.</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Use question hooks for educational/explainer content</li>
                  <li>• Use transformation hooks for before/after or results content</li>
                  <li>• Use tutorial hooks for how-to or step-by-step content</li>
                  <li>• Test different hooks and track which performs best</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Emphasis Words Placement</p>
                <p className="text-sm text-gray-700 mb-2">Emphasis words should appear at the exact moment you're saying them in the video. These words carry the most meaning and should be visually highlighted. Use larger font, bold styling, or contrasting colors for emphasis words.</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Sync emphasis words with spoken words in your video</li>
                  <li>• Use 20-30% larger font size for emphasis words</li>
                  <li>• Consider using contrasting colors (white text on colored background)</li>
                  <li>• Don't overuse emphasis—highlight only the most important words</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Caption Timing Precision</p>
                <p className="text-sm text-gray-700 mb-2">The timing suggestions are based on optimal retention patterns. Early captions (0-4s) are critical—viewers decide whether to continue watching in these first seconds. Late captions (12-20s) should reinforce key points and include CTAs.</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Hook captions must appear within the first 2 seconds</li>
                  <li>• Main value captions should appear during the value delivery (4-12s)</li>
                  <li>• CTA captions work best in the final 20% of your video</li>
                  <li>• Platform differences: Instagram Reels need faster captions than YouTube Shorts</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">CTA Selection</p>
                <p className="text-sm text-gray-700 mb-2">Choose a CTA that matches your video's primary goal. If you want saves, use "Save this." If you want follows, use "Follow for more." If you want engagement, use "Comment your experience." Don't use multiple CTAs—pick one clear action.</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Use "Save this" for valuable, reference-worthy content</li>
                  <li>• Use "Follow for more" when you have consistent content</li>
                  <li>• Use "Comment" when you want to start a conversation</li>
                  <li>• Keep CTAs simple and actionable—one clear action per video</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Platform-Specific Tips</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">YouTube Shorts</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Captions can be slightly longer and more detailed</li>
                  <li>• Viewers expect educational value—use captions to reinforce learning</li>
                  <li>• Hook timing: 0-2s is acceptable (slightly more forgiving than Reels)</li>
                  <li>• Include hashtags in caption but keep them minimal</li>
                  <li>• CTAs work well at 15-20s mark</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Instagram Reels</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Captions must appear faster—users scroll quickly</li>
                  <li>• Hook timing: 0-1.5s is critical</li>
                  <li>• Use emojis strategically but don't overdo it</li>
                  <li>• Include relevant hashtags (3-5 is optimal)</li>
                  <li>• CTAs work best at 12-15s mark</li>
                  <li>• Visual appeal matters more—make captions aesthetically pleasing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Common Mistakes to Avoid</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <div>
                  <p className="font-semibold text-gray-900">Hook Appears Too Late</p>
                  <p className="text-sm text-gray-700">If your hook caption appears after 3 seconds, you've lost most viewers. The hook must be visible in the first 1-2 seconds.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <div>
                  <p className="font-semibold text-gray-900">Overusing Emphasis Words</p>
                  <p className="text-sm text-gray-700">If every word is emphasized, nothing stands out. Use emphasis sparingly—only for the most important words (3-5 per video).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <div>
                  <p className="font-semibold text-gray-900">Caption Text Too Small</p>
                  <p className="text-sm text-gray-700">Captions should be readable on mobile screens. Use at least 48px font size for main text, 60px+ for emphasis words.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <div>
                  <p className="font-semibold text-gray-900">Multiple CTAs</p>
                  <p className="text-sm text-gray-700">Asking viewers to "save, follow, comment, and subscribe" is overwhelming. Pick one clear CTA per video.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <div>
                  <p className="font-semibold text-gray-900">Ignoring Platform Differences</p>
                  <p className="text-sm text-gray-700">YouTube Shorts and Instagram Reels have different viewer behaviors. Don't use the same caption strategy for both platforms.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}





