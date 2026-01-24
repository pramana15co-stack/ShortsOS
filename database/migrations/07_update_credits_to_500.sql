-- Update all existing free tier users to 500 credits
UPDATE public.profiles
SET credits = 500
WHERE subscription_tier = 'free' AND credits < 500;

-- Ensure the default for new rows is also 500 (at database level)
ALTER TABLE public.profiles 
ALTER COLUMN credits SET DEFAULT 500;
