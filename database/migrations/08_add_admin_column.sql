-- =====================================================
-- Add is_admin column to profiles table
-- =====================================================
-- This migration adds an is_admin flag to grant full access
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add is_admin column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'profiles' 
      AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- Create index for faster admin lookups
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON public.profiles(is_admin) WHERE is_admin = TRUE;

-- Update existing admin accounts (if any were created via API)
-- This is a one-time update - you can remove this if not needed
-- UPDATE public.profiles SET is_admin = TRUE WHERE subscription_tier = 'agency' AND subscription_status = 'active';
