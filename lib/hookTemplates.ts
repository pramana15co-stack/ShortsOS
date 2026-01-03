export type Emotion = 'curiosity' | 'shock' | 'urgency' | 'inspiration'
export type AudienceLevel = 'beginner' | 'intermediate' | 'advanced'

export interface HookInput {
  topic: string
  emotion: Emotion
  audienceLevel: AudienceLevel
}

export interface GeneratedHook {
  text: string
  estimatedSeconds: number
}

// Hook templates organized by emotion
const curiosityTemplates = [
  'What if I told you {topic} isn\'t what you think?',
  'You\'ve been doing {topic} wrong this whole time.',
  'The secret to {topic} that nobody talks about.',
  'Why most people fail at {topic} (and how to avoid it).',
  'The {topic} trick that changed everything for me.',
  'What they don\'t want you to know about {topic}.',
  'I tried {topic} for 30 days. Here\'s what happened.',
  'The {topic} mistake that\'s costing you everything.',
  'This {topic} hack will blow your mind.',
  'The truth about {topic} that will shock you.',
]

const shockTemplates = [
  'I can\'t believe {topic} actually works like this.',
  'This {topic} fact will change how you see everything.',
  'You won\'t believe what happened when I tried {topic}.',
  'The {topic} secret that\'s been hidden from you.',
  'I was wrong about {topic}. Here\'s the truth.',
  'This {topic} revelation will shock you.',
  'What I discovered about {topic} will blow your mind.',
  'The {topic} truth nobody wants you to know.',
  'I found out the hard way about {topic}.',
  'This {topic} discovery changed my life completely.',
]

const urgencyTemplates = [
  'Stop wasting time on {topic}. Do this instead.',
  'You need to see this {topic} before it\'s too late.',
  'The {topic} method that works in 60 seconds.',
  'Don\'t make this {topic} mistake everyone else does.',
  'The {topic} shortcut you\'ve been waiting for.',
  'Fix your {topic} problem right now with this.',
  'This {topic} solution works immediately.',
  'The fastest way to master {topic} starts here.',
  'Your {topic} is broken. Here\'s how to fix it now.',
  'The {topic} hack that saves you hours every day.',
]

const inspirationTemplates = [
  'How I went from zero to {topic} in 30 days.',
  'The {topic} journey that changed everything.',
  'You can achieve {topic} too. Here\'s how I did it.',
  'The {topic} transformation that\'s possible for you.',
  'From struggling to {topic} success: my story.',
  'The {topic} breakthrough that changed my life.',
  'How {topic} became my biggest win.',
  'The {topic} mindset shift that changed everything.',
  'You don\'t need to be perfect at {topic}. Start here.',
  'The {topic} lesson I wish I learned sooner.',
]

// Audience level adjustments
const audienceLevelAdjustments: Record<AudienceLevel, {
  prefix: string[]
  complexity: 'simple' | 'medium' | 'complex'
}> = {
  beginner: {
    prefix: ['Simple', 'Easy', 'Quick', 'Basic'],
    complexity: 'simple',
  },
  intermediate: {
    prefix: ['Advanced', 'Pro', 'Expert', 'Master'],
    complexity: 'medium',
  },
  advanced: {
    prefix: ['Elite', 'Professional', 'Advanced', 'Master'],
    complexity: 'complex',
  },
}

// Template mapping
const emotionTemplates: Record<Emotion, string[]> = {
  curiosity: curiosityTemplates,
  shock: shockTemplates,
  urgency: urgencyTemplates,
  inspiration: inspirationTemplates,
}

// Estimate reading time (average: 150 words per minute = 2.5 words per second)
function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).length
  const wordsPerSecond = 2.5
  return Math.ceil(words / wordsPerSecond)
}

// Replace placeholders in template
function replacePlaceholders(template: string, topic: string): string {
  return template.replace(/{topic}/g, topic)
}

// Adjust template based on audience level
function adjustForAudience(
  template: string,
  audienceLevel: AudienceLevel
): string {
  const adjustments = audienceLevelAdjustments[audienceLevel]
  
  // For advanced audience, we might add complexity indicators
  if (audienceLevel === 'advanced' && Math.random() > 0.7) {
    const prefix = adjustments.prefix[Math.floor(Math.random() * adjustments.prefix.length)]
    return `${prefix} ${template}`
  }
  
  // For beginner, ensure simplicity
  if (audienceLevel === 'beginner' && template.includes('complex')) {
    // Simplify complex language
    return template
  }
  
  return template
}

// Shuffle array to get random selection
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function generateHooks(input: HookInput): GeneratedHook[] {
  const { topic, emotion, audienceLevel } = input
  
  if (!topic.trim()) {
    return []
  }
  
  // Get templates for the selected emotion
  const templates = emotionTemplates[emotion]
  
  // Shuffle and take 5 templates
  const selectedTemplates = shuffleArray(templates).slice(0, 5)
  
  // Generate hooks
  const hooks: GeneratedHook[] = selectedTemplates.map((template) => {
    // Adjust for audience level
    let adjustedTemplate = adjustForAudience(template, audienceLevel)
    
    // Replace placeholders
    let hookText = replacePlaceholders(adjustedTemplate, topic)
    
    // Ensure it's under 8 seconds
    let estimatedSeconds = estimateReadingTime(hookText)
    
    // If over 8 seconds, truncate intelligently
    if (estimatedSeconds > 8) {
      const words = hookText.split(/\s+/)
      const maxWords = 8 * 2.5 // 8 seconds * 2.5 words/second
      hookText = words.slice(0, Math.floor(maxWords)).join(' ') + '...'
      estimatedSeconds = estimateReadingTime(hookText)
    }
    
    return {
      text: hookText,
      estimatedSeconds: Math.min(estimatedSeconds, 8),
    }
  })
  
  return hooks
}
