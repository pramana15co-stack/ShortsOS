'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) {
      setError('Supabase is not configured. Please contact support.')
      setLoading(false)
      return
    }

    const handleAuthCallback = async () => {
      try {
        // Supabase sends auth tokens in URL hash fragments (#access_token=...)
        // We need to extract and exchange them for a session
        
        // Get the hash from the URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const type = hashParams.get('type')

        // If we have tokens in the URL, Supabase will automatically handle them
        // We just need to wait for the session to be established
        if (accessToken || refreshToken) {
          // Wait for Supabase to process the tokens
          await new Promise(resolve => setTimeout(resolve, 1000))
        }

        // Check for session
        if (!supabase) {
          setError('Supabase is not configured. Please contact support.')
          setLoading(false)
          return
        }

        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          setError(sessionError.message || 'Authentication failed. Please try again.')
          setLoading(false)
          return
        }

        if (session) {
          // Ensure profile exists in public.profiles table
          if (session.user) {
            try {
              await fetch('/api/profiles/ensure', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: session.user.id,
                }),
              })
            } catch (ensureError) {
              console.warn('Failed to ensure profile in database:', ensureError)
            }
          }
          
          // Successfully authenticated, redirect to dashboard
          router.push('/dashboard')
        } else {
          // Listen for auth state changes in case session is being set asynchronously
          if (supabase) {
            const {
              data: { subscription },
            } = supabase.auth.onAuthStateChange(async (event, session) => {
              if (event === 'SIGNED_IN' && session) {
                // Ensure user exists in public.users table
                if (session.user) {
                  try {
                    await fetch('/api/users/ensure', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        userId: session.user.id,
                      }),
                    })
                  } catch (ensureError) {
                    console.warn('Failed to ensure user in database:', ensureError)
                  }
                }
                router.push('/dashboard')
              } else if (event === 'TOKEN_REFRESHED' && session) {
                router.push('/dashboard')
              }
            })

            // Set timeout to show error if no session is established
            setTimeout(() => {
              subscription.unsubscribe()
              if (!session) {
                setError('Email confirmation failed. The link may have expired. Please try signing up again.')
                setLoading(false)
              }
            }, 3000)
          } else {
            setError('Supabase is not configured. Please contact support.')
            setLoading(false)
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred')
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-600 text-lg">Confirming your email...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/login"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Try Signing In
              </a>
              <a
                href="/signup"
                className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition"
              >
                Sign Up Again
              </a>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return null
}

