'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { getAuthErrorMessage, isValidEmail, validatePassword, sanitizeEmail } from '@/lib/authHelpers'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.valid) {
      setError(passwordValidation.message || 'Invalid password')
      return
    }

    setLoading(true)

    try {
      if (!supabase) {
        setError('Supabase is not configured. Please contact support.')
        setLoading(false)
        return
      }

      // Get the current origin for redirect URL
      const redirectUrl = `${window.location.origin}/auth/callback`

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: sanitizeEmail(formData.email),
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      })

      if (signUpError) {
        setError(getAuthErrorMessage(signUpError))
        setLoading(false)
        return
      }

      if (data.user) {
        // Redirect to dashboard on success
        router.push('/dashboard')
      }
    } catch (err) {
      setError(getAuthErrorMessage(err))
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
                placeholder="At least 6 characters"
                required
                minLength={6}
                disabled={loading}
              />
              <p className="mt-2 text-sm text-gray-500 font-medium">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm font-medium">
                {error}
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
                  Creating account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-base text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-bold underline transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
