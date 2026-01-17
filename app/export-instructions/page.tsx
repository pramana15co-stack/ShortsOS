'use client'

import { useState } from 'react'
import { useAccess } from '@/lib/useAccess'
import UpgradeGate from '@/components/UpgradeGate'

type Editor = 'capcut' | 'premiere-pro' | 'vn-editor'

export default function ExportInstructionsPage() {
  const { canAccess } = useAccess()
  const canAccessExportInstructions = canAccess('starter')
  const [activeEditor, setActiveEditor] = useState<Editor>('capcut')
  const [formData, setFormData] = useState({
    hook: '',
    caption: '',
    duration: '',
  })

  const generateInstructions = () => {
    if (!formData.hook || !formData.caption || !formData.duration) {
      alert('Please fill in all fields')
      return
    }
    // Instructions would be generated here
  }

  const editorInstructions = {
    capcut: [
      `1. Import your video into CapCut: Tap the "+" button, select "New Project", then import your video file. Ensure your video is in 9:16 vertical format for Shorts/Reels.`,
      `2. Add text layer for hook: Tap "Text" in the bottom toolbar, then "Add Text". This creates a new text layer on your timeline.`,
      `3. Enter hook text: Type "${formData.hook || '[Your hook]'}" in the text field. This is your retention-critical hook that must appear in the first 2 seconds.`,
      `4. Configure hook styling: Tap the text layer, then "Style". Set font size to 52-60px (use "Large" preset), make it Bold, and choose a high-contrast color (white text on colored background works best).`,
      `5. Position hook text: Tap "Position" and place it at the top 1/3 of the screen (approximately 30% from top). Center it horizontally. This ensures it's visible and doesn't interfere with important visual elements.`,
      `6. Set hook timing: Drag the text layer to start at 0:00. Tap the text layer, then adjust the end point to 0:02 (2 seconds). The hook must be visible in the first 2 seconds for optimal retention.`,
      `7. Add hook animation: Tap "Animation" on the text layer. Select "Fade In" effect with 0.2-0.3s duration. This creates a smooth entrance that doesn't distract from the visual.`,
      `8. Add main caption text: Create a new text layer. Type "${formData.caption || '[Your caption]'}" or break it into multiple text layers for better timing control.`,
      `9. Set caption timing: Position caption text layers to appear starting at 0:02 (after hook) and continue through the video. Use CapCut's auto-caption feature (Text > Auto Captions) for precise timing, then manually adjust as needed.`,
      `10. Style captions: Set caption font size to 48-52px, use a readable font (Arial, Helvetica, or system default), and ensure high contrast. Consider adding a semi-transparent background (40-50% opacity) for better readability.`,
      `11. Add emphasis to key words: For important words in your caption, create separate text layers with larger font (60-72px) and bold styling. Sync these with when those words are spoken.`,
      `12. Add CTA text: Create a final text layer for your call-to-action. Position it at ${formData.duration ? Math.floor(parseInt(formData.duration) * 0.85) : 17}s mark. Use larger font (56-64px) and make it stand out with color or animation.`,
      `13. Review and export: Play through your video to ensure all text appears at the right times and is readable. Export in 1080x1920 resolution (9:16) at 30fps for optimal quality.`,
    ],
    'premiere-pro': [
      `1. Create new sequence: File > New > Sequence. Select "Vertical Video" preset (1080x1920) or create custom: 1080px width, 1920px height, 30fps. Name it appropriately.`,
      `2. Import video to timeline: Drag your video file from the Project panel to the timeline. Ensure it matches your sequence settings. If not, right-click > Scale to Frame Size.`,
      `3. Add hook text layer: Go to Graphics > New Layer > Text, or use the Type Tool (T). Click on the Program monitor to create a text layer. This appears in the Essential Graphics panel.`,
      `4. Enter hook text: Type "${formData.hook || '[Your hook]'}" in the text field. This is your retention-critical hook.`,
      `5. Style hook text: In Essential Graphics panel, set font to Bold (Arial Bold, Helvetica Bold, or similar). Set font size to 60-72px. Choose high-contrast colors (white text with colored background or vice versa).`,
      `6. Position hook: Use the Align tools in Essential Graphics to center horizontally. Manually position vertically to top 1/3 (approximately 30% from top). Use the Position controls for precise placement.`,
      `7. Set hook in/out points: In the timeline, drag the text layer to start at 0:00:00. Set the out point at 0:00:02 (2 seconds). Right-click the text layer > Speed/Duration to adjust if needed.`,
      `8. Add hook animation: In Essential Graphics, go to Effects tab. Add "Opacity" effect. Set keyframe at 0:00:00 (0% opacity) and another at 0:00:00:06 (100% opacity) for a 0.2s fade-in.`,
      `9. Create caption track: Add a new video track above your main video. Use Graphics > Captions > Create New Caption Track, or manually add text layers for each caption segment.`,
      `10. Add main captions: Type "${formData.caption || '[Your caption]'}" in text layers. Use Premiere's Captions panel (Window > Captions) for easier management, or create individual text layers for more control.`,
      `11. Time captions precisely: Set caption in/out points to match when words are spoken. Use the waveform in the audio track as a guide. Captions should appear 0.2-0.5s before or exactly when words are spoken.`,
      `12. Style captions: Set caption font to 48-52px, readable font (Arial, Helvetica). Add background (Fill > Rectangle) with 40-50% opacity for better readability. Ensure high contrast with video background.`,
      `13. Add emphasis words: Create separate text layers for key words. Use larger font (60-72px), bold, and contrasting colors. Position these to appear exactly when those words are spoken.`,
      `14. Add CTA: Create final text layer for call-to-action. Position at ${formData.duration ? Math.floor(parseInt(formData.duration) * 0.85) : 17}s mark. Use 56-64px font, bold, and make it stand out. Add subtle animation (scale or fade) to draw attention.`,
      `15. Export: File > Export > Media. Use H.264 codec, 1080x1920 resolution, 30fps, high bitrate (8-12 Mbps). Name your file and export.`,
    ],
    'vn-editor': [
      `1. Open VN Editor and create new project: Launch VN Editor app. Tap "New Project" and select 9:16 (Vertical) aspect ratio. This ensures your video is optimized for Shorts/Reels.`,
      `2. Import your video: Tap the "+" button, select "Video", then choose your video file. The video will appear on the timeline.`,
      `3. Add hook text: Tap the "Text" icon in the bottom toolbar (T icon). This opens the text editor. Tap "Add Text" to create a new text layer.`,
      `4. Enter hook text: Type "${formData.hook || '[Your hook]'}" in the text field. This is your retention-critical hook that must appear immediately.`,
      `5. Style hook text: Tap "Style" tab. Select "Bold" font weight. Set size to "Large" (approximately 52-60px). Choose a high-contrast color (white on colored background or vice versa).`,
      `6. Position hook: Tap "Position" and drag the text to the top center of the screen (approximately top 1/3). Use the alignment guides to center it horizontally.`,
      `7. Set hook timing: Tap the text layer on the timeline. Drag the start point to 0:00. Tap and drag the end point to 0:02 (2 seconds). The hook must be visible in the first 2 seconds.`,
      `8. Add hook animation: Tap "Animation" on the text layer. Select "Fade In" effect with 0.2-0.3s duration. This creates a smooth entrance.`,
      `9. Add main caption: Create a new text layer. Tap "Text" > "Add Text". Type "${formData.caption || '[Your caption]'}" or use VN's auto-subtitle feature for automatic caption generation.`,
      `10. Use auto-subtitle feature: Tap "Text" > "Auto Subtitle". VN will automatically generate captions from your audio. Review and edit the generated text for accuracy.`,
      `11. Adjust caption timing: Tap each caption segment on the timeline. Ensure captions appear 0.2-0.5s before or exactly when words are spoken. Drag caption segments to adjust timing precisely.`,
      `12. Style captions: Select caption text layers. Set font size to 48-52px (Medium-Large size). Use readable font (system default or Arial). Ensure high contrast with video background.`,
      `13. Add emphasis to key words: For important words, create separate text layers with larger font (60-72px) and bold styling. Position these to appear exactly when those words are spoken.`,
      `14. Add CTA text: Create final text layer for call-to-action. Position at ${formData.duration ? Math.floor(parseInt(formData.duration) * 0.85) : 17}s mark. Use larger font (56-64px), bold, and contrasting color.`,
      `15. Review and export: Play through your video to ensure all text appears at the right times. Tap "Export" in the top right. Select 1080p resolution, 30fps. Export and save to your device.`,
    ],
  }

  // Wrap content in UpgradeGate for clean access control
  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <UpgradeGate requiredTier="starter">
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

            <div className="mt-6 space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Tip:</strong> These instructions are detailed guidelines based on best practices. 
                  Adjust timing and positioning based on your specific video content, style preferences, and audience behavior.
                </p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Troubleshooting Common Issues</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Text not visible:</strong> Ensure high contrast between text and background. Use white text on dark backgrounds or dark text on light backgrounds. Add a semi-transparent background behind text if needed.</p>
                  <p><strong>Timing feels off:</strong> Use the waveform or audio visualization in your editor to sync text with spoken words. Text should appear 0.2-0.5s before or exactly when words are spoken.</p>
                  <p><strong>Text too small on mobile:</strong> Test your video on a mobile device. Font sizes should be at least 48px for readability. Hook text should be 52-60px, emphasis words 60-72px.</p>
                  <p><strong>Export quality issues:</strong> Export at 1080x1920 resolution (9:16), 30fps, high bitrate (8-12 Mbps). Lower resolutions or bitrates can make text appear blurry.</p>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Advanced Techniques</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Layered text effects:</strong> Create depth by using multiple text layers with slight offsets and different opacities. This creates a shadow or glow effect.</p>
                  <p><strong>Word-by-word animation:</strong> For emphasis, animate each word individually. Use scale, fade, or slide animations that match the energy of your content.</p>
                  <p><strong>Color coding:</strong> Use different colors for different types of content: one color for hook, another for main content, another for CTA. This creates visual hierarchy.</p>
                  <p><strong>Sync with music:</strong> If your video has music, sync text appearances with beats or rhythm. This creates a more polished, professional feel.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </UpgradeGate>
      </div>
    </main>
  )
}

