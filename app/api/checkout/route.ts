import { NextRequest, NextResponse } from 'next/server'
import { createRazorpayOrder } from '@/lib/razorpay'
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
    const { userId, userEmail, plan = 'starter' } = body

    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: 'User ID and email are required' },
        { status: 400 }
      )
    }

    // Get plan amount from environment or config
    // Starter plan: ₹499/month (or set your price)
    const planAmount = process.env.RAZORPAY_PLAN_AMOUNT_STARTER 
      ? parseInt(process.env.RAZORPAY_PLAN_AMOUNT_STARTER)
      : 499 // Default: ₹499

    // Create Razorpay order
    const order = await createRazorpayOrder({
      amount: planAmount,
      currency: 'INR',
      receipt: `order_${userId}_${Date.now()}`,
      notes: {
        user_id: userId,
        user_email: userEmail,
        plan: plan,
      },
    })

    // Return order details for frontend Razorpay Checkout
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public key for frontend
      name: 'Pramana',
      description: `Starter Plan Subscription`,
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

