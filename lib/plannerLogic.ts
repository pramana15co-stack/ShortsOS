import { formats, ShortsFormat } from '@/data/formats'

export type Goal = 'views' | 'subscribers' | 'affiliate'
export type ExperienceLevel = 'beginner' | 'growing' | 'earning'

export interface PlannerInput {
  niche: string
  goal: Goal
  experienceLevel: ExperienceLevel
}

export interface FormatRecommendation {
  format: ShortsFormat
  score: number
  reason: string
}

export interface PlannerResult {
  recommendations: FormatRecommendation[]
  postingFrequency: string
  frequencyReason: string
}

// Format scoring based on goals
const goalFormatMapping: Record<Goal, Record<string, number>> = {
  views: {
    'problem-solution': 9,
    'before-after': 10,
    'myth-busting': 8,
    'quick-tips': 9,
    'storytelling': 7,
    'comparison': 8,
  },
  subscribers: {
    'problem-solution': 10,
    'before-after': 8,
    'myth-busting': 9,
    'quick-tips': 10,
    'storytelling': 9,
    'comparison': 7,
  },
  affiliate: {
    'problem-solution': 10,
    'before-after': 9,
    'myth-busting': 6,
    'quick-tips': 8,
    'storytelling': 7,
    'comparison': 10,
  },
}

// Niche keywords that favor certain formats
const nicheFormatBoosts: Record<string, string[]> = {
  'fitness': ['before-after', 'comparison'],
  'beauty': ['before-after', 'comparison'],
  'tech': ['problem-solution', 'quick-tips', 'comparison'],
  'productivity': ['problem-solution', 'quick-tips'],
  'cooking': ['problem-solution', 'quick-tips', 'before-after'],
  'education': ['myth-busting', 'problem-solution'],
  'motivation': ['storytelling', 'before-after'],
  'business': ['storytelling', 'problem-solution'],
  'finance': ['myth-busting', 'comparison'],
  'health': ['myth-busting', 'before-after'],
}

// Experience level adjustments
const experienceAdjustments: Record<ExperienceLevel, Record<string, number>> = {
  beginner: {
    'quick-tips': 2,
    'problem-solution': 1,
    'before-after': 1,
    'myth-busting': -1,
    'storytelling': -1,
    'comparison': 0,
  },
  growing: {
    'quick-tips': 1,
    'problem-solution': 1,
    'before-after': 1,
    'myth-busting': 1,
    'storytelling': 1,
    'comparison': 1,
  },
  earning: {
    'quick-tips': 0,
    'problem-solution': 1,
    'before-after': 1,
    'myth-busting': 2,
    'storytelling': 2,
    'comparison': 2,
  },
}

function getNicheBoosts(niche: string): string[] {
  const lowerNiche = niche.toLowerCase()
  for (const [keyword, formats] of Object.entries(nicheFormatBoosts)) {
    if (lowerNiche.includes(keyword)) {
      return formats
    }
  }
  return []
}

function generateReason(
  format: ShortsFormat,
  goal: Goal,
  experienceLevel: ExperienceLevel,
  niche: string,
  score: number
): string {
  const reasons: string[] = []
  
  // Goal-based reason
  if (goal === 'views') {
    if (format.slug === 'before-after' || format.slug === 'problem-solution') {
      reasons.push('This format is highly shareable and performs well for viral reach')
    } else if (format.slug === 'quick-tips') {
      reasons.push('Quick tips have high watch-through rates, boosting your views')
    }
  } else if (goal === 'subscribers') {
    if (format.slug === 'problem-solution' || format.slug === 'quick-tips') {
      reasons.push('Provides immediate value that encourages viewers to subscribe for more')
    } else if (format.slug === 'storytelling') {
      reasons.push('Creates emotional connection that builds loyal subscribers')
    }
  } else if (goal === 'affiliate') {
    if (format.slug === 'comparison' || format.slug === 'problem-solution') {
      reasons.push('Perfect for showcasing products and driving purchase decisions')
    } else if (format.slug === 'before-after') {
      reasons.push('Demonstrates product results effectively')
    }
  }

  // Experience-based reason
  if (experienceLevel === 'beginner') {
    if (format.slug === 'quick-tips' || format.slug === 'problem-solution') {
      reasons.push('Easy to execute with clear structure - perfect for beginners')
    }
  } else if (experienceLevel === 'earning') {
    if (format.slug === 'myth-busting' || format.slug === 'storytelling') {
      reasons.push('Requires expertise and authority - matches your experience level')
    }
  }

  // Niche-based reason
  const nicheBoosts = getNicheBoosts(niche)
  if (nicheBoosts.includes(format.slug)) {
    reasons.push(`Highly effective for ${niche} content based on proven results`)
  }

  // Fallback reason
  if (reasons.length === 0) {
    reasons.push(`Strong match for your ${goal} goal and ${experienceLevel} experience level`)
  }

  return reasons.join('. ') + '.'
}

export function generatePlan(input: PlannerInput): PlannerResult {
  const { niche, goal, experienceLevel } = input

  // Calculate scores for each format
  const formatScores: FormatRecommendation[] = formats.map((format) => {
    let score = goalFormatMapping[goal][format.slug] || 5

    // Apply experience level adjustments
    score += experienceAdjustments[experienceLevel][format.slug] || 0

    // Apply niche boosts
    const nicheBoosts = getNicheBoosts(niche)
    if (nicheBoosts.includes(format.slug)) {
      score += 2
    }

    const reason = generateReason(format, goal, experienceLevel, niche, score)

    return {
      format,
      score,
      reason,
    }
  })

  // Sort by score and take top 3
  const recommendations = formatScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  // Determine posting frequency
  let postingFrequency: string
  let frequencyReason: string

  if (experienceLevel === 'beginner') {
    postingFrequency = '2-3 times per week'
    frequencyReason = 'As a beginner, consistency is more important than frequency. Start with 2-3 videos per week to build the habit and maintain quality.'
  } else if (experienceLevel === 'growing') {
    postingFrequency = 'Daily (5-7 times per week)'
    frequencyReason = 'At the growing stage, daily posting maximizes your reach and helps you find what resonates with your audience. The algorithm favors consistent daily creators.'
  } else {
    postingFrequency = 'Daily (7+ times per week) or multiple times per day'
    frequencyReason = 'As an earning creator, you have the systems in place. Posting multiple times per day can significantly boost your reach and revenue potential.'
  }

  // Adjust based on goal
  if (goal === 'views') {
    if (experienceLevel !== 'beginner') {
      postingFrequency = 'Daily (1-2 times per day)'
      frequencyReason += ' For maximum views, daily posting keeps you in the algorithm and increases chances of going viral.'
    }
  } else if (goal === 'affiliate') {
    if (experienceLevel === 'earning') {
      postingFrequency = 'Daily (2-3 times per day)'
      frequencyReason += ' Multiple posts per day with affiliate content can significantly increase your earning potential.'
    }
  }

  return {
    recommendations,
    postingFrequency,
    frequencyReason,
  }
}
