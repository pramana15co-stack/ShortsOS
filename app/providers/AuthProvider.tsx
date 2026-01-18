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
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session)
        
        // Ensure profile exists in public.profiles table when they sign in
        if (session?.user) {
          try {
            console.log('🔍 Ensuring profile exists for user:', session.user.id.substring(0, 8) + '...')
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
          } catch (ensureError) {
            // Log but don't block - profile can be created later
            console.warn('⚠️ Failed to ensure profile in database:', ensureError)
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
    if (!supabase) return
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
    } catch (error) {
      console.warn('Sign out error:', error)
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



