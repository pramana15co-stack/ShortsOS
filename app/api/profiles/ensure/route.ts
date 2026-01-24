import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with service role for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Create service role client (bypasses RLS)
const getServiceRoleClient = () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Supabase service role not configured:', {
      hasUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
    })
    return null
  }

  // Verify service key format
  if (!supabaseServiceKey.startsWith('eyJ') && !supabaseServiceKey.includes('service_role')) {
    console.warn('⚠️ Service key format may be incorrect')
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * Ensure profile exists in public.profiles table
 * This is an idempotent operation - safe to call multiple times
 * 
 * CRITICAL: This must be server-side only (uses service role to bypass RLS)
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`
  
  try {
    // Get service role client
    const supabase = getServiceRoleClient()
    if (!supabase) {
      console.error('❌ Cannot create Supabase service role client')
      return NextResponse.json(
        { 
          error: 'Supabase service role not configured',
          debug: {
            hasUrl: !!supabaseUrl,
            hasServiceKey: !!supabaseServiceKey,
          }
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { userId } = body

    if (!userId || typeof userId !== 'string') {
      console.error('❌ Invalid user ID provided:', { userId, type: typeof userId })
      return NextResponse.json(
        { error: 'Valid user ID is required' },
        { status: 400 }
      )
    }

    // Log auth user ID
    console.log(`🔍 [PROFILE ENSURE ${requestId}] Starting for user:`, userId.substring(0, 8) + '...')
    console.log(`📋 [PROFILE ENSURE ${requestId}] Environment check:`, {
      hasServiceKey: !!supabaseServiceKey,
      serviceKeyLength: supabaseServiceKey?.length || 0,
      serviceKeyPrefix: supabaseServiceKey?.substring(0, 20) + '...' || 'missing',
      timestamp: new Date().toISOString(),
    })

    // Check if profile already exists in public.profiles (idempotency check)
    console.log(`🔍 [PROFILE ENSURE ${requestId}] Checking if profile exists:`, {
      userId: userId.substring(0, 8) + '...',
    })
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id, user_id, subscription_tier, subscription_status, created_at')
      .eq('user_id', userId)
      .single()

    // If profile exists, return success (idempotent) - no retry needed
    if (existingProfile) {
      console.log(`✅ [PROFILE ENSURE ${requestId}] Profile already exists (idempotent):`, {
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

    // If error is not "not found", something else went wrong
    if (fetchError) {
      // PGRST116 = no rows returned (expected when profile doesn't exist)
      if (fetchError.code === 'PGRST116') {
        console.log('📝 [PROFILE ENSURE] Profile does not exist, will create new one')
      } else {
        console.error('❌ [PROFILE ENSURE] Error checking profile existence:', {
          code: fetchError.code,
          message: fetchError.message,
          details: fetchError.details,
          hint: fetchError.hint,
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
    }

    // Profile doesn't exist - create one (idempotent insert)
    console.log(`📝 [PROFILE ENSURE ${requestId}] Creating new profile:`, {
      userId: userId.substring(0, 8) + '...',
    })

    // Verify user exists in auth.users first
    let userExists = false
    try {
      const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(userId)
      if (authError) {
        console.error('❌ [PROFILE ENSURE] User does not exist in auth.users:', {
          error: authError.message,
          userId: userId.substring(0, 8) + '...',
        })
        return NextResponse.json(
          { error: 'User does not exist in auth.users', details: authError.message },
          { status: 404 }
        )
      }
      userExists = !!authUser?.user
      console.log('✅ [PROFILE ENSURE] Verified user exists in auth.users:', {
        email: authUser?.user?.email || 'no email',
      })
    } catch (authError: any) {
      console.error('❌ [PROFILE ENSURE] Failed to verify user in auth.users:', authError)
      return NextResponse.json(
        { error: 'Failed to verify user', details: authError?.message },
        { status: 500 }
      )
    }

    if (!userExists) {
      console.error('❌ [PROFILE ENSURE] User does not exist in auth.users')
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 404 }
      )
    }

    // Insert profile into public.profiles with defaults
    // Service role client bypasses RLS automatically
    console.log(`💾 [PROFILE ENSURE ${requestId}] Inserting profile row:`, {
      userId: userId.substring(0, 8) + '...',
    })
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert({
        user_id: userId,
        subscription_tier: 'free',
        subscription_status: 'inactive',
        credits: 500, // Default 500 credits
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      // If it's a duplicate key error, profile was created between check and insert (race condition) - idempotent
      if (insertError.code === '23505') {
        console.log(`✅ [PROFILE ENSURE ${requestId}] Profile created by another request (race condition handled):`, {
          userId: userId.substring(0, 8) + '...',
        })
        // Fetch the existing profile
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id, user_id, subscription_tier, subscription_status')
          .eq('user_id', userId)
          .single()
        
        return NextResponse.json({
          success: true,
          message: 'Profile created by another request',
          created: false,
          profileId: existingProfile?.id,
          requestId,
        })
      }

      console.error(`❌ [PROFILE ENSURE ${requestId}] Error creating profile:`, {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        userId: userId.substring(0, 8) + '...',
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
      console.error('❌ [PROFILE ENSURE] Profile insert returned no data')
      return NextResponse.json(
        { error: 'Profile creation returned no data' },
        { status: 500 }
      )
    }

    console.log(`✅ [PROFILE ENSURE ${requestId}] Profile created successfully:`, {
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
    console.error(`❌ [PROFILE ENSURE ${requestId}] Unexpected error:`, {
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

/**
 * GET endpoint to check if profile exists (for debugging)
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = getServiceRoleClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase service role not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId query parameter required' },
        { status: 400 }
      )
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: 500 }
      )
    }

    return NextResponse.json({
      exists: !!profile,
      profile: profile || null,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
