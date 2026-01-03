import { formats, ShortsFormat } from '@/data/formats'

export interface PerformanceInput {
  views: number
  averageWatchTime: number // in seconds
  likes: number
  formatSlug: string
}

export interface PerformanceFeedback {
  whatWorked: string[]
  whatFailed: string[]
  nextFormatSuggestion: {
    format: ShortsFormat
    reason: string
  }
  overallAssessment: string
  score: number // 0-100
}

// Performance thresholds
const THRESHOLDS = {
  views: {
    excellent: 10000,
    good: 5000,
    average: 1000,
  },
  watchTime: {
    excellent: 45, // 75% of 60 seconds
    good: 30, // 50% of 60 seconds
    average: 15, // 25% of 60 seconds
  },
  engagement: {
    excellent: 0.05, // 5% like rate
    good: 0.03, // 3% like rate
    average: 0.01, // 1% like rate
  },
}

// Calculate engagement rate
function calculateEngagementRate(views: number, likes: number): number {
  if (views === 0) return 0
  return likes / views
}

// Assess views performance
function assessViews(views: number): { level: string; feedback: string } {
  if (views >= THRESHOLDS.views.excellent) {
    return {
      level: 'excellent',
      feedback: 'Your video reached a large audience! The algorithm favored your content and pushed it to many viewers.',
    }
  } else if (views >= THRESHOLDS.views.good) {
    return {
      level: 'good',
      feedback: 'Good reach! Your video found its audience and got decent exposure.',
    }
  } else if (views >= THRESHOLDS.views.average) {
    return {
      level: 'average',
      feedback: 'Moderate reach. Your video got some views but could reach more people with optimization.',
    }
  } else {
    return {
      level: 'low',
      feedback: 'Limited reach. Your video struggled to get discovered. This could be due to SEO, timing, or initial engagement.',
    }
  }
}

// Assess watch time performance
function assessWatchTime(watchTime: number): { level: string; feedback: string } {
  if (watchTime >= THRESHOLDS.watchTime.excellent) {
    return {
      level: 'excellent',
      feedback: 'Outstanding retention! Viewers watched most of your video, which signals high-quality, engaging content.',
    }
  } else if (watchTime >= THRESHOLDS.watchTime.good) {
    return {
      level: 'good',
      feedback: 'Good retention! Viewers stayed engaged for a significant portion of your video.',
    }
  } else if (watchTime >= THRESHOLDS.watchTime.average) {
    return {
      level: 'average',
      feedback: 'Moderate retention. Some viewers dropped off early. Your hook might need work, or the content didn\'t match expectations.',
    }
  } else {
    return {
      level: 'low',
      feedback: 'Low retention. Most viewers left early. This suggests the hook didn\'t grab attention or the content didn\'t deliver on the promise.',
    }
  }
}

// Assess engagement performance
function assessEngagement(engagementRate: number): { level: string; feedback: string } {
  if (engagementRate >= THRESHOLDS.engagement.excellent) {
    return {
      level: 'excellent',
      feedback: 'Excellent engagement! Viewers are actively interacting with your content, showing they truly value it.',
    }
  } else if (engagementRate >= THRESHOLDS.engagement.good) {
    return {
      level: 'good',
      feedback: 'Good engagement! Your audience is responding well to your content.',
    }
  } else if (engagementRate >= THRESHOLDS.engagement.average) {
    return {
      level: 'average',
      feedback: 'Moderate engagement. Some viewers engaged, but more could be encouraged to like or comment.',
    }
  } else {
    return {
      level: 'low',
      feedback: 'Low engagement. Few viewers are interacting. Consider adding a stronger call-to-action or more compelling content.',
    }
  }
}

