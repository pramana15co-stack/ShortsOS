import { NextRequest, NextResponse } from 'next/server'
import { verifyPaymentSignature, getPaymentDetails, getRazorpayInstance } from '@/lib/razorpay'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentId, orderId, signature, userId } = body

    if (!paymentId || !orderId || !signature || !userId) {
      return NextResponse.json(
        { error: 'Missing required payment verification data' },
        { status: 400 }
      )
    }

    // Verify payment signature
    const isValid = verifyPaymentSignature({
      orderId,
      paymentId,
      signature,
    })

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Fetch payment details from Razorpay
    const payment = await getPaymentDetails(paymentId)

    if (payment.status !== 'captured' && payment.status !== 'authorized') {
      return NextResponse.json(
        { error: 'Payment not successful' },
        { status: 400 }
      )
    }

    // Fetch order details to get plan information
    const razorpay = getRazorpayInstance()
    const order = await razorpay.orders.fetch(orderId)
    
    // Get plan from order notes
    const plan = (order.notes?.plan as string) || 'starter'
    const amountPaidPaise = payment.amount // Already in paise from Razorpay
    const amountPaidRupees = amountPaidPaise / 100 // Convert to rupees for display

    // Calculate expiry date (30 days from now)
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)

    // Update user subscription in database
    if (supabase) {
      // First, save payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: userId,
          payment_id: paymentId,
          order_id: orderId,
          plan: plan,
          amount: amountPaidPaise, // Store in paise (INTEGER)
          currency: payment.currency,
          status: payment.status,
          payment_date: new Date().toISOString(),
        })

      if (paymentError) {
        console.error('Error saving payment:', paymentError)
        // Continue anyway - we'll still update user
      }

      // Update user subscription
      const { error: userError } = await supabase
        .from('users')
        .update({
          subscription_tier: plan === 'pro' ? 'pro' : 'starter',
          subscription_status: 'active',
          plan_expiry: expiryDate.toISOString(),
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)

      if (userError) {
        console.error('Error updating user subscription:', userError)
        return NextResponse.json(
          { error: 'Failed to update subscription. Payment was successful but subscription update failed.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      plan,
      amountPaid: amountPaidRupees, // Return in rupees for API response
      amountPaidPaise: amountPaidPaise, // Also include paise for reference
      expiryDate: expiryDate.toISOString(),
    })
  } catch (error: any) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
