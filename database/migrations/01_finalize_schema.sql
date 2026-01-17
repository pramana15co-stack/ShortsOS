-- =====================================================
-- Finalize Database Schema for Production SaaS
-- =====================================================
-- This migration ensures all required tables and columns exist
-- Run this in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. Ensure public.users table has all required columns
-- =====================================================

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
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

-- Add columns if they don't exist (idempotent)
DO $$ 
BEGIN
  -- subscription_tier
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'subscription_tier') THEN
    ALTER TABLE public.users ADD COLUMN subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'pro', 'agency'));
  END IF;

  -- subscription_status
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'subscription_status') THEN
    ALTER TABLE public.users ADD COLUMN subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'cancelled', 'inactive'));
  END IF;

  -- plan_expiry
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'plan_expiry') THEN
    ALTER TABLE public.users ADD COLUMN plan_expiry TIMESTAMP WITH TIME ZONE;
  END IF;

  -- razorpay_payment_id
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'razorpay_payment_id') THEN
    ALTER TABLE public.users ADD COLUMN razorpay_payment_id TEXT;
  END IF;

  -- razorpay_order_id
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'razorpay_order_id') THEN
    ALTER TABLE public.users ADD COLUMN razorpay_order_id TEXT;
  END IF;

  -- email
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'email') THEN
    ALTER TABLE public.users ADD COLUMN email TEXT;
  END IF;

  -- created_at
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'created_at') THEN
    ALTER TABLE public.users ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;

  -- updated_at
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'updated_at') THEN
    ALTER TABLE public.users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_subscription_tier ON public.users(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON public.users(subscription_status);
CREATE INDEX IF NOT EXISTS idx_users_plan_expiry ON public.users(plan_expiry);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- =====================================================
-- 2. Create payments table
-- =====================================================

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  payment_id TEXT NOT NULL UNIQUE,
  order_id TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('starter', 'pro')),
  amount INTEGER NOT NULL, -- Amount in paise (smallest currency unit, e.g., 49900 = ₹499)
  currency TEXT DEFAULT 'INR',
  status TEXT NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- If payments table exists with DECIMAL amount, alter it to INTEGER
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'payments' 
      AND column_name = 'amount'
      AND data_type = 'numeric'
  ) THEN
    -- Convert existing DECIMAL to INTEGER (multiply by 100 if needed)
    -- Note: This assumes existing amounts are in rupees, convert to paise
    ALTER TABLE public.payments 
      ALTER COLUMN amount TYPE INTEGER USING (amount * 100)::INTEGER;
  END IF;
END $$;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_id ON public.payments(payment_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON public.payments(payment_date);

-- =====================================================
-- 3. Enable Row Level Security (RLS)
-- =====================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 4. Create RLS Policies for users table
-- =====================================================

-- Drop existing policies if they exist (idempotent)
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Service role has full access" ON public.users;

-- Policy: Users can SELECT their own row
CREATE POLICY "Users can view own profile"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can UPDATE their own row
-- Note: Restrict which columns can be updated to prevent abuse
CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Service role (backend) has full access
-- This allows server-side operations (user creation, payment updates)
CREATE POLICY "Service role has full access"
  ON public.users
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- =====================================================
-- 5. Create RLS Policies for payments table
-- =====================================================

-- Drop existing policies if they exist (idempotent)
DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
DROP POLICY IF EXISTS "Service role can insert payments" ON public.payments;
DROP POLICY IF EXISTS "Service role has full access to payments" ON public.payments;

-- Policy: Users can SELECT their own payments
CREATE POLICY "Users can view own payments"
  ON public.payments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Service role can INSERT payments (server-side only)
-- Frontend cannot insert payments directly
CREATE POLICY "Service role can insert payments"
  ON public.payments
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Policy: Service role has full access to payments
-- This allows server-side operations (updates, deletes if needed)
CREATE POLICY "Service role has full access to payments"
  ON public.payments
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- =====================================================
-- 6. Create updated_at trigger function
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to users table
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Apply trigger to payments table
DROP TRIGGER IF EXISTS update_payments_updated_at ON public.payments;
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- 7. Grant necessary permissions
-- =====================================================

-- Grant SELECT and UPDATE to authenticated users (RLS policies will restrict access)
GRANT SELECT, UPDATE ON public.users TO authenticated;
GRANT SELECT ON public.payments TO authenticated;

-- Grant full access to service_role (for server-side operations)
GRANT ALL ON public.users TO service_role;
GRANT ALL ON public.payments TO service_role;

-- =====================================================
-- Migration Complete
-- =====================================================
-- Summary:
-- ✅ users table with all required columns
-- ✅ payments table created
-- ✅ RLS enabled on both tables
-- ✅ Security policies configured
-- ✅ Indexes for performance
-- ✅ Triggers for updated_at
-- ✅ Permissions granted
-- =====================================================
