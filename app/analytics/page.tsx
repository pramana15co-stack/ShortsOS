'use client'

import { useState, useEffect } from 'react'
import { useAccess } from '@/lib/useAccess'
import { useAuth } from '@/app/providers/AuthProvider'
import Link from 'next/link'

interface ChannelData {
  channel_id: string
  title: string
  subscribers: number
  views: number
  video_count: number
}

interface AnalyticsData {
  subscribers: number
  views: number
  video_count: number
  avg_view_duration: string
  ctr: string
  best_posting_times: string[]
}

export default function AnalyticsPage() {
  const { isFree, isPaid } = useAccess()
  const { user } = useAuth()
  const [channel, setChannel] = useState<ChannelData | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [linking, setLinking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      loadChannel()
      loadAnalytics()
    }
  }, [user, isPaid])

  const loadChannel = async () => {
    if (!user?.id) return

    try {
      const response = await fetch('/api/youtube/channel', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.channel) {
          setChannel(data.channel)
        }
      }
    } catch (error) {
      console.error('Error loading channel:', error)
    }
  }

  const loadAnalytics = async () => {
    if (!user?.id) return

    setLoading(true)
    try {
      const response = await fetch('/api/analytics/youtube', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setAnalytics(data.data)
        }
      }
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLink = () => {
    setLinking(true)
    window.location.href = '/api/youtube/link'
  }

  const handleUnlink = async () => {
    if (!confirm('Are you sure you want to unlink your YouTube channel?')) return

    try {
      const response = await fetch('/api/youtube/unlink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setChannel(null)
        setAnalytics(null)
        loadAnalytics()
      }
    } catch (error) {
      console.error('Error unlinking:', error)
    }
  }

  // Check URL params for OAuth callback status
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('linked') === 'success') {
      loadChannel()
      loadAnalytics()
      window.history.replaceState({}, '', '/analytics')
    }
    if (params.get('error')) {
      setError(params.get('error') || 'Unknown error')
    }
  }, [])

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                YouTube Analytics
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
                Track your channel performance and get insights to grow your audience.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Free User CTA */}
        {isFree && (
          <div className="mb-8 card bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Unlock Real Analytics</h3>
                <p className="text-sm text-gray-700">
                  Link your YouTube channel and get personalized insights with a paid plan.
                </p>
              </div>
              <Link href="/pricing" className="btn-primary whitespace-nowrap">
                Upgrade Now
              </Link>
            </div>
          </div>
        )}

        {/* Channel Link Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">YouTube Channel</h2>
          
          {channel ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">{channel.title}</h3>
                  <p className="text-sm text-gray-600">
                    {channel.subscribers.toLocaleString()} subscribers • {channel.video_count} videos
                  </p>
                </div>
                <button
                  onClick={handleUnlink}
                  className="btn-secondary text-sm"
                >
                  Unlink Channel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {isPaid ? (
                <div>
                  <p className="text-gray-700 mb-4">
                    Link your YouTube channel to view real-time analytics and insights.
                  </p>
                  <button
                    onClick={handleLink}
                    disabled={linking}
                    className="btn-primary"
                  >
                    {linking ? 'Linking...' : 'Link YouTube Channel'}
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    Upgrade to a paid plan to link your YouTube channel and access real analytics.
                  </p>
                  <Link href="/pricing" className="btn-primary inline-block">
                    Upgrade to Unlock
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Analytics Display */}
        {loading ? (
          <div className="card">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading analytics...</p>
            </div>
          </div>
        ) : analytics ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Views</h3>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.views.toLocaleString()}
              </p>
            </div>

            <div className="card">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Subscribers</h3>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.subscribers.toLocaleString()}
              </p>
            </div>

            <div className="card">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Videos</h3>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.video_count.toLocaleString()}
              </p>
            </div>

            <div className="card">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Avg View Duration</h3>
              <p className="text-3xl font-bold text-gray-900">{analytics.avg_view_duration}</p>
            </div>

            <div className="card">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">CTR</h3>
              <p className="text-3xl font-bold text-gray-900">{analytics.ctr}</p>
            </div>

            <div className="card">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Best Posting Times</h3>
              <ul className="mt-2 space-y-1">
                {analytics.best_posting_times.map((time, idx) => (
                  <li key={idx} className="text-sm text-gray-700">• {time}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="text-center py-12 text-gray-500">
              <p>No analytics data available.</p>
              {isPaid && !channel && (
                <p className="mt-2 text-sm">Link your YouTube channel to get started.</p>
              )}
            </div>
          </div>
        )}

        {/* Placeholder Notice for Free Users */}
        {isFree && analytics && (
          <div className="mt-8 card bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Preview Mode:</strong> This is placeholder data. Upgrade to see real-time analytics from your linked YouTube channel.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
