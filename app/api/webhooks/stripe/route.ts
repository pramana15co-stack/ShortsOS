import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

// Initialize Supabase client (optional - only if configured)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(invoice)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
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

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.user_id
  const customerId = session.customer as string

  if (!userId || !customerId) {
    console.error('Missing user_id or customer_id in checkout session')
    return
  }

  // Get subscription details
  const subscriptionId = session.subscription as string
  if (!subscriptionId) {
    console.error('No subscription ID in checkout session')
    return
  }

  // Update user in database
  if (supabase) {
    const { error } = await supabase
      .from('users')
      .update({
        stripe_customer_id: customerId,
        subscription_id: subscriptionId,
        subscription_tier: 'starter',
        subscription_status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) {
      console.error('Error updating user subscription:', error)
    }
  } else {
    // In demo mode, just log
    console.log('Demo mode: Would update user', {
      userId,
      customerId,
      subscriptionId,
      tier: 'starter',
      status: 'active',
    })
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  // Invoice subscription can be a string ID or a Subscription object
  // Use type assertion to access subscription property
  const invoiceWithSubscription = invoice as any
  const subscriptionId = invoiceWithSubscription.subscription 
    ? (typeof invoiceWithSubscription.subscription === 'string' 
        ? invoiceWithSubscription.subscription 
        : invoiceWithSubscription.subscription.id)
    : null
  
  if (!subscriptionId) return

  // Get subscription to find user
  const stripe = getStripe()
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const customerId = subscription.customer as string
  const userId = subscription.metadata?.user_id

  if (!userId) {
    console.error('No user_id in subscription metadata')
    return
  }

  // Update user subscription status
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
    console.log('Demo mode: Would update subscription status', {
      userId,
      subscriptionId,
      status: 'active',
    })
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.user_id

  if (!userId) {
    console.error('No user_id in subscription metadata')
    return
  }

  // Downgrade user to free
  if (supabase) {
    const { error } = await supabase
      .from('users')
      .update({
        subscription_tier: 'free',
        subscription_status: 'cancelled',
        subscription_id: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) {
      console.error('Error downgrading user:', error)
    }
  } else {
    console.log('Demo mode: Would downgrade user', {
      userId,
      tier: 'free',
      status: 'cancelled',
    })
  }
}

