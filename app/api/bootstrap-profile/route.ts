import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase clients
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

/**
 * Get authenticated user from Bearer token
 */
async function getAuthenticatedUser(accessToken: string) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const { data: { user }, error } = await supabase.auth.getUser(accessToken)
  
  if (error || !user) {
    console.error('❌ [BOOTSTRAP] Failed to get user from token:', error?.message)
    return null
  }

  return user
}

/**
 * Get service role client (bypasses RLS)
 */
function getServiceRoleClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ [BOOTSTRAP] Service role not configured')
    return null
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * Bootstrap profile API
 * Creates profile if it doesn't exist
 * Uses Bearer token authentication
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Get access token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('❌ [BOOTSTRAP] Missing or invalid Authorization header')
      return NextResponse.json(
        { error: 'Authorization header required (Bearer token)' },
        { status: 401 }
      )
    }

    const accessToken = authHeader.substring(7) // Remove "Bearer " prefix

    // Get authenticated user from token
    console.log('🔍 [BOOTSTRAP] Getting user from access token...')
    const user = await getAuthenticatedUser(accessToken)
    
    if (!user) {
      console.error('❌ [BOOTSTRAP] Invalid or expired access token')
      return NextResponse.json(
        { error: 'Invalid or expired access token' },
        { status: 401 }
      )
    }

    console.log('✅ [BOOTSTRAP] Authenticated user:', {
      userId: user.id.substring(0, 8) + '...',
      email: user.email || 'no email',
    })

    // Get service role client for database operations
    const supabase = getServiceRoleClient()
    if (!supabase) {
      console.error('❌ [BOOTSTRAP] Cannot create service role client')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Check if profile already exists
    console.log('🔍 [BOOTSTRAP] Checking if profile exists for user:', user.id.substring(0, 8) + '...')
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id, user_id, subscription_tier, subscription_status')
      .eq('user_id', user.id)
      .single()

    // If profile exists, return success (idempotent)
    if (existingProfile) {
      console.log('✅ [BOOTSTRAP] Profile already exists:', {
        profileId: existingProfile.id,
        userId: existingProfile.user_id.substring(0, 8) + '...',
        tier: existingProfile.subscription_tier,
        status: existingProfile.subscription_status,
        duration: Date.now() - startTime + 'ms',
      })
      return NextResponse.json({
        success: true,
        message: 'Profile already exists',
        created: false,
        profileId: existingProfile.id,
      })
    }

    // Handle fetch errors (except "not found")
    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('❌ [BOOTSTRAP] Error checking profile existence:', {
        code: fetchError.code,
        message: fetchError.message,
        details: fetchError.details,
      })
      return NextResponse.json(
        { 
          error: 'Failed to check profile existence', 
          details: fetchError.message,
          code: fetchError.code,
        },
        { status: 500 }
      )
    }

    // Profile doesn't exist - create it
    console.log('📝 [BOOTSTRAP] Profile does not exist, creating new profile...')
    console.log('💾 [BOOTSTRAP] Inserting profile row for user:', user.id.substring(0, 8) + '...')
    
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert({
        user_id: user.id,
        subscription_tier: 'free',
        subscription_status: 'inactive',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      // Handle duplicate key error (race condition)
      if (insertError.code === '23505') {
        console.log('✅ [BOOTSTRAP] Profile created by another request (race condition)')
        // Fetch the existing profile
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id, user_id')
          .eq('user_id', user.id)
          .single()
        
        return NextResponse.json({
          success: true,
          message: 'Profile created by another request',
          created: false,
          profileId: existingProfile?.id,
        })
      }

      console.error('❌ [BOOTSTRAP] Error creating profile:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        userId: user.id.substring(0, 8) + '...',
      })
      return NextResponse.json(
        { 
          error: 'Failed to create profile', 
          details: insertError.message,
          code: insertError.code,
          hint: insertError.hint,
        },
        { status: 500 }
      )
    }

    if (!newProfile) {
      console.error('❌ [BOOTSTRAP] Profile insert returned no data')
      return NextResponse.json(
        { error: 'Profile creation returned no data' },
        { status: 500 }
      )
    }

    console.log('✅ [BOOTSTRAP] Profile created successfully:', {
      profileId: newProfile.id,
      userId: newProfile.user_id.substring(0, 8) + '...',
      tier: newProfile.subscription_tier,
      status: newProfile.subscription_status,
      duration: Date.now() - startTime + 'ms',
    })

    return NextResponse.json({
      success: true,
      message: 'Profile created successfully',
      created: true,
      profile: {
        id: newProfile.id,
        user_id: newProfile.user_id,
        subscription_tier: newProfile.subscription_tier,
        subscription_status: newProfile.subscription_status,
      },
    })
  } catch (error: any) {
    console.error('❌ [BOOTSTRAP] Unexpected error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      duration: Date.now() - startTime + 'ms',
    })
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        type: error.name || 'UnknownError',
      },
      { status: 500 }
    )
  }
}
