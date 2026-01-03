'use client'

import { useState } from 'react'

interface SEOAnalysis {
  title: {
    score: number
    feedback: string[]
  }
  description: {
    score: number
    feedback: string[]
  }
  tags: {
    score: number
    feedback: string[]
  }
  overall: number
}

export default function SEOOptimizer() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  })
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null)

  const analyzeSEO = () => {
    const titleFeedback: string[] = []
    const descriptionFeedback: string[] = []
    const tagsFeedback: string[] = []

    // Title Analysis
    let titleScore = 100
    if (formData.title.length < 30) {
      titleScore -= 20
      titleFeedback.push('Title is too short. Aim for 30-60 characters.')
    }
    if (formData.title.length > 60) {
      titleScore -= 15
      titleFeedback.push('Title is too long. Keep it under 60 characters for better display.')
    }
    if (!/[!?]/.test(formData.title)) {
      titleScore -= 10
      titleFeedback.push('Consider adding a question or exclamation to increase engagement.')
    }
    if (!/\d/.test(formData.title)) {
      titleScore -= 5
      titleFeedback.push('Numbers in titles can increase click-through rates.')
    }
    if (formData.title.toLowerCase().includes('shorts')) {
      titleScore += 5
      titleFeedback.push('✓ Good: Includes "shorts" keyword.')
    }

    // Description Analysis
    let descriptionScore = 100
    if (formData.description.length < 100) {
      descriptionScore -= 30
      descriptionFeedback.push('Description is too short. Aim for 100-500 characters.')
    }
    if (formData.description.length > 500) {
      descriptionScore -= 10
      descriptionFeedback.push('Description is quite long. Consider keeping it concise.')
    }
    if (!formData.description.includes('#')) {
      descriptionScore -= 15
      descriptionFeedback.push('Add relevant hashtags to improve discoverability.')
    }
    if (formData.description.split(' ').length < 20) {
      descriptionScore -= 10
      descriptionFeedback.push('Add more context and keywords to your description.')
    }

    // Tags Analysis
    let tagsScore = 100
    const tagArray = formData.tags.split(',').map(t => t.trim()).filter(t => t)
    if (tagArray.length < 3) {
      tagsScore -= 30
      tagsFeedback.push('Add at least 3-5 relevant tags.')
    }
    if (tagArray.length > 10) {
      tagsScore -= 10
      tagsFeedback.push('Too many tags. Focus on 5-8 most relevant ones.')
    }
    if (tagArray.some(tag => tag.length > 30)) {
      tagsScore -= 15
      tagsFeedback.push('Some tags are too long. Keep tags concise and specific.')
    }

    const overall = Math.round((titleScore + descriptionScore + tagsScore) / 3)

    setAnalysis({
      title: { score: Math.max(0, titleScore), feedback: titleFeedback },
      description: { score: Math.max(0, descriptionScore), feedback: descriptionFeedback },
      tags: { score: Math.max(0, tagsScore), feedback: tagsFeedback },
      overall,
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">SEO Optimizer</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Enter Your Video Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-gray-500">({formData.title.length}/60)</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your video title..."
                maxLength={60}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-gray-500">({formData.description.length}/500)</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent h-32"
                placeholder="Enter your video description..."
                maxLength={500}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags <span className="text-gray-500">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="shorts, viral, trending, ..."
              />
            </div>

            <button
              onClick={analyzeSEO}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Analyze SEO
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">SEO Analysis</h2>
          
          {analysis ? (
            <div className="space-y-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Overall SEO Score</div>
                <div className={`text-5xl font-bold ${getScoreColor(analysis.overall)} px-6 py-4 rounded-lg inline-block`}>
                  {analysis.overall}%
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">Title</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(analysis.title.score)}`}>
                    {analysis.title.score}%
                  </span>
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  {analysis.title.feedback.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">{item.startsWith('✓') ? '✓' : '•'}</span>
                      {item.replace('✓', '').trim()}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">Description</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(analysis.description.score)}`}>
                    {analysis.description.score}%
                  </span>
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  {analysis.description.feedback.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">Tags</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(analysis.tags.score)}`}>
                    {analysis.tags.score}%
                  </span>
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  {analysis.tags.feedback.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              Enter your video details and click &quot;Analyze SEO&quot; to get started
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
