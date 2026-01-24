'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { getAuthErrorMessage, isValidEmail, validatePassword, sanitizeEmail } from '@/lib/authHelpers'
import { signUpWithRetry, SignupTimeoutError } from '@/lib/signupHelpers'
import Toast from '@/components/Toast'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Environment validation on mount
  useEffect(() => {
    try {
      getSupabaseClient()
      console.log('✅ [SIGNUP] Environment validation passed')
    } catch (err: any) {
      console.error('❌ [SIGNUP] Environment validation failed:', err)
      setError('Auth service misconfigured. Please contact support.')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prevent double submits
    if (isSubmitting || loading) {
      return
    }

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

    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.valid) {
      setError(passwordValidation.message || 'Invalid password')
      return
    }

    setIsSubmitting(true)
    setLoading(true)
    setError(null)

    try {
      // Get validated Supabase client
      const supabase = getSupabaseClient()

      // Get the current origin for redirect URL
      const redirectUrl = `${window.location.origin}/auth/callback`

      console.log('[SIGNUP] Attempt - Starting signup process')

      // Step 1: Attempt signup with retry and timeout
      let signupResult
      try {
        signupResult = await signUpWithRetry(supabase, {
          email: sanitizeEmail(formData.email),
          password: formData.password,
          emailRedirectTo: redirectUrl,
        })
      } catch (retryError: any) {
        // Handle timeout errors specifically
        if (retryError instanceof SignupTimeoutError || retryError.code === 'SUPABASE_TIMEOUT') {
          const errorMessage = getAuthErrorMessage(retryError)
          setError(errorMessage)
          setLoading(false)
          setIsSubmitting(false)
          return
        }
        throw retryError
      }

      const signupData = signupResult?.data
      const signupError = signupResult?.error

      // Log full response for debugging
      console.log('[SIGNUP] Response received:', {
        hasUser: !!signupData?.user,
        hasSession: !!signupData?.session,
        error: signupError ? getAuthErrorMessage(signupError) : null,
      })

      // Step 2: Handle signup errors
      if (signupError) {
        const errorMessage = getAuthErrorMessage(signupError)
        setError(errorMessage)
        setLoading(false)
        setIsSubmitting(false)
        return
      }

      // Step 3: Handle successful signup
      if (signupData?.user) {
        const userId = signupData.user.id
        const hasSession = !!signupData.session
        const accessToken = signupData.session?.access_token

        console.log('[SIGNUP] Success - User created:', {
          userId: userId.substring(0, 8) + '...',
          hasSession,
        })

        // Step 4: Always attempt to create profile (non-blocking)
        if (accessToken) {
          try {
            console.log('[PROFILE] Created - Attempting profile creation...')
            const profileResponse = await fetch('/api/bootstrap-profile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
            })

            if (profileResponse.ok) {
              const profileData = await profileResponse.json()
              console.log('[PROFILE] Created - Profile upserted successfully')
            } else {
              const errorData = await profileResponse.json().catch(() => ({}))
              console.warn('[PROFILE] Failed - Profile creation failed (non-blocking):', {
                status: profileResponse.status,
                error: errorData,
              })
              // Don't block - profile can be created later
            }
          } catch (profileError) {
            console.warn('[PROFILE] Failed - Profile creation error (non-blocking):', profileError)
            // Don't throw - continue with signup success flow
          }
        } else {
          console.log('[PROFILE] Info - Profile will be created after email verification or on first login (Lazy Provisioning)')
          // Profile creation is skipped here because we don't have a token yet (email verification required)
          // It will be handled by /api/profiles/ensure on login or /api/generate on first use
        }

        // Step 5: Handle email confirmation scenarios
        if (hasSession) {
          // User has session - redirect to dashboard
          setLoading(false)
          setIsSubmitting(false)
          setToast({
            message: 'Account created successfully! Redirecting...',
            type: 'success',
          })
          setTimeout(() => {
            router.push('/dashboard')
          }, 1500)
        } else {
          // User created but no session - email confirmation required
          setLoading(false)
          setIsSubmitting(false)
          setToast({
            message:
              'Account created. Please check your email to confirm your account. If you don\'t receive an email in 2 minutes, try logging in.',
            type: 'info',
          })
          // Don't redirect - let user check email
        }
      } else {
        // No user created - unexpected state
        console.error('[SIGNUP] Final failure reason - No user created but no error reported')
        setError('Signup completed but user was not created. Please try again.')
        setLoading(false)
        setIsSubmitting(false)
      }
    } catch (err: any) {
      // Handle unexpected errors
      console.error('[SIGNUP] Final failure reason - Unexpected error:', err)
      const errorMessage = getAuthErrorMessage(err)
      setError(errorMessage)
      setLoading(false)
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mx-auto mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Create Your Account
          </h1>
          <p className="text-lg text-gray-600">
            Start planning and growing your YouTube Shorts channel
          </p>
        </div>

        {/* Sign Up Form */}
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
                disabled={loading || isSubmitting}
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
                placeholder="At least 6 characters"
                required
                minLength={6}
                disabled={loading || isSubmitting}
              />
              <p className="mt-2 text-sm text-gray-500 font-medium">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm font-medium">
                {typeof error === 'string' ? error : 'Signup failed. Please try again.'}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg
                    className="animate-spin h-5 w-5"
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
                  Creating account...
                </span>
              ) : (
                'Sign Up'
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

            {/* Google Sign Up Button */}
            <button
              type="button"
              onClick={async () => {
                try {
                  const supabase = getSupabaseClient()
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
              disabled={loading || isSubmitting}
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
              <span className="text-gray-700 font-semibold">Sign up with Google</span>
            </button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-base text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-700 font-bold underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
