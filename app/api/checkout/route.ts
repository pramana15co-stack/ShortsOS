import { NextRequest, NextResponse } from 'next/server'
import { createRazorpayOrder } from '@/lib/razorpay'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// Plan pricing (in rupees)
const PLAN_PRICES = {
  starter: 799, // Display price
  pro: 2499, // Display price
}

// Discount for first-time Starter users
const STARTER_FIRST_TIME_DISCOUNT = 499 // Early Creator Discount

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userEmail, plan = 'starter' } = body

    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: 'User ID and email are required' },
        { status: 400 }
      )
    }

    if (plan !== 'starter' && plan !== 'pro') {
      return NextResponse.json(
        { error: 'Invalid plan. Must be "starter" or "pro"' },
        { status: 400 }
      )
    }

    // Determine actual charge amount
    let amount = PLAN_PRICES[plan as keyof typeof PLAN_PRICES]

    // Apply discount for Starter plan first-time users
    if (plan === 'starter' && supabase) {
      try {
        // Check if user has ever made a payment before
        const { data: payments, error: paymentError } = await supabase
          .from('payments')
          .select('id')
          .eq('user_id', userId)
          .limit(1)

        // If no previous payments found, apply discount
        if (!paymentError && (!payments || payments.length === 0)) {
          amount = STARTER_FIRST_TIME_DISCOUNT
        }
        // Else use regular price (₹799)
      } catch (error) {
        console.error('Error checking payment history:', error)
        // On error, default to regular price for safety
      }
    }

    // Create Razorpay order
    const order = await createRazorpayOrder({
      amount: amount,
      currency: 'INR',
      receipt: `order_${userId}_${Date.now()}`,
      notes: {
        user_id: userId,
        user_email: userEmail,
        plan: plan,
        amount_charged: amount.toString(),
        display_price: PLAN_PRICES[plan as keyof typeof PLAN_PRICES].toString(),
      },
    })

    // Plan display names
    const planNames = {
      starter: 'Starter Plan',
      pro: 'Creator Pro Plan',
    }

    // Get public key for frontend
    const publicKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    
    if (!publicKey) {
      console.error('❌ NEXT_PUBLIC_RAZORPAY_KEY_ID is not set!')
      return NextResponse.json(
        { error: 'Payment gateway configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    // Return order details for frontend Razorpay Checkout
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount, // Already in paise
      currency: order.currency,
      key: publicKey,
      name: 'Pramana',
      description: `${planNames[plan as keyof typeof planNames]} - Monthly Subscription`,
      prefill: {
        email: userEmail,
      },
      theme: {
        color: '#6366f1', // Indigo color matching your brand
      },
    })
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment order' },
      { status: 500 }
    )
  }
}

