import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as crypto from 'crypto'

// Initialize Supabase client (optional - only if configured)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('x-razorpay-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex')

  if (signature !== expectedSignature) {
    console.error('Webhook signature verification failed')
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  const event = JSON.parse(body)

  // Handle the event
  try {
    switch (event.event) {
      case 'payment.captured': {
        await handlePaymentCaptured(event.payload.payment.entity)
        break
      }

      case 'subscription.activated': {
        await handleSubscriptionActivated(event.payload.subscription.entity)
        break
      }

      case 'subscription.charged': {
        await handleSubscriptionCharged(event.payload.subscription.entity)
        break
      }

      case 'subscription.cancelled': {
        await handleSubscriptionCancelled(event.payload.subscription.entity)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.event}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentCaptured(payment: any) {
  const requestId = `webhook_${Date.now()}_${Math.random().toString(36).substring(7)}`
  const userId = payment.notes?.user_id
  const orderId = payment.order_id
  const paymentId = payment.id
  const plan = payment.notes?.plan || 'starter'

  console.log(`🚀 [WEBHOOK ${requestId}] Payment captured:`, {
    paymentId: paymentId?.substring(0, 12) + '...',
    orderId: orderId?.substring(0, 12) + '...',
    userId: userId?.substring(0, 8) + '...',
    plan,
  })

  if (!userId) {
    console.error(`❌ [WEBHOOK ${requestId}] No user_id in payment notes`)
    return
  }

  if (!supabase) {
    console.error(`❌ [WEBHOOK ${requestId}] Supabase not configured`)
    return
  }

  // Check if payment already processed (idempotency)
  const { data: existingPayment } = await supabase
    .from('payments')
    .select('id, payment_id, status')
    .eq('payment_id', paymentId)
    .single()

  if (existingPayment) {
    console.log(`✅ [WEBHOOK ${requestId}] Payment already processed (idempotent):`, {
      paymentId: existingPayment.payment_id?.substring(0, 12) + '...',
      status: existingPayment.status,
    })
    return
  }

  // Insert payment record
  const { error: paymentError } = await supabase
    .from('payments')
    .insert({
      user_id: userId,
      payment_id: paymentId,
      order_id: orderId,
      plan: plan,
      amount: payment.amount || 0,
      currency: payment.currency || 'INR',
      status: 'success',
      payment_date: new Date().toISOString(),
    })

  if (paymentError && paymentError.code !== '23505') {
    console.error(`❌ [WEBHOOK ${requestId}] Error inserting payment:`, paymentError)
  } else {
    console.log(`✅ [WEBHOOK ${requestId}] Payment record inserted`)
  }

  // Ensure profile exists, then update
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id, user_id, subscription_tier, subscription_status, razorpay_payment_id')
    .eq('user_id', userId)
    .maybeSingle()

  if (!existingProfile) {
    // Create profile if it doesn't exist
    console.log(`📝 [WEBHOOK ${requestId}] Profile not found, creating...`)
    const { error: createError } = await supabase
      .from('profiles')
      .insert({
        user_id: userId,
        subscription_tier: plan,
        subscription_status: 'active',
        plan_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        razorpay_payment_id: paymentId,
        razorpay_order_id: orderId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

    if (createError && createError.code !== '23505') {
      console.error(`❌ [WEBHOOK ${requestId}] Error creating profile:`, createError)
    } else {
      console.log(`✅ [WEBHOOK ${requestId}] Profile created and upgraded`)
    }
  } else {
    // Update existing profile (idempotent - only if not already updated)
    if (existingProfile.razorpay_payment_id === paymentId) {
      console.log(`✅ [WEBHOOK ${requestId}] Profile already updated with this payment (idempotent)`)
      return
    }

    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)

    const { error: updateError } = await supabase
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

    if (updateError) {
      console.error(`❌ [WEBHOOK ${requestId}] Error updating profile:`, updateError)
    } else {
      console.log(`✅ [WEBHOOK ${requestId}] Profile upgraded successfully`)
    }
  }
}

async function handleSubscriptionActivated(subscription: any) {
  const userId = subscription.notes?.user_id

  if (!userId) {
    console.error('No user_id in subscription notes')
    return
  }

  // Update user subscription
  if (supabase) {
    const { error } = await supabase
      .from('users')
      .update({
        razorpay_subscription_id: subscription.id,
        subscription_tier: subscription.notes?.plan || 'starter',
        subscription_status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) {
      console.error('Error activating subscription:', error)
    }
  } else {
    console.log('Demo mode: Would activate subscription', {
      userId,
      subscriptionId: subscription.id,
      tier: subscription.notes?.plan || 'starter',
    })
  }
}

async function handleSubscriptionCharged(subscription: any) {
  const userId = subscription.notes?.user_id

  if (!userId) {
    console.error('No user_id in subscription notes')
    return
  }

  // Update subscription status to active (renewal)
  if (supabase) {
    const { error } = await supabase
      .from('users')
      .update({
        subscription_status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) {
      console.error('Error updating subscription status:', error)
    }
  } else {
    console.log('Demo mode: Would update subscription renewal', {
      userId,
      subscriptionId: subscription.id,
    })
  }
}

async function handleSubscriptionCancelled(subscription: any) {
  const userId = subscription.notes?.user_id

  if (!userId) {
    console.error('No user_id in subscription notes')
    return
  }

  // Downgrade user to free
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
      console.error('Error cancelling subscription:', error)
    }
  } else {
    console.log('Demo mode: Would cancel subscription', {
      userId,
      subscriptionId: subscription.id,
      tier: 'free',
      status: 'cancelled',
    })
  }
}

