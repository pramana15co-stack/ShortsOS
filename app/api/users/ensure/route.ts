import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with service role for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

/**
 * Ensure user exists in public.users table
 * This is an idempotent operation - safe to call multiple times
 */
export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Check if user already exists in public.users
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single()

    // If user exists, return success (idempotent)
    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: 'User already exists',
        created: false,
      })
    }

    // If error is not "not found", something else went wrong
    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking user existence:', fetchError)
      return NextResponse.json(
        { error: 'Failed to check user existence', details: fetchError.message },
        { status: 500 }
      )
    }

    // User doesn't exist - create one
    // Try to get user email from auth.users (requires service role)
    let userEmail: string | null = null
    try {
      const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(userId)
      if (!authError && authUser?.user?.email) {
        userEmail = authUser.user.email
      }
    } catch (authError) {
      // Admin API might not be available or might fail
      // Continue without email - it can be updated later
      console.warn('Could not fetch user email from auth.users:', authError)
    }

    // Insert user into public.users with defaults
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        id: userId,
        email: userEmail,
        subscription_tier: 'free',
        subscription_status: 'inactive',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      // If it's a duplicate key error, user was created between check and insert (race condition)
      if (insertError.code === '23505') {
        return NextResponse.json({
          success: true,
          message: 'User created by another request',
          created: false,
        })
      }

      console.error('Error creating user:', insertError)
      return NextResponse.json(
        { error: 'Failed to create user', details: insertError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      created: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        subscription_tier: newUser.subscription_tier,
        subscription_status: newUser.subscription_status,
      },
    })
  } catch (error: any) {
    console.error('Error in ensure user endpoint:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
