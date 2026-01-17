# Razorpay Payment Integration - Setup Guide

## ✅ Implementation Complete

Razorpay payments have been fully implemented for Starter and Creator Pro plans using Razorpay Checkout (popup).

## 📋 Environment Variables Required

### Frontend (.env.local)
```bash
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Backend (Vercel Environment Variables)
```bash
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 🔑 Getting Razorpay Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to **Settings** → **API Keys**
3. Generate **Test Keys** (for development)
4. Copy **Key ID** and **Key Secret**

## 💰 Pricing Logic

### Display Prices (DO NOT CHANGE)
- **Starter**: ₹799/month
- **Creator Pro**: ₹2,499/month

### Actual Charge Logic
- **Starter Plan**:
  - First-time paid users → **₹499** (Early Creator Discount)
  - Returning users → **₹799**
- **Creator Pro** → **₹2,499** (no discount)

The discount is applied automatically at payment creation. Users see the display price, but first-time Starter users are charged ₹499 internally.

## 🗄️ Database Schema

### Required Tables

#### `users` table
Ensure these columns exist:
- `subscription_tier` (text): 'free', 'starter', 'pro'
- `subscription_status` (text): 'active', 'cancelled', 'inactive'
- `plan_expiry` (timestamp): When the plan expires (30 days from payment)
- `razorpay_payment_id` (text): Last payment ID
- `razorpay_order_id` (text): Last order ID

#### `payments` table
Create this table if it doesn't exist:
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  payment_id TEXT NOT NULL,
  order_id TEXT NOT NULL,
  plan TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT NOT NULL,
  payment_date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🧪 Testing

### Test Cards (Razorpay Test Mode)

**Success Cards:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- Name: Any name

**Failure Cards:**
- Card Number: `4000 0000 0000 0002` (Card declined)
- Card Number: `4000 0000 0000 0069` (Insufficient funds)

### Test Flow

1. Go to `/pricing`
2. Click "Unlock Full Clarity" (Starter) or "Get Structured Guidance" (Pro)
3. Razorpay popup opens
4. Enter test card details
5. Complete payment
6. Redirected to `/billing/success`
7. Payment verified and user subscription updated

## 🔄 Payment Flow

1. **User clicks upgrade button** → `UpgradeButton` component
2. **Frontend calls** → `/api/checkout` (POST)
3. **Backend creates Razorpay order**:
   - Checks if user is first-time (for Starter discount)
   - Creates order with correct amount
   - Returns order details
4. **Frontend opens Razorpay popup** → User enters card details
5. **Payment successful** → Redirects to `/billing/success?payment_id=...&order_id=...&signature=...`
6. **Success page verifies payment** → Calls `/api/payment/verify`
7. **Backend verifies signature** → Updates user subscription
8. **User sees success message** → Access granted

## 🔐 Security

- Payment signatures are verified server-side
- Amounts are calculated server-side (discount logic)
- User subscription status checked on every access
- Plan expiry automatically revokes access

## 📝 Files Modified/Created

### New Files
- `app/api/payment/verify/route.ts` - Payment verification endpoint
- `RAZORPAY_SETUP.md` - This file

### Modified Files
- `lib/razorpay.ts` - Razorpay SDK integration
- `app/api/checkout/route.ts` - Order creation with discount logic
- `components/UpgradeButton.tsx` - Supports both plans
- `app/pricing/page.tsx` - Added Pro plan button
- `app/billing/success/page.tsx` - Payment verification
- `lib/useAccess.ts` - Plan expiry checking

## 🚨 Important Notes

1. **Test Mode Only**: Currently configured for Razorpay test mode
2. **No Subscriptions**: Using one-time payments (30-day access)
3. **No Webhooks**: Payment verification happens on success page
4. **Plan Expiry**: Plans expire 30 days after payment
5. **Discount Logic**: First-time Starter discount applied automatically

## 🐛 Troubleshooting

### Payment popup doesn't open
- Check `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
- Check browser console for errors
- Ensure Razorpay script loaded (check network tab)

### Payment verification fails
- Check `RAZORPAY_KEY_SECRET` is set correctly
- Verify signature in success URL
- Check server logs for errors

### User not getting access
- Check `subscription_status` is 'active'
- Check `plan_expiry` is in the future
- Verify `subscription_tier` is set correctly

### Discount not applied
- Check `payments` table exists
- Verify user has no previous payment records
- Check server logs for payment history query

## 📞 Support

If you encounter issues:
1. Check Razorpay Dashboard → Logs
2. Check Vercel Function Logs
3. Check Supabase Database
4. Email: pramana15@pramana15.com
