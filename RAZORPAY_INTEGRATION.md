# Razorpay Integration Guide

This document explains how to complete the Razorpay integration for Pramana.

## Overview

The codebase has been prepared for Razorpay integration. All Stripe-specific code has been replaced with Razorpay-ready structures. You need to:

1. Install Razorpay SDK
2. Complete the implementation in `lib/razorpay.ts`
3. Set up environment variables
4. Configure webhooks in Razorpay Dashboard
5. Update database schema (if needed)

## Installation

```bash
npm install razorpay
```

## Environment Variables

Add these to your `.env.local` file:

```env
# Razorpay Keys
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Razorpay Webhook
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Plan Amounts (in INR)
RAZORPAY_PLAN_AMOUNT_STARTER=499

# Base URL
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## Implementation Steps

### 1. Complete `lib/razorpay.ts`

Replace the placeholder functions with actual Razorpay SDK calls:

```typescript
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function createRazorpayOrder(params: {
  amount: number
  currency?: string
  receipt: string
  notes?: Record<string, string>
}): Promise<RazorpayOrder> {
  const order = await razorpay.orders.create({
    amount: params.amount * 100, // Convert to paise
    currency: params.currency || 'INR',
    receipt: params.receipt,
    notes: params.notes,
  })
  return order
}

export function verifyPaymentSignature(params: {
  orderId: string
  paymentId: string
  signature: string
}): boolean {
  const crypto = require('crypto')
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
  hmac.update(params.orderId + '|' + params.paymentId)
  const generatedSignature = hmac.digest('hex')
  return generatedSignature === params.signature
}
```

### 2. Database Schema Updates

Update your `users` table to include Razorpay fields:

```sql
-- Add Razorpay columns (replace Stripe columns if they exist)
ALTER TABLE users 
ADD COLUMN razorpay_customer_id TEXT,
ADD COLUMN razorpay_order_id TEXT,
ADD COLUMN razorpay_payment_id TEXT,
ADD COLUMN razorpay_subscription_id TEXT;

-- Keep subscription_tier and subscription_status columns
-- subscription_tier: 'free' | 'starter' | 'pro' | 'agency'
-- subscription_status: 'active' | 'cancelled' | 'expired'
```

### 3. Razorpay Dashboard Setup

1. **Create a Razorpay Account**: Sign up at https://razorpay.com
2. **Get API Keys**: 
   - Go to Settings → API Keys
   - Generate Key ID and Key Secret
   - Add to environment variables

3. **Set up Webhooks**:
   - Go to Settings → Webhooks
   - Add webhook URL: `https://yourdomain.com/api/webhooks/razorpay`
   - Select events:
     - `payment.captured`
     - `subscription.activated`
     - `subscription.charged`
     - `subscription.cancelled`
   - Copy the webhook secret and add to `RAZORPAY_WEBHOOK_SECRET`

4. **Create Plans** (if using subscriptions):
   - Go to Products → Plans
   - Create a plan for "Starter" (₹499/month)
   - Note the Plan ID (you may need it for subscription-based payments)

### 4. Payment Flow

**Current Implementation (One-time Payment)**:
- User clicks "Upgrade to Starter"
- Backend creates a Razorpay order
- Frontend opens Razorpay Checkout modal
- User completes payment
- Webhook receives `payment.captured` event
- User subscription is activated

**For Subscription-based Payments** (if needed):
You'll need to:
1. Create a Razorpay Plan in the dashboard
2. Use `razorpay.subscriptions.create()` instead of `razorpay.orders.create()`
3. Handle subscription webhook events

### 5. Testing

**Test Mode**:
- Use Razorpay test keys
- Test cards: https://razorpay.com/docs/payments/test-cards/

**Test Webhooks**:
- Use Razorpay's webhook testing tool
- Or use a tool like ngrok to test locally:
  ```bash
  ngrok http 3000
  # Use the ngrok URL in Razorpay webhook settings
  ```

## File Structure

```
lib/
  razorpay.ts              # Razorpay utility functions (TO COMPLETE)

app/api/
  checkout/route.ts         # Creates Razorpay order
  webhooks/razorpay/route.ts # Handles Razorpay webhooks
  customer-portal/route.ts  # Manages subscriptions (cancel, etc.)

components/
  UpgradeButton.tsx        # Opens Razorpay Checkout modal

app/billing/
  success/page.tsx         # Payment success page
```

## Key Differences from Stripe

1. **Amount**: Razorpay uses paise (smallest currency unit), so multiply by 100
2. **Webhooks**: Different event names (`payment.captured` vs `checkout.session.completed`)
3. **Checkout**: Razorpay uses a JavaScript SDK modal, not a redirect
4. **Signature Verification**: Uses HMAC SHA256 with different format

## Next Steps

1. ✅ Code structure is ready
2. ⏳ Install Razorpay SDK: `npm install razorpay`
3. ⏳ Complete `lib/razorpay.ts` implementation
4. ⏳ Set up Razorpay account and get API keys
5. ⏳ Configure webhooks in Razorpay Dashboard
6. ⏳ Update database schema
7. ⏳ Test payment flow end-to-end

## Support

- Razorpay Docs: https://razorpay.com/docs/
- Razorpay Node.js SDK: https://github.com/razorpay/razorpay-node

