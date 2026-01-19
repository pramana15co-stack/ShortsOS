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
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
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

    // Get user's profile with credits
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('credits, subscription_status, plan_expiry')
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('❌ [CREDITS] Error fetching profile:', error)
      return NextResponse.json(
        { error: 'Failed to fetch credits', credits: 0 },
        { status: 500 }
      )
    }

    // Check if user is paid
    const isPaid =
      profile.subscription_status === 'active' &&
      profile.plan_expiry &&
      new Date(profile.plan_expiry) > new Date()

    return NextResponse.json({
      credits: isPaid ? -1 : profile.credits || 0, // -1 means unlimited
      isPaid,
      unlimited: isPaid,
    })
  } catch (error) {
    console.error('❌ [CREDITS] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', credits: 0 },
      { status: 500 }
    )
  }
}
