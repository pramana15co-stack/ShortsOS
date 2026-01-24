'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import { useAccess } from '@/lib/useAccess'
import { getCreditsInfo, hasEnoughCredits, getCreditCost } from '@/lib/credits'
import Link from 'next/link'
import CreditsDisplay from '@/components/CreditsDisplay'

interface ContentIdea {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
}

const trendingCategories = [
  'Tech Tips',
  'Life Hacks',
  'Motivation',
  'Comedy',
  'Education',
  'Fitness',
  'Cooking',
  'Travel',
  'Gaming',
  'Beauty',
]

const ideaTemplates: Record<string, string[]> = {
  'Tech Tips': [
    '5 {topic} Tricks That Will Save You Hours (You\'ve Never Heard of #3)',
    'How to {action} in 60 Seconds (The Method Pros Use)',
    '{Topic} Hack That Changed Everything for Me',
    'The {topic} Setting Everyone Should Change (But Nobody Does)',
    'Why Your {topic} Is Slow (And How to Fix It in 30 Seconds)',
  ],
  'Life Hacks': [
    'This {topic} Life Hack Saves Me $50 Every Month',
    'The {topic} Trick That Changed My Daily Routine',
    '10 Second {topic} Hack (Why Didn\'t I Know This Sooner?)',
    'Stop Doing {topic} the Hard Way - Here\'s the Smart Method',
    'The {topic} Hack That Works Every Single Time',
  ],
  'Motivation': [
    'How I {achievement} in {timeframe} (The Real Story)',
    'The Truth About {topic} (Nobody Tells You This)',
    'Why {topic} Matters More Than You Think (The Science)',
    'I Stopped {action} and Started {better_action} - Here\'s What Happened',
    'The {topic} Mindset That Changed Everything',
  ],
  'Comedy': [
    'When {situation} Goes Completely Wrong (POV: You\'re Me)',
    '{Topic} Be Like... (Relatable Content)',
    'POV: You\'re Trying to {scenario} But Life Has Other Plans',
    'Trying to {action} But Everything Goes Wrong',
    'Me Explaining {topic} to My Friends (They Don\'t Get It)',
  ],
  'Education': [
    'Learn {topic} in 60 Seconds (The Simple Way)',
    'The Science Behind {topic} (Explained Simply)',
    'How {topic} Actually Works (Most People Get This Wrong)',
    'Quick Guide to {topic} (Everything You Need to Know)',
    'The {topic} Method That Actually Works (Not What You Think)',
  ],
  'Fitness': [
    'The {topic} Workout That Changed My Body in 30 Days',
    'Why Your {topic} Routine Isn\'t Working (And What to Do Instead)',
    'The {topic} Exercise Everyone Skips (But Shouldn\'t)',
    'How to {action} Without Equipment (Home Workout)',
    'The {topic} Mistake That\'s Holding You Back',
  ],
  'Cooking': [
    'The {topic} Recipe That Takes 5 Minutes (But Tastes Like Hours)',
    'Why Your {topic} Always Fails (And How to Fix It)',
    'The {topic} Hack That Makes Everything Taste Better',
    'How to {action} Like a Pro (Restaurant Secret)',
    'The {topic} Mistake Everyone Makes (And How to Avoid It)',
  ],
  'Travel': [
    'The {topic} Travel Hack That Saves $100 Every Trip',
    'Why {topic} Is Better Than Everyone Says (Hidden Gems)',
    'The {topic} Mistake That Ruined My Trip (Don\'t Do This)',
    'How to {action} on a Budget (Travel Smart)',
    'The {topic} Secret Locals Don\'t Want You to Know',
  ],
  'Gaming': [
    'The {topic} Strategy That Got Me to Rank 1',
    'Why Your {topic} Build Is Wrong (Here\'s What Works)',
    'The {topic} Trick That Changes Everything',
    'How to {action} Like a Pro (Advanced Tips)',
    'The {topic} Secret That Will Improve Your Game',
  ],
  'Beauty': [
    'The {topic} Routine That Changed My Skin in 2 Weeks',
    'Why Your {topic} Isn\'t Working (And What Actually Does)',
    'The {topic} Product That\'s Worth Every Penny',
    'How to {action} Like a Pro (Beauty Secrets)',
    'The {topic} Mistake That\'s Damaging Your Skin',
  ],
}

// Ensure all categories have templates
trendingCategories.forEach(category => {
  if (!ideaTemplates[category]) {
    ideaTemplates[category] = ideaTemplates['Tech Tips'] || []
  }
})

