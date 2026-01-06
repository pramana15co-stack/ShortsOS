'use client'

import { useState } from 'react'
import { useAccess } from '@/lib/useAccess'
import Link from 'next/link'

type Editor = 'capcut' | 'premiere-pro' | 'vn-editor'

export default function ExportInstructionsPage() {
  const { canAccessExportInstructions } = useAccess()
  const [activeEditor, setActiveEditor] = useState<Editor>('capcut')
  const [formData, setFormData] = useState({
    hook: '',
    caption: '',
    duration: '',
  })

  if (!canAccessExportInstructions) {
    return (
      <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold mb-4 text-gray-900">Export Instructions</h1>
            <p className="text-lg text-gray-600 mb-6">
              This feature is available for paid users. Export instructions help you implement hooks and captions in popular video editors.
            </p>
            <p className="text-gray-700 mb-8">
              Upgrade to access step-by-step instructions for CapCut, Premiere Pro, and VN Editor.
            </p>
            <Link href="/pricing" className="btn-primary px-8 py-4 inline-block">
              View Pricing Plans
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const generateInstructions = () => {
    if (!formData.hook || !formData.caption || !formData.duration) {
      alert('Please fill in all fields')
      return
    }
    // Instructions would be generated here
  }

  const editorInstructions = {
    capcut: [
      '1. Import your video into CapCut',
      '2. Add text layer at 0:00 for hook',
      `3. Set hook text: "${formData.hook || '[Your hook]'}"`,
      '4. Set font size to 48-52px, bold',
      '5. Position at top 1/3 of screen',
      '6. Set duration: 0:00 to 0:02',
      '7. Add animation: Fade in (0.2s)',
      `8. Add caption text: "${formData.caption || '[Your caption]'}"`,
      '9. Set caption timing: 0:02 to end',
      '10. Use auto-caption feature for timing',
    ],
    'premiere-pro': [
      '1. Create new sequence in Premiere Pro',
      '2. Import video to timeline',
      '3. Add Text layer (Graphics > Text)',
      `4. Type hook: "${formData.hook || '[Your hook]'}"`,
      '5. Set position: Top third, centered',
      '6. Set font: Bold, 60-72px',
      '7. Set in/out points: 0:00:00 to 0:00:02',
      '8. Add opacity keyframe: 0% to 100% at start',
      `9. Add caption track: "${formData.caption || '[Your caption]'}"`,
      '10. Use Essential Graphics for styling',
    ],
    'vn-editor': [
      '1. Open VN Editor and import video',
      '2. Tap Text icon in bottom toolbar',
      `3. Enter hook: "${formData.hook || '[Your hook]'}"`,
      '4. Set text style: Bold, Large size',
      '5. Position at top center',
      '6. Set start time: 0:00',
      '7. Set end time: 0:02',
      '8. Add fade in effect',
      `9. Add caption: "${formData.caption || '[Your caption]'}"`,
      '10. Use auto-subtitle feature',
    ],
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Export Instructions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Convert your hooks and captions into step-by-step instructions for popular video editors. 
            Text-only guidance for implementing your content.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Content Input</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Hook Text
                </label>
                <input
                  type="text"
                  value={formData.hook}
                  onChange={(e) => setFormData({ ...formData, hook: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  placeholder="e.g., Did you know this simple trick?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Caption Text
                </label>
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  rows={4}
                  placeholder="Enter your caption text..."
                />
              </div>

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
                />
              </div>

              <button
                onClick={generateInstructions}
                className="btn-primary w-full py-4"
              >
                Generate Instructions
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Editor Instructions</h2>
            
            {/* Editor Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              {(['capcut', 'premiere-pro', 'vn-editor'] as Editor[]).map((editor) => (
                <button
                  key={editor}
                  onClick={() => setActiveEditor(editor)}
                  className={`px-4 py-2 text-sm font-semibold transition-colors ${
                    activeEditor === editor
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {editor === 'capcut' ? 'CapCut' : editor === 'premiere-pro' ? 'Premiere Pro' : 'VN Editor'}
                </button>
              ))}
            </div>

            {/* Instructions List */}
            <div className="space-y-3">
              {editorInstructions[activeEditor].map((instruction, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-gray-900 text-sm leading-relaxed">{instruction}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Tip:</strong> These instructions are general guidelines. 
                Adjust timing and positioning based on your specific video content and style preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

