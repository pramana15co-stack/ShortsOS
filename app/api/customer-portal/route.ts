import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client (optional - only if configured)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, action = 'cancel' } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Verify user exists
    if (supabase) {
      const { data, error } = await supabase
        .from('users')
        .select('id, subscription_status')
        .eq('id', userId)
        .single()

      if (error || !data) {
        console.error('Error fetching user:', error)
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      if (data.subscription_status !== 'active') {
        return NextResponse.json(
          { error: 'No active subscription found for this user' },
          { status: 404 }
        )
      }
    }

    // Handle subscription management actions
    // Note: We're using one-time payments, not subscriptions
    // This endpoint is kept for future subscription support
    if (action === 'cancel') {
      // For one-time payments, just update user status
      if (supabase) {
        const { error } = await supabase
          .from('users')
          .update({
            subscription_tier: 'free',
            subscription_status: 'cancelled',
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)

        if (error) {
          console.error('Error updating user subscription:', error)
          return NextResponse.json(
            { error: 'Failed to cancel subscription' },
            { status: 500 }
          )
        }
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Subscription cancelled successfully' 
      })
    }

    return NextResponse.json({ 
      error: 'Invalid action' 
    }, { status: 400 })
  } catch (error: any) {
    console.error('Error managing subscription:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to manage subscription' },
      { status: 500 }
    )
  }
}

