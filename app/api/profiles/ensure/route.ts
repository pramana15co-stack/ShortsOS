import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with service role for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

/**
 * Ensure profile exists in public.profiles table
 * This is an idempotent operation - safe to call multiple times
 * 
 * CRITICAL: This must be server-side only (uses service role)
 */
export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      console.error('❌ Supabase not configured')
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { userId } = body

    if (!userId) {
      console.error('❌ User ID is required')
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    console.log('🔍 Checking profile existence for user:', userId.substring(0, 8) + '...')

    // Check if profile already exists in public.profiles
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id, user_id')
      .eq('user_id', userId)
      .single()

    // If profile exists, return success (idempotent)
    if (existingProfile) {
      console.log('✅ Profile already exists:', {
        profileId: existingProfile.id,
        userId: existingProfile.user_id.substring(0, 8) + '...',
      })
      return NextResponse.json({
        success: true,
        message: 'Profile already exists',
        created: false,
        profileId: existingProfile.id,
      })
    }

    // If error is not "not found", something else went wrong
    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('❌ Error checking profile existence:', {
        code: fetchError.code,
        message: fetchError.message,
        details: fetchError.details,
      })
      return NextResponse.json(
        { error: 'Failed to check profile existence', details: fetchError.message },
        { status: 500 }
      )
    }

    // Profile doesn't exist - create one
    console.log('📝 Creating new profile for user:', userId.substring(0, 8) + '...')

    // Try to get user email from auth.users (requires service role)
    let userEmail: string | null = null
    try {
      const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(userId)
      if (!authError && authUser?.user?.email) {
        userEmail = authUser.user.email
        console.log('✅ Fetched email from auth.users')
      }
    } catch (authError) {
      // Admin API might not be available or might fail
      // Continue without email - it can be updated later
      console.warn('⚠️ Could not fetch user email from auth.users:', authError)
    }

    // Insert profile into public.profiles with defaults
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert({
        user_id: userId,
        subscription_tier: 'free',
        subscription_status: 'inactive',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      // If it's a duplicate key error, profile was created between check and insert (race condition)
      if (insertError.code === '23505') {
        console.log('✅ Profile created by another request (race condition handled)')
        return NextResponse.json({
          success: true,
          message: 'Profile created by another request',
          created: false,
        })
      }

      console.error('❌ Error creating profile:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
      })
      return NextResponse.json(
        { error: 'Failed to create profile', details: insertError.message },
        { status: 500 }
      )
    }

    console.log('✅ Profile created successfully:', {
      profileId: newProfile.id,
      userId: newProfile.user_id.substring(0, 8) + '...',
      tier: newProfile.subscription_tier,
      status: newProfile.subscription_status,
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
    console.error('❌ Error in ensure profile endpoint:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
