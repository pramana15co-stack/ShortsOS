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

  useEffect(() => {
    if (!supabase) {
      // No Supabase configured - work in demo mode
      setLoading(false)
      return
    }

    try {
      // Get initial session (Supabase automatically persists sessions)
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        setSession(session)
        
        if (session?.user) {
          try {
            // Ensure profile exists in public.profiles
            console.log('🔍 [AUTH] Ensuring profile exists for user:', session.user.id.substring(0, 8) + '...')
            const ensureResponse = await fetch('/api/profiles/ensure', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: session.user.id,
              }),
            })

            if (!ensureResponse.ok) {
              const errorData = await ensureResponse.json().catch(() => ({}))
              console.error('❌ [AUTH] Failed to ensure profile:', {
                status: ensureResponse.status,
                error: errorData.error || 'Unknown error',
                details: errorData.details,
              })
            } else {
              const result = await ensureResponse.json().catch(() => ({}))
              console.log('✅ [AUTH] Profile ensure result:', {
                created: result.created,
                profileId: result.profileId,
              })
            }

            // Fetch profile subscription data from public.profiles table
            if (supabase) {
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', session.user.id)
                .single()

              if (!profileError && profileData) {
                console.log('✅ Profile loaded:', {
                  profileId: profileData.id,
                  tier: profileData.subscription_tier,
                  status: profileData.subscription_status,
                })
                // Merge auth user with profile subscription data
                setUser({
                  ...session.user,
                  ...profileData,
                })
              } else {
                console.warn('⚠️ Profile not found, using auth user only:', profileError?.message)
                // Fallback to just auth user if profile data not found
                setUser(session.user)
              }
            } else {
              setUser(session.user)
            }
          } catch (error) {
            console.warn('Failed to fetch user subscription data:', error)
            setUser(session.user)
          }
        } else {
          setUser(null)
        }
        
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('🔄 [AUTH] Auth state changed:', event, session ? 'session exists' : 'no session')
        
        setSession(session)
        
        // Handle sign out event explicitly
        if (event === 'SIGNED_OUT' || !session) {
          console.log('🚪 [AUTH] User signed out, clearing state')
          setUser(null)
          setSession(null)
          setLoading(false)
          return
        }
        
        // Ensure profile exists in public.profiles table when they sign in
        if (session?.user) {
          try {
            console.log('🔍 [AUTH] Ensuring profile exists for user:', session.user.id.substring(0, 8) + '...')
            await fetch('/api/profiles/ensure', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: session.user.id,
              }),
            })

            // Fetch profile subscription data from public.profiles table
            if (supabase) {
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', session.user.id)
                .single()

              if (!profileError && profileData) {
                console.log('✅ [AUTH] Profile loaded:', {
                  profileId: profileData.id,
                  tier: profileData.subscription_tier,
                  status: profileData.subscription_status,
                })
                // Merge auth user with profile subscription data
                setUser({
                  ...session.user,
                  ...profileData,
                })
              } else {
                console.warn('⚠️ [AUTH] Profile not found, using auth user only:', profileError?.message)
                // Fallback to just auth user if profile data not found
                setUser(session.user)
              }
            } else {
              setUser(session.user)
            }
          } catch (ensureError) {
            // Log but don't block - profile can be created later
            console.warn('⚠️ [AUTH] Failed to ensure profile in database:', ensureError)
            setUser(session.user)
          }
        } else {
          setUser(null)
        }
        
        setLoading(false)
      })

      return () => subscription.unsubscribe()
    } catch (error) {
      console.warn('Auth initialization error:', error)
      setLoading(false)
    }
  }, [])

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
        // Fetch profile data
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', newSession.user.id)
          .single()
        
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



