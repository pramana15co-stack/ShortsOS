export interface Testimonial {
  id: string
  name: string
  role: string
  image?: string
  product: string
  rating: number
  text: string
  results?: string
  verified?: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Fitness Creator',
    product: 'Complete Shorts Creator Bundle',
    rating: 5,
    text: 'I went from 0 to 2,400 subscribers in 10 weeks using the Beginner Execution Path. The format guides are incredibly clear and the script templates saved me hours every week.',
    results: '0 → 2,400 subscribers in 10 weeks',
    verified: true
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Tech Tips Creator',
    product: 'Full-Proof Formats Pack',
    rating: 5,
    text: 'The Problem-Solution format alone got me my first 10K views. Now I consistently hit 5K+ views per video. The templates are gold.',
    results: 'Consistent 5K+ views per video',
    verified: true
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    role: 'Productivity Creator',
    product: 'Beginner Success Plan',
    rating: 5,
    text: 'As a complete beginner, I was overwhelmed. The step-by-step plan made everything clear. I posted my first video that got 300 views, and now I\'m consistently getting 800+ views.',
    results: '300 → 800+ views consistently',
    verified: true
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Cooking Creator',
    product: 'Growth Accelerator Plan',
    rating: 5,
    text: 'I was stuck at 1,200 subscribers for months. The Growth Accelerator Plan helped me understand optimization and I hit 8,500 subscribers in 14 weeks.',
    results: '1,200 → 8,500 subscribers in 14 weeks',
    verified: true
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'Lifestyle Creator',
    product: 'Monetization Mastery Course',
    rating: 5,
    text: 'I started earning $400/month from affiliate marketing within 6 weeks of following the course. The templates and strategies are exactly what I needed.',
    results: '$400/month in 6 weeks',
    verified: true
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Gaming Creator',
    product: 'Complete Shorts Creator Bundle',
    rating: 5,
    text: 'Best investment I\'ve made for my channel. The bundle has everything - formats, scripts, growth strategies. My views increased 4x in 8 weeks.',
    results: '4x views increase in 8 weeks',
    verified: true
  }
]

export function getTestimonialsByProduct(productSlug: string): Testimonial[] {
  return testimonials.filter(t => t.product.toLowerCase().includes(productSlug.toLowerCase()) || productSlug === 'all')
}





