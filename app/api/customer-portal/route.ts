import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
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
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get user's Stripe customer ID from database
    let customerId: string | null = null

    if (supabase) {
      const { data, error } = await supabase
        .from('users')
        .select('stripe_customer_id')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user:', error)
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      customerId = data?.stripe_customer_id
    } else {
      // Demo mode - would fetch from database
      console.log('Demo mode: Would fetch customer ID for user', userId)
    }

    if (!customerId) {
      return NextResponse.json(
        { error: 'No Stripe customer found for this user' },
        { status: 404 }
      )
    }

    // Create customer portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Error creating customer portal session:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create customer portal session' },
      { status: 500 }
    )
  }
}

