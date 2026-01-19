import { NextRequest, NextResponse } from 'next/server'
import { verifyPaymentSignature, getPaymentDetails, getRazorpayInstance } from '@/lib/razorpay'
import { createClient } from '@supabase/supabase-js'
import { requireEnvVars } from '@/lib/envValidation'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`
  
  try {
    // Validate environment variables
    try {
      requireEnvVars()
    } catch (envError: any) {
      console.error(`❌ [VERIFY ${requestId}] Env validation failed:`, envError.message)
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      )
    }
    const body = await request.json()
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature, 
      plan 
    } = body

    console.log(`🚀 [VERIFY ${requestId}] Payment verification started:`, {
      paymentId: razorpay_payment_id ? razorpay_payment_id.substring(0, 12) + '...' : 'missing',
      orderId: razorpay_order_id ? razorpay_order_id.substring(0, 12) + '...' : 'missing',
      plan: plan || 'missing',
      timestamp: new Date().toISOString(),
    })

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !plan) {
      console.error(`❌ [VERIFY ${requestId}] Missing required fields:`, {
        hasPaymentId: !!razorpay_payment_id,
        hasOrderId: !!razorpay_order_id,
        hasSignature: !!razorpay_signature,
        hasPlan: !!plan,
      })
      return NextResponse.json(
        { error: 'Missing required payment verification data' },
        { status: 400 }
      )
    }

    if (plan !== 'starter' && plan !== 'pro') {
      console.error(`❌ [VERIFY ${requestId}] Invalid plan:`, plan)
      return NextResponse.json(
        { error: 'Invalid plan. Must be "starter" or "pro"' },
        { status: 400 }
      )
    }

    // Get authenticated user from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error(`❌ [VERIFY ${requestId}] Missing Authorization header`)
      return NextResponse.json(
        { error: 'Authorization header required (Bearer token)' },
        { status: 401 }
      )
    }

    const accessToken = authHeader.substring(7)

    // Verify user from token
    if (!supabaseUrl || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error(`❌ [VERIFY ${requestId}] Supabase not configured`)
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
      console.error(`❌ [VERIFY ${requestId}] Invalid or expired token:`, authError?.message)
      return NextResponse.json(
        { error: 'Invalid or expired access token' },
        { status: 401 }
      )
    }

    const userId = user.id

    console.log(`✅ [VERIFY ${requestId}] Authenticated user:`, {
      userId: userId.substring(0, 8) + '...',
      email: user.email || 'no email',
    })

    // Verify payment signature using HMAC_SHA256
    const isValid = verifyPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    })

    if (!isValid) {
      console.error(`❌ [VERIFY ${requestId}] Invalid payment signature:`, {
        userId: userId.substring(0, 8) + '...',
        paymentId: razorpay_payment_id.substring(0, 12) + '...',
      })
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    console.log(`✅ [VERIFY ${requestId}] Signature verified successfully`)

    if (!supabase) {
      console.error(`❌ [VERIFY ${requestId}] Supabase service client not configured`)
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Fetch payment details from Razorpay
    const payment = await getPaymentDetails(razorpay_payment_id)

    // Verify payment is successful
    if (payment.status !== 'captured' && payment.status !== 'authorized') {
      console.error(`❌ [VERIFY ${requestId}] Payment not successful:`, {
        paymentId: razorpay_payment_id.substring(0, 12) + '...',
        status: payment.status,
      })
      return NextResponse.json(
        { error: `Payment not successful. Status: ${payment.status}` },
        { status: 400 }
      )
    }

    // Amount is already in paise from Razorpay
    const amountPaidPaise = payment.amount
    const amountPaidRupees = amountPaidPaise / 100

    // Calculate expiry date (30 days from now)
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)

    console.log(`💾 [VERIFY ${requestId}] Processing payment:`, {
      userId: userId.substring(0, 8) + '...',
      paymentId: razorpay_payment_id.substring(0, 12) + '...',
      orderId: razorpay_order_id.substring(0, 12) + '...',
      plan,
      amountPaidPaise,
      expiryDate: expiryDate.toISOString(),
    })

    // Check if payment already exists (idempotency)
    const { data: existingPayment, error: checkError } = await supabase
      .from('payments')
      .select('id, payment_id, user_id, plan, amount, status')
      .eq('payment_id', razorpay_payment_id)
      .single()

    let paymentRecord = existingPayment
    let paymentInserted = false

    if (existingPayment) {
      console.log(`✅ [VERIFY ${requestId}] Payment already exists (idempotent):`, {
        paymentId: existingPayment.payment_id?.substring(0, 12) + '...',
        existingStatus: existingPayment.status,
        existingPlan: existingPayment.plan,
      })
    } else if (checkError && checkError.code !== 'PGRST116') {
      console.error(`❌ [VERIFY ${requestId}] Error checking payment existence:`, {
        code: checkError.code,
        message: checkError.message,
      })
      return NextResponse.json(
        { 
          error: 'Failed to check payment existence',
          details: checkError.message,
        },
        { status: 500 }
      )
    } else {
      // Insert payment record
      console.log(`💾 [VERIFY ${requestId}] Inserting payment record...`)
      
      const { data: newPaymentRecord, error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: userId,
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
          plan: plan,
          amount: amountPaidPaise,
          currency: payment.currency || 'INR',
          status: 'success',
          payment_date: new Date().toISOString(),
        })
        .select()
        .single()

      if (paymentError) {
        if (paymentError.code === '23505') {
          // Duplicate key (race condition)
          console.log(`✅ [VERIFY ${requestId}] Payment created by another request (race condition)`)
          const { data: existingPayment } = await supabase
            .from('payments')
            .select('id, payment_id, user_id, plan, amount, status')
            .eq('payment_id', razorpay_payment_id)
            .single()
          
          paymentRecord = existingPayment || null
        } else {
          console.error(`❌ [VERIFY ${requestId}] Error saving payment:`, {
            code: paymentError.code,
            message: paymentError.message,
            details: paymentError.details,
          })
          return NextResponse.json(
            { 
              error: 'Failed to save payment record',
              details: paymentError.message,
            },
            { status: 500 }
          )
        }
      } else {
        paymentRecord = newPaymentRecord
        paymentInserted = true
        console.log(`✅ [VERIFY ${requestId}] Payment record inserted:`, {
          paymentId: paymentRecord?.payment_id?.substring(0, 12) + '...',
          plan: paymentRecord?.plan,
          amount: paymentRecord?.amount,
        })
      }
    }

    // Check current profile state
    let { data: currentProfile, error: currentProfileError } = await supabase
      .from('profiles')
      .select('id, user_id, subscription_tier, subscription_status, plan_expiry, razorpay_payment_id')
      .eq('user_id', userId)
      .single()

    if (currentProfileError && currentProfileError.code !== 'PGRST116') {
      console.error(`❌ [VERIFY ${requestId}] Error checking profile:`, {
        code: currentProfileError.code,
        message: currentProfileError.message,
      })
      return NextResponse.json(
        { 
          error: 'Failed to check profile state',
          details: currentProfileError.message,
        },
        { status: 500 }
      )
    }

    // Auto-create profile if it doesn't exist (bulletproof)
    if (!currentProfile) {
      console.log(`📝 [VERIFY ${requestId}] Profile not found, creating automatically:`, {
        userId: userId.substring(0, 8) + '...',
      })
      
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          user_id: userId,
          subscription_tier: 'free', // Will be updated below
          subscription_status: 'inactive', // Will be updated below
          plan_expiry: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (createError) {
        if (createError.code === '23505') {
          // Race condition - profile created by another request
          console.log(`✅ [VERIFY ${requestId}] Profile created by another request (race condition)`)
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id, user_id, subscription_tier, subscription_status, plan_expiry, razorpay_payment_id')
            .eq('user_id', userId)
            .single()
          
          if (existingProfile) {
            currentProfile = existingProfile
          } else {
            console.error(`❌ [VERIFY ${requestId}] Failed to fetch profile after race condition:`, createError)
            return NextResponse.json(
              { error: 'Failed to create or fetch profile. Please try again.' },
              { status: 500 }
            )
          }
        } else {
          console.error(`❌ [VERIFY ${requestId}] Error creating profile:`, {
            code: createError.code,
            message: createError.message,
            details: createError.details,
          })
          return NextResponse.json(
            { error: 'Failed to create profile. Payment was successful but profile creation failed.', details: createError.message },
            { status: 500 }
          )
        }
      } else if (newProfile) {
        currentProfile = newProfile
        console.log(`✅ [VERIFY ${requestId}] Profile created successfully:`, {
          profileId: newProfile.id,
          userId: newProfile.user_id.substring(0, 8) + '...',
        })
      } else {
        console.error(`❌ [VERIFY ${requestId}] Profile creation returned no data`)
        return NextResponse.json(
          { error: 'Profile creation returned no data' },
          { status: 500 }
        )
      }
    }

    // Ensure profile exists at this point
    if (!currentProfile) {
      console.error(`❌ [VERIFY ${requestId}] Profile still not found after creation attempt`)
      return NextResponse.json(
        { error: 'Failed to create or fetch profile. Please try again.' },
        { status: 500 }
      )
    }

    // Check if profile already has this payment (idempotency)
    if (currentProfile.razorpay_payment_id === razorpay_payment_id) {
      console.log(`✅ [VERIFY ${requestId}] Profile already updated with this payment (idempotent):`, {
        profileId: currentProfile.id,
        existingTier: currentProfile.subscription_tier,
        existingStatus: currentProfile.subscription_status,
      })
      return NextResponse.json({
        success: true,
        message: 'Payment already processed',
        alreadyProcessed: true,
        plan: currentProfile.subscription_tier,
        amountPaid: amountPaidRupees,
        expiryDate: currentProfile.plan_expiry,
        subscription: {
          tier: currentProfile.subscription_tier,
          status: currentProfile.subscription_status,
          expiresAt: currentProfile.plan_expiry,
        },
        requestId,
      })
    }

    // Update profile subscription
    console.log(`📝 [VERIFY ${requestId}] Updating profile subscription:`, {
      profileId: currentProfile.id,
      currentTier: currentProfile.subscription_tier,
      currentStatus: currentProfile.subscription_status,
      newTier: plan,
      newStatus: 'active',
    })
    
    const { data: updatedProfile, error: profileError } = await supabase
      .from('profiles')
      .update({
        subscription_tier: plan,
        subscription_status: 'active',
        plan_expiry: expiryDate.toISOString(),
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single()

    if (profileError) {
      console.error(`❌ [VERIFY ${requestId}] Error updating profile:`, {
        code: profileError.code,
        message: profileError.message,
        details: profileError.details,
      })
      return NextResponse.json(
        { 
          error: 'Failed to update subscription. Payment was successful but subscription update failed.',
          details: profileError.message,
        },
        { status: 500 }
      )
    }

    if (!updatedProfile) {
      console.error(`❌ [VERIFY ${requestId}] Profile update returned no data`)
      return NextResponse.json(
        { error: 'Profile update returned no data' },
        { status: 500 }
      )
    }

    console.log(`✅ [VERIFY ${requestId}] Profile subscription updated successfully:`, {
      profileId: updatedProfile.id,
      tier: updatedProfile.subscription_tier,
      status: updatedProfile.subscription_status,
      expiry: updatedProfile.plan_expiry,
      paymentInserted,
      duration: Date.now() - startTime + 'ms',
    })

    return NextResponse.json({
      success: true,
      message: 'Payment verified and subscription activated',
      plan,
      amountPaid: amountPaidRupees,
      amountPaidPaise: amountPaidPaise,
      expiryDate: expiryDate.toISOString(),
      subscription: {
        tier: plan,
        status: 'active',
        expiresAt: expiryDate.toISOString(),
      },
      requestId,
    })
  } catch (error: any) {
    console.error(`❌ [VERIFY ${requestId}] Unexpected error:`, {
      message: error.message,
      stack: error.stack,
      name: error.name,
      duration: Date.now() - startTime + 'ms',
    })
    return NextResponse.json(
      { 
        error: error.message || 'Failed to verify payment',
        requestId,
      },
      { status: 500 }
    )
  }
}
