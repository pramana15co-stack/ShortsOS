'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers/AuthProvider'

/**
 * Hook to protect a page - redirects to login if user is not authenticated
 * Usage: Call this hook at the top of your component
 */
export function useRequireAuth() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  return { user, loading, isAuthenticated: !!user }
}



