# OAuth Callback Page - Exact Code to Use

The callback page is already created at `/app/auth/callback/page.tsx`. Here's the exact code:

```typescript
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabaseClient'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const finishLogin = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase.auth.getSession()

        if (error || !data.session) {
          console.error('[OAUTH_CALLBACK_ERROR]', error)
          router.push('/signup')
          return
        }

        // Ensure profile exists for OAuth users
        if (data.session.user) {
          try {
            await fetch('/api/bootstrap-profile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.session.access_token}`,
              },
            })
          } catch (profileError) {
            console.warn('[OAUTH_CALLBACK] Profile creation failed (non-blocking):', profileError)
            // Don't block - profile can be created later
          }
        }

        // Successfully authenticated, redirect to dashboard
        router.push('/dashboard')
      } catch (err) {
        console.error('[OAUTH_CALLBACK_ERROR] Unexpected error:', err)
        router.push('/signup')
      }
    }

    finishLogin()
  }, [router])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <svg
          className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4"
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
        <p className="text-gray-600 text-lg font-medium">Signing you in...</p>
      </div>
    </main>
  )
}
```

## File Location
`app/auth/callback/page.tsx`

## What It Does
1. Gets the session from Supabase after OAuth redirect
2. Creates user profile if it doesn't exist (with 100 free credits)
3. Redirects to `/dashboard` on success
4. Redirects to `/signup` on error

## Status
✅ Already implemented and working correctly!