// Get format-specific insights
function getFormatInsights(formatSlug: string, views: number, watchTime: number, engagementRate: number): {
  worked: string[]
  failed: string[]
} {
  const format = formats.find(f => f.slug === formatSlug)
  const worked: string[] = []
  const failed: string[] = []

  if (!format) {
    return { worked, failed }
  }

  // Format-specific analysis
  if (formatSlug === 'problem-solution') {
    if (watchTime >= THRESHOLDS.watchTime.good) {
      worked.push('Your problem-solution format worked well - viewers stayed to see the solution.')
    } else {
      failed.push('The problem might not have been clearly stated, or the solution wasn\'t compelling enough.')
    }
    if (engagementRate >= THRESHOLDS.engagement.good) {
      worked.push('Viewers found your solution valuable and engaged with it.')
    } else {
      failed.push('The solution might not have been actionable enough or didn\'t resonate with viewers.')
    }
  } else if (formatSlug === 'before-after') {
    if (views >= THRESHOLDS.views.good) {
      worked.push('The visual transformation captured attention and drove views.')
    } else {
      failed.push('The before/after contrast might not have been dramatic enough to grab attention.')
    }
    if (watchTime >= THRESHOLDS.watchTime.good) {
      worked.push('Viewers stayed to see how you achieved the transformation.')
    } else {
      failed.push('The transformation process might not have been clear or engaging enough.')
    }
  } else if (formatSlug === 'myth-busting') {
    if (watchTime >= THRESHOLDS.watchTime.good) {
      worked.push('The myth-busting format kept viewers engaged to see the truth.')
    } else {
      failed.push('The myth might not have been compelling enough, or the truth wasn\'t surprising.')
    }
    if (engagementRate >= THRESHOLDS.engagement.good) {
      worked.push('Viewers engaged with the surprising revelation.')
    } else {
      failed.push('The myth-busting might not have been convincing or relevant enough.')
    }
  } else if (formatSlug === 'quick-tips') {
    if (watchTime >= THRESHOLDS.watchTime.good) {
      worked.push('The quick tips format delivered value efficiently.')
    } else {
      failed.push('The tips might have been too obvious or not actionable enough.')
    }
    if (engagementRate >= THRESHOLDS.engagement.good) {
      worked.push('Viewers found the tips useful and engaged with them.')
    } else {
      failed.push('The tips might not have been specific or valuable enough.')
    }
  } else if (formatSlug === 'storytelling') {
    if (watchTime >= THRESHOLDS.watchTime.excellent) {
      worked.push('Your story kept viewers engaged throughout.')
    } else {
      failed.push('The story might not have been compelling enough or lacked emotional connection.')
    }
    if (engagementRate >= THRESHOLDS.engagement.good) {
      worked.push('Viewers connected with your story and engaged emotionally.')
    } else {
      failed.push('The story might not have been relatable or the lesson wasn\'t clear.')
    }
  } else if (formatSlug === 'comparison') {
    if (watchTime >= THRESHOLDS.watchTime.good) {
      worked.push('The comparison format kept viewers watching to see the verdict.')
    } else {
      failed.push('The comparison might not have been clear or the options weren\'t compelling.')
    }
    if (engagementRate >= THRESHOLDS.engagement.good) {
      worked.push('Viewers engaged with the comparison and found it helpful.')
    } else {
      failed.push('The comparison might not have been relevant or the conclusion wasn\'t clear.')
    }
  }

  return { worked, failed }
}

// Calculate overall score
function calculateScore(views: number, watchTime: number, engagementRate: number): number {
  let score = 0

  // Views score (0-30 points)
  if (views >= THRESHOLDS.views.excellent) score += 30
  else if (views >= THRESHOLDS.views.good) score += 20
  else if (views >= THRESHOLDS.views.average) score += 10

  // Watch time score (0-40 points)
  if (watchTime >= THRESHOLDS.watchTime.excellent) score += 40
  else if (watchTime >= THRESHOLDS.watchTime.good) score += 30
  else if (watchTime >= THRESHOLDS.watchTime.average) score += 15

  // Engagement score (0-30 points)
  if (engagementRate >= THRESHOLDS.engagement.excellent) score += 30
  else if (engagementRate >= THRESHOLDS.engagement.good) score += 20
  else if (engagementRate >= THRESHOLDS.engagement.average) score += 10

  return Math.min(100, score)
}

