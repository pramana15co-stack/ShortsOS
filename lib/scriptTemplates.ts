import { formats, ShortsFormat, getFormatBySlug } from '@/data/formats'

export interface ScriptInput {
  topic: string
  formatSlug: string
}

export interface GeneratedScript {
  hook: string
  body: string
  cta: string
  fullScript: string
  estimatedSeconds: number
}

// Topic-specific placeholders and replacements
const topicReplacements: Record<string, string[]> = {
  productivity: ['time management', 'getting things done', 'focus', 'efficiency'],
  fitness: ['working out', 'building muscle', 'losing weight', 'staying active'],
  cooking: ['making meals', 'cooking techniques', 'recipe tips', 'kitchen hacks'],
  tech: ['using technology', 'tech tips', 'software tricks', 'digital tools'],
  business: ['growing business', 'making money', 'entrepreneurship', 'success'],
  motivation: ['staying motivated', 'achieving goals', 'personal growth', 'mindset'],
}

// Get topic-specific words
function getTopicWords(topic: string): string[] {
  const lowerTopic = topic.toLowerCase()
  for (const [key, words] of Object.entries(topicReplacements)) {
    if (lowerTopic.includes(key)) {
      return words
    }
  }
  // Default generic words
  return ['improving', 'mastering', 'learning', 'achieving']
}

// Replace generic placeholders with topic-specific content
function customizeScript(template: string, topic: string): string {
  let customized = template
  const topicWords = getTopicWords(topic)
  
  // Replace common placeholders
  customized = customized.replace(/\[specific problem\]/g, `struggling with ${topic}`)
  customized = customized.replace(/\[common mistake\]/g, `the wrong way to approach ${topic}`)
  customized = customized.replace(/\[Action\]/g, topicWords[0] || 'improving')
  customized = customized.replace(/\[insight\]/g, `understanding ${topic} better`)
  customized = customized.replace(/\[reason\]/g, `it works for ${topic}`)
  customized = customized.replace(/\[niche\]/g, topic)
  customized = customized.replace(/\[beginning\]/g, `I started learning about ${topic}`)
  customized = customized.replace(/\[middle\/conflict\]/g, `I struggled with ${topic}`)
  customized = customized.replace(/\[attempt\]/g, `trying different ${topic} methods`)
  customized = customized.replace(/\[obstacle\]/g, `nothing worked for ${topic}`)
  customized = customized.replace(/\[resolution\]/g, `I found the right ${topic} approach`)
  customized = customized.replace(/\[lesson\]/g, `how to master ${topic}`)
  customized = customized.replace(/\[application\]/g, `apply this to ${topic}`)
  customized = customized.replace(/\[benefit\]/g, `improve your ${topic}`)
  customized = customized.replace(/\[Tip\]/g, `${topic} technique`)
  customized = customized.replace(/\[Quick demonstration\]/g, `how to do ${topic}`)
  customized = customized.replace(/\[Mistake\]/g, `common ${topic} mistake`)
  customized = customized.replace(/\[Specific action\]/g, `start with ${topic}`)
  customized = customized.replace(/\[Option A\]/g, `First ${topic} method`)
  customized = customized.replace(/\[Option B\]/g, `Second ${topic} method`)
  customized = customized.replace(/\[benefits\]/g, `advantages for ${topic}`)
  customized = customized.replace(/\[drawbacks\]/g, `challenges with ${topic}`)
  customized = customized.replace(/\[use case\]/g, `${topic} situations`)
  customized = customized.replace(/\[situation\]/g, `${topic} scenario`)
  customized = customized.replace(/\[option\]/g, `${topic} approach`)
  customized = customized.replace(/\[common myth\]/g, `myth about ${topic}`)
  customized = customized.replace(/\[fact\]/g, `the truth about ${topic}`)
  customized = customized.replace(/\[evidence\]/g, `research on ${topic}`)
  customized = customized.replace(/\[explanation\]/g, `why ${topic} works this way`)
  customized = customized.replace(/\[impact\]/g, `how ${topic} affects you`)
  customized = customized.replace(/\[consequence\]/g, `struggle with ${topic}`)
  customized = customized.replace(/\[specific thing\]/g, `the key to ${topic}`)
  customized = customized.replace(/\[Phase 1 actions\]/g, `focus on ${topic} basics`)
  customized = customized.replace(/\[Phase 2 actions\]/g, `advance your ${topic} skills`)
  customized = customized.replace(/\[Phase 3 actions\]/g, `master ${topic}`)
  customized = customized.replace(/\[dramatic situation\]/g, `I almost quit ${topic}`)
  customized = customized.replace(/\[feeling\/state\]/g, `frustrated with ${topic}`)
  
  return customized
}

