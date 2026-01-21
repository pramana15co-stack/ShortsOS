'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabaseClient'

// Simplified user type that works with or without Supabase
interface SimpleUser {
  id: string
  email?: string | null
  [key: string]: any
}

interface AuthContextType {
  user: SimpleUser | null
  session: any | null
  loading: boolean
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: false,
  signOut: async () => {},
  refreshSession: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SimpleUser | null>(null)
  const [session, setSession] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  // Cache profile bootstrap per session to avoid redundant calls
  const [profileBootstrapCache, setProfileBootstrapCache] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!supabase) {
      // No Supabase configured - work in demo mode
      setLoading(false)
      return
    }

    let mounted = true

    // Use onAuthStateChange only - it fires immediately with current session
    // This eliminates the need for getSession() call
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      console.log('🔄 [AUTH] Auth state changed:', event, session ? 'session exists' : 'no session')
      
      setSession(session)
      
      // Handle sign out event explicitly
      if (event === 'SIGNED_OUT' || !session) {
        console.log('🚪 [AUTH] User signed out, clearing state')
        setUser(null)
        setSession(null)
        setLoading(false)
        // Clear bootstrap cache on logout
        setProfileBootstrapCache(new Set())
        return
      }
      
      // Handle sign in - set user immediately (non-blocking)
      if (session?.user) {
        // Set user immediately with auth data (don't wait for profile)
        // This makes UI responsive instantly
        setUser(session.user)
        setLoading(false)

        // Check if we've already bootstrapped this session
        const sessionKey = `${session.user.id}-${session.access_token?.substring(0, 10)}`
        const needsBootstrap = !profileBootstrapCache.has(sessionKey)

        if (needsBootstrap) {
          // Mark as bootstrapped immediately to prevent duplicate calls
          setProfileBootstrapCache(prev => new Set(prev).add(sessionKey))

          // Bootstrap profile and fetch subscription data in background (non-blocking)
          // This doesn't block the UI - user can already see the dashboard
          Promise.all([
            // Ensure profile exists using bootstrap-profile API
            fetch('/api/bootstrap-profile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
              },
            }).catch(err => {
              console.warn('⚠️ [AUTH] Profile bootstrap failed (non-blocking):', err)
              return null
            }),

            // Fetch profile subscription data - use maybeSingle
            supabase
              ? Promise.resolve(
                  supabase
                    .from('profiles')
                    .select('*')
                    .eq('user_id', session.user.id)
                    .maybeSingle()
                )
                  .then(({ data: profileData, error: profileError }) => {
                    if (!mounted) return null
                    if (profileError) {
                      console.warn('⚠️ [AUTH] Profile fetch failed (non-blocking):', profileError.message)
                      return null
                    }
                    if (!profileData) {
                      // Profile missing - trigger bootstrap
                      console.warn('⚠️ [AUTH] Profile missing, will bootstrap')
                      return null
                    }
                    return profileData
                  })
                  .catch(err => {
                    console.warn('⚠️ [AUTH] Profile fetch error (non-blocking):', err)
                    return null
                  })
              : Promise.resolve(null)
          ]).then(([ensureResult, profileData]) => {
            if (!mounted) return

            // Update user with profile data if available
            if (profileData) {
              console.log('✅ [AUTH] Profile loaded (background):', {
                profileId: profileData.id,
                tier: profileData.subscription_tier,
                status: profileData.subscription_status,
              })
              setUser({
                ...session.user,
                ...profileData,
              })
            }
          })
        } else {
          // Session already bootstrapped, just fetch profile data - use maybeSingle
          if (supabase) {
            Promise.resolve(
              supabase
                .from('profiles')
                .select('*')
                .eq('user_id', session.user.id)
                .maybeSingle()
            )
              .then(({ data: profileData, error: profileError }) => {
                if (!mounted) return
                if (profileError) {
                  console.warn('⚠️ [AUTH] Profile fetch error:', profileError.message)
                  return
                }
                if (profileData) {
                  setUser({
                    ...session.user,
                    ...profileData,
                  })
                } else {
                  // Profile missing - trigger bootstrap
                  console.warn('⚠️ [AUTH] Profile missing, triggering bootstrap')
                  fetch('/api/bootstrap-profile', { method: 'POST', headers: { Authorization: `Bearer ${session.access_token}` } })
                    .catch(err => console.warn('⚠️ [AUTH] Bootstrap failed:', err))
                }
              })
              .catch(err => {
                console.warn('⚠️ [AUTH] Profile fetch error:', err)
              })
          }
        }
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, []) // Empty deps - only run once on mount

  const signOut = async () => {
    if (!supabase) {
      console.warn('⚠️ [SIGNOUT] Supabase not configured')
      // Clear state anyway
      setUser(null)
      setSession(null)
      return
    }
    
    try {
      console.log('🚪 [SIGNOUT] Starting sign out process...')
      
      // Sign out from Supabase (this will trigger onAuthStateChange with SIGNED_OUT event)
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('❌ [SIGNOUT] Error signing out:', error)
        throw error
      }
      
      // Clear state immediately (onAuthStateChange will also handle this, but do it here for immediate UI update)
      console.log('✅ [SIGNOUT] Sign out successful, clearing state')
      setUser(null)
      setSession(null)
      
      // Force a session check to ensure state is cleared
      const { data: { session: verifySession } } = await supabase.auth.getSession()
      if (verifySession) {
        console.warn('⚠️ [SIGNOUT] Session still exists after signOut, forcing clear')
        setUser(null)
        setSession(null)
      }
      
      console.log('✅ [SIGNOUT] Sign out complete')
    } catch (error: any) {
      console.error('❌ [SIGNOUT] Sign out error:', error)
      // Clear state even on error to prevent stuck UI
      setUser(null)
      setSession(null)
      throw error
    }
  }

  const refreshSession = async () => {
    if (!supabase) return
    try {
      const { data: { session: newSession } } = await supabase.auth.getSession()
      setSession(newSession)
      if (newSession?.user) {
        // Fetch profile data - use maybeSingle
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', newSession.user.id)
          .maybeSingle()
        
        if (profileData) {
          setUser({
            ...newSession.user,
            ...profileData,
          })
        } else {
          setUser(newSession.user)
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      console.warn('Refresh session error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}



