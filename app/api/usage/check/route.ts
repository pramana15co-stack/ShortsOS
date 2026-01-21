import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isUserPaid } from '@/lib/planValidation'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

const FREE_USER_LIMITS: Record<string, number> = {
  'prompt-studio': 5,
  'hook-caption': 10,
  'post-processing': 3,
  'creator-audit': 1,
  'planner': 10,
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { feature, userId } = body

    if (!feature || !userId) {
      return NextResponse.json(
        { error: 'Feature and userId are required' },
        { status: 400 }
      )
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Get user profile to check if paid or admin - use maybeSingle
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_id, subscription_tier, subscription_status, plan_expiry, is_admin')
      .eq('user_id', userId)
      .maybeSingle()

    // Admin always has unlimited access
    if (profile?.is_admin) {
      return NextResponse.json({
        allowed: true,
        remaining: -1,
        limit: -1,
        isPaid: true,
        isAdmin: true,
      })
    }

    // Create user-like object for isUserPaid function
    const userForCheck = profile ? {
      id: profile.user_id,
      subscription_tier: profile.subscription_tier,
      subscription_status: profile.subscription_status,
      plan_expiry: profile.plan_expiry,
      is_admin: profile.is_admin,
    } : null

    const isPaid = isUserPaid(userForCheck)

    // Paid users have unlimited access
    if (isPaid) {
      return NextResponse.json({
        allowed: true,
        remaining: -1,
        limit: -1,
        isPaid: true,
      })
    }

    const limit = FREE_USER_LIMITS[feature] || 0

    // Get today's usage
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const todayISO = today.toISOString()
    const tomorrowISO = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()

    const { data: usageRecords } = await supabase
      .from('usage_tracking')
      .select('id')
      .eq('user_id', userId)
      .eq('feature', feature)
      .gte('usage_date', todayISO)
      .lt('usage_date', tomorrowISO)

    const used = usageRecords?.length || 0
    const remaining = Math.max(0, limit - used)

    return NextResponse.json({
      allowed: used < limit,
      remaining,
      limit,
      used,
      isPaid: false,
    })
  } catch (error: any) {
    console.error('Error checking usage:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to check usage' },
      { status: 500 }
    )
  }
}
