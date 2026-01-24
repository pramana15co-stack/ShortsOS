'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/providers/AuthProvider'
import { useAccess } from '@/lib/useAccess'
import { getCreditsInfo, hasEnoughCredits, getCreditCost } from '@/lib/credits'
import UpgradeGate from '@/components/UpgradeGate'
import CreditsDisplay from '@/components/CreditsDisplay'

type Platform = 'youtube' | 'instagram'
type Frequency = 'daily' | '3-4-per-week' | 'weekly' | 'occasional'
type Goal = 'growth' | 'engagement' | 'monetization' | 'consistency'

interface AuditResult {
  creatorStage: string
  stageAnalysis: string
  whatToPostNext: string[]
  bestFormats: string[]
  postingRhythm: string
  whatNotToDo: string[]
  personalizedGuidance: string
  competitivePositioning: {
    nicheSaturation: string
    differentiation: string[]
    opportunity: string
  }
  growthTrajectory: {
    currentPhase: string
    nextMilestone: string
    timeline: string
    keyActions: string[]
  }
  contentGaps: {
    missingFormats: string[]
    underutilizedOpportunities: string[]
    audienceNeeds: string[]
  }
  monetizationRoadmap: {
    readiness: string
    opportunities: string[]
    nextSteps: string[]
  }
  algorithmOptimization: {
    platformStrategy: string
    timingInsights: string[]
    engagementBoosters: string[]
  }
  audiencePsychology: {
    viewerMotivation: string
    contentTriggers: string[]
    retentionFactors: string[]
  }
  contentCalendar: {
    weeklyStructure: string[]
    formatRotation: string
    batchStrategy: string
  }
  performanceBenchmarks: {
    currentLevel: string
    industryStandards: string[]
    improvementTargets: string[]
  }
  strategicPivots: {
    whenToPivot: string
    pivotSignals: string[]
    pivotOptions: string[]
  }
}

