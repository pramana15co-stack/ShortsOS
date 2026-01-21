-- =====================================================
-- Auto-create profiles trigger for OAuth users
-- =====================================================
-- This trigger automatically creates a profile when a new user signs up
-- via OAuth or email/password authentication
-- =====================================================

-- Create or replace the function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id,
    subscription_tier,
    subscription_status,
    credits,
    plan_expiry,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    'free',
    'inactive',
    50, -- Give new users 50 credits to start
    NULL,
    NOW(),
    NOW()
  )
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
