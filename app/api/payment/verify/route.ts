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
  const startTime = Date.now()
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`
  
  try {
    const body = await request.json()
    const { paymentId, orderId, signature, userId } = body

    // Log request start with auth user ID
    console.log(`🚀 [PAYMENT ${requestId}] Payment verification started:`, {
      userId: userId ? userId.substring(0, 8) + '...' : 'missing',
      paymentId: paymentId ? paymentId.substring(0, 12) + '...' : 'missing',
      orderId: orderId ? orderId.substring(0, 12) + '...' : 'missing',
      timestamp: new Date().toISOString(),
    })

    if (!paymentId || !orderId || !signature || !userId) {
      console.error(`❌ [PAYMENT ${requestId}] Missing required fields:`, {
        hasPaymentId: !!paymentId,
        hasOrderId: !!orderId,
        hasSignature: !!signature,
        hasUserId: !!userId,
      })
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
      console.error(`❌ [PAYMENT ${requestId}] Invalid payment signature:`, {
        userId: userId.substring(0, 8) + '...',
        paymentId: paymentId.substring(0, 12) + '...',
      })
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    if (!supabase) {
      console.error(`❌ [PAYMENT ${requestId}] Supabase not configured`)
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Fetch payment details from Razorpay
    const payment = await getPaymentDetails(paymentId)

    // Verify payment is successful (captured or authorized)
    if (payment.status !== 'captured' && payment.status !== 'authorized') {
      console.error('Payment not successful:', {
        paymentId,
        status: payment.status,
      })
      return NextResponse.json(
        { error: `Payment not successful. Status: ${payment.status}` },
        { status: 400 }
      )
    }

    // Fetch order details to get plan information
    const razorpay = getRazorpayInstance()
    const order = await razorpay.orders.fetch(orderId)
    
    // Get plan from order notes (validate it's starter or pro)
    const planFromOrder = (order.notes?.plan as string) || 'starter'
    const plan = planFromOrder === 'pro' ? 'pro' : 'starter'
    
    // Amount is already in paise from Razorpay
    const amountPaidPaise = payment.amount
    const amountPaidRupees = amountPaidPaise / 100 // Convert to rupees for display

    // Calculate expiry date (30 days from now)
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)

    // Map Razorpay status to our status
    // 'captured' or 'authorized' -> 'success'
    const paymentStatus = 'success'

    console.log('Processing payment verification:', {
      userId: userId.substring(0, 8) + '...',
      paymentId: paymentId.substring(0, 12) + '...',
      orderId: orderId.substring(0, 12) + '...',
      plan,
      amountPaidPaise,
      expiryDate: expiryDate.toISOString(),
    })

    // Ensure profile exists in public.profiles (idempotent)
    // This handles cases where user was created in auth but not in public.profiles
    console.log(`🔍 [PAYMENT ${requestId}] Checking profile existence for user:`, userId.substring(0, 8) + '...')
    const { data: existingProfile, error: profileExistsError } = await supabase
      .from('profiles')
      .select('id, user_id')
      .eq('user_id', userId)
      .single()

    if (!existingProfile) {
      // Profile doesn't exist in public.profiles - create with defaults
      console.log('📝 [PAYMENT] Profile not found, creating...')
      
      const { error: createProfileError } = await supabase
        .from('profiles')
        .insert({
          user_id: userId,
          subscription_tier: 'free', // Will be updated below
          subscription_status: 'inactive', // Will be updated below
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

      if (createProfileError && createProfileError.code !== '23505') {
        // 23505 = duplicate key (race condition), ignore
        console.error('❌ [PAYMENT] Error creating profile:', {
          code: createProfileError.code,
          message: createProfileError.message,
          details: createProfileError.details,
        })
        return NextResponse.json(
          { error: 'Failed to create profile record', details: createProfileError.message },
          { status: 500 }
        )
      }
      console.log('✅ [PAYMENT] Profile created successfully')
    } else {
      console.log('✅ [PAYMENT] Profile exists:', { profileId: existingProfile.id })
    }

    // Step 1: Check if payment already exists (idempotency check)
    console.log(`🔍 [PAYMENT ${requestId}] Checking if payment already exists:`, {
      userId: userId.substring(0, 8) + '...',
      paymentId: paymentId.substring(0, 12) + '...',
    })
    
    const { data: existingPayment, error: checkError } = await supabase
      .from('payments')
      .select('id, payment_id, user_id, plan, amount, status')
      .eq('payment_id', paymentId)
      .single()

    let paymentRecord = existingPayment
    let paymentInserted = false

    if (existingPayment) {
      // Payment already exists - this is idempotent, continue to profile update
      console.log(`✅ [PAYMENT ${requestId}] Payment already exists (idempotent):`, {
        paymentId: existingPayment.payment_id?.substring(0, 12) + '...',
        existingStatus: existingPayment.status,
        existingPlan: existingPayment.plan,
        userId: existingPayment.user_id?.substring(0, 8) + '...',
      })
    } else if (checkError && checkError.code !== 'PGRST116') {
      // Error checking (not "not found")
      console.error(`❌ [PAYMENT ${requestId}] Error checking payment existence:`, {
        code: checkError.code,
        message: checkError.message,
        userId: userId.substring(0, 8) + '...',
      })
      return NextResponse.json(
        { 
          error: 'Failed to check payment existence',
          details: checkError.message,
          code: checkError.code,
        },
        { status: 500 }
      )
    } else {
      // Payment doesn't exist - insert it
      console.log(`💾 [PAYMENT ${requestId}] Inserting payment record:`, {
        userId: userId.substring(0, 8) + '...',
        paymentId: paymentId.substring(0, 12) + '...',
        plan,
        amount: amountPaidPaise,
      })
      
      const { data: newPaymentRecord, error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: userId,
          payment_id: paymentId,
          order_id: orderId,
          plan: plan,
          amount: amountPaidPaise, // Store in paise (INTEGER)
          currency: payment.currency || 'INR',
          status: paymentStatus, // 'success' (mapped from Razorpay status)
          payment_date: new Date().toISOString(),
        })
        .select()
        .single()

      if (paymentError) {
        // Handle duplicate key error (race condition)
        if (paymentError.code === '23505') {
          console.log(`✅ [PAYMENT ${requestId}] Payment created by another request (race condition):`, {
            paymentId: paymentId.substring(0, 12) + '...',
            userId: userId.substring(0, 8) + '...',
          })
          // Fetch the existing payment
          const { data: existingPayment } = await supabase
            .from('payments')
            .select('id, payment_id, user_id, plan, amount, status')
            .eq('payment_id', paymentId)
            .single()
          
          paymentRecord = existingPayment || null
        } else {
          console.error(`❌ [PAYMENT ${requestId}] Error saving payment record:`, {
            code: paymentError.code,
            message: paymentError.message,
            details: paymentError.details,
            hint: paymentError.hint,
            userId: userId.substring(0, 8) + '...',
            paymentId: paymentId.substring(0, 12) + '...',
          })
          return NextResponse.json(
            { 
              error: 'Failed to save payment record',
              details: paymentError.message,
              code: paymentError.code,
            },
            { status: 500 }
          )
        }
      } else {
        paymentRecord = newPaymentRecord
        paymentInserted = true
        console.log(`✅ [PAYMENT ${requestId}] Payment record inserted successfully:`, {
          paymentId: paymentRecord?.payment_id?.substring(0, 12) + '...',
          plan: paymentRecord?.plan,
          amount: paymentRecord?.amount,
          userId: userId.substring(0, 8) + '...',
          duration: Date.now() - startTime + 'ms',
        })
      }
    }

    // Step 2: Check current profile state before updating (idempotency)
    console.log(`🔍 [PAYMENT ${requestId}] Checking current profile state:`, {
      userId: userId.substring(0, 8) + '...',
    })
    
    const { data: currentProfile, error: currentProfileError } = await supabase
      .from('profiles')
      .select('id, user_id, subscription_tier, subscription_status, plan_expiry, razorpay_payment_id')
      .eq('user_id', userId)
      .single()

    if (currentProfileError && currentProfileError.code !== 'PGRST116') {
      console.error(`❌ [PAYMENT ${requestId}] Error checking profile:`, {
        code: currentProfileError.code,
        message: currentProfileError.message,
        userId: userId.substring(0, 8) + '...',
      })
      return NextResponse.json(
        { 
          error: 'Failed to check profile state',
          details: currentProfileError.message,
          code: currentProfileError.code,
        },
        { status: 500 }
      )
    }

    if (!currentProfile) {
      console.error(`❌ [PAYMENT ${requestId}] Profile not found for user:`, {
        userId: userId.substring(0, 8) + '...',
      })
      return NextResponse.json(
        { error: 'Profile not found. Please ensure profile exists before payment.' },
        { status: 404 }
      )
    }

    // Check if profile already has this payment (idempotency)
    if (currentProfile.razorpay_payment_id === paymentId) {
      console.log(`✅ [PAYMENT ${requestId}] Profile already updated with this payment (idempotent):`, {
        profileId: currentProfile.id,
        userId: currentProfile.user_id?.substring(0, 8) + '...',
        existingTier: currentProfile.subscription_tier,
        existingStatus: currentProfile.subscription_status,
        existingPaymentId: currentProfile.razorpay_payment_id?.substring(0, 12) + '...',
      })
      // Return success - already processed
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
      })
    }

    // Update profile subscription (only if not already updated)
    console.log(`📝 [PAYMENT ${requestId}] Updating profile subscription:`, {
      profileId: currentProfile.id,
      userId: userId.substring(0, 8) + '...',
      currentTier: currentProfile.subscription_tier,
      currentStatus: currentProfile.subscription_status,
      newTier: plan,
      newStatus: 'active',
      paymentId: paymentId.substring(0, 12) + '...',
    })
    
    const { data: updatedProfile, error: profileError } = await supabase
      .from('profiles')
      .update({
        subscription_tier: plan,
        subscription_status: 'active',
        plan_expiry: expiryDate.toISOString(),
        razorpay_payment_id: paymentId,
        razorpay_order_id: orderId,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single()

    if (profileError) {
      console.error(`❌ [PAYMENT ${requestId}] Error updating profile subscription:`, {
        code: profileError.code,
        message: profileError.message,
        details: profileError.details,
        hint: profileError.hint,
        userId: userId.substring(0, 8) + '...',
        profileId: currentProfile.id,
      })
      return NextResponse.json(
        { 
          error: 'Failed to update subscription. Payment was successful but subscription update failed.',
          details: profileError.message,
          code: profileError.code,
        },
        { status: 500 }
      )
    }

    if (!updatedProfile) {
      console.error(`❌ [PAYMENT ${requestId}] Profile update returned no data:`, {
        userId: userId.substring(0, 8) + '...',
      })
      return NextResponse.json(
        { error: 'Profile update returned no data' },
        { status: 500 }
      )
    }

    console.log(`✅ [PAYMENT ${requestId}] Profile subscription updated successfully:`, {
      profileId: updatedProfile.id,
      userId: updatedProfile.user_id?.substring(0, 8) + '...',
      tier: updatedProfile.subscription_tier,
      status: updatedProfile.subscription_status,
      expiry: updatedProfile.plan_expiry,
      paymentId: updatedProfile.razorpay_payment_id?.substring(0, 12) + '...',
      paymentInserted,
      duration: Date.now() - startTime + 'ms',
    })

    return NextResponse.json({
      success: true,
      message: 'Payment verified and subscription activated',
      plan,
      amountPaid: amountPaidRupees, // Return in rupees for API response
      amountPaidPaise: amountPaidPaise, // Also include paise for reference
      expiryDate: expiryDate.toISOString(),
      subscription: {
        tier: plan,
        status: 'active',
        expiresAt: expiryDate.toISOString(),
      },
      requestId, // Include for debugging
    })
  } catch (error: any) {
    console.error(`❌ [PAYMENT ${requestId}] Unexpected error:`, {
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
