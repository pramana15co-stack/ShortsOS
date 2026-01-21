'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { getAuthErrorMessage, isValidEmail, sanitizeEmail } from '@/lib/authHelpers'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Client-side validation
    if (!formData.email.trim()) {
      setError('Please enter your email address')
      return
    }

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!formData.password) {
      setError('Please enter your password')
      return
    }

    setLoading(true)

    try {
      if (!supabase) {
        setError('Supabase is not configured. Please contact support.')
        setLoading(false)
        return
      }

      // Sign in with password (Supabase handles session persistence automatically)
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: sanitizeEmail(formData.email),
        password: formData.password,
      })

      // Log full Supabase response for debugging
      console.log('🔍 [LOGIN] Full Supabase response:', {
        hasUser: !!data?.user,
        hasSession: !!data?.session,
        error: signInError,
        errorStringified: signInError ? JSON.stringify(signInError, null, 2) : null,
      })

      if (signInError) {
        console.log('❌ [LOGIN] SignInError detected:', signInError)
        console.log('❌ [LOGIN] SignInError type:', typeof signInError)
        
        const errorMessage = getAuthErrorMessage(signInError)
        
        // Triple-check: ensure we always set a string, never an object
        let finalMessage = 'Sign in failed. Please try again.'
        if (typeof errorMessage === 'string' && errorMessage.trim().length > 0) {
          finalMessage = errorMessage.trim()
        }
        
        console.log('✅ [LOGIN] Final error message to display:', finalMessage)
        setError(finalMessage)
        setLoading(false)
        return
      }

      if (data.user) {
        // Ensure profile exists in public.profiles table (idempotent)
        try {
          await fetch('/api/profiles/ensure', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: data.user.id,
            }),
          })
        } catch (ensureError) {
          // Log but don't block login - profile can be created later
          console.warn('Failed to ensure profile in database:', ensureError)
        }

        // Redirect to dashboard on success
        router.push('/dashboard')
      }
    } catch (err) {
      // Log unexpected errors
      console.error('❌ [LOGIN] Unexpected error:', err)
      console.error('❌ [LOGIN] Error type:', typeof err)
      try {
        console.error('❌ [LOGIN] Error stringified:', JSON.stringify(err, null, 2))
      } catch (e) {
        console.error('❌ [LOGIN] Could not stringify error:', e)
      }
      
      const errorMessage = getAuthErrorMessage(err)
      
      // Triple-check: ensure we always set a string, never an object
      let finalMessage = 'Sign in failed. Please try again.'
      if (typeof errorMessage === 'string' && errorMessage.trim().length > 0) {
        finalMessage = errorMessage.trim()
      }
      
      console.log('✅ [LOGIN] Final error message to display:', finalMessage)
      setError(finalMessage)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mx-auto mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Sign In
          </h1>
          <p className="text-lg text-gray-600">
            Sign in to access your content planning tools
          </p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="card p-8 md:p-10">
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-3">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 transition-all duration-300"
                placeholder="your.email@example.com"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-3">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 transition-all duration-300"
                placeholder="Enter your password"
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between pt-2 pb-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-5 h-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all"
                  disabled={loading}
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer select-none font-medium">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-bold underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm font-medium">
                {typeof error === 'string' ? error : 'Sign in failed. Please try again.'}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={async () => {
                try {
                  if (!supabase) {
                    setError('Supabase is not configured. Please contact support.')
                    return
                  }
                  const redirectUrl = `${window.location.origin}/auth/callback`
                  const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                      redirectTo: redirectUrl,
                    },
                  })
                  if (error) {
                    setError(getAuthErrorMessage(error))
                  }
                } catch (err: any) {
                  setError(getAuthErrorMessage(err))
                }
              }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-5 py-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 font-semibold">Sign in with Google</span>
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-base text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-700 font-bold underline transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
