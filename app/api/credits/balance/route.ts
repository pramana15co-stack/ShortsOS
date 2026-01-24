import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

function getServiceRoleClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase configuration missing')
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('❌ [CREDITS] Failed to parse request body:', parseError)
      return NextResponse.json(
        { error: 'Invalid request body', credits: 0 },
        { status: 400 }
      )
    }

    const { userId } = body

    if (!userId) {
      console.warn('⚠️ [CREDITS] Missing userId in request')
      return NextResponse.json(
        { error: 'User ID is required', credits: 0 },
        { status: 400 }
      )
    }

    let supabase
    try {
      supabase = getServiceRoleClient()
    } catch (error) {
      console.error('❌ [CREDITS] Configuration error:', error)
      return NextResponse.json(
        { error: 'Server configuration error', credits: 0 },
        { status: 500 }
      )
    }

    // Get user's profile with credits - use maybeSingle to handle missing profiles
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('credits, subscription_status, plan_expiry, is_admin')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) {
      console.error('❌ [CREDITS] Error fetching profile:', error)
      return NextResponse.json(
        { error: 'Failed to fetch credits', credits: 0 },
        { status: 500 }
      )
    }

    // Handle missing profile gracefully
    if (!profile) {
      console.warn(`⚠️ [CREDITS] Profile missing for user ${userId.substring(0, 8)}...`)
      return NextResponse.json(
        { error: 'Profile missing', credits: 0 },
        { status: 404 }
      )
    }

    // Admin always has unlimited credits
    if (profile.is_admin) {
      return NextResponse.json({
        credits: 999999, // Display a high number instead of -1 for better UX
        isPaid: true,
        unlimited: true,
        isAdmin: true,
      })
    }

    // Check if user is paid
    const isPaid =
      profile.subscription_status === 'active' &&
      profile.plan_expiry &&
      new Date(profile.plan_expiry) > new Date()

    return NextResponse.json({
      credits: isPaid ? 999999 : profile.credits || 0,
      isPaid: !!isPaid, // Ensure boolean
      unlimited: !!isPaid,
    })
  } catch (error) {
    console.error('❌ [CREDITS] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', credits: 0 },
      { status: 500 }
    )
  }
}
