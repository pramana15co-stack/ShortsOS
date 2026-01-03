'use client'

import { useState } from 'react'

interface ChecklistItem {
  id: string
  title: string
  category: string
  checked: boolean
}

const defaultChecklist: Omit<ChecklistItem, 'id' | 'checked'>[] = [
  { title: 'Video is 60 seconds or less', category: 'Format' },
  { title: 'Video is in vertical format (9:16)', category: 'Format' },
  { title: 'Video resolution is at least 1080p', category: 'Quality' },
  { title: 'Audio is clear and audible', category: 'Quality' },
  { title: 'No background noise or distractions', category: 'Quality' },
  { title: 'Title is optimized (30-60 characters)', category: 'SEO' },
  { title: 'Description includes relevant keywords', category: 'SEO' },
  { title: 'At least 3-5 relevant tags added', category: 'SEO' },
  { title: 'Thumbnail is eye-catching and clear', category: 'Visual' },
  { title: 'First 3 seconds are engaging (hook)', category: 'Content' },
  { title: 'Content delivers on title promise', category: 'Content' },
  { title: 'Call-to-action included (subscribe/like)', category: 'Engagement' },
  { title: 'Hashtags included in description', category: 'SEO' },
  { title: 'Video has captions/subtitles', category: 'Accessibility' },
  { title: 'No copyrighted music or content', category: 'Legal' },
]

export default function Checklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    defaultChecklist.map((item, idx) => ({
      ...item,
      id: idx.toString(),
      checked: false,
    }))
  )

  const toggleItem = (id: string) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const resetChecklist = () => {
    setChecklist(checklist.map(item => ({ ...item, checked: false })))
  }

  const completedCount = checklist.filter(item => item.checked).length
  const totalCount = checklist.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  const itemsByCategory = checklist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, ChecklistItem[]>)

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Pre-Publish Checklist</h1>
        <button
          onClick={resetChecklist}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Reset
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">
            {completionPercentage}%
          </div>
          <div className="text-gray-600 mb-4">
            {completedCount} of {totalCount} items completed
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                completionPercentage === 100 ? 'bg-green-500' : 'bg-primary-600'
              }`}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(itemsByCategory).map(([category, items]) => (
          <div key={category} className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">{category}</h2>
            <div className="space-y-3">
              {items.map(item => (
                <label
                  key={item.id}
                  className="flex items-start cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(item.id)}
                    className="mt-1 mr-3 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className={`flex-1 ${item.checked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {item.title}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {completionPercentage === 100 && (
        <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-semibold text-green-800 mb-2">
            Ready to Publish!
          </h3>
          <p className="text-green-700">
            All checklist items are complete. Your video is ready to go live!
          </p>
        </div>
      )}
    </main>
  )
}
