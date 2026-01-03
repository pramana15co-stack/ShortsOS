'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Tool {
  name: string
  category: 'video-editing' | 'script-generation' | 'ai-video' | 'thumbnail' | 'other'
  pricing: 'free' | 'paid' | 'freemium'
  description: string
  bestFor: string
  url: string
  features: string[]
  rating: 'beginner' | 'intermediate' | 'advanced'
}

const tools: Tool[] = [
  // Video Editing Tools
  {
    name: 'CapCut',
    category: 'video-editing',
    pricing: 'free',
    description: 'User-friendly video editor with AI features like auto captions, voice changers, and templates perfect for YouTube Shorts.',
    bestFor: 'Beginners who want quick, professional-looking Shorts',
    url: 'https://www.capcut.com',
    features: ['Auto captions', 'AI voice changer', 'Templates library', 'Mobile & desktop', 'Free music library'],
    rating: 'beginner'
  },
  {
    name: 'DaVinci Resolve',
    category: 'video-editing',
    pricing: 'free',
    description: 'Professional-grade video editor with advanced editing, color correction, and visual effects. Industry-standard quality.',
    bestFor: 'Creators who want professional quality and advanced features',
    url: 'https://www.blackmagicdesign.com/products/davinciresolve',
    features: ['Professional editing', 'Color grading', 'Visual effects', 'Audio mixing', '4K+ support'],
    rating: 'intermediate'
  },
  {
    name: 'VSDC Free Video Editor',
    category: 'video-editing',
    pricing: 'free',
    description: 'Non-linear editor supporting high-resolution footage, 3D videos, color correction, and motion tracking.',
    bestFor: 'Intermediate creators needing advanced features without cost',
    url: 'https://www.videosoftdev.com',
    features: ['4K editing', '3D & VR support', 'Motion tracking', 'Color correction', 'No watermark'],
    rating: 'intermediate'
  },
  {
    name: 'Adobe Premiere Pro',
    category: 'video-editing',
    pricing: 'paid',
    description: 'Industry-leading professional video editing software with comprehensive tools and seamless integration with other Adobe apps.',
    bestFor: 'Professional creators and serious content creators',
    url: 'https://www.adobe.com/products/premiere.html',
    features: ['Professional editing', 'Motion graphics', 'Color grading', 'Audio editing', 'Cloud sync'],
    rating: 'advanced'
  },
  {
    name: 'Final Cut Pro',
    category: 'video-editing',
    pricing: 'paid',
    description: 'Apple\'s professional video editing software with powerful features and optimized for Mac performance.',
    bestFor: 'Mac users who want professional editing capabilities',
    url: 'https://www.apple.com/final-cut-pro',
    features: ['Optimized for Mac', 'Magnetic timeline', 'Advanced color grading', 'Motion graphics', 'One-time purchase'],
    rating: 'advanced'
  },
  
  // Script Generation Tools
  {
    name: 'ShortsOS Script Generator',
    category: 'script-generation',
    pricing: 'free',
    description: 'Generate complete 30-45 second YouTube Shorts scripts based on proven formats. Built specifically for Shorts creators.',
    bestFor: 'YouTube Shorts creators who want format-based scripts',
    url: '/scripts',
    features: ['Format-based templates', 'Hook + body + CTA', '30-45 second scripts', 'Topic customization', 'Free forever'],
    rating: 'beginner'
  },
  {
    name: 'Planable AI Script Generator',
    category: 'script-generation',
    pricing: 'free',
    description: 'AI-powered video script generator that creates engaging scripts without login. Great for overcoming creative blocks.',
    bestFor: 'Creators who need AI-generated script ideas',
    url: 'https://planable.io/video-script-generator',
    features: ['AI-powered', 'No login required', 'Multiple formats', 'Brand voice customization', 'Free tier available'],
    rating: 'beginner'
  },
  {
    name: 'Jasper AI',
    category: 'script-generation',
    pricing: 'paid',
    description: 'Advanced AI writing assistant that can generate video scripts, hooks, and content ideas with brand voice customization.',
    bestFor: 'Creators who want AI-powered content creation at scale',
    url: 'https://www.jasper.ai',
    features: ['AI writing', 'Brand voice', 'Multiple templates', 'Content calendar', 'Team collaboration'],
    rating: 'intermediate'
  },
  {
    name: 'Copy.ai',
    category: 'script-generation',
    pricing: 'freemium',
    description: 'AI copywriting tool that generates video scripts, hooks, and social media content. Free tier with paid upgrades.',
    bestFor: 'Content creators who need versatile AI writing assistance',
    url: 'https://www.copy.ai',
    features: ['Video scripts', 'Hook generation', 'Social media content', 'Free tier', 'Multiple languages'],
    rating: 'beginner'
  },
  
  // AI Video Creation Tools
  {
    name: 'Pictory',
    category: 'ai-video',
    pricing: 'paid',
    description: 'Transform scripts, blog posts, or articles into professional videos. Automatically selects visuals and adds voiceovers.',
    bestFor: 'Creators who want to turn scripts into videos automatically',
    url: 'https://pictory.ai',
    features: ['Script to video', 'Auto visuals', 'Voiceover generation', 'Caption generation', 'Stock media'],
    rating: 'beginner'
  },
  {
    name: 'Google Vids',
    category: 'ai-video',
    pricing: 'paid',
    description: 'AI-powered online video editor that helps create informational videos with AI-assisted storyboards and voiceovers.',
    bestFor: 'Google Workspace users who want integrated video creation',
    url: 'https://workspace.google.com/products/vids',
    features: ['AI storyboards', 'Stock videos', 'AI voiceovers', 'Google integration', 'Collaboration'],
    rating: 'beginner'
  },
  {
    name: 'FlexClip',
    category: 'ai-video',
    pricing: 'freemium',
    description: 'AI script-to-video generator that creates engaging videos from URLs or text. Great for explainers and social media.',
    bestFor: 'Quick video creation from scripts or articles',
    url: 'https://www.flexclip.com',
    features: ['Script to video', 'URL to video', 'Effects & transitions', 'Free templates', 'Stock media'],
    rating: 'beginner'
  },
  {
    name: 'InVideo AI',
    category: 'ai-video',
    pricing: 'paid',
    description: 'AI video generator that creates complete videos from text prompts. Includes voiceover, visuals, and editing.',
    bestFor: 'Creators who want fully automated video creation',
    url: 'https://invideo.io',
    features: ['Text to video', 'AI voiceover', 'Auto editing', 'Stock media', 'Multiple formats'],
    rating: 'beginner'
  },
  
  // Thumbnail Tools
  {
    name: 'Canva',
    category: 'thumbnail',
    pricing: 'freemium',
    description: 'Popular design tool with YouTube thumbnail templates, stock photos, and easy-to-use design features.',
    bestFor: 'Beginners who want professional thumbnails without design skills',
    url: 'https://www.canva.com',
    features: ['Thumbnail templates', 'Stock photos', 'Text effects', 'Free tier', 'Mobile app'],
    rating: 'beginner'
  },
  {
    name: 'Adobe Express',
    category: 'thumbnail',
    pricing: 'freemium',
    description: 'Quick and easy design tool with YouTube thumbnail templates and Adobe-quality graphics.',
    bestFor: 'Creators who want Adobe quality with simplicity',
    url: 'https://www.adobe.com/express',
    features: ['Thumbnail templates', 'Adobe fonts', 'Stock assets', 'Quick actions', 'Free tier'],
    rating: 'beginner'
  },
  {
    name: 'Photoshop',
    category: 'thumbnail',
    pricing: 'paid',
    description: 'Professional image editing software for creating custom, high-quality thumbnails with advanced features.',
    bestFor: 'Advanced creators who want full control over thumbnail design',
    url: 'https://www.adobe.com/products/photoshop.html',
    features: ['Advanced editing', 'Layers & masks', 'Custom graphics', 'Professional quality', 'Cloud sync'],
    rating: 'advanced'
  },
  
  // Other Tools
  {
    name: 'TubeBuddy',
    category: 'other',
    pricing: 'freemium',
    description: 'YouTube optimization tool with SEO analysis, keyword research, thumbnail A/B testing, and bulk operations.',
    bestFor: 'YouTube creators who want to optimize their channel',
    url: 'https://www.tubebuddy.com',
    features: ['SEO analysis', 'Keyword research', 'Thumbnail A/B test', 'Bulk operations', 'Free tier'],
    rating: 'beginner'
  },
  {
    name: 'vidIQ',
    category: 'other',
    pricing: 'freemium',
    description: 'YouTube growth tool with keyword research, competitor analysis, SEO optimization, and analytics.',
    bestFor: 'Creators focused on YouTube growth and optimization',
    url: 'https://vidiq.com',
    features: ['Keyword research', 'Competitor analysis', 'SEO score', 'Trend alerts', 'Free tier'],
    rating: 'beginner'
  },
  {
    name: 'OBS Studio',
    category: 'other',
    pricing: 'free',
    description: 'Free and open source software for video recording and live streaming. Perfect for screen recording.',
    bestFor: 'Creators who need screen recording or live streaming',
    url: 'https://obsproject.com',
    features: ['Screen recording', 'Live streaming', 'Scene composition', 'Free & open source', 'No watermark'],
    rating: 'intermediate'
  },
  {
    name: 'Loom',
    category: 'other',
    pricing: 'freemium',
    description: 'Quick screen recording tool with instant sharing. Great for creating tutorial Shorts or quick explanations.',
    bestFor: 'Quick screen recordings and tutorials',
    url: 'https://www.loom.com',
    features: ['Quick recording', 'Instant sharing', 'Screen + camera', 'Free tier', 'Easy to use'],
    rating: 'beginner'
  }
]

