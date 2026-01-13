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
  const userId = payment.notes?.user_id
  const orderId = payment.order_id

  if (!userId) {
    console.error('No user_id in payment notes')
    return
  }

  // Update user subscription
  if (supabase) {
    const { error } = await supabase
      .from('users')
      .update({
        razorpay_customer_id: payment.customer_id,
        razorpay_order_id: orderId,
        razorpay_payment_id: payment.id,
        subscription_tier: payment.notes?.plan || 'starter',
        subscription_status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) {
      console.error('Error updating user subscription:', error)
    }
  } else {
    console.log('Demo mode: Would update user subscription', {
      userId,
      orderId,
      paymentId: payment.id,
      tier: payment.notes?.plan || 'starter',
      status: 'active',
    })
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

