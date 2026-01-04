'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers/AuthProvider'

/**
 * Hook to protect a page - redirects to login if user is not authenticated
 * Usage: Call this hook at the top of your component
 */
export function useRequireAuth() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (!loading && !user && !isRedirecting) {
      setIsRedirecting(true)
      router.push('/login')
    }
  }, [user, loading, router, isRedirecting])

  return { user, loading: loading || isRedirecting, isAuthenticated: !!user }
}



