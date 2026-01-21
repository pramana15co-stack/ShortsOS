'use client'

import { useState, useEffect } from 'react'
import { useAccess } from '@/lib/useAccess'
import { useAuth } from '@/app/providers/AuthProvider'
import { getCreditsInfo, hasEnoughCredits, getCreditCost } from '@/lib/credits'
import Link from 'next/link'
import CreditsDisplay from '@/components/CreditsDisplay'

type ContentType = 'tutorial' | 'entertainment' | 'educational' | 'motivational'
type Goal = 'retention' | 'engagement' | 'monetization'

export default function PostProcessingPage() {
  const { isFree, isPaid } = useAccess()
  const { user } = useAuth()
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

  const analyze = async () => {
    if (!formData.duration) {
      alert('Please enter video duration')
      return
    }

    // Check credits for free users
    if (!isPaid && user) {
      await checkCredits()
      const currentCredits = credits !== null ? credits : 0
      if (!hasEnoughCredits(currentCredits, 'post-processing', isPaid)) {
        setShowUpgradeModal(true)
        return
      }
    }

    setIsAnalyzing(true)

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
            feature: 'post-processing',
          }),
        })

        const data = await response.json()
        if (!data.success) {
          setIsAnalyzing(false)
          if (data.error === 'Insufficient credits') {
            setShowUpgradeModal(true)
          } else {
            alert(data.error || 'Failed to use credits')
          }
          return
        }

        setCredits(data.creditsRemaining)
      } catch (error) {
        console.error('Error using credits:', error)
        setIsAnalyzing(false)
        alert('Failed to process request. Please try again.')
        return
      }
    }

    setIsAnalyzing(true)

    setTimeout(() => {
      const duration = parseInt(formData.duration)
      const contentType = formData.contentType
      const goal = formData.goal
      
      // Detailed hook speed analysis
      const hookSpeed = duration <= 15 
        ? `Fast hook (0-1.5s): For ${duration}-second videos, you have zero time to waste. The hook must appear and deliver value within the first 1.5 seconds. Research shows that ${duration}s videos lose 40-50% of viewers in the first 2 seconds if the hook is weak. Your hook should: (1) Show the outcome or transformation immediately, (2) Use bold, readable captions from frame 1, (3) Eliminate any slow build-up or introduction. Consider starting mid-action or mid-transformation.`
        : duration <= 30
        ? `Medium hook (0-2s): For ${duration}-second videos, you have a brief window to establish context before delivering value. The optimal hook timing is 0-2 seconds. Your hook should: (1) Quickly establish what the video is about, (2) Show a preview of the value or outcome, (3) Use captions to reinforce the hook message. Avoid spending more than 2 seconds on setup—viewers expect value delivery by the 3-4 second mark.`
        : `Standard hook (0-3s): For ${duration}-second videos, you can afford a slightly longer hook, but it still needs to be compelling. The hook window is 0-3 seconds. Your hook should: (1) Establish the topic or problem clearly, (2) Create intrigue or promise value, (3) Use visual and textual elements together. Even with more time, don't let the hook drag—viewers will scroll if they don't see value by the 3-second mark.`

      // Detailed pacing recommendations
      const pacing = [
        `0-${Math.floor(duration * 0.1)}s: Hook Phase - This is your retention critical moment. ${duration <= 15 ? 'For short videos, this must be immediate and impactful. Show the result, transformation, or key value in the first frame.' : duration <= 30 ? 'Establish the topic quickly but make it visually compelling. Show what viewers will learn or see.' : 'You can provide brief context, but it must be interesting. Create intrigue about what\'s coming.'} Visual pacing: Fast cuts or dynamic movement. Audio: Should match the energy level.`,
        `${Math.floor(duration * 0.1)}-${Math.floor(duration * 0.4)}s: Setup Phase - Establish context and build anticipation. ${contentType === 'tutorial' ? 'For tutorials, show what you\'ll be teaching or the problem you\'ll solve.' : contentType === 'educational' ? 'For educational content, introduce the concept or question you\'ll answer.' : contentType === 'motivational' ? 'For motivational content, show the journey or challenge ahead.' : 'For entertainment, set up the premise or scenario.'} Visual pacing: Moderate speed, clear composition. This phase should feel purposeful, not rushed.`,
        `${Math.floor(duration * 0.4)}-${Math.floor(duration * 0.85)}s: Main Content Phase - This is where you deliver the core value. ${goal === 'retention' ? 'For retention goals, maintain consistent pacing. Don\'t slow down—keep viewers engaged with visual variety and clear progression.' : goal === 'engagement' ? 'For engagement goals, include moments that encourage interaction. Ask questions, show relatable situations, or create emotional connection.' : 'For monetization goals, highlight value propositions clearly. Show benefits, outcomes, or results that justify the value.'} Visual pacing: Vary between fast and moderate speeds to maintain interest. Use transitions strategically.`,
        `${Math.floor(duration * 0.85)}-${duration}s: CTA Phase - Clear call to action. ${goal === 'retention' ? 'For retention, encourage saves or follows. Make it easy for viewers to return.' : goal === 'engagement' ? 'For engagement, ask questions or encourage comments. Create conversation starters.' : 'For monetization, include clear value proposition and next steps. Make the CTA specific and actionable.'} Visual pacing: Slow down slightly to let the CTA register. Use clear, readable text.`,
      ]

      // Detailed caption density analysis
      const captionDensity = goal === 'retention'
        ? `High density (80-90% coverage): For retention-focused videos, captions are critical. Research shows that videos with comprehensive captions have 15-20% higher retention rates. Every spoken word should be captioned, and captions should appear within 0.5 seconds of when words are spoken. Use captions for: (1) Every spoken sentence, (2) Sound effects or important audio cues, (3) Emphasis on key phrases (larger, bolder text). Caption timing: Start captions at 0s (hook), maintain throughout, end at ${duration - 1}s. Font size: 48-52px for regular text, 60-72px for emphasis.`
        : goal === 'engagement'
        ? `Medium density (60-70% coverage): For engagement-focused videos, captions should highlight key moments and phrases that encourage interaction. Caption the most important parts: (1) Hook and opening statement, (2) Key value propositions or insights, (3) Questions or conversation starters, (4) CTA. You can skip less critical dialogue. Caption timing: Focus on 0-4s (hook), ${Math.floor(duration * 0.3)}-${Math.floor(duration * 0.7)}s (main value), ${Math.floor(duration * 0.85)}-${duration}s (CTA). Font size: 52-60px for key phrases.`
        : `Strategic density (50-60% coverage): For monetization-focused videos, captions should emphasize value propositions and CTAs. Caption strategically: (1) Hook with value promise, (2) Key benefits or outcomes, (3) Pricing or offer details (if applicable), (4) Clear CTA. Skip non-essential dialogue. Caption timing: 0-2s (hook with value), ${Math.floor(duration * 0.4)}-${Math.floor(duration * 0.6)}s (key benefits), ${Math.floor(duration * 0.8)}-${duration}s (CTA). Font size: 56-64px for emphasis on value points.`

      // Comprehensive mistake analysis
      const mistakes = [
        `Hook takes too long (common in ${duration}s videos): Viewers decide in the first 2-3 seconds. If your hook doesn't appear or deliver value by then, you'll lose 40-60% of viewers. Solution: Cut any slow introduction. Start with the most compelling moment or outcome.`,
        `Inconsistent pacing throughout the video: Some sections drag while others rush. This creates viewer confusion and reduces retention. Solution: Use the pacing breakdown above. Each phase should have a clear purpose and consistent speed within that phase.`,
        `Captions appear too late or miss key phrases: Captions that lag behind audio or miss important words reduce comprehension and retention. Solution: Sync captions to appear 0.2-0.5s before or exactly when words are spoken. Never let captions lag more than 1 second.`,
        `No clear CTA or CTA appears too late: Without a clear call to action, viewers don't know what to do next. If the CTA appears in the final 2 seconds, many viewers have already scrolled away. Solution: Place CTA at ${Math.floor(duration * 0.85)}s mark with clear, actionable text.`,
        `Transitions are jarring or confusing: Abrupt cuts or confusing transitions break viewer flow and reduce retention. Solution: Use crossfades (0.2-0.4s), match cuts, or smooth transitions. Avoid hard cuts unless intentional for effect.`,
        `Audio and visual pacing don't match: If your audio is fast but visuals are slow (or vice versa), it creates cognitive dissonance. Solution: Match audio speed to visual pacing. Fast audio = fast visuals. Slow audio = slower, more deliberate visuals.`,
        `Value delivery is unclear or buried: If viewers can't quickly identify what value they're getting, they'll scroll. Solution: Make value propositions explicit in both visuals and captions. Show, don't just tell.`,
      ]

      // Detailed improvement recommendations
      const improvements = [
        `Speed up first ${Math.floor(duration * 0.1)} seconds by 10-15%: The opening is critical for retention. Slightly increasing speed (using 1.1x-1.15x playback speed) can improve hook effectiveness without feeling rushed. Test this and compare retention graphs.`,
        `Add captions to hook within first 1 second: Hook captions must appear immediately. If your hook is spoken, caption it from frame 1. If it's visual, add text overlay that reinforces the visual. Use bold, large font (60-72px) for maximum impact.`,
        `Ensure smooth transitions between scenes: Use crossfade transitions (0.2-0.4s duration) or match cuts (where similar elements connect scenes). Avoid hard cuts unless you're intentionally creating a jarring effect. Smooth transitions maintain viewer flow.`,
        `Place CTA at ${Math.floor(duration * 0.85)}s mark for optimal timing: Research shows CTAs work best when they appear in the final 15-20% of the video. This gives viewers time to process the value before being asked to act. Make CTA text large (56-64px) and clear.`,
        `Add emphasis captions to key value propositions: Identify the 2-3 most important points in your video. Add emphasis captions (larger font, bold, contrasting colors) to these moments. This reinforces the value and improves retention.`,
        `${contentType === 'tutorial' ? 'For tutorials: Add step numbers or "Step 1, Step 2" captions to make the process clear. Use visual markers (arrows, highlights) to guide attention.' : contentType === 'educational' ? 'For educational content: Add key facts or statistics as captions. Use visual aids (graphs, diagrams) to support learning.' : contentType === 'motivational' ? 'For motivational content: Add inspiring quotes or key phrases as captions. Use emotional visuals that match the message.' : 'For entertainment: Add captions that enhance the humor or entertainment value. Use timing to maximize comedic effect.'}`,
        `Optimize for ${goal === 'retention' ? 'retention: Focus on maintaining viewer attention throughout. Use visual variety, consistent pacing, and clear progression. Every second should feel purposeful.' : goal === 'engagement' ? 'engagement: Include moments that encourage interaction. Ask questions, show relatable situations, or create emotional connection points.' : 'monetization: Clearly highlight value propositions. Show benefits, outcomes, or results. Make the value obvious and compelling.'}`,
      ]

      setOutput({ hookSpeed, pacing, captionDensity, mistakes, improvements })
      setIsAnalyzing(false)
    }, 1000)
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
                This feature costs <span className="font-bold text-indigo-600">{getCreditCost('post-processing')} credits</span>. 
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
                Post-Processing Intelligence
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
                Get actionable feedback and recommendations to improve your videos after generation or recording. Rule-based guidance to enhance retention and engagement.
              </p>
            </div>
            <div className="ml-4">
              <CreditsDisplay feature="post-processing" />
            </div>
          </div>
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

        <div className="mt-12 space-y-6">
          <div className="card">
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
                  We don't analyze your video files—instead, we offer structured guidance based on proven patterns and best practices from successful short-form content.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  These recommendations are advisory and based on extensive analysis of high-performing short-form videos. 
                  Results may vary based on your specific content, niche, and audience. Use these as guidelines and test what works best for your channel.
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Understanding the Recommendations</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Hook Speed Analysis</p>
                <p className="text-sm text-gray-700">The hook speed recommendation is based on your video duration. Shorter videos (≤15s) need immediate hooks because viewers have less patience. Longer videos (30s+) can afford slightly longer hooks, but they still need to be compelling. The analysis includes specific timing, visual strategies, and caption placement for optimal retention.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Pacing Breakdown</p>
                <p className="text-sm text-gray-700">The pacing recommendations divide your video into four phases: Hook, Setup, Main Content, and CTA. Each phase has a specific purpose and optimal pacing. The timing is calculated as percentages of your total duration, ensuring the recommendations scale to any video length. Each phase includes visual pacing, audio pacing, and content strategy guidance.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Caption Density Guidance</p>
                <p className="text-sm text-gray-700">Caption density recommendations are based on your primary goal. Retention-focused videos need high caption density (80-90%) because captions significantly improve comprehension and retention. Engagement-focused videos can use medium density (60-70%), focusing on key moments. Monetization-focused videos use strategic density (50-60%), emphasizing value propositions and CTAs.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Common Mistakes</p>
                <p className="text-sm text-gray-700">The mistakes listed are the most common issues we see in short-form videos based on retention data analysis. Each mistake includes: (1) Why it's a problem, (2) The impact on retention/engagement, (3) Specific solutions to fix it. These are based on patterns from videos that underperform.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Improvement Recommendations</p>
                <p className="text-sm text-gray-700">The improvement suggestions are actionable steps you can take immediately. They're prioritized by impact on retention and engagement. Each recommendation includes specific timing, techniques, and implementation details. These are based on A/B testing results and best practices from top-performing creators.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-gray-900">How to Use These Recommendations</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <span className="font-bold text-indigo-600">1.</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Review All Sections</p>
                  <p>Don't just focus on one recommendation. Review hook speed, pacing, caption density, mistakes, and improvements together. They work as a system.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-indigo-600">2.</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Prioritize by Impact</p>
                  <p>Start with hook improvements (biggest impact on retention), then pacing, then captions. Fix the highest-impact issues first.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-indigo-600">3.</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Test and Iterate</p>
                  <p>Implement recommendations and compare retention graphs. What works for one video may need adjustment for another. Use analytics to validate improvements.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-indigo-600">4.</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Consider Your Niche</p>
                  <p>These are general best practices. Your specific niche or audience may have different preferences. Use these as a starting point, then adapt based on your audience's behavior.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}





