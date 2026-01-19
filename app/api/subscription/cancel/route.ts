import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function POST(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`
  
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get authenticated user from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required (Bearer token)' },
        { status: 401 }
      )
    }

    const accessToken = authHeader.substring(7)

    // Verify user from token
    if (!supabaseUrl || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const authClient = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { data: { user }, error: authError } = await authClient.auth.getUser(accessToken)
    
    if (authError || !user || user.id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    console.log(`🚪 [CANCEL ${requestId}] Cancelling subscription for user:`, {
      userId: userId.substring(0, 8) + '...',
    })

    // Update profile to cancel subscription
    // Keep access until plan_expiry, but mark as cancelled
    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update({
        subscription_status: 'cancelled',
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single()

    if (updateError) {
      console.error(`❌ [CANCEL ${requestId}] Error cancelling subscription:`, updateError)
      return NextResponse.json(
        { error: 'Failed to cancel subscription', details: updateError.message },
        { status: 500 }
      )
    }

    console.log(`✅ [CANCEL ${requestId}] Subscription cancelled successfully:`, {
      userId: userId.substring(0, 8) + '...',
      expiryDate: updatedProfile?.plan_expiry,
    })

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully. Your access will continue until the end of your billing period.',
      expiresAt: updatedProfile?.plan_expiry,
    })
  } catch (error: any) {
    console.error(`❌ [CANCEL ${requestId}] Unexpected error:`, error)
    return NextResponse.json(
      { error: error.message || 'Failed to cancel subscription' },
      { status: 500 }
    )
  }
}