export default function ContentIdeas() {
  const { user } = useAuth()
  const { isPaid } = useAccess()
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [topic, setTopic] = useState('')
  const [generatedIdeas, setGeneratedIdeas] = useState<ContentIdea[]>([])
  const [savedIdeas, setSavedIdeas] = useState<ContentIdea[]>([])
  const [credits, setCredits] = useState<number | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Check credits on mount
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

  const generateIdeas = async () => {
    if (!selectedCategory || !topic) {
      alert('Please select a category and enter a topic')
      return
    }

    // Check credits for free users
    if (!isPaid && user) {
      await checkCredits()
      const currentCredits = credits !== null ? credits : 0
      if (!hasEnoughCredits(currentCredits, 'content-ideas', isPaid)) {
        setShowUpgradeModal(true)
        return
      }
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          feature: 'content-ideas',
          data: {
            topic: topic,
            category: selectedCategory
          }
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setIsGenerating(false)
        if (result.error === 'Insufficient credits') {
          setShowUpgradeModal(true)
        } else {
          alert(result.error || 'Failed to generate ideas')
        }
        return
      }

      if (result.success && result.data) {
        const ideas = result.data.ideas || []
        // Ensure IDs are unique
        const ideasWithIds = ideas.map((idea: any, idx: number) => ({
          ...idea,
          id: Date.now().toString() + idx
        }))
        setGeneratedIdeas(ideasWithIds)
        
        if (typeof result.creditsRemaining === 'number') {
          setCredits(result.creditsRemaining)
          window.dispatchEvent(new CustomEvent('credits-updated', { detail: { credits: result.creditsRemaining } }))
        }
      }
    } catch (error) {
      console.error('Error generating ideas:', error)
      alert('Failed to process request. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  // Deprecated client-side templates logic
  // const templates = ideaTemplates...
  // const generateDescription...
  // const newIdeas = ...

  const saveIdea = (idea: ContentIdea) => {
    setSavedIdeas([...savedIdeas, idea])
  }

  const removeSavedIdea = (id: string) => {
    setSavedIdeas(savedIdeas.filter(idea => idea.id !== id))
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="card max-w-md w-full">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 text-center">Insufficient Credits</h3>
              <p className="text-gray-600 mb-4 text-center">
                This feature costs <span className="font-bold text-indigo-600">{getCreditCost('content-ideas')} credits</span>. 
                You have <span className="font-bold">{credits || 0} credits</span> remaining.
              </p>
              <p className="text-sm text-gray-500 mb-6 text-center">
                Upgrade to Starter or Pro for unlimited access to all features.
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
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">Content Ideas Generator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mb-4">
                Generate specific, actionable content ideas tailored to your niche. Get beyond generic templates with ideas that actually work for Shorts creators.
              </p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-4 max-w-3xl">
                <p className="text-sm font-semibold text-green-900 mb-1">💰 How This Helps You Profit:</p>
                <p className="text-sm text-green-800">
                  Never run out of content ideas again. A consistent content pipeline is the #1 factor in channel growth. 
                  Our niche-specific ideas are designed to drive engagement and views, helping you build a sustainable content 
                  calendar that keeps your audience engaged and your channel growing. More consistent content = more views = more revenue.
                </p>
              </div>
            </div>
            <div className="ml-4">
              <CreditsDisplay feature="content-ideas" />
            </div>
          </div>
        </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Generate Ideas</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {trendingCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg border-2 transition ${
                      selectedCategory === category
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Topic/Niche
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., productivity, cooking, coding..."
              />
            </div>

            <button
              onClick={generateIdeas}
              disabled={isGenerating}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate Ideas'}
            </button>
          </div>

          {generatedIdeas.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Generated Ideas</h3>
              <div className="space-y-4">
                {generatedIdeas.map(idea => (
                  <div key={idea.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{idea.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{idea.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {idea.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => saveIdea(idea)}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Save Idea →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Saved Ideas</h2>
          
          {savedIdeas.length > 0 ? (
            <div className="space-y-4">
              {savedIdeas.map(idea => (
                <div key={idea.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{idea.title}</h4>
                    <button
                      onClick={() => removeSavedIdea(idea.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{idea.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {idea.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No saved ideas yet</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Generate content ideas above and save your favorites to build your content pipeline. Your saved ideas will appear here for easy access.
                </p>
                <p className="text-sm text-gray-500">
                  💡 Tip: Save ideas that resonate with your audience to create a content backlog
                </p>
              </div>
          )}
        </div>
      </div>
      
      {/* Tips Section */}
      <div className="mt-12 space-y-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-4 text-gray-900">How to Use These Ideas</h3>
          <div className="space-y-4 text-gray-700">
            <div>
              <p className="font-semibold mb-2">1. Be Specific with Your Topic</p>
              <p className="text-sm">Instead of "productivity," use "morning productivity routine" or "productivity apps for students." The more specific your topic, the better the generated ideas will be.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">2. Test Different Categories</p>
              <p className="text-sm">The same topic can work in multiple categories. Try "Tech Tips" for technical content, "Life Hacks" for practical tips, or "Education" for teaching content.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">3. Customize Before Creating</p>
              <p className="text-sm">These are starting points. Add your unique angle, personal experience, or specific examples before filming. Generic ideas become powerful when you add your voice.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">4. Save Your Best Ideas</p>
              <p className="text-sm">Build a content backlog by saving ideas that resonate. Review your saved ideas weekly to plan your content calendar.</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  )
}



