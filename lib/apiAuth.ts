/**
 * API Authentication & Authorization Utilities
 * Server-side helpers for validating user access in API routes
 */

import { createClient } from '@supabase/supabase-js'
import { isUserPaid, canAccessTier, getUserTier } from './planValidation'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Supabase client with service role for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

/**
 * Get authenticated user from request
 * Extracts user ID from Authorization header or request body
 * 
 * @param request - Next.js request object
 * @returns User object from database, or null if not found/not authenticated
 */
export async function getAuthenticatedUser(request: NextRequest): Promise<any | null> {
  if (!supabase) {
    return null
  }

  try {
    // Try to get user ID from request body
    const body = await request.json().catch(() => ({}))
    const userId = body.userId || body.user_id

    if (!userId) {
      return null
    }

    // Fetch profile from database
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error || !profile) {
      console.error('❌ Error fetching profile:', error?.message)
      return null
    }

    return profile
  } catch (error) {
    console.error('Error getting authenticated user:', error)
    return null
  }
}

/**
 * Check if user has paid subscription (for API routes)
 * 
 * @param request - Next.js request object
 * @returns User object if paid, null otherwise
 */
export async function requirePaidUser(request: NextRequest): Promise<{
  user: any
  error: null
} | {
  user: null
  error: NextResponse
}> {
  const user = await getAuthenticatedUser(request)

  if (!user) {
    return {
      user: null,
      error: NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      ),
    }
  }

  if (!isUserPaid(user)) {
    return {
      user: null,
      error: NextResponse.json(
        { 
          error: 'Upgrade to unlock this feature',
          requiresUpgrade: true,
          currentTier: getUserTier(user),
        },
        { status: 403 }
      ),
    }
  }

  return { user, error: null }
}

/**
 * Check if user can access a specific tier (for API routes)
 * 
 * @param request - Next.js request object
 * @param requiredTier - Minimum tier required
 * @returns User object if access granted, error response otherwise
 */
export async function requireTier(
  request: NextRequest,
  requiredTier: 'free' | 'starter' | 'pro' | 'agency'
): Promise<{
  user: any
  error: null
} | {
  user: null
  error: NextResponse
}> {
  const user = await getAuthenticatedUser(request)

  if (!user) {
    return {
      user: null,
      error: NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      ),
    }
  }

  if (!canAccessTier(user, requiredTier)) {
    return {
      user: null,
      error: NextResponse.json(
        { 
          error: `This feature requires ${requiredTier} plan or higher`,
          requiresUpgrade: true,
          currentTier: getUserTier(user),
          requiredTier,
        },
        { status: 403 }
      ),
    }
  }

  return { user, error: null }
}
