# Stripe Payment Integration

## Overview
Stripe Checkout integration for the Starter plan ($9/month) has been implemented. This is a secure, production-ready implementation using Stripe's hosted checkout.

## What's Implemented

### 1. Dependencies
- ✅ `stripe` (backend SDK)
- ✅ `@stripe/stripe-js` (frontend SDK - for future use)

### 2. API Endpoints

#### `/api/checkout` (POST)
- Creates Stripe Checkout session
- Mode: subscription
- Uses `STRIPE_PRICE_ID_STARTER` from environment
- Attaches user email and metadata
- Returns checkout URL for redirect

#### `/api/webhooks/stripe` (POST)
- Secure webhook handler with signature verification
- Handles events:
  - `checkout.session.completed` - Activates subscription
  - `invoice.payment_succeeded` - Maintains active status
  - `customer.subscription.deleted` - Downgrades to free
- Updates user subscription in database

#### `/api/customer-portal` (POST)
- Creates Stripe Customer Portal session
- Allows users to manage subscription, payment method, invoices

### 3. Frontend Components

#### `UpgradeButton` Component
- Shows only to free users
- Handles checkout flow
- Redirects to Stripe Checkout

#### Billing Success Page (`/billing/success`)
- Confirms subscription activation
- Lists unlocked features
- Provides navigation to dashboard

### 4. Access Control
- Updated `useAccess` hook to check `subscription_tier` from database
- Supports tier hierarchy: free < starter < pro < agency
- Enforces feature access based on subscription status

### 5. Execution Path Page Fix
- Fixed beginner shorts path page
- Uses `useParams` hook correctly
- Integrates with access control
- Shows upgrade button for free users

## Environment Variables Required

Add these to your `.env.local` file:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_ID_STARTER=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Base URL (for redirects)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Setup Instructions

### 1. Create Stripe Account
1. Sign up at https://stripe.com
2. Get test API keys from Dashboard → Developers → API keys

### 2. Create Product & Price
1. Go to Products in Stripe Dashboard
2. Create product: "Starter Plan"
3. Create recurring price: $9/month
4. Copy the Price ID (starts with `price_`)
5. Add to `STRIPE_PRICE_ID_STARTER`

### 3. Set Up Webhook
1. Go to Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
4. Copy webhook signing secret (starts with `whsec_`)
5. Add to `STRIPE_WEBHOOK_SECRET`

### 4. Database Schema
Ensure your `users` table has these columns:
- `stripe_customer_id` (text, nullable)
- `subscription_id` (text, nullable)
- `subscription_tier` (text, default: 'free')
- `subscription_status` (text, default: 'free')

## Why Stripe Checkout?

1. **Security**: No card data touches your server
2. **PCI Compliance**: Handled by Stripe
3. **Conversion**: Optimized checkout flow
4. **Maintenance**: Less code to maintain

## Why Webhooks?

1. **Reliability**: Stripe retries failed webhooks
2. **Security**: Signature verification ensures authenticity
3. **Real-time**: Instant subscription status updates
4. **Idempotency**: Safe to retry without duplicates

## Access Control Security

- **Server-side enforcement**: Webhooks update database directly
- **Client-side checks**: `useAccess` hook reads from database
- **No frontend bypass**: All access checks verify subscription_tier
- **Database source of truth**: Subscription status stored in database

## Testing

### Test Mode
1. Use test API keys (start with `sk_test_` and `pk_test_`)
2. Use test card: `4242 4242 4242 4242`
3. Any future expiry date
4. Any CVC

### Test Webhook Events
1. Use Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
2. Trigger test events: `stripe trigger checkout.session.completed`

## Production Checklist

- [ ] Switch to live API keys
- [ ] Update `NEXT_PUBLIC_BASE_URL` to production domain
- [ ] Configure production webhook endpoint
- [ ] Test full checkout flow
- [ ] Verify webhook events are processed
- [ ] Test subscription cancellation
- [ ] Verify access control works correctly

## Next Steps

1. Add Customer Portal button to dashboard/settings
2. Add subscription status display
3. Add usage tracking for free tier limits
4. Add email notifications for subscription events





