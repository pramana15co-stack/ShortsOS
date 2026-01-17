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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: false,
  signOut: async () => {},
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
            // Ensure user exists in public.users
            await fetch('/api/users/ensure', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: session.user.id,
              }),
            })

            // Fetch user subscription data from public.users table
            if (supabase) {
              const { data: userData, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .single()

              if (!userError && userData) {
                // Merge auth user with subscription data
                setUser({
                  ...session.user,
                  ...userData,
                })
              } else {
                // Fallback to just auth user if subscription data not found
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
        
        // Ensure user exists in public.users table when they sign in
        if (session?.user) {
          try {
            await fetch('/api/users/ensure', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: session.user.id,
              }),
            })

            // Fetch user subscription data from public.users table
            if (supabase) {
              const { data: userData, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .single()

              if (!userError && userData) {
                // Merge auth user with subscription data
                setUser({
                  ...session.user,
                  ...userData,
                })
              } else {
                // Fallback to just auth user if subscription data not found
                setUser(session.user)
              }
            } else {
              setUser(session.user)
            }
          } catch (ensureError) {
            // Log but don't block - user can be created later
            console.warn('Failed to ensure user in database:', ensureError)
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
    } catch (error) {
      console.warn('Sign out error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}



