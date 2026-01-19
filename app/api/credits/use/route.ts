import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { FEATURE_CREDITS, type FeatureName } from '@/lib/credits'

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
    const { userId, feature } = await request.json()

    if (!userId || !feature) {
      return NextResponse.json(
        { error: 'User ID and feature are required' },
        { status: 400 }
      )
    }

    if (!(feature in FEATURE_CREDITS)) {
      return NextResponse.json(
        { error: 'Invalid feature' },
        { status: 400 }
      )
    }

    let supabase
    try {
      supabase = getServiceRoleClient()
    } catch (error) {
      console.error('❌ [CREDITS] Configuration error:', error)
      return NextResponse.json(
        { error: 'Server configuration error', success: false },
        { status: 500 }
      )
    }

    // Get user's profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('credits, subscription_status, plan_expiry')
      .eq('user_id', userId)
      .single()

    if (profileError || !profile) {
      console.error('❌ [CREDITS] Error fetching profile:', profileError)
      return NextResponse.json(
        { error: 'Failed to fetch profile', success: false },
        { status: 500 }
      )
    }

    // Check if user is paid (unlimited credits)
    const isPaid =
      profile.subscription_status === 'active' &&
      profile.plan_expiry &&
      new Date(profile.plan_expiry) > new Date()

    if (isPaid) {
      // Paid users don't use credits, but we still record the transaction
      const creditCost = FEATURE_CREDITS[feature as FeatureName]
      await supabase.from('credits_transactions').insert({
        user_id: userId,
        feature,
        credits_used: 0, // 0 for paid users
        credits_remaining: -1, // -1 means unlimited
      })

      return NextResponse.json({
        success: true,
        creditsUsed: 0,
        creditsRemaining: -1,
        unlimited: true,
      })
    }

    // Check if user has enough credits
    const creditCost = FEATURE_CREDITS[feature as FeatureName]
    const currentCredits = profile.credits || 0

    if (currentCredits < creditCost) {
      return NextResponse.json(
        {
          success: false,
          error: 'Insufficient credits',
          creditsRemaining: currentCredits,
          creditsNeeded: creditCost,
        },
        { status: 403 }
      )
    }

    // Deduct credits
    const newCredits = currentCredits - creditCost

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ credits: newCredits })
      .eq('user_id', userId)

    if (updateError) {
      console.error('❌ [CREDITS] Error updating credits:', updateError)
      return NextResponse.json(
        { error: 'Failed to deduct credits', success: false },
        { status: 500 }
      )
    }

    // Record transaction
    await supabase.from('credits_transactions').insert({
      user_id: userId,
      feature,
      credits_used: creditCost,
      credits_remaining: newCredits,
    })

    console.log(
      `✅ [CREDITS] User ${userId} used ${creditCost} credits for ${feature}. Remaining: ${newCredits}`
    )

    return NextResponse.json({
      success: true,
      creditsUsed: creditCost,
      creditsRemaining: newCredits,
      unlimited: false,
    })
  } catch (error) {
    console.error('❌ [CREDITS] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    )
  }
}