export default function CreatorAuditPage() {
  const { user } = useAuth()
  const { isPaid, isStarter } = useAccess()
  const [credits, setCredits] = useState<number | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  
  const [step, setStep] = useState<'input' | 'questions' | 'result'>('input')
  const [questionStep, setQuestionStep] = useState(1)
  const [activeTab, setActiveTab] = useState('overview')
  const [formData, setFormData] = useState({
    link: '',
    platform: 'youtube' as Platform,
    frequency: '3-4-per-week' as Frequency,
    goal: 'growth' as Goal,
    niche: '',
    currentSubscribers: '',
    avgViews: '',
    bestPerformingFormat: '',
    biggestChallenge: '',
    contentStyle: '',
    monetizationInterest: '',
  })
  const [result, setResult] = useState<AuditResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

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

  // Wrap content in UpgradeGate for clean access control

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.link.trim()) {
      alert('Please enter a channel or page link')
      return
    }
    setStep('questions')
  }

  const handleQuestionsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check credits for free users
    if (!isPaid && user) {
      await checkCredits()
      if (!hasEnoughCredits(credits || 0, 'creator-audit', isPaid)) {
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
            feature: 'creator-audit',
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
        // Trigger a refresh of CreditsDisplay component
        window.dispatchEvent(new CustomEvent('credits-updated', { detail: { credits: data.creditsRemaining } }))
      } catch (error) {
        console.error('Error using credits:', error)
        setIsAnalyzing(false)
        alert('Failed to process request. Please try again.')
        return
      }
    }
    
    // Simulate analysis
    setTimeout(() => {
      const auditResult = generateAudit(formData)
      setResult(auditResult)
      setIsAnalyzing(false)
      setStep('result')
    }, 2000)
  }

  const generateAudit = (data: typeof formData): AuditResult => {
    const isYouTube = data.platform === 'youtube'
    const isFrequent = data.frequency === 'daily' || data.frequency === '3-4-per-week'
    const isDaily = data.frequency === 'daily'
    
    // Determine creator stage with detailed analysis
    let creatorStage = 'Early Stage (0-1K followers/subscribers)'
    let stageAnalysis = 'You\'re building foundational habits and discovering what resonates. Focus on consistency over perfection.'
    
    if (isFrequent && data.goal !== 'consistency') {
      creatorStage = 'Growing Stage (1K-10K followers/subscribers)'
      stageAnalysis = 'You\'ve found your voice and audience. Now optimize for growth through format consistency and value delivery.'
    } else if (isFrequent && data.goal === 'monetization') {
      creatorStage = 'Established Stage (10K+ followers/subscribers)'
      stageAnalysis = 'You have a loyal audience. Focus on deepening engagement, building authority, and creating monetization pathways.'
    }

    // Premium: Competitive Positioning
    const competitivePositioning = {
      nicheSaturation: isYouTube 
        ? 'YouTube Shorts in your niche is moderately saturated, but there\'s still room for creators who differentiate through unique angles, personal stories, or deeper expertise. The key is finding your "unfair advantage"—what can you offer that others can\'t?'
        : 'Instagram Reels in your niche has high competition, but the algorithm rewards consistency and authentic engagement over follower count. Focus on building a community, not just views.',
      differentiation: [
        isYouTube ? 'Lead with your unique perspective or methodology—what\'s your signature approach?' : 'Develop a recognizable visual style or editing pattern that makes your content instantly identifiable',
        'Share personal failures and learnings—vulnerability builds deeper connection than polished perfection',
        'Create content series that build on each other, encouraging viewers to return for the next installment',
        'Engage directly with comments and create content based on audience questions—this builds community faster than broadcasting alone'
      ],
      opportunity: isYouTube
        ? 'The biggest opportunity: Most creators in your niche focus on surface-level tips. You can stand out by diving deeper into the "why" behind strategies, showing real results over time, or teaching the meta-skills (like how to think about content creation itself).'
        : 'The biggest opportunity: Most creators post sporadically. By maintaining consistent posting with a clear format rotation, you can capture audience attention and build anticipation for your next post.'
    }

    // Premium: Growth Trajectory
    const growthTrajectory = {
      currentPhase: isDaily 
        ? 'Acceleration Phase' 
        : isFrequent 
        ? 'Momentum Building Phase' 
        : 'Foundation Building Phase',
      nextMilestone: isDaily
        ? '10K-50K followers/subscribers (3-6 months with current frequency)'
        : isFrequent
        ? '1K-10K followers/subscribers (2-4 months with current frequency)'
        : 'First 1K followers/subscribers (4-8 months with current frequency)',
      timeline: isDaily
        ? 'With daily posting and format optimization, you can expect 2-3x growth in the next 90 days if you maintain consistency and focus on retention metrics.'
        : isFrequent
        ? 'With 3-4 posts per week, you\'re building sustainable momentum. Expect steady growth of 20-30% month-over-month if you maintain quality and engagement.'
        : 'With weekly posting, growth will be slower but more sustainable. Focus on making each piece of content count—high-quality weekly content often outperforms mediocre daily content.',
      keyActions: [
        isDaily ? 'Track retention rates on your last 10 videos—identify the 3-second, 15-second, and 30-second drop-off points' : 'Increase posting frequency gradually—add one extra post per week every month until you reach your optimal cadence',
        'Double down on your top-performing format—if problem-solution works, create 5-7 variations before trying something new',
        'Engage with 10 comments per video within the first hour—this signals to the algorithm that your content drives engagement',
        'Create a content series (3-5 parts) to build anticipation and encourage subscriptions/follows'
      ]
    }

    // Premium: Content Gaps
    const contentGaps = {
      missingFormats: isYouTube ? [
        'Myth-Busting format: Address common misconceptions in your niche—this drives high engagement and shares',
        'Case Study format: Deep dive into a real example with before/after data—builds authority and trust',
        'Comparison format: "X vs Y" content helps viewers make decisions and drives comments'
      ] : [
        'Educational Thread format: Break down complex topics into digestible carousel posts',
        'Transformation Timeline format: Show progress over time with multiple posts',
        'Q&A format: Answer audience questions in video format—high engagement driver'
      ],
      underutilizedOpportunities: [
        'Collaboration content: Partner with creators in adjacent niches to cross-pollinate audiences',
        'Trend-jacking with your angle: Take trending formats and apply your unique perspective',
        'Behind-the-scenes of your process: Show how you create content, not just the final result',
        'Community highlights: Feature your audience\'s content or questions—builds loyalty'
      ],
      audienceNeeds: [
        'Your audience needs more "how-to" content with step-by-step breakdowns',
        'They want to see real results and transformations, not just theory',
        'They\'re asking for deeper dives into topics you\'ve only covered at surface level',
        'They want to understand the "why" behind strategies, not just the "what"'
      ]
    }

    // Premium: Monetization Roadmap
    const monetizationRoadmap = {
      readiness: data.goal === 'monetization' && isFrequent
        ? 'Ready to monetize: You have consistent content and clear value proposition. Focus on building trust before introducing offers.'
        : data.goal === 'monetization' && !isFrequent
        ? 'Building foundation: Increase posting frequency to 3-4x per week to build audience trust before monetizing.'
        : 'Not yet ready: Focus on growth and engagement first. Monetization works best with 5K+ engaged followers.',
      opportunities: [
        'Affiliate partnerships: Recommend tools/products you actually use—start with 1-2 partnerships to maintain authenticity',
        'Digital products: Create a simple guide or template based on your most-requested content',
        'Coaching/Consulting: Offer 1-on-1 sessions for your most engaged audience members',
        'Sponsored content: Once you hit 10K, brands will reach out—be selective and only work with brands that align with your values'
      ],
      nextSteps: [
        'Create 10-15 pieces of educational content before introducing any offers—this builds authority',
        'Start tracking which content drives the most engagement—these topics are your monetization opportunities',
        'Build an email list or community (Discord/Telegram) to nurture relationships outside the platform',
        'Test a low-cost offer ($5-20) to gauge audience willingness to pay before creating premium products'
      ]
    }

    // Premium: Algorithm Optimization
    const algorithmOptimization = {
      platformStrategy: isYouTube
        ? 'YouTube Shorts algorithm prioritizes: (1) Watch time and completion rate, (2) Engagement velocity (likes/comments in first hour), (3) Session duration (keeping viewers on platform). Focus on hook quality (first 3 seconds) and retention (first 15 seconds) above all else.'
        : 'Instagram Reels algorithm prioritizes: (1) Engagement rate (likes, comments, shares), (2) Completion rate, (3) Saves and shares. Use trending audio, post at peak times (6-9 PM), and engage with comments immediately after posting.',
      timingInsights: [
        isYouTube ? 'Post between 2-4 PM or 8-10 PM in your audience\'s timezone for maximum initial engagement' : 'Post between 6-9 PM for highest reach, or 11 AM-1 PM for consistent engagement',
        'Avoid posting on weekends if your audience is primarily working professionals',
        'Post consistently at the same times to train your audience to expect your content',
        'Use analytics to identify your top-performing days and double down on those'
      ],
      engagementBoosters: [
        'Ask a question in the first 5 seconds—this primes viewers to comment',
        'Use captions/text overlays—many viewers watch without sound',
        'End with a clear CTA: "Save this for later" or "Follow for more [topic]"',
        'Reply to every comment in the first hour—this signals high engagement to the algorithm',
        'Create content that encourages shares: "Tag someone who needs this" or "Share if you agree"'
      ]
    }

    // Premium: Audience Psychology
    const audiencePsychology = {
      viewerMotivation: data.goal === 'growth'
        ? 'Your viewers are seeking quick wins and actionable insights. They\'re in "learning mode" and want to consume content efficiently. Structure your content to deliver value immediately.'
        : data.goal === 'engagement'
        ? 'Your viewers want to feel part of a community. They\'re seeking connection and validation. Create content that makes them feel seen and understood.'
        : data.goal === 'monetization'
        ? 'Your viewers are evaluating your expertise and trustworthiness. They want proof that you can deliver results. Showcase case studies, transformations, and real outcomes.'
        : 'Your viewers are building habits and routines. They appreciate consistency and reliability. Focus on being dependable rather than flashy.',
      contentTriggers: [
        'Curiosity gap: "The one mistake 90% of creators make..." creates intrigue',
        'Social proof: "How I got 10K followers in 30 days" triggers aspiration',
        'Problem identification: "If you\'re struggling with X, this is for you" creates relevance',
        'Transformation promise: "From X to Y in Z time" shows clear value',
        'Urgency: "Before you post your next video, watch this" creates action'
      ],
      retentionFactors: [
        'Visual variety: Change shots every 2-3 seconds to maintain attention',
        'Pacing: Match energy to content—high-energy hooks, calmer explanations, energetic CTAs',
        'Value density: Pack multiple insights into each video, not just one main point',
        'Emotional connection: Share personal stories or failures—vulnerability builds retention',
        'Progressive disclosure: Reveal information in layers, not all at once'
      ]
    }

    // Premium: Content Calendar
    const contentCalendar = {
      weeklyStructure: isDaily ? [
        'Monday: Problem-Solution format (educational, high retention)',
        'Tuesday: Quick Tip format (fast value, shareable)',
        'Wednesday: Behind-the-Scenes (builds connection)',
        'Thursday: Case Study or Transformation (builds authority)',
        'Friday: Trend-jack or Fun format (maintains engagement)',
        'Saturday: Community highlight or Q&A (builds loyalty)',
        'Sunday: Rest or batch-create for next week'
      ] : isFrequent ? [
        'Monday: Educational format (problem-solution or tutorial)',
        'Wednesday: Engagement format (Q&A, behind-the-scenes, or community highlight)',
        'Friday: Value format (transformation, case study, or quick tip)',
        'Weekend: Batch create and plan for next week'
      ] : [
        'Choose one day per week (e.g., Tuesday) and make it your "content day"',
        'Create 2-3 pieces of content in one session to build a library',
        'Schedule posts for optimal times based on your audience analytics'
      ],
      formatRotation: 'Stick with 2-3 formats for 4-6 weeks to establish patterns. Once you see consistent performance, introduce one new format per month. Never abandon a format that\'s working—double down instead.',
      batchStrategy: 'Batch create content in 2-3 hour sessions. Plan 5-7 videos at once, film them in one session, then edit and schedule. This reduces decision fatigue and improves consistency.'
    }

    // Premium: Performance Benchmarks
    const performanceBenchmarks = {
      currentLevel: isDaily
        ? 'High-frequency creator: You\'re posting daily, which gives you more data points to optimize. Focus on retention rates (aim for 60%+ at 15 seconds) and engagement rates (aim for 5%+ likes-to-views).'
        : isFrequent
        ? 'Moderate-frequency creator: You\'re building sustainable momentum. Focus on quality over quantity—aim for 70%+ retention at 15 seconds and 6%+ engagement rates.'
        : 'Low-frequency creator: Each piece of content must count. Aim for 75%+ retention at 15 seconds and 8%+ engagement rates. Quality trumps quantity at this stage.',
      industryStandards: [
        'Retention: Top creators maintain 60-70% retention at 15 seconds, 40-50% at 30 seconds',
        'Engagement: 5-8% engagement rate (likes + comments / views) is strong for most niches',
        'Completion: 30-40% completion rate is excellent for 60-second content',
        'Growth: 10-20% month-over-month follower growth is healthy for growing creators'
      ],
      improvementTargets: [
        'Increase retention at 3 seconds by 10%—this is your hook quality metric',
        'Improve engagement rate by 2%—focus on asking questions and creating shareable moments',
        'Reduce drop-off between 15-30 seconds—this is where most creators lose viewers',
        'Increase average watch time by 5 seconds—small improvements compound over time'
      ]
    }

    // Premium: Strategic Pivots
    const strategicPivots = {
      whenToPivot: 'Pivot when: (1) You\'ve posted 20+ videos in a format with consistently low performance (<40% retention at 15 seconds), (2) Your audience explicitly asks for different content, (3) A new trend emerges that aligns with your niche and you can add unique value, (4) You\'ve hit a growth plateau for 60+ days despite consistent posting.',
      pivotSignals: [
        'Declining retention rates across multiple videos (not just one-off)',
        'Decreasing engagement rates despite maintaining quality',
        'Audience comments requesting different content types',
        'New competitors entering your niche with better angles',
        'Platform algorithm changes that favor different formats'
      ],
      pivotOptions: [
        'Format pivot: Switch from educational to entertainment, or vice versa',
        'Angle pivot: Change from "how-to" to "why-to" or from "tips" to "case studies"',
        'Niche pivot: Narrow focus (e.g., from "productivity" to "productivity for students") or expand slightly (e.g., from "fitness" to "health and wellness")',
        'Platform pivot: If one platform isn\'t working, test the same content on another platform',
        'Style pivot: Change editing pace, visual style, or presentation format'
      ]
    }

    // Enhanced basic sections
    const whatToPostNext = isYouTube ? [
      'Problem-solution format with data: Address a common question and include real numbers/results (e.g., "How I got 10K views in 30 days—here\'s the exact strategy")',
      'Before/after transformation with timeline: Show progress over 30/60/90 days with specific metrics',
      'Quick tip with deeper context: Share a hack, then explain why it works and when to use it',
      'Myth-busting format: Address a common misconception in your niche with evidence',
      'Case study deep-dive: Analyze a real example with step-by-step breakdown'
    ] : [
      'Behind-the-scenes series: Show your process over 3-5 posts to build anticipation',
      'Educational carousel with actionable steps: Break down complex topics into digestible slides',
      'Story-driven content with lesson: Share personal experience, then extract the insight',
      'Transformation timeline: Show progress over time with multiple posts',
      'Q&A format: Answer audience questions in video or carousel format'
    ]

    const bestFormats = isYouTube ? [
      'Problem-Solution (60-70% retention, high shares, clear value proposition)',
      'Before/After (high visual impact, transformation story, strong emotional connection)',
      'Quick Tips (fast value delivery, shareable, algorithm-friendly)',
      'Myth-Busting (high engagement, drives comments and debates)',
      'Case Studies (builds authority, demonstrates expertise, high trust-building)'
    ] : [
      'Carousel Posts (high engagement, educational, saves well)',
      'Reels (algorithm-friendly, discoverable, trend-responsive)',
      'Story Highlights (evergreen, reference-worthy, builds authority)',
      'IGTV/Video Posts (deeper content, higher engagement from existing followers)',
      'Live Sessions (real-time engagement, builds community, high algorithm boost)'
    ]

    const postingRhythm = data.frequency === 'daily' 
      ? 'Post daily at consistent times (within 1-hour window). Focus on one primary format for 2-3 weeks to establish patterns, then introduce variations. Quality over quantity—each post should deliver clear value. Track which times drive highest engagement and double down.'
      : data.frequency === '3-4-per-week'
      ? 'Post 3-4 times per week on consistent days (e.g., Monday, Wednesday, Friday). This frequency allows for quality while maintaining momentum. Batch create content to stay 2-3 weeks ahead. Use analytics to identify your best-performing days and times.'
      : data.frequency === 'weekly'
      ? 'Post weekly with high-quality, well-planned content. Use the week to plan, create, and optimize. Focus on formats that have the highest impact. Each piece should be your best work—weekly creators often outperform daily creators in engagement rates.'
      : 'Post when you have valuable content ready. Focus on quality and consistency over frequency. Build a small library (10-15 pieces) before increasing posting frequency. Each piece should be polished and deliver clear value.'

    const whatNotToDo = [
      `Don't jump between formats too quickly—stick with 2-3 formats for at least 4-6 weeks to gather meaningful data`,
      `Don't post without a clear value proposition—every piece of content should answer "why should someone watch this right now?"`,
      `Don't ignore your audience's questions—these are your best content ideas and show you're listening`,
      `Don't compare your early results to established creators—focus on your own progress and improvement`,
      `Don't skip the planning phase—structure reduces stress, improves quality, and increases consistency`,
      `Don't chase trends without adding your unique angle—trend-jacking works when you add value, not when you copy`,
      `Don't neglect engagement—reply to comments, ask questions, build community beyond just posting content`
    ]

    const personalizedGuidance = `## Strategic Overview

Based on your ${data.platform === 'youtube' ? 'YouTube channel' : 'Instagram page'}, you're in the **${creatorStage}** stage. Your primary goal is **${data.goal}**, and you're posting **${data.frequency === 'daily' ? 'daily' : data.frequency === '3-4-per-week' ? '3-4 times per week' : data.frequency === 'weekly' ? 'weekly' : 'occasionally'}**.

## Your Current Position

${stageAnalysis}

## Immediate Next Steps

${data.goal === 'growth' 
  ? '**Focus on formats that maximize reach and discoverability.** Problem-solution and educational content work exceptionally well for growth. The algorithm favors content that keeps viewers on the platform, so prioritize retention over views. Your hook (first 3 seconds) is critical—test different hook styles and double down on what works.' 
  : data.goal === 'engagement' 
  ? '**Prioritize formats that encourage interaction.** Ask questions, share relatable experiences, and create conversation starters. Engagement rate matters more than views for building a community. Reply to every comment in the first hour to signal high engagement to the algorithm.' 
  : data.goal === 'monetization' 
  ? '**Focus on formats that demonstrate value and build trust.** Educational content, case studies, and behind-the-scenes work well for monetization. Show real results and transformations. Build authority before introducing offers—aim for 10-15 pieces of educational content before monetizing.' 
  : '**Consistency is key.** Focus on establishing a routine and building a content library before optimizing for specific goals. Create 10-15 pieces of content first, then analyze what resonates before doubling down.'}

## Your 30-Day Action Plan

1. **Week 1-2**: Choose one format from the recommendations above and create 5-7 pieces of content in that format. Track retention and engagement metrics.

2. **Week 3**: Analyze your top 3 performing videos—what do they have in common? Double down on those elements.

3. **Week 4**: Introduce one variation of your top format. Test and compare performance.

By the end of 30 days, you'll have clear data on what works for your audience and can make informed decisions about format expansion.`

    return {
      creatorStage,
      stageAnalysis,
      whatToPostNext,
      bestFormats,
      postingRhythm,
      whatNotToDo,
      personalizedGuidance,
      competitivePositioning,
      growthTrajectory,
      contentGaps,
      monetizationRoadmap,
      algorithmOptimization,
      audiencePsychology,
      contentCalendar,
      performanceBenchmarks,
      strategicPivots,
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <UpgradeGate requiredTier="starter" showUpgradeCTA={!isPaid}>
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
                This premium feature costs <span className="font-bold text-indigo-600">{getCreditCost('creator-audit')} credits</span>. 
                You have <span className="font-bold">{credits || 0} credits</span> remaining.
              </p>
              <p className="text-sm text-gray-500 mb-6 text-center">
                Upgrade to Starter or Pro for unlimited access to all premium features.
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
                Creator Intelligence Audit
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-4">
                Get personalized, actionable guidance based on your channel and goals. 
                Understand your creator stage, what to post next, and what to avoid. 
                This is a strategic decision system, not a basic analytics tool.
              </p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-4 max-w-3xl">
                <p className="text-sm font-semibold text-green-900 mb-1">💰 How This Helps You Profit:</p>
                <p className="text-sm text-green-800">
                  Strategic content planning based on your stage can accelerate growth by 3-5x. This audit identifies 
                  content gaps, monetization opportunities, and algorithm optimization strategies that directly impact 
                  your revenue potential. Know exactly what to post, when to post, and how to optimize for maximum 
                  views and subscriber conversion.
                </p>
              </div>
            </div>
            <div className="ml-4">
              <CreditsDisplay feature="creator-audit" />
            </div>
          </div>
        </div>

        {step === 'input' && (
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Step 1: Enter Your Channel or Page</h2>
            <form onSubmit={handleLinkSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  YouTube Channel Link, Instagram Page Link, or Shorts Link
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  placeholder="https://youtube.com/@yourchannel or https://instagram.com/yourpage"
                />
                <p className="text-xs text-gray-500 mt-2">
                  We don't analyze your data. This helps us provide personalized guidance based on your platform and goals.
                </p>
              </div>
              <button type="submit" className="btn-primary w-full py-4">
                Continue
              </button>
            </form>
          </div>
        )}

        {step === 'questions' && (
          <div className="card max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900">Step 2: Detailed Analysis</h2>
                <span className="text-sm text-gray-500">Question {questionStep} of 4</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(questionStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleQuestionsSubmit} className="space-y-6">
              {questionStep === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Platform
                    </label>
                    <select
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="youtube">YouTube / YouTube Shorts</option>
                      <option value="instagram">Instagram / Instagram Reels</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      How often do you post?
                    </label>
                    <select
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value as Frequency })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="daily">Daily</option>
                      <option value="3-4-per-week">3-4 times per week</option>
                      <option value="weekly">Weekly</option>
                      <option value="occasional">Occasionally (less than weekly)</option>
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
                      <option value="growth">Growth (more views, subscribers, followers)</option>
                      <option value="engagement">Engagement (comments, shares, community)</option>
                      <option value="monetization">Monetization (build trust, demonstrate value)</option>
                      <option value="consistency">Consistency (establish routine, build habit)</option>
                    </select>
                  </div>
                </>
              )}

              {questionStep === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Niche or Topic Focus
                    </label>
                    <input
                      type="text"
                      value={formData.niche}
                      onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                      placeholder="e.g., Productivity, Fitness, Cooking, Tech Reviews"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Current Subscribers/Followers
                    </label>
                    <select
                      value={formData.currentSubscribers}
                      onChange={(e) => setFormData({ ...formData, currentSubscribers: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Select range</option>
                      <option value="0-100">0-100</option>
                      <option value="100-1k">100-1,000</option>
                      <option value="1k-10k">1,000-10,000</option>
                      <option value="10k-100k">10,000-100,000</option>
                      <option value="100k+">100,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Average Views Per Video
                    </label>
                    <select
                      value={formData.avgViews}
                      onChange={(e) => setFormData({ ...formData, avgViews: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Select range</option>
                      <option value="0-100">0-100</option>
                      <option value="100-1k">100-1,000</option>
                      <option value="1k-10k">1,000-10,000</option>
                      <option value="10k-100k">10,000-100,000</option>
                      <option value="100k+">100,000+</option>
                    </select>
                  </div>
                </>
              )}

              {questionStep === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Best Performing Content Format
                    </label>
                    <select
                      value={formData.bestPerformingFormat}
                      onChange={(e) => setFormData({ ...formData, bestPerformingFormat: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Select format</option>
                      <option value="problem-solution">Problem-Solution</option>
                      <option value="before-after">Before/After</option>
                      <option value="quick-tips">Quick Tips</option>
                      <option value="tutorial">Tutorial/How-To</option>
                      <option value="entertainment">Entertainment/Fun</option>
                      <option value="storytelling">Storytelling</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Biggest Challenge Right Now
                    </label>
                    <select
                      value={formData.biggestChallenge}
                      onChange={(e) => setFormData({ ...formData, biggestChallenge: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Select challenge</option>
                      <option value="consistency">Staying consistent with posting</option>
                      <option value="growth">Getting more views/subscribers</option>
                      <option value="engagement">Low engagement (likes, comments)</option>
                      <option value="ideas">Running out of content ideas</option>
                      <option value="quality">Improving content quality</option>
                      <option value="monetization">Monetizing my channel</option>
                      <option value="retention">Low watch time/retention</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Content Style
                    </label>
                    <select
                      value={formData.contentStyle}
                      onChange={(e) => setFormData({ ...formData, contentStyle: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Select style</option>
                      <option value="educational">Educational/Informative</option>
                      <option value="entertaining">Entertaining/Fun</option>
                      <option value="inspirational">Inspirational/Motivational</option>
                      <option value="personal">Personal/Story-driven</option>
                      <option value="mixed">Mixed (combination)</option>
                    </select>
                  </div>
                </>
              )}

              {questionStep === 4 && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Interest in Monetization
                    </label>
                    <select
                      value={formData.monetizationInterest}
                      onChange={(e) => setFormData({ ...formData, monetizationInterest: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Select interest level</option>
                      <option value="not-interested">Not interested right now</option>
                      <option value="exploring">Exploring options</option>
                      <option value="ready">Ready to start monetizing</option>
                      <option value="already-monetizing">Already monetizing</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-4">
                {questionStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setQuestionStep(questionStep - 1)}
                    className="btn-secondary flex-1 py-4"
                  >
                    Previous
                  </button>
                )}
                {questionStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setQuestionStep(questionStep + 1)}
                    className="btn-primary flex-1 py-4"
                  >
                    Next
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setQuestionStep(questionStep - 1)}
                      className="btn-secondary flex-1 py-4"
                    >
                      Previous
                    </button>
                    <button type="submit" className="btn-primary flex-1 py-4" disabled={isAnalyzing}>
                      {isAnalyzing ? 'Analyzing...' : 'Get Complete Audit'}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        )}

        {step === 'result' && result && (
          <div className="space-y-6">
            {/* Dashboard Header */}
            <div className="card bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Creator Intelligence Dashboard</h2>
                  <p className="text-indigo-100">Complete strategic analysis for your content journey</p>
                </div>
                <button
                  onClick={() => {
                    setStep('input')
                    setResult(null)
                    setQuestionStep(1)
                    setActiveTab('overview')
                    setFormData({ 
                      link: '',
                      platform: 'youtube',
                      frequency: '3-4-per-week',
                      goal: 'growth',
                      niche: '',
                      currentSubscribers: '',
                      avgViews: '',
                      bestPerformingFormat: '',
                      biggestChallenge: '',
                      contentStyle: '',
                      monetizationInterest: '',
                    })
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-semibold transition-all whitespace-nowrap"
                >
                  New Audit
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="card p-0 overflow-hidden">
              <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50 scrollbar-hide">
                {[
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'growth', label: 'Growth', icon: '📈' },
                  { id: 'content', label: 'Content', icon: '🎬' },
                  { id: 'monetization', label: 'Monetization', icon: '💰' },
                  { id: 'algorithm', label: 'Algorithm', icon: '⚡' },
                  { id: 'audience', label: 'Audience', icon: '👥' },
                  { id: 'calendar', label: 'Calendar', icon: '📅' },
                  { id: 'performance', label: 'Performance', icon: '🎯' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-all ${
                      activeTab === tab.id
                        ? 'border-indigo-600 text-indigo-600 bg-white'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Creator Stage */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                        <h3 className="text-lg font-bold mb-3 text-gray-900">Your Creator Stage</h3>
                        <div className="text-3xl font-bold text-indigo-900 mb-2">{result.creatorStage}</div>
                        <p className="text-gray-700 text-sm">{result.stageAnalysis}</p>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                        <h3 className="text-lg font-bold mb-3 text-gray-900">Current Phase</h3>
                        <div className="text-2xl font-bold text-blue-900 mb-2">{result.growthTrajectory.currentPhase}</div>
                        <p className="text-gray-700 text-sm">Next: {result.growthTrajectory.nextMilestone}</p>
                      </div>
                    </div>

                    {/* Strategic Overview */}
                    <div className="p-6 bg-white rounded-xl border border-gray-200">
                      <h3 className="text-xl font-bold mb-4 text-gray-900">Strategic Overview & 30-Day Action Plan</h3>
                      <div className="prose prose-sm max-w-none text-gray-900 leading-relaxed whitespace-pre-line">
                        {result.personalizedGuidance}
                      </div>
                      <button
                        onClick={() => copyToClipboard(result.personalizedGuidance)}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                      >
                        Copy Full Guidance
                      </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-bold text-green-900 mb-2">What to Post Next</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {result.whatToPostNext.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>{item.split(':')[0]}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h4 className="font-bold text-purple-900 mb-2">Best Formats</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {result.bestFormats.slice(0, 3).map((format, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-600 mt-0.5">✓</span>
                              <span>{format.split('(')[0].trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <h4 className="font-bold text-orange-900 mb-2">Key Actions</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {result.growthTrajectory.keyActions.slice(0, 3).map((action, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-orange-600 mt-0.5">→</span>
                              <span className="line-clamp-2">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Growth Tab */}
                {activeTab === 'growth' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                        <h3 className="text-lg font-bold mb-3 text-gray-900">Current Phase</h3>
                        <p className="text-2xl font-bold text-blue-900 mb-2">{result.growthTrajectory.currentPhase}</p>
                      </div>
                      <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                        <h3 className="text-lg font-bold mb-3 text-gray-900">Next Milestone</h3>
                        <p className="text-xl font-bold text-green-900 mb-2">{result.growthTrajectory.nextMilestone}</p>
                      </div>
                    </div>
                    <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200">
                      <h3 className="text-lg font-bold mb-3 text-gray-900">Timeline & Expectations</h3>
                      <p className="text-gray-900">{result.growthTrajectory.timeline}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">Key Actions to Accelerate Growth</h3>
                      <div className="space-y-3">
                        {result.growthTrajectory.keyActions.map((action, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                              {idx + 1}
                            </div>
                            <p className="text-gray-900 flex-1">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                      <h3 className="text-lg font-bold mb-3 text-gray-900">Competitive Positioning</h3>
                      <p className="text-gray-900 text-sm mb-4">{result.competitivePositioning.nicheSaturation}</p>
                      <div className="space-y-2">
                        {result.competitivePositioning.differentiation.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-yellow-600 mt-0.5">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">What to Post Next</h3>
                      <div className="space-y-3">
                        {result.whatToPostNext.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                              {idx + 1}
                            </div>
                            <p className="text-gray-900 flex-1">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">Best Content Formats for You</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {result.bestFormats.map((format, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-gray-900 text-sm">{format}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <h3 className="text-lg font-bold mb-3 text-gray-900">Recommended Posting Rhythm</h3>
                      <p className="text-gray-900">{result.postingRhythm}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">Content Gaps & Opportunities</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Missing Formats</h4>
                          <div className="space-y-2">
                            {result.contentGaps.missingFormats.map((format, idx) => (
                              <div key={idx} className="p-3 bg-orange-50 rounded-lg border border-orange-200 text-sm text-gray-900">
                                {format}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Opportunities</h4>
                          <div className="space-y-2">
                            {result.contentGaps.underutilizedOpportunities.map((opp, idx) => (
                              <div key={idx} className="p-3 bg-teal-50 rounded-lg border border-teal-200 text-sm text-gray-900">
                                {opp}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Audience Needs</h4>
                          <div className="space-y-2">
                            {result.contentGaps.audienceNeeds.map((need, idx) => (
                              <div key={idx} className="p-3 bg-pink-50 rounded-lg border border-pink-200 text-sm text-gray-900">
                                {need}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">What NOT to Do</h3>
                      <div className="space-y-2">
                        {result.whatNotToDo.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                            <span className="text-red-600 font-bold flex-shrink-0 mt-0.5">✗</span>
                            <span className="text-gray-900 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Monetization Tab */}
                {activeTab === 'monetization' && (
                  <div className="space-y-6">
                    <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                      <h3 className="text-lg font-bold mb-3 text-gray-900">Readiness Assessment</h3>
                      <p className="text-gray-900">{result.monetizationRoadmap.readiness}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">Monetization Opportunities</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {result.monetizationRoadmap.opportunities.map((opp, idx) => (
                          <div key={idx} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                                {idx + 1}
                              </div>
                              <p className="text-gray-900 text-sm">{opp}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">Next Steps to Monetize</h3>
                      <div className="space-y-3">
                        {result.monetizationRoadmap.nextSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            <p className="text-gray-900 text-sm">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Algorithm Tab */}
                {activeTab === 'algorithm' && (
                  <div className="space-y-6">
                    <div className="p-6 bg-violet-50 rounded-xl border border-violet-200">
                      <h3 className="text-lg font-bold mb-3 text-gray-900">Platform Strategy</h3>
                      <p className="text-gray-900 text-sm">{result.algorithmOptimization.platformStrategy}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">Timing Insights</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {result.algorithmOptimization.timingInsights.map((insight, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                            <span className="text-violet-600 font-bold flex-shrink-0 mt-0.5">⏰</span>
                            <p className="text-gray-900 text-sm">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">Engagement Boosters</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {result.algorithmOptimization.engagementBoosters.map((booster, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <span className="text-yellow-600 font-bold flex-shrink-0 mt-0.5">⚡</span>
                            <p className="text-gray-900 text-sm">{booster}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Audience Tab */}
                {activeTab === 'audience' && (
                  <div className="space-y-6">
                    <div className="p-6 bg-rose-50 rounded-xl border border-rose-200">
                      <h3 className="text-lg font-bold mb-3 text-gray-900">Viewer Motivation</h3>
                      <p className="text-gray-900 text-sm">{result.audiencePsychology.viewerMotivation}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">Content Triggers That Work</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {result.audiencePsychology.contentTriggers.map((trigger, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                            <span className="text-rose-600 font-bold flex-shrink-0 mt-0.5">🧠</span>
                            <p className="text-gray-900 text-sm">{trigger}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">Retention Factors</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {result.audiencePsychology.retentionFactors.map((factor, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                            <span className="text-indigo-600 font-bold flex-shrink-0 mt-0.5">📊</span>
                            <p className="text-gray-900 text-sm">{factor}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Calendar Tab */}
                {activeTab === 'calendar' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">Recommended Weekly Structure</h3>
                      <div className="space-y-2">
                        {result.contentCalendar.weeklyStructure.map((day, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                              {idx + 1}
                            </div>
                            <p className="text-gray-900 flex-1">{day}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-cyan-50 rounded-xl border border-cyan-200">
                        <h3 className="text-lg font-bold mb-3 text-gray-900">Format Rotation Strategy</h3>
                        <p className="text-gray-900 text-sm">{result.contentCalendar.formatRotation}</p>
                      </div>
                      <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
                        <h3 className="text-lg font-bold mb-3 text-gray-900">Batch Creation Strategy</h3>
                        <p className="text-gray-900 text-sm">{result.contentCalendar.batchStrategy}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Performance Tab */}
                {activeTab === 'performance' && (
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                      <h3 className="text-lg font-bold mb-3 text-gray-900">Your Current Level</h3>
                      <p className="text-gray-900 text-sm">{result.performanceBenchmarks.currentLevel}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">Industry Standards</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {result.performanceBenchmarks.industryStandards.map((standard, idx) => (
                          <div key={idx} className="p-4 bg-white rounded-lg border border-gray-200">
                            <p className="text-gray-900 text-sm">{standard}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-gray-900">Improvement Targets (Next 30 Days)</h3>
                      <div className="space-y-3">
                        {result.performanceBenchmarks.improvementTargets.map((target, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                            </svg>
                            <p className="text-gray-900 text-sm">{target}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                      <h3 className="text-lg font-bold mb-3 text-gray-900">Strategic Pivots</h3>
                      <p className="text-gray-900 text-sm mb-4">{result.strategicPivots.whenToPivot}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900 text-sm mb-2">Pivot Signals:</h4>
                        {result.strategicPivots.pivotSignals.map((signal, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-red-600 mt-0.5">⚠️</span>
                            <span>{signal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      </UpgradeGate>
    </main>
  )
}
