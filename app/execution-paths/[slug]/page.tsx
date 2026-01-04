'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/app/providers/AuthProvider'

interface PageProps {
  params: {
    slug: string
  }
}

// Helper function to check if user has access (for now, all users are free)
// This can be extended later to check subscription status
function hasAccess(user: any): boolean {
  // For now, return false to show paywall to all users
  // Later: check user.subscription_status or similar
  return false
}

export default function ExecutionPathPage({ params }: PageProps) {
  const { user, loading } = useAuth()
  const hasFullAccess = user && hasAccess(user)

  // For now, only support beginner-shorts-path
  if (params.slug !== 'beginner-shorts-path') {
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
                Full Access Required
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
                  <p className="text-sm text-gray-600">
                    This detailed roadmap saves time by giving you an ordered sequence instead of piecing together advice from multiple sources. You'll know exactly what to do each week, why it matters at your stage, and what success looks like.
                  </p>
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
                  Simple structure, easy to execute, teaches fundamental Shorts principles. Full format details, structure breakdown, and execution guide available with full access.
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

        {/* What NOT to Do - Preview for Free, Full for Paid */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">What NOT to Do at This Stage</h2>
            {!hasFullAccess && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                Preview
              </span>
            )}
          </div>
          
          {hasFullAccess ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Content Strategy Mistakes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span><strong>Don't:</strong> Try to go viral with trending sounds or topics outside your niche</span>
                  </li>
                  <li className="text-xs text-gray-600 ml-6">Why: Inconsistent content confuses the algorithm and prevents audience building</li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span><strong>Don't:</strong> Post daily if it means sacrificing quality</span>
                  </li>
                  <li className="text-xs text-gray-600 ml-6">Why: 2-3 quality videos per week beats 7 rushed videos that hurt your channel</li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span><strong>Don't:</strong> Switch formats every video</span>
                  </li>
                  <li className="text-xs text-gray-600 ml-6">Why: You need data to learn what works; constant switching prevents pattern recognition</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Technical Mistakes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span><strong>Don't:</strong> Spend hours on editing when simple cuts work</span>
                  </li>
                  <li className="text-xs text-gray-600 ml-6">Why: At this stage, content structure matters more than production value</li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span><strong>Don't:</strong> Use complex transitions or effects</span>
                  </li>
                  <li className="text-xs text-gray-600 ml-6">Why: Focus on hook, pacing, and value delivery first</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Growth Strategy Mistakes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span><strong>Don't:</strong> Focus on subscriber count over views</span>
                  </li>
                  <li className="text-xs text-gray-600 ml-6">Why: Views from browse/suggested are more valuable for growth at this stage</li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span><strong>Don't:</strong> Buy views, subscribers, or engagement</span>
                  </li>
                  <li className="text-xs text-gray-600 ml-6">Why: Artificial metrics hurt your channel's long-term performance</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-700 mb-3">
                This section provides explicit constraints on what to avoid at your stage, preventing common mistakes that waste time and effort.
              </p>
              <p className="text-sm text-gray-600">
                Full access includes detailed explanations of content strategy mistakes, technical pitfalls, and growth strategy errors—each with clear reasoning on why to avoid them.
              </p>
            </div>
          )}
        </section>

        {/* Evaluation & Next Stage - Locked for Free Users */}
        {hasFullAccess ? (
          <>
            <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Evaluate Progress</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Week 2 Checkpoint</h3>
                  <ul className="space-y-2 text-sm text-gray-700 mb-3">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Posted at least 4 videos in 2 weeks</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>At least 2 videos have 50+ views</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Average retention above 40%</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-600 italic">If not met: Review format structure and hook effectiveness</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Week 4 Checkpoint</h3>
                  <ul className="space-y-2 text-sm text-gray-700 mb-3">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Posted consistently (2-3x/week) for 4 weeks</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>At least 3 videos have 100+ views</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Views are coming from browse/suggested (check analytics)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Identified which hook style works best</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-600 italic">If not met: Focus on hook improvement and niche clarity</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Key Metrics to Track</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• <strong>Views per video:</strong> Target 100-500 by Week 8</li>
                    <li>• <strong>Retention rate:</strong> Target 60%+ average</li>
                    <li>• <strong>Browse vs. Subscriber views:</strong> Browse should be 70%+ by Week 6</li>
                    <li>• <strong>Posting consistency:</strong> 2-3 videos per week without gaps</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">When to Move to the Next Stage</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Ready to Move On When:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Consistency achieved: 3+ videos in the last 2 weeks reached 100-500 views</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Pattern established: You understand which formats and hooks work for your niche</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Habit formed: Posting 2-3x/week feels sustainable, not forced</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Data-driven: You're making decisions based on analytics, not guesswork</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Not Ready If:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Views are inconsistent (one video gets 500 views, next gets 20)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>You haven't identified what works yet (still experimenting randomly)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Posting is still a struggle (missing weeks, feeling overwhelmed)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Progress Evaluation & Next Steps</h3>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    Full access includes detailed weekly checkpoints with specific success criteria, key metrics to track, and clear guidance on when you're ready to move to the next stage.
                  </p>
                  <p className="text-sm text-gray-600">
                    This structured evaluation system provides objective feedback, preventing self-doubt and ensuring you know exactly when you're on track or need to adjust your approach.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

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
              <p className="text-sm text-gray-600">
                Pramana's structured approach reduces confusion and ensures you're focusing on the right actions at the right time for your stage.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

