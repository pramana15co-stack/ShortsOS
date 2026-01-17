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
    let order
    try {
      // Generate receipt ID (Razorpay limit: 40 characters)
      // Format: order_<short_user_id>_<timestamp>
      // Use first 8 chars of userId + timestamp (ensures < 40 chars)
      const shortUserId = userId.substring(0, 8)
      const timestamp = Date.now().toString().slice(-10) // Last 10 digits of timestamp
      const receipt = `order_${shortUserId}_${timestamp}` // Max: "order_" (6) + "_" (1) + 8 + "_" (1) + 10 = 26 chars
      
      console.log('Creating Razorpay order with:', {
        amount,
        currency: 'INR',
        plan,
        receipt,
        receiptLength: receipt.length,
        userId: userId.substring(0, 8) + '...',
      })
      
      order = await createRazorpayOrder({
        amount: amount,
        currency: 'INR',
        receipt: receipt, // Now guaranteed to be < 40 characters
        notes: {
          user_id: userId,
          user_email: userEmail,
          plan: plan,
          amount_charged: amount.toString(),
          display_price: PLAN_PRICES[plan as keyof typeof PLAN_PRICES].toString(),
        },
      })
      
      console.log('Razorpay order created successfully:', {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      })
    } catch (razorpayError: any) {
      console.error('❌ Razorpay order creation failed:', {
        error: razorpayError.message,
        statusCode: razorpayError.statusCode,
        errorDescription: razorpayError.error?.description,
        errorCode: razorpayError.error?.code,
        fullError: JSON.stringify(razorpayError, null, 2),
      })
      throw new Error(`Razorpay error: ${razorpayError.message || 'Failed to create order'}. ${razorpayError.error?.description || ''}`)
    }

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
    // Log full error details for debugging
    console.error('❌ Error in checkout API:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      statusCode: error.statusCode,
      razorpayError: error.error,
    })
    
    // Provide more helpful error messages
    let errorMessage = error.message || 'Failed to create payment order'
    
    if (error.message?.includes('Razorpay credentials not configured')) {
      errorMessage = 'Payment gateway not configured. Please check environment variables in Vercel dashboard.'
    } else if (error.message?.includes('Razorpay error')) {
      errorMessage = error.message
    } else if (error.statusCode === 401) {
      errorMessage = 'Invalid Razorpay credentials. Please verify your API keys in Vercel environment variables.'
    } else if (error.statusCode === 400) {
      errorMessage = `Razorpay API error: ${error.error?.description || error.message}`
    }
    
    // In production, log to Vercel but don't expose sensitive details
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    return NextResponse.json(
      { 
        error: errorMessage,
        // Only show detailed error in development
        details: isDevelopment ? {
          message: error.message,
          statusCode: error.statusCode,
          razorpayError: error.error,
        } : undefined,
        // Helpful message for production
        help: !isDevelopment ? 'Check Vercel function logs for detailed error information.' : undefined,
      },
      { status: 500 }
    )
  }
}

