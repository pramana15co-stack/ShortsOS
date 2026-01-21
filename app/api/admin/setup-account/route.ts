import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

function getServiceRoleClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
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
 * Admin account setup endpoint
 * Creates or upgrades an account to admin with all premium features
 * 
 * Usage: POST /api/admin/setup-account
 * Body: { email: string, credits?: number }
 * 
 * Security: This should be protected in production (e.g., require admin API key)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, credits = 1000 } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const supabase = getServiceRoleClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Find user by email
    const { data: authUsers, error: findError } = await supabase.auth.admin.listUsers()
    
    if (findError) {
      console.error('Error finding user:', findError)
      return NextResponse.json(
        { error: 'Failed to find user', details: findError.message },
        { status: 500 }
      )
    }

    const user = authUsers.users.find(u => u.email === email.toLowerCase().trim())

    if (!user) {
      return NextResponse.json(
        { error: `User with email ${email} not found. Please sign up first.` },
        { status: 404 }
      )
    }

    const userId = user.id

    // Get or create profile
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    // Set expiry to 1 year from now
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

    // Upsert profile with admin/premium settings
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .upsert(
        {
          user_id: userId,
          subscription_tier: 'agency', // Highest tier
          subscription_status: 'active',
          plan_expiry: oneYearFromNow.toISOString(),
          credits: credits,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id',
          ignoreDuplicates: false,
        }
      )
      .select()
      .single()

    if (profileError) {
      console.error('Error updating profile:', profileError)
      return NextResponse.json(
        { error: 'Failed to update profile', details: profileError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Admin account setup complete for ${email}`,
      profile: {
        email: user.email,
        subscription_tier: profile.subscription_tier,
        subscription_status: profile.subscription_status,
        credits: profile.credits,
        plan_expiry: profile.plan_expiry,
      },
    })
  } catch (error: any) {
    console.error('Admin setup error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