export default function ToolsPage() {
  const categories = [
    { id: 'all', label: 'All Tools', icon: '🛠️' },
    { id: 'video-editing', label: 'Video Editing', icon: '✂️' },
    { id: 'script-generation', label: 'Script Generation', icon: '📝' },
    { id: 'ai-video', label: 'AI Video Creation', icon: '🤖' },
    { id: 'thumbnail', label: 'Thumbnails', icon: '🖼️' },
    { id: 'other', label: 'Other Tools', icon: '🔧' },
  ]

  const pricingTypes = [
    { id: 'all', label: 'All Pricing' },
    { id: 'free', label: 'Free' },
    { id: 'freemium', label: 'Free + Paid' },
    { id: 'paid', label: 'Paid' },
  ]

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPricing, setSelectedPricing] = useState<string>('all')

  const filteredTools = tools.filter(tool => {
    const categoryMatch = selectedCategory === 'all' || tool.category === selectedCategory
    const pricingMatch = selectedPricing === 'all' || tool.pricing === selectedPricing
    return categoryMatch && pricingMatch
  })

  const getPricingBadge = (pricing: string) => {
    const badges = {
      free: { text: 'Free', color: 'bg-green-100 text-green-700 border-green-300' },
      freemium: { text: 'Free + Paid', color: 'bg-blue-100 text-blue-700 border-blue-300' },
      paid: { text: 'Paid', color: 'bg-purple-100 text-purple-700 border-purple-300' }
    }
    const badge = badges[pricing as keyof typeof badges]
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
        {badge.text}
      </span>
    )
  }

  const getRatingBadge = (rating: string) => {
    const badges = {
      beginner: { text: 'Beginner', color: 'bg-green-50 text-green-600' },
      intermediate: { text: 'Intermediate', color: 'bg-yellow-50 text-yellow-600' },
      advanced: { text: 'Advanced', color: 'bg-red-50 text-red-600' }
    }
    const badge = badges[rating as keyof typeof badges]
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${badge.color}`}>
        {badge.text}
      </span>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">Curated Tool Recommendations</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            Essential Tools for <span className="gradient-text">Shorts Creators</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the best free and paid tools for video editing, script generation, and content creation. 
            Handpicked recommendations to help you create better Shorts faster.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pricing</label>
            <div className="flex flex-wrap gap-2">
              {pricingTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedPricing(type.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedPricing === type.id
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTools.map((tool, idx) => (
            <div
              key={tool.name}
              className="glass-effect rounded-2xl p-6 premium-shadow hover-lift animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                {getRatingBadge(tool.rating)}
              </div>
              
              <div className="mb-4">
                {getPricingBadge(tool.pricing)}
              </div>

              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{tool.description}</p>

              <div className="mb-4">
                <div className="text-xs font-semibold text-gray-500 mb-1">Best For:</div>
                <div className="text-sm text-gray-700">{tool.bestFor}</div>
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold text-gray-500 mb-2">Key Features:</div>
                <ul className="space-y-1">
                  {tool.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                      <span className="text-primary-600 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {tool.features.length > 3 && (
                    <li className="text-xs text-gray-500">+ {tool.features.length - 3} more</li>
                  )}
                </ul>
              </div>

              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Visit Tool →
              </a>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-3xl p-12 premium-shadow animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready to Create Better Shorts?</h2>
            <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
              Use our free tools to plan, optimize, and grow your YouTube Shorts channel. 
              No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start Creating Free →
              </Link>
              <Link
                href="/scripts"
                className="inline-block glass-effect border-2 border-primary-200 text-primary-700 px-10 py-5 rounded-xl font-semibold text-lg hover:border-primary-400 transition-all duration-300"
              >
                Try Script Generator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


