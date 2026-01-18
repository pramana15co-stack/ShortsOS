'use client'

import { useState } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import Link from 'next/link'

export default function EmailVerificationBanner() {
  const { user } = useAuth()
  const [dismissed, setDismissed] = useState(false)

  // Only show if user is logged in and email is not verified
  if (!user || user.email_confirmed_at || dismissed) {
    return null
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-yellow-700">
            <strong>Verify your email</strong> to unlock all features. Check your inbox for the verification link.
          </p>
          <div className="mt-2 flex gap-4">
            <Link
              href="/auth/resend-verification"
              className="text-sm font-medium text-yellow-800 hover:text-yellow-900 underline"
            >
              Resend verification email
            </Link>
            <span className="text-yellow-600">•</span>
            <button
              onClick={() => {
                // Refresh the page to check if email was verified
                window.location.reload()
              }}
              className="text-sm font-medium text-yellow-800 hover:text-yellow-900 underline"
            >
              I've verified my email
            </button>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={() => setDismissed(true)}
            className="inline-flex text-yellow-400 hover:text-yellow-500 focus:outline-none"
          >
            <span className="sr-only">Dismiss</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
