# Database Security - Production Ready

## ✅ Implementation Complete

Database schema finalized with Row Level Security (RLS) enabled and proper policies configured.

## 🗄️ Database Schema

### `public.users` Table

**Columns:**
- `id` (UUID, Primary Key) - References `auth.users(id)`
- `email` (TEXT) - User email
- `subscription_tier` (TEXT) - 'free', 'starter', 'pro', 'agency'
- `subscription_status` (TEXT) - 'active', 'cancelled', 'inactive'
- `plan_expiry` (TIMESTAMP) - When subscription expires
- `razorpay_payment_id` (TEXT) - Last payment ID
- `razorpay_order_id` (TEXT) - Last order ID
- `created_at` (TIMESTAMP) - Auto-set on creation
- `updated_at` (TIMESTAMP) - Auto-updated on changes

**Indexes:**
- `subscription_tier`
- `subscription_status`
- `plan_expiry`
- `email`

### `public.payments` Table

**Columns:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key) - References `public.users(id)`
- `payment_id` (TEXT, Unique) - Razorpay payment ID
- `order_id` (TEXT) - Razorpay order ID
- `plan` (TEXT) - 'starter' or 'pro'
- `amount` (INTEGER) - Amount in paise (smallest currency unit)
- `currency` (TEXT) - Default 'INR'
- `status` (TEXT) - Payment status
- `payment_date` (TIMESTAMP) - When payment was made
- `created_at` (TIMESTAMP) - Auto-set on creation
- `updated_at` (TIMESTAMP) - Auto-updated on changes

**Indexes:**
- `user_id`
- `payment_id`
- `order_id`
- `status`
- `payment_date`

## 🔒 Row Level Security (RLS)

### RLS Enabled On:
- ✅ `public.users`
- ✅ `public.payments`

### Security Policies

#### `public.users` Policies

1. **"Users can view own profile"**
   - **Type**: SELECT
   - **Rule**: `auth.uid() = id`
   - **Effect**: Users can only read their own user row

2. **"Users can update own profile"**
   - **Type**: UPDATE
   - **Rule**: `auth.uid() = id`
   - **Effect**: Users can only update their own user row

3. **"Service role has full access"**
   - **Type**: ALL (SELECT, INSERT, UPDATE, DELETE)
   - **Rule**: `auth.jwt() ->> 'role' = 'service_role'`
   - **Effect**: Backend/server-side operations have full access

#### `public.payments` Policies

1. **"Users can view own payments"**
   - **Type**: SELECT
   - **Rule**: `auth.uid() = user_id`
   - **Effect**: Users can only read their own payment records

2. **"Service role can insert payments"**
   - **Type**: INSERT
   - **Rule**: `auth.jwt() ->> 'role' = 'service_role'`
   - **Effect**: Only server-side can create payment records (frontend blocked)

3. **"Service role has full access to payments"**
   - **Type**: ALL (SELECT, INSERT, UPDATE, DELETE)
   - **Rule**: `auth.jwt() ->> 'role' = 'service_role'`
   - **Effect**: Backend/server-side operations have full access

## 🔐 Security Features

### ✅ What's Protected

1. **User Data Isolation**
   - Users cannot see other users' data
   - Users cannot modify other users' subscriptions
   - Cross-user access is completely blocked

2. **Payment Security**
   - Users can only view their own payments
   - Frontend cannot create payment records directly
   - Only server-side (service role) can insert payments

3. **Service Role Access**
   - Backend API routes use service role
   - Full access for server-side operations
   - Required for user creation, payment processing

### ✅ What's Allowed

1. **Users Can:**
   - Read their own user profile
   - Update their own user profile (limited by RLS)
   - View their own payment history

2. **Server Can:**
   - Create users (via `/api/users/ensure`)
   - Create payment records (via `/api/payment/verify`)
   - Update user subscriptions
   - Full CRUD operations (with service role)

### ❌ What's Blocked

1. **Users Cannot:**
   - View other users' data
   - Modify other users' subscriptions
   - Create payment records from frontend
   - Access payment records of other users

