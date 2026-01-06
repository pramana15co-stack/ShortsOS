'use client'

import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/app/providers/AuthProvider'
import { useAccess } from '@/lib/useAccess'
import UpgradeButton from '@/components/UpgradeButton'

export default function ExecutionPathPage() {
  const params = useParams()
  const slug = params?.slug as string
  const { user, loading: authLoading } = useAuth()
  const { isStarter, loading: accessLoading } = useAccess()
  const hasFullAccess = isStarter

  const loading = authLoading || accessLoading

  // For now, only support beginner-shorts-path
  if (slug !== 'beginner-shorts-path') {
    notFound()
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-gray-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Link */}
        <Link
          href="/execution-paths"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Execution Paths
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Beginner Shorts Path
          </h1>
          <p className="text-xl text-gray-600">
            Go from 0 to your first consistent views (100-500 views per video)
          </p>
        </div>

        {/* Who This Path Is For - Always Visible */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who This Path Is For</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This path is designed for creators who are just starting their Shorts journey:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Creators with 0-100 subscribers</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No consistent posting history (fewer than 10 published Shorts)</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Unclear about which formats work for their niche</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Feeling overwhelmed by conflicting advice</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Wanting to establish a foundation before scaling</span>
            </li>
          </ul>
        </section>

        {/* Goal of the Path - Always Visible */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Goal of the Path</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Primary Goal</p>
              <p className="text-gray-700">
                Achieve consistent views (100-500 views per video) on a regular basis
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">Success Indicators</p>
              <ul className="space-y-1 text-gray-700">
                <li>• At least 3 videos in the last 2 weeks reach 100+ views</li>
                <li>• Views are coming from browse/suggested (not just subscribers)</li>
                <li>• Completion rate above 60% on at least 2 videos</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">Timeline</p>
              <p className="text-gray-700">6-8 weeks of consistent execution</p>
            </div>
          </div>
        </section>

        {/* Weekly Focus Breakdown - Locked for Free Users */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Weekly Focus Breakdown</h2>
            {!hasFullAccess && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                Starter Required
              </span>
            )}
          </div>
          
          {hasFullAccess ? (
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Week 1-2: Foundation</h3>
                <p className="text-gray-600 mb-3">Establish consistency and learn basic format structure</p>
                <p className="font-medium text-gray-900 mb-2">Actions:</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Post 2-3 videos per week using the "Hook + Value" format</li>
                  <li>• Focus on one niche topic</li>
                  <li>• Study your first 4-6 videos' analytics (views, retention, CTR)</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  <span className="font-medium">Outcome:</span> Build the posting habit and understand basic performance metrics
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Week 3-4: Format Mastery</h3>
                <p className="text-gray-600 mb-3">Master one format before trying others</p>
                <p className="font-medium text-gray-900 mb-2">Actions:</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Continue with "Hook + Value" format</li>
                  <li>• Experiment with different hooks (question, statement, problem-solution)</li>
                  <li>• Identify which hook style gets the best retention</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  <span className="font-medium">Outcome:</span> Understand what works for your specific niche and audience
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Week 5-6: Optimization</h3>
                <p className="text-gray-600 mb-3">Improve what's working, not pivot to new formats</p>
                <p className="font-medium text-gray-900 mb-2">Actions:</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Double down on your best-performing hook style</li>
                  <li>• Improve pacing based on retention graphs</li>
                  <li>• Test different thumbnails (if applicable)</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  <span className="font-medium">Outcome:</span> Refine your approach based on data, not guesswork
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Week 7-8: Consistency Validation</h3>
                <p className="text-gray-600 mb-3">Prove you can maintain consistent performance</p>
                <p className="font-medium text-gray-900 mb-2">Actions:</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Maintain 2-3 posts per week</li>
                  <li>• Track if views are becoming more consistent</li>
                  <li>• Document what's working for future reference</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  <span className="font-medium">Outcome:</span> Establish a repeatable process that generates consistent views
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Weekly Breakdown Available</h3>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    The full weekly focus breakdown provides a structured sequence that eliminates decision fatigue. Each week includes specific actions, expected outcomes, and clear guidance on what to focus on and when.
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    This detailed roadmap saves time by giving you an ordered sequence instead of piecing together advice from multiple sources. You'll know exactly what to do each week, why it matters at your stage, and what success looks like.
                  </p>
                  <UpgradeButton className="btn-primary">
                    Upgrade to Starter to Unlock
                  </UpgradeButton>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Recommended Formats - Preview for Free, Full for Paid */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Recommended Content Formats</h2>
            {!hasFullAccess && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                Preview
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Primary Format: Hook + Value</h3>
              {hasFullAccess ? (
                <>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Why at this stage:</span> Simple structure, easy to execute, teaches fundamental Shorts principles
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Structure:</span> Strong hook (0-3s) → Value delivery (3-45s) → Clear CTA or conclusion
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Best for:</span> Educational content, tips, quick wins
                  </p>
                  <Link
                    href="/formats/hook-value"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View format guide →
                  </Link>
                </>
              ) : (
                <p className="text-sm text-gray-600">
                  Simple structure, easy to execute, teaches fundamental Shorts principles. Full format details, structure breakdown, and execution guide available with Starter plan.
                </p>
              )}
            </div>
            {hasFullAccess && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Secondary Format: Problem-Solution</h3>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">When to use:</span> After mastering Hook + Value (Week 4+)
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Why:</span> Builds on Hook + Value structure, adds narrative element
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Structure:</span> Problem statement → Solution demonstration → Result/outcome
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Best for:</span> Tutorials, how-tos, troubleshooting
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Soft Paywall Message - Only shown to free users */}
        {!hasFullAccess && (
          <section className="bg-gray-50 rounded-lg border-2 border-gray-200 p-8 mb-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Complete Execution Path Available
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The full Execution Path provides a complete, step-by-step roadmap that eliminates decision fatigue and saves time. Instead of piecing together advice from multiple sources or guessing what to do next, Pramana provides a clear sequence of actions tailored to your creator stage.
              </p>
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 text-left">
                <p className="font-semibold text-gray-900 mb-3">Full access includes:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Complete weekly focus breakdown with specific actions and expected outcomes</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Detailed format recommendations with execution guides and structure breakdowns</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Explicit constraints and common mistakes to avoid, with clear reasoning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Weekly progress checkpoints and success criteria for objective evaluation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Clear guidance on when you're ready to move to the next stage</span>
                  </li>
                </ul>
              </div>
              <UpgradeButton className="btn-primary px-10 py-4 text-lg">
                Upgrade to Starter - $9/month
              </UpgradeButton>
              <p className="mt-4 text-sm text-gray-600">
                Pramana's structured approach reduces confusion and ensures you're focusing on the right actions at the right time for your stage.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
