-- Migration: Fix profiles table constraints and RLS policies
-- This ensures:
-- 1. UNIQUE constraint on user_id (prevents duplicates)
-- 2. Proper RLS policies for profile access
-- 3. Service role full access

-- Add UNIQUE constraint on user_id if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'profiles_user_id_key' 
    AND conrelid = 'public.profiles'::regclass
  ) THEN
    ALTER TABLE public.profiles 
    ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);
  END IF;
END $$;

-- Drop existing RLS policies if they exist (to recreate them cleanly)
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role full access" ON public.profiles;

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Note: Service role bypasses RLS automatically, so no explicit policy needed
-- The service role key has full access to all tables

-- Create index on user_id for faster lookups (if it doesn't exist)
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
