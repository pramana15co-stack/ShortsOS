# User Sync Setup - Auth Users ↔ Public Users

## ✅ Implementation Complete

Every authenticated user now automatically has a corresponding row in `public.users` table.

## 🔄 How It Works

### Automatic User Creation

When a user signs up, logs in, or confirms their email, the system automatically:

1. **Checks** if user exists in `public.users`
2. **Creates** user if not found (idempotent - safe to call multiple times)
3. **Sets defaults**:
   - `subscription_tier = 'free'`
   - `subscription_status = 'inactive'`
   - `email` (from auth.users if available)

### Integration Points

The user sync happens at:

1. **Sign Up** (`/signup`) - After successful signup
2. **Login** (`/login`) - After successful login
3. **Email Confirmation** (`/auth/callback`) - After email verification
4. **Auth State Change** (`AuthProvider`) - When session is established

### API Endpoint

**`POST /api/users/ensure`**

- **Purpose**: Idempotent user creation
- **Input**: `{ userId: string }`
- **Output**: `{ success: true, created: boolean }`
- **Behavior**: 
  - If user exists → returns success (no action)
  - If user doesn't exist → creates user with defaults
  - Handles race conditions (multiple simultaneous calls)

## 🗄️ Database Requirements

### `public.users` Table Structure

Ensure your `public.users` table has:

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'pro', 'agency')),
  subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'cancelled', 'inactive')),
  plan_expiry TIMESTAMP WITH TIME ZONE,
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Required Permissions

The API uses `SUPABASE_SERVICE_ROLE_KEY` to:
- Read from `auth.users` (to get email)
- Insert into `public.users` (to create user)

## 🔐 Security

- **Server-side only**: API endpoint runs on server
- **Service role**: Uses service role key for admin operations
- **Idempotent**: Safe to call multiple times (no duplicates)
- **Race condition safe**: Handles concurrent requests

## 🧪 Testing

### Test User Creation

1. **Sign up a new user**
   - User should be created in `public.users` automatically
   - Check Supabase dashboard → `public.users` table

2. **Login with existing user**
   - If user doesn't exist in `public.users`, it will be created
   - If user exists, no action taken (idempotent)

3. **Verify defaults**
   - `subscription_tier` should be `'free'`
   - `subscription_status` should be `'inactive'`

### Manual Test

You can manually test the endpoint:

```bash
curl -X POST https://your-domain.com/api/users/ensure \
  -H "Content-Type: application/json" \
  -d '{"userId": "user-uuid-here"}'
```

## 📝 Notes

- **Email**: Retrieved from `auth.users` if available, otherwise `null`
- **Idempotent**: Calling multiple times is safe (no duplicates)
- **Non-blocking**: If user creation fails, auth still succeeds (logged as warning)
- **Automatic**: No manual intervention needed

## ✅ Verification

After implementation:

1. Sign up a new user
2. Check `public.users` table in Supabase
3. Verify user exists with correct defaults
4. Login with same user - should not create duplicate
5. Check logs for any warnings

## 🔧 Troubleshooting

### User not created

**Check:**
- `SUPABASE_SERVICE_ROLE_KEY` is set in environment variables
- `public.users` table exists
- Table has correct columns
- Service role has INSERT permission on `public.users`

### Duplicate key errors

**Should not happen** - endpoint is idempotent and handles race conditions. If you see this:
- Check for concurrent requests
- Verify idempotency logic is working

### Email is null

**Expected** if:
- Admin API is not available
- Service role key is missing
- User email is not set in auth.users

**Fix**: Email can be updated later, or ensure service role key is configured.
