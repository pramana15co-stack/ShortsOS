'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRequireAuth } from '@/lib/requireAuth'
import { useAuth } from '@/app/providers/AuthProvider'
import { getSavedHooks, deleteSavedHook, SavedHook } from '@/lib/getSavedHooks'
import EmptyState from '@/components/EmptyState'

export default function SavedHooksPage() {
  useRequireAuth()
  const { user } = useAuth()
  const [hooks, setHooks] = useState<SavedHook[]>([])
  const [loadingHooks, setLoadingHooks] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (user && !loading) {
      loadHooks()
    }
  }, [user, loading])

  const loadHooks = async () => {
    if (!user) return
    setLoadingHooks(true)
    const result = await getSavedHooks(user.id)
    if (result.success) {
      setHooks(result.data)
    }
    setLoadingHooks(false)
  }

  const handleDelete = async (hookId: string) => {
    if (!confirm('Are you sure you want to delete this hook?')) return
    
    setDeletingId(hookId)
    const result = await deleteSavedHook(hookId)
    if (result.success) {
      setHooks(hooks.filter(h => h.id !== hookId))
    }
    setDeletingId(null)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Could add toast notification here
  }

  if (loadingHooks) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading your hooks...</p>
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
                Saved <span className="gradient-text">Hooks</span>
              </h1>
              <p className="text-xl text-gray-600">
                All your generated hooks in one place
              </p>
            </div>
            <Link
              href="/hooks"
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Generate New
            </Link>
          </div>
        </div>

        {/* Hooks List */}
        {hooks.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="No saved hooks yet"
            description="Generate hooks using our Hook Generator and they'll be saved here automatically for easy access."
            actionLabel="Generate Hooks"
            actionHref="/hooks"
          />
        ) : (
          <div className="grid gap-4">
            {hooks.map((hook) => (
              <div
                key={hook.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-l-4 border-primary-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold capitalize">
                        {hook.emotion}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold capitalize">
                        {hook.audience_level}
                      </span>
                      <span className="text-sm text-gray-500">
                        ~{hook.estimated_seconds}s
                      </span>
                      {hook.estimated_seconds <= 8 && (
                        <span className="text-xs text-green-600 font-medium">✓ Under 8s</span>
                      )}
                    </div>
                    <p className="text-lg font-medium text-gray-900 mb-2 leading-relaxed">
                      "{hook.hook_text}"
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Topic: {hook.topic}</span>
                      <span>•</span>
                      <span>Created {new Date(hook.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => copyToClipboard(hook.hook_text)}
                      className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition text-sm font-medium"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => handleDelete(hook.id)}
                      disabled={deletingId === hook.id}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium disabled:opacity-50"
                    >
                      {deletingId === hook.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