// Suggest next format
function suggestNextFormat(
  currentFormatSlug: string,
  views: number,
  watchTime: number,
  engagementRate: number
): { format: ShortsFormat; reason: string } {
  const currentFormat = formats.find(f => f.slug === currentFormatSlug)
  
  // If performance is poor, suggest a different format
  if (watchTime < THRESHOLDS.watchTime.average && views < THRESHOLDS.views.average) {
    // Low performance - suggest simpler, more engaging format
    const quickTips = formats.find(f => f.slug === 'quick-tips')
    if (quickTips && currentFormatSlug !== 'quick-tips') {
      return {
        format: quickTips,
        reason: 'Your current format struggled with retention. Try Quick Tips - it\'s easier to execute and delivers immediate value that keeps viewers watching.',
      }
    }
  }

  // If views are low but watch time is good, suggest viral-friendly format
  if (views < THRESHOLDS.views.good && watchTime >= THRESHOLDS.watchTime.good) {
    const beforeAfter = formats.find(f => f.slug === 'before-after')
    if (beforeAfter && currentFormatSlug !== 'before-after') {
      return {
        format: beforeAfter,
        reason: 'Your content is engaging (good watch time) but needs more reach. Before & After format is highly shareable and can boost your views significantly.',
      }
    }
  }

  // If engagement is low, suggest interactive format
  if (engagementRate < THRESHOLDS.engagement.average) {
    const problemSolution = formats.find(f => f.slug === 'problem-solution')
    if (problemSolution && currentFormatSlug !== 'problem-solution') {
      return {
        format: problemSolution,
        reason: 'Your engagement is low. Problem-Solution format encourages viewers to interact because they want to try the solution themselves.',
      }
    }
  }

  // If everything is good, suggest advancing to more complex format
  if (watchTime >= THRESHOLDS.watchTime.good && engagementRate >= THRESHOLDS.engagement.good) {
    if (currentFormatSlug === 'quick-tips' || currentFormatSlug === 'problem-solution') {
      const storytelling = formats.find(f => f.slug === 'storytelling')
      if (storytelling) {
        return {
          format: storytelling,
          reason: 'You\'re doing great! Try Storytelling format to build deeper connection with your audience and increase loyalty.',
        }
      }
    }
  }

  // Default: suggest complementary format
  const formatMap: Record<string, string> = {
    'problem-solution': 'before-after',
    'before-after': 'quick-tips',
    'myth-busting': 'problem-solution',
    'quick-tips': 'comparison',
    'storytelling': 'myth-busting',
    'comparison': 'problem-solution',
  }

  const nextSlug = formatMap[currentFormatSlug] || 'quick-tips'
  const nextFormat = formats.find(f => f.slug === nextSlug) || formats[0]
  
  return {
    format: nextFormat,
    reason: `Try ${nextFormat.name} format next. It complements your current format and can help you reach different audience segments.`,
  }
}

// Generate overall assessment
function generateAssessment(score: number, views: number, watchTime: number, engagementRate: number): string {
  if (score >= 80) {
    return 'Outstanding performance! Your video hit all the key metrics. Keep doing what you\'re doing and consider scaling this approach.'
  } else if (score >= 60) {
    return 'Solid performance! You\'re on the right track. There\'s room for improvement, but you\'re building a good foundation.'
  } else if (score >= 40) {
    return 'Room for improvement. Your video had some strengths but also areas that need work. Focus on the feedback below to improve your next video.'
  } else {
    return 'This video didn\'t perform as well as it could. Don\'t worry - every creator has videos like this. Use the feedback below to improve your next attempt.'
  }
}

export function analyzePerformance(input: PerformanceInput): PerformanceFeedback {
  const { views, averageWatchTime, likes, formatSlug } = input

  // Calculate engagement rate
  const engagementRate = calculateEngagementRate(views, likes)

  // Assess each metric
  const viewsAssessment = assessViews(views)
  const watchTimeAssessment = assessWatchTime(averageWatchTime)
  const engagementAssessment = assessEngagement(engagementRate)

  // Build what worked and what failed
  const whatWorked: string[] = []
  const whatFailed: string[] = []

  if (viewsAssessment.level === 'excellent' || viewsAssessment.level === 'good') {
    whatWorked.push(viewsAssessment.feedback)
  } else {
    whatFailed.push(viewsAssessment.feedback)
  }

  if (watchTimeAssessment.level === 'excellent' || watchTimeAssessment.level === 'good') {
    whatWorked.push(watchTimeAssessment.feedback)
  } else {
    whatFailed.push(watchTimeAssessment.feedback)
  }

  if (engagementAssessment.level === 'excellent' || engagementAssessment.level === 'good') {
    whatWorked.push(engagementAssessment.feedback)
  } else {
    whatFailed.push(engagementAssessment.feedback)
  }

  // Get format-specific insights
  const formatInsights = getFormatInsights(formatSlug, views, averageWatchTime, engagementRate)
  whatWorked.push(...formatInsights.worked)
  whatFailed.push(...formatInsights.failed)

  // Calculate score
  const score = calculateScore(views, averageWatchTime, engagementRate)

  // Generate assessment
  const overallAssessment = generateAssessment(score, views, averageWatchTime, engagementRate)

  // Suggest next format
  const nextFormatSuggestion = suggestNextFormat(formatSlug, views, averageWatchTime, engagementRate)

  return {
    whatWorked: whatWorked.length > 0 ? whatWorked : ['Your video had some positive aspects. Keep experimenting and learning!'],
    whatFailed: whatFailed.length > 0 ? whatFailed : ['Consider reviewing your hook, content structure, and call-to-action.'],
    nextFormatSuggestion,
    overallAssessment,
    score,
  }
}
