-- Update users table to add Razorpay payment fields
-- Run this in your Supabase SQL Editor
-- Make sure you have a users table (usually created by Supabase Auth)

-- Add columns if they don't exist
DO $$ 
BEGIN
  -- Add subscription_tier if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'users' AND column_name = 'subscription_tier') THEN
    ALTER TABLE users ADD COLUMN subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'pro', 'agency'));
  END IF;

  -- Add subscription_status if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'users' AND column_name = 'subscription_status') THEN
    ALTER TABLE users ADD COLUMN subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'cancelled', 'inactive'));
  END IF;

  -- Add plan_expiry if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'users' AND column_name = 'plan_expiry') THEN
    ALTER TABLE users ADD COLUMN plan_expiry TIMESTAMP WITH TIME ZONE;
  END IF;

  -- Add Razorpay payment IDs if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'users' AND column_name = 'razorpay_payment_id') THEN
    ALTER TABLE users ADD COLUMN razorpay_payment_id TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'users' AND column_name = 'razorpay_order_id') THEN
    ALTER TABLE users ADD COLUMN razorpay_order_id TEXT;
  END IF;

  -- Add updated_at if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'users' AND column_name = 'updated_at') THEN
    ALTER TABLE users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_subscription_tier ON users(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON users(subscription_status);
CREATE INDEX IF NOT EXISTS idx_users_plan_expiry ON users(plan_expiry);

-- Add updated_at trigger if it doesn't exist
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at_trigger ON users;
CREATE TRIGGER update_users_updated_at_trigger
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_users_updated_at();
