export interface Product {
  id: string
  name: string
  slug: string
  type: 'bundle' | 'plan' | 'course'
  price: number
  originalPrice?: number
  description: string
  features: string[]
  outcomes: string[]
  testimonials?: string[]
  stats?: {
    label: string
    value: string
  }[]
  badge?: string
  popular?: boolean
}

export const products: Product[] = [
  {
    id: 'complete-shorts-bundle',
    name: 'Complete Shorts Creator Bundle',
    slug: 'complete-shorts-bundle',
    type: 'bundle',
    price: 97,
    originalPrice: 197,
    description: 'Everything you need to start and scale your YouTube Shorts channel. Includes proven formats, execution paths, scripts, and growth strategies.',
    features: [
      'All 6 proven format guides with execution templates',
      'Beginner to Advanced Execution Paths (3 paths)',
      '50+ ready-to-use script templates',
      '100+ hook variations for different niches',
      'Growth strategy playbook',
      'Analytics interpretation guide',
      'Lifetime access to updates',
      'Private community access'
    ],
    outcomes: [
      'Go from 0 to 1,000+ subscribers in 8-12 weeks',
      'Achieve consistent 1K+ views per video',
      'Build a repeatable content creation system',
      'Understand which formats work for your niche'
    ],
    stats: [
      { label: 'Creators using this bundle', value: '2,847+' },
      { label: 'Average subscriber growth', value: '1,200+ in 10 weeks' },
      { label: 'Success rate', value: '78%' }
    ],
    badge: 'Most Popular',
    popular: true
  },
  {
    id: 'beginner-success-plan',
    name: 'Beginner Success Plan',
    slug: 'beginner-success-plan',
    type: 'plan',
    price: 47,
    originalPrice: 97,
    description: 'A step-by-step plan for creators starting from zero. Includes the Beginner Execution Path, format guides, and weekly action plans.',
    features: [
      'Beginner Execution Path (0 → First Consistent Views)',
      '3 proven format guides for beginners',
      '30 script templates',
      'Weekly action checklist',
      'Progress tracking system',
      'Email support for 30 days'
    ],
    outcomes: [
      'Achieve your first 100-500 views per video',
      'Establish consistent posting habit',
      'Understand what works for your niche',
      'Build foundation for growth'
    ],
    stats: [
      { label: 'Beginners helped', value: '5,200+' },
      { label: 'Average first 100 views', value: 'Within 3 weeks' },
      { label: 'Consistency rate', value: '82%' }
    ]
  },
  {
    id: 'growth-accelerator-plan',
    name: 'Growth Accelerator Plan',
    slug: 'growth-accelerator-plan',
    type: 'plan',
    price: 67,
    originalPrice: 127,
    description: 'For creators who have the basics down and want to scale. Advanced formats, optimization strategies, and growth tactics.',
    features: [
      'Advanced Execution Paths (2 paths)',
      'Advanced format guides (3 formats)',
      'Optimization playbook',
      'Thumbnail and title templates',
      'Engagement strategies',
      'Scaling workflows',
      'Priority email support'
    ],
    outcomes: [
      'Scale from 1K to 10K+ subscribers',
      'Increase average views by 3-5x',
      'Build sustainable content system',
      'Optimize for algorithm growth'
    ],
    stats: [
      { label: 'Creators scaled', value: '1,450+' },
      { label: 'Average growth', value: '8.5x views increase' },
      { label: 'Time to 10K', value: '12-16 weeks' }
    ]
  },
  {
    id: 'full-proof-formats-pack',
    name: 'Full-Proof Formats Pack',
    slug: 'full-proof-formats-pack',
    type: 'bundle',
    price: 37,
    originalPrice: 57,
    description: 'All 6 proven format guides with detailed execution instructions, script templates, and niche-specific variations.',
    features: [
      'All 6 format guides (Problem-Solution, Hook+Value, etc.)',
      'Format-specific script templates (60+ templates)',
      'Niche variations for each format',
      'Common mistakes to avoid',
      'Pacing guidelines',
      'Hook structures for each format'
    ],
    outcomes: [
      'Master all proven Shorts formats',
      'Create content that consistently performs',
      'Understand which format works when',
      'Never run out of content ideas'
    ],
    stats: [
      { label: 'Formats mastered', value: '6 proven structures' },
      { label: 'Templates included', value: '60+' },
      { label: 'Success rate', value: '85%' }
    ]
  },
  {
    id: 'monetization-mastery',
    name: 'Monetization Mastery Course',
    slug: 'monetization-mastery',
    type: 'course',
    price: 127,
    originalPrice: 197,
    description: 'Complete guide to monetizing your Shorts channel. From affiliate marketing to sponsorships, learn how successful creators earn.',
    features: [
      'Affiliate marketing strategies',
      'Sponsorship pitch templates',
      'Revenue optimization tactics',
      'Case studies from earning creators',
      'Pricing negotiation guides',
      'Multiple income stream strategies',
      '6-month access to updates'
    ],
    outcomes: [
      'Set up multiple income streams',
      'Land your first sponsorships',
      'Optimize affiliate revenue',
      'Earn $500-$5,000+ per month'
    ],
    stats: [
      { label: 'Students earning', value: '890+' },
      { label: 'Average monthly income', value: '$1,200+' },
      { label: 'Time to first $100', value: '4-6 weeks' }
    ]
  }
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByType(type: 'bundle' | 'plan' | 'course'): Product[] {
  return products.filter(p => p.type === type)
}





