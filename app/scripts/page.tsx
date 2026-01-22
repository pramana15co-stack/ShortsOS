'use client'

import { useState } from 'react'
import Link from 'next/link'
import { generateScript, ScriptInput } from '@/lib/scriptTemplates'
import { formats } from '@/data/formats'
import { useRequireAuth } from '@/lib/requireAuth'
import { useAuth } from '@/app/providers/AuthProvider'
import { saveScript } from '@/lib/saveScript'

export default function ScriptsPage() {
  const { loading } = useRequireAuth()
  const { user } = useAuth()
  const [formData, setFormData] = useState<ScriptInput>({
    topic: '',
    formatSlug: '',
  })
  const [generatedScript, setGeneratedScript] = useState<ReturnType<typeof generateScript> | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.topic.trim()) {
      alert('Please enter a topic')
      return
    }
    if (!formData.formatSlug) {
      alert('Please select a format')
      return
    }
    const script = generateScript(formData)
    if (script) {
      setGeneratedScript(script)
      setIsSubmitted(true)
      setSaveSuccess(false)

      // Save to database if user is logged in
      if (user) {
        setSaving(true)
        const format = formats.find(f => f.slug === formData.formatSlug)
        const saveResult = await saveScript({
          topic: formData.topic,
          format_slug: formData.formatSlug,
          format_name: format?.name || 'Unknown',
          hook: script.hook,
          body: script.body,
          cta: script.cta,
          full_script: script.fullScript,
          estimated_seconds: script.estimatedSeconds,
          user_id: user.id,
        })
        setSaving(false)
        if (saveResult.success) {
          setSaveSuccess(true)
          setTimeout(() => setSaveSuccess(false), 3000)
        }
      }
    } else {
      alert('Error generating script. Please try again.')
    }
  }

  const handleReset = () => {
    setFormData({
      topic: '',
      formatSlug: '',
    })
    setGeneratedScript(null)
    setIsSubmitted(false)
    setCopiedSection(null)
  }

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Script Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Generate production-ready scripts for your YouTube Shorts. Our templates are format-specific and topic-aware, giving you scripts that actually work—not generic fill-in-the-blank templates.
          </p>
        </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="card">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                placeholder="e.g., morning productivity routine, beginner workout plan, quick pasta recipe..."
                required
              />
              <p className="mt-2 text-sm text-gray-600">
                Be specific! Instead of "productivity," use "5-minute morning routine" or "productivity apps for students." Specific topics generate better scripts.
              </p>
            </div>

            {/* Format Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Format <span className="text-red-500">*</span>
                </label>
                <Link
                  href="/formats"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Browse formats →
                </Link>
              </div>
              <select
                value={formData.formatSlug}
                onChange={(e) => setFormData({ ...formData, formatSlug: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select a format...</option>
                {formats.map((format) => (
                  <option key={format.slug} value={format.slug}>
                    {format.name} - {format.description}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-600">
                Each format has a proven structure. Choose based on your content type: Problem-Solution for tutorials, Before-After for transformations, etc.
              </p>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-4 text-lg"
            >
              Generate Script
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="card bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Generated Script</h2>
                <p className="opacity-90">
                  {formData.topic} • {formats.find(f => f.slug === formData.formatSlug)?.name}
                  {generatedScript && ` • ~${generatedScript.estimatedSeconds}s`}
                </p>
                {saveSuccess && (
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Script saved! <Link href="/saved-scripts" className="underline">View saved scripts</Link></span>
                  </div>
                )}
                {saving && (
                  <div className="mt-2 text-sm opacity-90">Saving script...</div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {user && (
                  <Link
                    href="/saved-scripts"
                    className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition text-sm font-medium"
                  >
                    View Saved
                  </Link>
                )}
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition text-sm font-medium"
                >
                  Generate New
                </button>
              </div>
            </div>
          </div>

          {/* Script Sections */}
          {generatedScript && (
            <>
              {/* Hook Section */}
              <div className="card border-l-4 border-yellow-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="text-2xl mr-2">🎣</span>
                    Hook (0-3s)
                  </h3>
                  <button
                    onClick={() => copyToClipboard(generatedScript.hook, 'hook')}
                    className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition text-sm font-medium"
                  >
                    {copiedSection === 'hook' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {generatedScript.hook}
                  </p>
                </div>
              </div>

              {/* Body Section */}
              <div className="card border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="text-2xl mr-2">📝</span>
                    Body (Main Content)
                  </h3>
                  <button
                    onClick={() => copyToClipboard(generatedScript.body, 'body')}
                    className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition text-sm font-medium"
                  >
                    {copiedSection === 'body' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {generatedScript.body}
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="card border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="text-2xl mr-2">📢</span>
                    Soft CTA
                  </h3>
                  <button
                    onClick={() => copyToClipboard(generatedScript.cta, 'cta')}
                    className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition text-sm font-medium"
                  >
                    {copiedSection === 'cta' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {generatedScript.cta}
                  </p>
                </div>
              </div>

              {/* Full Script */}
              <div className="card border-l-4 border-indigo-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="text-2xl mr-2">📄</span>
                    Full Script
                  </h3>
                  <button
                    onClick={() => copyToClipboard(generatedScript.fullScript, 'full')}
                    className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg transition text-sm font-medium"
                  >
                    {copiedSection === 'full' ? '✓ Copied' : 'Copy All'}
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <pre className="text-gray-800 leading-relaxed whitespace-pre-wrap font-sans text-sm">
                    {generatedScript.fullScript}
                  </pre>
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Estimated: ~{generatedScript.estimatedSeconds} seconds
                  </span>
                  {generatedScript.estimatedSeconds >= 30 && generatedScript.estimatedSeconds <= 45 && (
                    <span className="text-green-600 font-medium">✓ Perfect length</span>
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="card bg-blue-50 border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Pro Tips
                </h3>
                <ul className="text-blue-800 text-sm space-y-2 mb-4">
                  <li>• Customize the script to match your speaking style and personality</li>
                  <li>• Practice reading it out loud to ensure natural flow</li>
                  <li>• Adjust pacing: speak faster for urgency, slower for emphasis</li>
                  <li>• Add visual cues in your video to match key points in the script</li>
                  <li>• The hook is critical - make sure it grabs attention in the first 3 seconds</li>
                </ul>
                <div className="pt-4 border-t border-blue-200">
                  <p className="text-blue-900 text-sm font-medium mb-2">Related tools:</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <Link href="/hook-caption-engine" className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium">
                      Generate more hooks →
                    </Link>
                    {formData.formatSlug && formats.find(f => f.slug === formData.formatSlug) ? (
                      <>
                        <span className="text-gray-400">•</span>
                        <Link 
                          href={`/formats/${formData.formatSlug}`}
                          className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
                        >
                          View format guide →
                        </Link>
                      </>
                    ) : null}
                    <span className="text-gray-400">•</span>
                    <Link href="/planner" className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium">
                      Get personalized recommendations →
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      </div>
    </main>
  )
}
