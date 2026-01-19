-- =====================================================
-- Create Credits System
-- =====================================================
-- This migration creates the credits system for feature access
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add credits column to profiles table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'profiles' 
      AND column_name = 'credits'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN credits INTEGER DEFAULT 50;
  END IF;
END $$;

-- Create credits_transactions table to track credit usage
CREATE TABLE IF NOT EXISTS public.credits_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  credits_used INTEGER NOT NULL,
  credits_remaining INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_credits_transactions_user_id ON public.credits_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credits_transactions_created_at ON public.credits_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_credits_transactions_feature ON public.credits_transactions(feature);

-- Enable RLS
ALTER TABLE public.credits_transactions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own credit transactions" ON public.credits_transactions;
DROP POLICY IF EXISTS "Service role can insert credit transactions" ON public.credits_transactions;

-- Create RLS policies
CREATE POLICY "Users can view own credit transactions"
  ON public.credits_transactions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can insert (for server-side operations)
CREATE POLICY "Service role can insert credit transactions"
  ON public.credits_transactions
  FOR INSERT
  WITH CHECK (true); -- Service role bypasses RLS

-- Update existing profiles to have 50 credits
UPDATE public.profiles SET credits = 50 WHERE credits IS NULL;
