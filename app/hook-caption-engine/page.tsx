'use client'

import { useState } from 'react'
import { useAccess } from '@/lib/useAccess'

export default function HookCaptionEnginePage() {
  const { isFree } = useAccess()
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

  const generate = () => {
    if (!formData.topic.trim()) {
      alert('Please enter a video topic or idea')
      return
    }

    setIsGenerating(true)

    setTimeout(() => {
      const hooks = [
        `Did you know ${formData.topic} can change everything?`,
        `I tried ${formData.topic} for 30 days. Here's what happened.`,
        `Stop doing ${formData.topic} wrong. Here's the right way.`,
      ]

      const caption = `${formData.topic} is one of those things that seems simple but most people get wrong. In this video, I'll show you exactly how to do it right. Save this for later! 💡`

      const emphasis = ['change everything', '30 days', 'right way']

      const timing = [
        '0-2s: Hook - immediate attention',
        '2-5s: Setup - establish context',
        '5-15s: Main value - deliver content',
        '15-20s: CTA - encourage engagement',
      ]

      const cta = [
        'Save this video for later',
        'Follow for more tips',
        'Comment your experience',
      ]

      setOutput({ hooks, caption, emphasis, timing, cta })
      setIsGenerating(false)
    }, 1200)
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
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Hook & Caption Engine
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Generate compelling hooks and optimized captions to improve retention and clarity. Text-only output for your video editing workflow.
          </p>
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

        <div className="mt-12 card">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Best Practices</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Use the first hook variation for maximum retention</li>
            <li>• Place emphasis words at key moments in your video</li>
            <li>• Follow timing suggestions to sync captions with content</li>
            <li>• Choose a CTA that matches your video's goal</li>
          </ul>
        </div>
      </div>
    </main>
  )
}





