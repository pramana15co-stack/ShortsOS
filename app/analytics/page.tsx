'use client'

import { useState } from 'react'

interface Metric {
  label: string
  value: string
  change: number
  trend: 'up' | 'down' | 'neutral'
}

export default function Analytics() {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d')

  // Mock data - in real app, this would come from YouTube API
  const metrics: Metric[] = [
    { label: 'Total Views', value: '0', change: 0, trend: 'neutral' },
    { label: 'Subscribers', value: '0', change: 0, trend: 'neutral' },
    { label: 'Watch Time', value: '0 hrs', change: 0, trend: 'neutral' },
    { label: 'Avg. View Duration', value: '0:00', change: 0, trend: 'neutral' },
    { label: 'Click-Through Rate', value: '0%', change: 0, trend: 'neutral' },
    { label: 'Engagement Rate', value: '0%', change: 0, trend: 'neutral' },
  ]

  const insights = [
    {
      type: 'info',
      title: 'Connect Your YouTube Channel',
      description: 'To see real analytics, connect your YouTube channel. We use YouTube Data API v3 (free tier) to fetch your channel statistics.',
    },
    {
      type: 'tip',
      title: 'Best Posting Times',
      description: 'Based on your audience, try posting between 2-4 PM and 8-10 PM for maximum engagement.',
    },
    {
      type: 'warning',
      title: 'Consistency Matters',
      description: 'Posting consistently (daily or every other day) can significantly improve your channel growth.',
    },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Analytics Insights</h1>
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map(period => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg transition ${
                timeframe === period
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
            <div className={`text-sm flex items-center ${
              metric.trend === 'up' ? 'text-green-600' : 
              metric.trend === 'down' ? 'text-red-600' : 
              'text-gray-500'
            }`}>
              {metric.change !== 0 && (
                <>
                  {metric.trend === 'up' ? '↑' : '↓'} {Math.abs(metric.change)}%
                </>
              )}
              {metric.change === 0 && 'No change'}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Key Insights</h2>
        <div className="space-y-4">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-l-4 ${
                insight.type === 'info'
                  ? 'bg-blue-50 border-blue-500'
                  : insight.type === 'tip'
                  ? 'bg-green-50 border-green-500'
                  : 'bg-yellow-50 border-yellow-500'
              }`}
            >
              <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
              <p className="text-gray-700 text-sm">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Actionable Recommendations</h2>
        <div className="space-y-4">
          <Recommendation
            title="Improve Your Titles"
            description="Your titles could be more engaging. Use numbers, questions, or power words to increase CTR."
            action="Go to SEO Optimizer"
            href="/seo-optimizer"
          />
          <Recommendation
            title="Plan More Content"
            description="Consistency is key. Use the calendar to plan your next 10 videos."
            action="Open Calendar"
            href="/calendar"
          />
          <Recommendation
            title="Generate Fresh Ideas"
            description="Keep your content fresh with trending topics and new ideas."
            action="Get Ideas"
            href="/content-ideas"
          />
        </div>
      </div>
    </main>
  )
}

function Recommendation({
  title,
  description,
  action,
  href,
}: {
  title: string
  description: string
  action: string
  href: string
}) {
  return (
    <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <a
        href={href}
        className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm font-medium"
      >
        {action}
      </a>
    </div>
  )
}
