-- =====================================================
-- Create usage_tracking table for free user limits
-- =====================================================
-- This table tracks daily feature usage for free users
-- Run this in Supabase SQL Editor
-- =====================================================

-- Create usage_tracking table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  usage_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_id ON public.usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_feature ON public.usage_tracking(feature);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_date ON public.usage_tracking(usage_date);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_feature_date ON public.usage_tracking(user_id, feature, usage_date);

-- Enable RLS
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (idempotent)
DROP POLICY IF EXISTS "Users can view own usage" ON public.usage_tracking;
DROP POLICY IF EXISTS "Users can insert own usage" ON public.usage_tracking;
DROP POLICY IF EXISTS "Service role has full access to usage" ON public.usage_tracking;

-- Create RLS policies
-- SELECT: Users can view their own usage
CREATE POLICY "Users can view own usage"
  ON public.usage_tracking
  FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: Users can insert their own usage records
CREATE POLICY "Users can insert own usage"
  ON public.usage_tracking
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Service role has full access (for server-side operations)
CREATE POLICY "Service role has full access to usage"
  ON public.usage_tracking
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Grant necessary permissions
GRANT SELECT, INSERT ON public.usage_tracking TO authenticated;
