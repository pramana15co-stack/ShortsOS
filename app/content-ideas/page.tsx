'use client'

import { useState } from 'react'

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
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [topic, setTopic] = useState('')
  const [generatedIdeas, setGeneratedIdeas] = useState<ContentIdea[]>([])
  const [savedIdeas, setSavedIdeas] = useState<ContentIdea[]>([])

  const generateIdeas = () => {
    if (!selectedCategory || !topic) {
      alert('Please select a category and enter a topic')
      return
    }

    const templates = ideaTemplates[selectedCategory as keyof typeof ideaTemplates] || ideaTemplates['Tech Tips']
    
    // Generate more specific descriptions based on category and topic
    const generateDescription = (category: string, topic: string, title: string): string => {
      const topicLower = topic.toLowerCase()
      if (category === 'Tech Tips') {
        return `A practical tech tip video showing how to use ${topic} more effectively. Includes step-by-step instructions and time-saving techniques.`
      } else if (category === 'Life Hacks') {
        return `A life hack video demonstrating a simple way to improve your daily routine with ${topic}. Easy to implement and saves time or money.`
      } else if (category === 'Motivation') {
        return `An inspiring video sharing personal experience with ${topic}. Real story with actionable takeaways for viewers.`
      } else if (category === 'Education') {
        return `An educational video breaking down ${topic} in simple terms. Makes complex concepts easy to understand in 60 seconds.`
      } else if (category === 'Fitness') {
        return `A fitness video showing effective ${topic} techniques. Includes proper form, common mistakes, and results you can expect.`
      } else if (category === 'Cooking') {
        return `A cooking video demonstrating ${topic} techniques or recipes. Quick, easy, and delicious results.`
      } else {
        return `A ${category.toLowerCase()} video about ${topic} with practical tips and insights.`
      }
    }
    
    const newIdeas: ContentIdea[] = templates.slice(0, 5).map((template, idx) => {
      // More intelligent replacements based on topic
      const topicWords = topic.split(' ').filter(w => w.length > 2)
      const actionWord = topicWords.find(w => ['learn', 'master', 'improve', 'build', 'create'].includes(w.toLowerCase())) || 'master'
      const achievementWord = topicWords.find(w => ['success', 'results', 'progress', 'growth'].includes(w.toLowerCase())) || 'results'
      
      const title = template
        .replace('{topic}', topic)
        .replace('{Topic}', topic.charAt(0).toUpperCase() + topic.slice(1))
        .replace('{action}', actionWord)
        .replace('{achievement}', achievementWord)
        .replace('{timeframe}', '30 days')
        .replace('{situation}', `${topic} situation`)
        .replace('{scenario}', `doing ${topic}`)
        .replace('{better_action}', `the right way to do ${topic}`)
        .replace('{idea}', topic)
      
      return {
        id: Date.now().toString() + idx,
        title,
        description: generateDescription(selectedCategory, topic, title),
        category: selectedCategory,
        tags: [selectedCategory.toLowerCase(), ...topicWords.slice(0, 2), 'shorts', 'viral', 'tips'],
      }
    })

    setGeneratedIdeas(newIdeas)
  }

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
        <div className="mb-12">
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
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Generate Ideas
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



