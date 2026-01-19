import { NextRequest, NextResponse } from 'next/server'
import { createRazorpayOrder } from '@/lib/razorpay'
import { createClient } from '@supabase/supabase-js'
import { requireEnvVars } from '@/lib/envValidation'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// Plan pricing (in rupees)
const PLAN_PRICES = {
  starter: 799,
  pro: 2499,
}

// Discount for first-time Starter users
const STARTER_FIRST_TIME_DISCOUNT = 499

export async function POST(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`
  
  try {
    // Validate environment variables
    try {
      requireEnvVars()
    } catch (envError: any) {
      console.error(`❌ [CREATE-ORDER ${requestId}] Env validation failed:`, envError.message)
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      )
    }
    const body = await request.json()
    const { plan = 'starter' } = body

    console.log(`🚀 [CREATE-ORDER ${requestId}] Creating Razorpay order:`, {
      plan,
      timestamp: new Date().toISOString(),
    })

    if (plan !== 'starter' && plan !== 'pro') {
      console.error(`❌ [CREATE-ORDER ${requestId}] Invalid plan:`, plan)
      return NextResponse.json(
        { error: 'Invalid plan. Must be "starter" or "pro"' },
        { status: 400 }
      )
    }

    // Get authenticated user from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error(`❌ [CREATE-ORDER ${requestId}] Missing Authorization header`)
      return NextResponse.json(
        { error: 'Authorization header required (Bearer token)' },
        { status: 401 }
      )
    }

    const accessToken = authHeader.substring(7)

    // Verify user from token
    if (!supabaseUrl || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error(`❌ [CREATE-ORDER ${requestId}] Supabase not configured`)
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
    
    if (authError || !user) {
      console.error(`❌ [CREATE-ORDER ${requestId}] Invalid or expired token:`, authError?.message)
      return NextResponse.json(
        { error: 'Invalid or expired access token' },
        { status: 401 }
      )
    }

    console.log(`✅ [CREATE-ORDER ${requestId}] Authenticated user:`, {
      userId: user.id.substring(0, 8) + '...',
      email: user.email || 'no email',
    })

    // Determine actual charge amount
    let amount = PLAN_PRICES[plan as keyof typeof PLAN_PRICES]

    // Apply discount for Starter plan first-time users
    if (plan === 'starter' && supabase) {
      try {
        const { data: payments, error: paymentError } = await supabase
          .from('payments')
          .select('id')
          .eq('user_id', user.id)
          .limit(1)

        if (!paymentError && (!payments || payments.length === 0)) {
          amount = STARTER_FIRST_TIME_DISCOUNT
          console.log(`💰 [CREATE-ORDER ${requestId}] Applying first-time discount:`, amount)
        }
      } catch (error) {
        console.warn(`⚠️ [CREATE-ORDER ${requestId}] Error checking payment history:`, error)
      }
    }

    // Create Razorpay order
    const shortUserId = user.id.substring(0, 8)
    const timestamp = Date.now().toString().slice(-10)
    const receipt = `order_${shortUserId}_${timestamp}`

    console.log(`💳 [CREATE-ORDER ${requestId}] Creating Razorpay order:`, {
      amount,
      currency: 'INR',
      plan,
      receipt,
      userId: user.id.substring(0, 8) + '...',
    })

    const order = await createRazorpayOrder({
      amount: amount,
      currency: 'INR',
      receipt: receipt,
      notes: {
        user_id: user.id,
        user_email: user.email || '',
        plan: plan,
        amount_charged: amount.toString(),
        display_price: PLAN_PRICES[plan as keyof typeof PLAN_PRICES].toString(),
      },
    })

    console.log(`✅ [CREATE-ORDER ${requestId}] Order created successfully:`, {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })

    // Get public key for frontend
    const publicKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    
    if (!publicKey) {
      console.error(`❌ [CREATE-ORDER ${requestId}] NEXT_PUBLIC_RAZORPAY_KEY_ID not set`)
      return NextResponse.json(
        { error: 'Payment gateway configuration error' },
        { status: 500 }
      )
    }

    const planNames = {
      starter: 'Starter Plan',
      pro: 'Creator Pro Plan',
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount, // Already in paise
      currency: order.currency,
      key: publicKey,
      name: 'Pramana',
      description: `${planNames[plan as keyof typeof planNames]} - Monthly Subscription`,
      prefill: {
        email: user.email || '',
      },
      theme: {
        color: '#6366f1',
      },
      requestId,
    })
  } catch (error: any) {
    console.error(`❌ [CREATE-ORDER ${requestId}] Error:`, {
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode,
      razorpayError: error.error,
    })
    
    let errorMessage = error.message || 'Failed to create payment order'
    
    if (error.message?.includes('Razorpay credentials not configured')) {
      errorMessage = 'Payment gateway not configured'
    } else if (error.message?.includes('Razorpay error')) {
      errorMessage = error.message
    } else if (error.statusCode === 401) {
      errorMessage = 'Invalid Razorpay credentials'
    } else if (error.statusCode === 400) {
      errorMessage = `Razorpay API error: ${error.error?.description || error.message}`
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        requestId,
      },
      { status: 500 }
    )
  }
}
