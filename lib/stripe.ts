import Stripe from 'stripe'

// Lazy initialization to avoid errors during build if env vars aren't set
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set. Please add it to your environment variables.')
  }

  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    })
  }

  return stripeInstance
}

// Only export function, not instance (to avoid build-time errors)

