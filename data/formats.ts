export interface ShortsFormat {
  slug: string
  name: string
  description: string
  bestNiches: string[]
  whyItWorks: string
  hookStructure: string[]
  scriptTemplate: string
  pacingGuidelines: string[]
  commonMistakes: string[]
}

export const formats: ShortsFormat[] = [
  {
    slug: 'problem-solution',
    name: 'Problem-Solution',
    description: 'Identify a common problem and provide a quick, actionable solution.',
    bestNiches: ['Life Hacks', 'Productivity', 'Tech Tips', 'Fitness', 'Cooking'],
    whyItWorks: 'This format taps into viewers\' immediate pain points. People are constantly searching for solutions to problems they face daily. By addressing a specific problem in the first 3 seconds, you create instant relevance and keep viewers watching to see the solution.',
    hookStructure: [
      '0-1s: State the problem directly ("Tired of...", "Struggling with...")',
      '1-2s: Show the negative consequence or frustration',
      '2-3s: Tease the solution ("But here\'s the trick...", "This changed everything...")'
    ],
    scriptTemplate: `[HOOK - 0-3s]
"Are you tired of [specific problem]? I was too, until I discovered this simple trick."

[SETUP - 3-8s]
"Here's what most people do wrong: [common mistake]. But there's a better way."

[SOLUTION - 8-45s]
"Step 1: [Action]
Step 2: [Action]
Step 3: [Action]

The key is [insight]. This works because [reason]."

[CTA - 45-60s]
"Try this and let me know if it works for you! Follow for more [niche] tips."`,
    pacingGuidelines: [
      'Hook: Fast and direct (0-3s) - grab attention immediately',
      'Problem setup: Medium pace (3-8s) - build relatability',
      'Solution: Slower, clear steps (8-45s) - ensure understanding',
      'CTA: Energetic and friendly (45-60s) - encourage engagement'
    ],
    commonMistakes: [
      'Being too vague about the problem - be specific',
      'Rushing through the solution steps - viewers need time to process',
      'Not showing the "before" state clearly',
      'Forgetting to explain WHY the solution works',
      'Weak call-to-action at the end'
    ]
  },
  {
    slug: 'before-after',
    name: 'Before & After',
    description: 'Show a dramatic transformation or comparison to demonstrate value.',
    bestNiches: ['Fitness', 'Beauty', 'Home Improvement', 'Cooking', 'Fashion'],
    whyItWorks: 'Visual transformations are incredibly powerful. The human brain is wired to notice change and contrast. By showing a clear before/after, you create instant proof of value and make viewers want to know "how did they do that?"',
    hookStructure: [
      '0-1s: Show the "after" result (the impressive outcome)',
      '1-2s: Quick flash to "before" state',
      '2-3s: Return to "after" with text overlay ("30 days later...")'
    ],
    scriptTemplate: `[HOOK - 0-3s]
"This is me 30 days ago... [show before]
And this is me now... [show after]"

[TRANSFORMATION - 3-20s]
"Here's exactly what I did:
Day 1-7: [Phase 1 actions]
Day 8-14: [Phase 2 actions]
Day 15-30: [Phase 3 actions]"

[KEY INSIGHT - 20-50s]
"The game-changer was [specific thing]. Most people skip this step, but it's crucial because [reason]."

[CTA - 50-60s]
"Want the full guide? Save this video and follow for more transformations!"`,
    pacingGuidelines: [
      'Hook: Quick visual contrast (0-3s) - immediate impact',
      'Transformation: Steady progression (3-20s) - show the journey',
      'Key insight: Slower, emphasis (20-50s) - the important part',
      'CTA: Confident and inviting (50-60s) - encourage saves'
    ],
    commonMistakes: [
      'Not showing clear enough contrast between before/after',
      'Making the transformation seem too easy or unrealistic',
      'Skipping the "how" - viewers want the process',
      'Not being transparent about timeline or effort required',
      'Weak visual presentation of the transformation'
    ]
  },
  {
    slug: 'myth-busting',
    name: 'Myth Busting',
    description: 'Challenge common misconceptions with surprising facts or evidence.',
    bestNiches: ['Education', 'Health', 'Tech', 'Finance', 'Science'],
    whyItWorks: 'People love being proven wrong in a helpful way. Myth-busting content creates curiosity and positions you as an authority. The "wait, really?" moment keeps viewers engaged to see the explanation.',
    hookStructure: [
      '0-1s: State the common myth ("You\'ve been told...", "Everyone thinks...")',
      '1-2s: Show the "wrong" way most people do it',
      '2-3s: Reveal the truth ("But actually...", "Here\'s what really happens...")'
    ],
    scriptTemplate: `[HOOK - 0-3s]
"You've probably heard that [common myth]. But here's the truth..."

[THE MYTH - 3-10s]
"Most people believe [myth] because [reason]. I used to think this too."

[THE TRUTH - 10-40s]
"But here's what actually happens: [fact]
Studies show [evidence]
The real reason is [explanation]"

[WHY IT MATTERS - 40-55s]
"This matters because [impact]. If you keep believing the myth, you'll [consequence]."

[CTA - 55-60s]
"Follow for more myth-busting content that actually helps you!"`,
    pacingGuidelines: [
      'Hook: Confident contradiction (0-3s) - create intrigue',
      'The myth: Medium pace (3-10s) - establish the misconception',
      'The truth: Slower, evidence-based (10-40s) - build credibility',
      'Why it matters: Emphasize impact (40-55s) - create urgency',
      'CTA: Authoritative but friendly (55-60s)'
    ],
    commonMistakes: [
      'Being condescending about the myth - stay respectful',
      'Not providing enough evidence or explanation',
      'Choosing myths that aren\'t actually common',
      'Making the "truth" too complicated to understand',
      'Not explaining why the myth exists in the first place'
    ]
  },
  {
    slug: 'quick-tips',
    name: 'Quick Tips',
    description: 'Share bite-sized, actionable tips that viewers can implement immediately.',
    bestNiches: ['Productivity', 'Life Hacks', 'Tech Tips', 'Cooking', 'Beauty'],
    whyItWorks: 'Quick tips provide immediate value with minimal time investment. Viewers love content they can use right away. The format is perfect for Shorts because it matches the platform\'s fast-paced nature.',
    hookStructure: [
      '0-1s: Number + benefit ("3 ways to...", "The #1 tip for...")',
      '1-2s: Show a quick preview of the tips',
      '2-3s: Promise value ("You\'ll save time...", "This will change...")'
    ],
    scriptTemplate: `[HOOK - 0-3s]
"Here are 3 [niche] tips that will [benefit] in under 60 seconds."

[TIP 1 - 3-20s]
"Tip #1: [Tip]
Here's how: [Quick demonstration]
This works because [reason]"

[TIP 2 - 20-35s]
"Tip #2: [Tip]
Do this: [Action]
Avoid this: [Mistake]"

[TIP 3 - 35-50s]
"Tip #3: [Tip]
The key is [insight]
Try this: [Specific action]"

[CTA - 50-60s]
"Which tip are you trying first? Comment below!"`,
    pacingGuidelines: [
      'Hook: Fast and energetic (0-3s) - promise value quickly',
      'Each tip: Consistent pace (3-20s each) - easy to follow',
      'Between tips: Quick transitions (1-2s) - maintain momentum',
      'CTA: Interactive and engaging (50-60s) - encourage comments'
    ],
    commonMistakes: [
      'Too many tips - stick to 3-5 maximum',
      'Tips that are too obvious or generic',
      'Not showing HOW to implement the tip',
      'Rushing through explanations',
      'No clear organization or numbering'
    ]
  },
  {
    slug: 'storytelling',
    name: 'Storytelling',
    description: 'Share a personal story or experience that teaches a lesson or provides value.',
    bestNiches: ['Motivation', 'Business', 'Personal Development', 'Travel', 'Lifestyle'],
    whyItWorks: 'Stories create emotional connection and make information memorable. Personal experiences feel authentic and relatable. Viewers stay engaged because they want to know "what happened next?"',
    hookStructure: [
      '0-1s: Start with conflict or intrigue ("I almost gave up...", "This changed everything...")',
      '1-2s: Show the situation or context',
      '2-3s: Tease the outcome or lesson ("Here\'s what I learned...")'
    ],
    scriptTemplate: `[HOOK - 0-3s]
"Last year, I [dramatic situation]. I thought I was [feeling/state], but then..."

[THE STORY - 3-35s]
"It started when [beginning]
Then [middle/conflict]
I tried [attempt]
But [obstacle]
Finally, [resolution]"

[THE LESSON - 35-50s]
"What I learned: [insight]
This taught me [lesson]
Now I always [application]"

[CTA - 50-60s]
"Have you experienced something similar? Share your story in the comments!"`,
    pacingGuidelines: [
      'Hook: Dramatic and intriguing (0-3s) - create curiosity',
      'Story: Varied pace (3-35s) - match the emotional beats',
      'Build tension: Faster during conflict (15-25s)',
      'Resolution: Slower, reflective (25-35s)',
      'Lesson: Clear and thoughtful (35-50s) - the takeaway',
      'CTA: Inviting and personal (50-60s)'
    ],
    commonMistakes: [
      'Story is too long or rambling - keep it focused',
      'No clear lesson or takeaway at the end',
      'Not making it relatable to the audience',
      'Skipping the emotional beats',
      'Weak connection between story and value'
    ]
  },
  {
    slug: 'comparison',
    name: 'Comparison',
    description: 'Compare two or more options, methods, or products to help viewers decide.',
    bestNiches: ['Tech', 'Beauty', 'Fitness', 'Cooking', 'Productivity'],
    whyItWorks: 'Comparison content helps viewers make decisions. People actively search for "X vs Y" content when they\'re considering options. This format provides clear value by doing the research for them.',
    hookStructure: [
      '0-1s: State the comparison ("X vs Y", "Which is better?")',
      '1-2s: Show both options visually',
      '2-3s: Promise the answer ("I tested both...", "Here\'s the truth...")'
    ],
    scriptTemplate: `[HOOK - 0-3s]
"[Option A] vs [Option B] - which one should you choose? I tested both..."

[OPTION A - 3-20s]
"Let's start with [Option A]:
Pros: [benefits]
Cons: [drawbacks]
Best for: [use case]"

[OPTION B - 20-35s]
"Now [Option B]:
Pros: [benefits]
Cons: [drawbacks]
Best for: [use case]"

[VERDICT - 35-55s]
"After testing both, here's my verdict:
If you [situation], choose [option]
If you [situation], choose [option]
The winner is [option] because [reason]"

[CTA - 55-60s]
"Which one are you choosing? Let me know in the comments!"`,
    pacingGuidelines: [
      'Hook: Direct question (0-3s) - create decision urgency',
      'Each option: Balanced pace (3-20s each) - fair comparison',
      'Verdict: Slower, authoritative (35-55s) - the conclusion',
      'CTA: Interactive (55-60s) - get viewer input'
    ],
    commonMistakes: [
      'Being biased toward one option - stay objective',
      'Not clearly explaining the criteria for comparison',
      'Skipping the cons of each option',
      'No clear recommendation at the end',
      'Comparison isn\'t relevant to the target audience'
    ]
  }
]

export function getFormatBySlug(slug: string): ShortsFormat | undefined {
  return formats.find(format => format.slug === slug)
}