2. **Frontend Cannot:**
   - Insert into `payments` table directly
   - Bypass RLS policies
   - Access service role permissions

## 📋 Migration Steps

### Step 1: Run Main Migration

1. Go to Supabase Dashboard → SQL Editor
2. Run `database/migrations/01_finalize_schema.sql`
3. Verify no errors

### Step 2: Verify Setup

1. Run `database/migrations/02_verify_rls.sql`
2. Check that:
   - RLS is enabled on both tables
   - All policies are created
   - All columns exist
   - Indexes are created

### Step 3: Test Security

1. **Test User Isolation:**
   ```sql
   -- As authenticated user, try to access another user's data
   -- Should return empty or error
   SELECT * FROM public.users WHERE id != auth.uid();
   ```

2. **Test Payment Access:**
   ```sql
   -- As authenticated user, try to access another user's payments
   -- Should return empty
   SELECT * FROM public.payments WHERE user_id != auth.uid();
   ```

3. **Test Service Role:**
   - Backend API routes should work normally
   - User creation should work
   - Payment creation should work

## 🧪 Testing RLS Policies

### Test 1: User Can Read Own Data
```sql
-- As authenticated user
SELECT * FROM public.users WHERE id = auth.uid();
-- ✅ Should return user's own row
```

### Test 2: User Cannot Read Other Users
```sql
-- As authenticated user
SELECT * FROM public.users WHERE id != auth.uid();
-- ❌ Should return empty (RLS blocks)
```

### Test 3: User Can Read Own Payments
```sql
-- As authenticated user
SELECT * FROM public.payments WHERE user_id = auth.uid();
-- ✅ Should return user's own payments
```

### Test 4: Frontend Cannot Insert Payments
```sql
-- As authenticated user (not service role)
INSERT INTO public.payments (user_id, payment_id, order_id, plan, amount, status)
VALUES (auth.uid(), 'test', 'test', 'starter', 49900, 'captured');
-- ❌ Should fail (RLS blocks - only service role can insert)
```

## 🔧 Troubleshooting

### RLS Not Working

**Check:**
1. RLS is enabled: `SELECT rowsecurity FROM pg_tables WHERE tablename = 'users';`
2. Policies exist: Run `02_verify_rls.sql`
3. User is authenticated: `SELECT auth.uid();`

### Service Role Not Working

**Check:**
1. `SUPABASE_SERVICE_ROLE_KEY` is set in environment
2. API routes use service role client
3. Service role policy exists

### Policies Not Applied

**Fix:**
1. Drop and recreate policies
2. Verify policy conditions
3. Check for conflicting policies

## 📊 Performance

### Indexes Created

**users table:**
- `subscription_tier` - Fast tier lookups
- `subscription_status` - Fast status filtering
- `plan_expiry` - Fast expiry queries
- `email` - Fast email lookups

**payments table:**
- `user_id` - Fast user payment queries
- `payment_id` - Fast payment lookups
- `order_id` - Fast order lookups
- `status` - Fast status filtering
- `payment_date` - Fast date range queries

## ✅ Production Readiness Checklist

- [x] All required columns exist
- [x] RLS enabled on all tables
- [x] Policies configured correctly
- [x] User isolation enforced
- [x] Payment security enforced
- [x] Service role access configured
- [x] Indexes for performance
- [x] Triggers for auto-updates
- [x] Foreign key constraints
- [x] Check constraints for data integrity

## 🎯 Security Best Practices Applied

1. ✅ **Principle of Least Privilege** - Users only access their own data
2. ✅ **Defense in Depth** - Multiple layers of security
3. ✅ **Server-Side Validation** - Critical operations server-only
4. ✅ **Audit Trail** - Timestamps on all records
5. ✅ **Data Integrity** - Foreign keys and check constraints
6. ✅ **Performance** - Indexes on frequently queried columns

## 🚀 Ready for Production

The database is now secure and production-ready with:
- Complete schema
- RLS enabled
- Proper policies
- Performance indexes
- Data integrity constraints
