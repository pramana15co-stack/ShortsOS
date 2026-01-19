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
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`
  
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
    console.log(`🔍 [BOOTSTRAP ${requestId}] Getting user from access token...`)
    const user = await getAuthenticatedUser(accessToken)
    
    if (!user) {
      console.error(`❌ [BOOTSTRAP ${requestId}] Invalid or expired access token`)
      return NextResponse.json(
        { error: 'Invalid or expired access token' },
        { status: 401 }
      )
    }

    console.log(`✅ [BOOTSTRAP ${requestId}] Authenticated user:`, {
      userId: user.id.substring(0, 8) + '...',
      email: user.email || 'no email',
      emailVerified: !!user.email_confirmed_at,
      timestamp: new Date().toISOString(),
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

    // Check if profile already exists (idempotency check)
    console.log(`🔍 [BOOTSTRAP ${requestId}] Checking if profile exists:`, {
      userId: user.id.substring(0, 8) + '...',
    })
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id, user_id, subscription_tier, subscription_status, created_at')
      .eq('user_id', user.id)
      .single()

    // If profile exists, return success (idempotent) - no retry needed
    if (existingProfile) {
      console.log(`✅ [BOOTSTRAP ${requestId}] Profile already exists (idempotent):`, {
        profileId: existingProfile.id,
        userId: existingProfile.user_id.substring(0, 8) + '...',
        tier: existingProfile.subscription_tier,
        status: existingProfile.subscription_status,
        created: existingProfile.created_at,
        duration: Date.now() - startTime + 'ms',
      })
      return NextResponse.json({
        success: true,
        message: 'Profile already exists',
        created: false,
        profileId: existingProfile.id,
        requestId,
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

    // Profile doesn't exist - create it (idempotent insert)
    console.log(`📝 [BOOTSTRAP ${requestId}] Profile does not exist, creating new profile:`, {
      userId: user.id.substring(0, 8) + '...',
    })
    
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert({
        user_id: user.id,
        subscription_tier: 'free',
        subscription_status: 'inactive',
        credits: 50, // Give new users 50 credits to start
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      // Handle duplicate key error (race condition) - idempotent
      if (insertError.code === '23505') {
        console.log(`✅ [BOOTSTRAP ${requestId}] Profile created by another request (race condition handled):`, {
          userId: user.id.substring(0, 8) + '...',
        })
        // Fetch the existing profile
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id, user_id, subscription_tier, subscription_status')
          .eq('user_id', user.id)
          .single()
        
        return NextResponse.json({
          success: true,
          message: 'Profile created by another request',
          created: false,
          profileId: existingProfile?.id,
          requestId,
        })
      }

      console.error(`❌ [BOOTSTRAP ${requestId}] Error creating profile:`, {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        userId: user.id.substring(0, 8) + '...',
        duration: Date.now() - startTime + 'ms',
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

    console.log(`✅ [BOOTSTRAP ${requestId}] Profile created successfully:`, {
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
      requestId,
    })
  } catch (error: any) {
    console.error(`❌ [BOOTSTRAP ${requestId}] Unexpected error:`, {
      message: error.message,
      stack: error.stack,
      name: error.name,
      duration: Date.now() - startTime + 'ms',
    })
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        type: error.name || 'UnknownError',
        requestId,
      },
      { status: 500 }
    )
  }
}
