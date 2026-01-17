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

    if (!supabase) {
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
    console.log('🔍 Checking profile existence for user:', userId.substring(0, 8) + '...')
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id, user_id')
      .eq('user_id', userId)
      .single()

    if (!existingProfile) {
      // Profile doesn't exist in public.profiles - create with defaults
      console.log('📝 Profile not found in public.profiles, creating...')
      
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
        console.error('❌ Error creating profile:', {
          code: createProfileError.code,
          message: createProfileError.message,
          details: createProfileError.details,
        })
        return NextResponse.json(
          { error: 'Failed to create profile record', details: createProfileError.message },
          { status: 500 }
        )
      }
      console.log('✅ Profile created successfully')
    } else {
      console.log('✅ Profile exists:', { profileId: existingProfile.id })
    }

    // Step 1: Insert payment record into payments table
    const { data: paymentRecord, error: paymentError } = await supabase
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
      // Check if it's a duplicate (payment already processed)
      if (paymentError.code === '23505') {
        console.warn('Payment already exists in database:', paymentId)
        // Continue to update user - payment was already recorded
      } else {
        console.error('Error saving payment record:', paymentError)
        return NextResponse.json(
          { 
            error: 'Failed to save payment record',
            details: paymentError.message 
          },
          { status: 500 }
        )
      }
    } else {
      console.log('✅ Payment record saved:', {
        paymentId: paymentRecord?.payment_id?.substring(0, 12) + '...',
        plan: paymentRecord?.plan,
        amount: paymentRecord?.amount,
      })
    }

    // Step 2: Update profile subscription in profiles table
    console.log('📝 Updating profile subscription...')
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
      console.error('❌ Error updating profile subscription:', {
        code: profileError.code,
        message: profileError.message,
        details: profileError.details,
      })
      return NextResponse.json(
        { 
          error: 'Failed to update subscription. Payment was successful but subscription update failed.',
          details: profileError.message 
        },
        { status: 500 }
      )
    }

    console.log('✅ Profile subscription updated:', {
      profileId: updatedProfile?.id,
      userId: updatedProfile?.user_id?.substring(0, 8) + '...',
      tier: updatedProfile?.subscription_tier,
      status: updatedProfile?.subscription_status,
      expiry: updatedProfile?.plan_expiry,
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
    })
  } catch (error: any) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
