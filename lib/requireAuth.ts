'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers/AuthProvider'
import { supabase } from '@/lib/supabaseClient'

/**
 * Hook to protect a page - redirects to login if user is not authenticated
 * In demo mode (no Supabase), allows access but shows demo banner
 * Usage: Call this hook at the top of your component
 */
export function useRequireAuth() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const isDemoMode = !supabase

  useEffect(() => {
    // In demo mode, allow access without auth
    if (isDemoMode) {
      return
    }

    // Only redirect if Supabase is configured and user is not authenticated
    if (!loading && !user && !isRedirecting && supabase) {
      setIsRedirecting(true)
      router.push('/login')
    }
  }, [user, loading, router, isRedirecting, isDemoMode])

  return { 
    user, 
    loading: loading || isRedirecting, 
    isAuthenticated: !!user || isDemoMode,
    isDemoMode 
  }
}



