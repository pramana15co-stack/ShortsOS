# Payment Activation Flow - Implementation Guide

## ✅ Implementation Complete

After successful Razorpay payment, the system automatically:
1. Inserts payment record into `payments` table
2. Updates user subscription in `users` table
3. Activates user plan immediately

## 🔄 Payment Flow

### Step-by-Step Process

1. **User completes Razorpay payment**
   - Razorpay popup closes
   - Redirects to `/billing/success?payment_id=...&order_id=...&signature=...`

2. **Frontend calls `/api/payment/verify`**
   - Sends: `paymentId`, `orderId`, `signature`, `userId`
   - Server-side verification begins

3. **Server-side verification** (`/api/payment/verify`)
   - ✅ Verifies payment signature (prevents tampering)
   - ✅ Fetches payment details from Razorpay API
   - ✅ Validates payment status ('captured' or 'authorized')
   - ✅ Fetches order details to get plan information
   - ✅ Ensures user exists in `public.users` (creates if needed)

4. **Database updates** (server-side, service role)
   - ✅ **Insert into `payments` table:**
     - `user_id` - User UUID
     - `payment_id` - Razorpay payment ID
     - `order_id` - Razorpay order ID
     - `plan` - 'starter' or 'pro'
     - `amount` - Amount in paise (INTEGER)
     - `status` - 'success' (mapped from Razorpay)
     - `currency` - 'INR'
     - `payment_date` - Current timestamp
   
   - ✅ **Update `users` table:**
     - `subscription_tier` - Set to selected plan ('starter' or 'pro')
     - `subscription_status` - Set to 'active'
     - `plan_expiry` - Set to now() + 30 days
     - `razorpay_payment_id` - Last payment ID
     - `razorpay_order_id` - Last order ID
     - `updated_at` - Current timestamp

5. **Response to frontend**
   - Returns success with plan details
   - User sees success message
   - Plan is immediately active

## 🔐 Security Features

### Server-Side Only
- ✅ All database operations use service role
- ✅ Payment signature verified server-side
- ✅ Payment status validated from Razorpay API
- ✅ Frontend cannot bypass verification

### Data Integrity
- ✅ Payment record created before user update
- ✅ User must exist before payment can be recorded
- ✅ Duplicate payment prevention (unique constraint on payment_id)
- ✅ Transaction-like behavior (errors handled gracefully)

### Validation
- ✅ Payment signature verified (prevents tampering)
- ✅ Payment status checked (only 'captured' or 'authorized' accepted)
- ✅ Plan validated ('starter' or 'pro' only)
- ✅ User ID validated

## 📊 Database Operations

### Payments Table Insert

```sql
INSERT INTO payments (
  user_id,
  payment_id,      -- Unique Razorpay payment ID
  order_id,        -- Razorpay order ID
  plan,            -- 'starter' or 'pro'
  amount,          -- INTEGER (paise, e.g., 49900 = ₹499)
  currency,        -- 'INR'
  status,          -- 'success'
  payment_date     -- Current timestamp
)
```

### Users Table Update

```sql
UPDATE users SET
  subscription_tier = 'starter' | 'pro',
  subscription_status = 'active',
  plan_expiry = NOW() + INTERVAL '30 days',
  razorpay_payment_id = '...',
  razorpay_order_id = '...',
  updated_at = NOW()
WHERE id = user_id
```

## 🧪 Testing

### Test Payment Flow

1. **Complete test payment:**
   - Use Razorpay test card: `4111 1111 1111 1111`
   - Complete payment in popup
   - Redirect to success page

2. **Verify database:**
   ```sql
   -- Check payment record
   SELECT * FROM payments 
   WHERE user_id = 'your-user-id' 
   ORDER BY created_at DESC LIMIT 1;
   
   -- Check user subscription
   SELECT 
     subscription_tier,
     subscription_status,
     plan_expiry,
     razorpay_payment_id
   FROM users 
   WHERE id = 'your-user-id';
   ```

3. **Expected results:**
   - Payment record exists with `status = 'success'`
   - User `subscription_tier` is 'starter' or 'pro'
   - User `subscription_status` is 'active'
   - `plan_expiry` is 30 days from now
   - Payment IDs are stored

### Test Error Cases

1. **Invalid signature:**
   - Should return 400 error
   - No database changes

2. **Payment not captured:**
   - Should return 400 error
   - No database changes

3. **Duplicate payment:**
   - Should handle gracefully
   - User subscription still updated

## 🔍 Monitoring

### Check Payment Processing

**Vercel Function Logs:**
- Look for: `✅ Payment record saved`
- Look for: `✅ User subscription updated`
- Check for any errors

**Database Queries:**
```sql
-- Recent payments
SELECT 
  p.payment_id,
  p.plan,
  p.amount,
  p.status,
  p.payment_date,
  u.subscription_tier,
  u.subscription_status
FROM payments p
JOIN users u ON p.user_id = u.id
ORDER BY p.created_at DESC
LIMIT 10;

-- Active subscriptions
SELECT 
  id,
  email,
  subscription_tier,
  subscription_status,
  plan_expiry
FROM users
WHERE subscription_status = 'active'
ORDER BY plan_expiry DESC;
```

## ⚠️ Important Notes

1. **No Webhooks Yet**
   - Payment activation happens on success page
   - If user closes browser before success page loads, payment is verified but subscription might not activate
   - Future: Add webhook for reliability

2. **Idempotent Operations**
   - Payment insert handles duplicates (unique constraint)
   - User update is safe to retry
   - Can call verify endpoint multiple times safely

3. **Service Role Required**
   - `SUPABASE_SERVICE_ROLE_KEY` must be set
   - Required for:
     - Reading from `auth.users`
     - Inserting into `payments`
     - Updating `users` table

4. **Amount Storage**
   - Stored as INTEGER in paise
   - ₹499 = 49900 paise
   - ₹799 = 79900 paise
   - ₹2,499 = 249900 paise

## ✅ Production Checklist

- [x] Payment signature verification
- [x] Payment status validation
- [x] Payment record insertion
- [x] User subscription update
- [x] Plan expiry calculation (30 days)
- [x] Error handling
- [x] Duplicate payment handling
- [x] User creation if missing
- [x] Server-side only operations
- [x] Comprehensive logging

## 🚀 Ready for Production

The payment activation flow is complete and production-ready. After successful payment:
- ✅ Payment is recorded
- ✅ User subscription is activated
- ✅ Plan expires in 30 days
- ✅ All data is stored securely
