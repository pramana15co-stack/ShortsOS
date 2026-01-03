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

const ideaTemplates = {
  'Tech Tips': [
    '5 {topic} Tricks You Didn\'t Know',
    'How to {action} in 60 Seconds',
    '{Topic} That Will Blow Your Mind',
    'The {topic} Hack Everyone Needs',
  ],
  'Life Hacks': [
    'Life Hack: {idea}',
    'This {topic} Trick Changed Everything',
    '10 Second {topic} Hack',
    'Why Everyone Should {action}',
  ],
  'Motivation': [
    'How I {achievement} in {timeframe}',
    'The Truth About {topic}',
    'Why {topic} Matters More Than You Think',
    'Stop {action} and Start {better_action}',
  ],
  'Comedy': [
    'When {situation} Goes Wrong',
    '{Topic} Be Like...',
    'POV: {scenario}',
    'Trying to {action} But...',
  ],
  'Education': [
    'Learn {topic} in 60 Seconds',
    'The Science Behind {topic}',
    'How {topic} Actually Works',
    'Quick Guide to {topic}',
  ],
}

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
    const newIdeas: ContentIdea[] = templates.slice(0, 4).map((template, idx) => {
      const title = template
        .replace('{topic}', topic)
        .replace('{action}', 'do this')
        .replace('{achievement}', 'achieved this')
        .replace('{timeframe}', '30 days')
        .replace('{situation}', 'this happens')
        .replace('{scenario}', 'you do this')
        .replace('{better_action}', 'doing this')
      
      return {
        id: Date.now().toString() + idx,
        title,
        description: `A ${selectedCategory.toLowerCase()} video about ${topic}`,
        category: selectedCategory,
        tags: [selectedCategory.toLowerCase(), topic.toLowerCase(), 'shorts', 'viral'],
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
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Content Ideas Generator</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
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

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Saved Ideas</h2>
          
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
            <div className="text-center text-gray-500 py-12">
              No saved ideas yet. Generate and save ideas to see them here.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
