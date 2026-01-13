import { NextRequest, NextResponse } from 'next/server'
import { cancelRazorpaySubscription } from '@/lib/razorpay'
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

    // Get user's Razorpay subscription ID from database
    let subscriptionId: string | null = null

    if (supabase) {
      const { data, error } = await supabase
        .from('users')
        .select('razorpay_subscription_id')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user:', error)
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      subscriptionId = data?.razorpay_subscription_id
    } else {
      // Demo mode - would fetch from database
      console.log('Demo mode: Would fetch subscription ID for user', userId)
    }

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'No active subscription found for this user' },
        { status: 404 }
      )
    }

    // Handle subscription management actions
    if (action === 'cancel') {
      // Cancel Razorpay subscription
      await cancelRazorpaySubscription(subscriptionId)

      // Update user in database
      if (supabase) {
        const { error } = await supabase
          .from('users')
          .update({
            subscription_tier: 'free',
            subscription_status: 'cancelled',
            razorpay_subscription_id: null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)

        if (error) {
          console.error('Error updating user subscription:', error)
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