// Extract sections from template
function extractSections(template: string): { hook: string; body: string; cta: string } {
  const lines = template.split('\n')
  let hook = ''
  let body = ''
  let cta = ''
  let currentSection = 'hook'
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    
    // Detect section markers
    if (trimmed.includes('[HOOK') || trimmed.includes('[SETUP')) {
      currentSection = 'hook'
      continue
    }
    if (trimmed.includes('[SOLUTION') || trimmed.includes('[TRANSFORMATION') || 
        trimmed.includes('[THE STORY') || trimmed.includes('[THE TRUTH') ||
        trimmed.includes('[TIP') || trimmed.includes('[OPTION')) {
      currentSection = 'body'
      continue
    }
    if (trimmed.includes('[CTA') || trimmed.includes('[VERDICT') || 
        trimmed.includes('[THE LESSON') || trimmed.includes('[WHY IT MATTERS')) {
      if (currentSection === 'body') {
        // This might be part of body or CTA, check content
        if (trimmed.includes('Follow') || trimmed.includes('Comment') || 
            trimmed.includes('Save') || trimmed.includes('Subscribe')) {
          currentSection = 'cta'
        } else {
          currentSection = 'body'
        }
      } else {
        currentSection = 'cta'
      }
      continue
    }
    
    // Skip section markers themselves
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) continue
    
    // Add to appropriate section
    if (currentSection === 'hook') {
      hook += (hook ? ' ' : '') + trimmed.replace(/^"/, '').replace(/"$/, '')
    } else if (currentSection === 'body') {
      body += (body ? ' ' : '') + trimmed.replace(/^"/, '').replace(/"$/, '')
    } else if (currentSection === 'cta') {
      cta += (cta ? ' ' : '') + trimmed.replace(/^"/, '').replace(/"$/, '')
    }
  }
  
  return { hook, body, cta }
}

// Estimate script duration (average speaking rate: 150 words per minute = 2.5 words per second)
function estimateDuration(text: string): number {
  const words = text.split(/\s+/).filter(w => w.length > 0).length
  const wordsPerSecond = 2.5
  return Math.ceil(words / wordsPerSecond)
}

// Adjust script to be 30-45 seconds
function adjustScriptLength(hook: string, body: string, cta: string): {
  hook: string
  body: string
  cta: string
} {
  const fullText = `${hook} ${body} ${cta}`
  const currentDuration = estimateDuration(fullText)
  
  // If too short, expand body
  if (currentDuration < 30) {
    const neededWords = (30 - currentDuration) * 2.5
    body += ` Here's the key detail that makes this work. This approach has proven results.`
  }
  
  // If too long, trim body
  if (currentDuration > 45) {
    const words = body.split(/\s+/)
    const targetWords = Math.floor(words.length * (40 / currentDuration))
    body = words.slice(0, targetWords).join(' ') + '...'
  }
  
  return { hook, body, cta }
}

export function generateScript(input: ScriptInput): GeneratedScript | null {
  const { topic, formatSlug } = input
  
  if (!topic.trim() || !formatSlug) {
    return null
  }
  
  const format = getFormatBySlug(formatSlug)
  if (!format) {
    return null
  }
  
  // Get and customize the template
  let template = format.scriptTemplate
  template = customizeScript(template, topic)
  
  // Extract sections
  let { hook, body, cta } = extractSections(template)
  
  // Adjust length to 30-45 seconds
  const adjusted = adjustScriptLength(hook, body, cta)
  hook = adjusted.hook
  body = adjusted.body
  cta = adjusted.cta
  
  // Create full script
  const fullScript = `${hook}\n\n${body}\n\n${cta}`
  const estimatedSeconds = estimateDuration(fullScript)
  
  return {
    hook,
    body,
    cta,
    fullScript,
    estimatedSeconds: Math.min(estimatedSeconds, 45),
  }
}



