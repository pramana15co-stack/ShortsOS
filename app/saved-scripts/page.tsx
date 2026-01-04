'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRequireAuth } from '@/lib/requireAuth'
import { useAuth } from '@/app/providers/AuthProvider'
import { getSavedScripts, deleteSavedScript, SavedScript } from '@/lib/getSavedScripts'
import EmptyState from '@/components/EmptyState'

export default function SavedScriptsPage() {
  useRequireAuth()
  const { user, loading } = useAuth()
  const [scripts, setScripts] = useState<SavedScript[]>([])
  const [loadingScripts, setLoadingScripts] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (user && !loading) {
      loadScripts()
    }
  }, [user, loading])

  const loadScripts = async () => {
    if (!user) return
    setLoadingScripts(true)
    const result = await getSavedScripts(user.id)
    if (result.success) {
      setScripts(result.data)
    }
    setLoadingScripts(false)
  }

  const handleDelete = async (scriptId: string) => {
    if (!confirm('Are you sure you want to delete this script?')) return
    
    setDeletingId(scriptId)
    const result = await deleteSavedScript(scriptId)
    if (result.success) {
      setScripts(scripts.filter(s => s.id !== scriptId))
    }
    setDeletingId(null)
  }

  if (loadingScripts) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading your scripts...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-gray-900">
                Saved <span className="gradient-text">Scripts</span>
              </h1>
              <p className="text-xl text-gray-600">
                All your generated scripts in one place
              </p>
            </div>
            <Link
              href="/scripts"
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Generate New
            </Link>
          </div>
        </div>

        {/* Scripts List */}
        {scripts.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            title="No saved scripts yet"
            description="Generate scripts using our Script Generator and they'll be saved here automatically for easy access."
            actionLabel="Generate Script"
            actionHref="/scripts"
          />
        ) : (
          <div className="grid gap-6">
            {scripts.map((script) => (
              <div
                key={script.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-l-4 border-primary-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{script.topic}</h3>
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                        {script.format_name}
                      </span>
                      <span className="text-sm text-gray-500">
                        ~{script.estimated_seconds}s
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Created {new Date(script.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(script.id)}
                    disabled={deletingId === script.id}
                    className="ml-4 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium disabled:opacity-50"
                  >
                    {deletingId === script.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>

                {/* Script Preview */}
                <div className="space-y-4">
                  <div className="bg-yellow-50 rounded-lg p-4 border-l-2 border-yellow-400">
                    <div className="text-xs font-semibold text-yellow-800 mb-1">Hook</div>
                    <p className="text-gray-800 text-sm">{script.hook}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border-l-2 border-blue-400">
                    <div className="text-xs font-semibold text-blue-800 mb-1">Body</div>
                    <p className="text-gray-800 text-sm line-clamp-2">{script.body}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border-l-2 border-green-400">
                    <div className="text-xs font-semibold text-green-800 mb-1">CTA</div>
                    <p className="text-gray-800 text-sm">{script.cta}</p>
                  </div>
                </div>

                {/* Full Script Toggle */}
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-semibold text-primary-600 hover:text-primary-700">
                    View Full Script
                  </summary>
                  <div className="mt-3 bg-gray-50 rounded-lg p-4 border">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">
                      {script.full_script}
                    </pre>
                  </div>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

