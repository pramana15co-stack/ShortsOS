# Database Schema for ShortsOS

This document describes the Supabase database tables needed for the application.

## Required Tables

### 1. `saved_scripts`
Stores generated scripts for logged-in users.

```sql
CREATE TABLE saved_scripts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  format_slug TEXT NOT NULL,
  format_name TEXT NOT NULL,
  hook TEXT NOT NULL,
  body TEXT NOT NULL,
  cta TEXT NOT NULL,
  full_script TEXT NOT NULL,
  estimated_seconds INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_saved_scripts_user_id ON saved_scripts(user_id);
CREATE INDEX idx_saved_scripts_created_at ON saved_scripts(created_at DESC);
```

### 2. `saved_hooks`
Stores generated hooks for logged-in users.

```sql
CREATE TABLE saved_hooks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  emotion TEXT NOT NULL,
  audience_level TEXT NOT NULL,
  hook_text TEXT NOT NULL,
  estimated_seconds INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_saved_hooks_user_id ON saved_hooks(user_id);
CREATE INDEX idx_saved_hooks_created_at ON saved_hooks(created_at DESC);
```

### 3. `planner_results`
Stores planner results (already exists, but included for reference).

```sql
CREATE TABLE planner_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  niche TEXT NOT NULL,
  goal TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  recommended_formats JSONB NOT NULL,
  posting_frequency TEXT NOT NULL,
  frequency_reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_planner_results_user_id ON planner_results(user_id);
CREATE INDEX idx_planner_results_created_at ON planner_results(created_at DESC);
```

### 4. `support_messages`
Stores support/contact form messages.

```sql
CREATE TABLE support_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_support_messages_user_id ON support_messages(user_id);
CREATE INDEX idx_support_messages_created_at ON support_messages(created_at DESC);
```

### 5. `chat_messages`
Stores chat widget messages.

```sql
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at DESC);
```

### 6. `waitlist`
Stores waitlist entries for Pro and Agency tiers.

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('pro', 'agency')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_waitlist_user_id ON waitlist(user_id);
CREATE INDEX idx_waitlist_tier ON waitlist(tier);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);
```

## Row Level Security (RLS) Policies

Enable RLS on all tables and create policies:

### For `saved_scripts`:
```sql
ALTER TABLE saved_scripts ENABLE ROW LEVEL SECURITY;

-- Users can only see their own scripts
CREATE POLICY "Users can view own scripts"
  ON saved_scripts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own scripts
CREATE POLICY "Users can insert own scripts"
  ON saved_scripts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own scripts
CREATE POLICY "Users can delete own scripts"
  ON saved_scripts FOR DELETE
  USING (auth.uid() = user_id);
```

### For `saved_hooks`:
```sql
ALTER TABLE saved_hooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own hooks"
  ON saved_hooks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own hooks"
  ON saved_hooks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own hooks"
  ON saved_hooks FOR DELETE
  USING (auth.uid() = user_id);
```

### For `planner_results`:
```sql
ALTER TABLE planner_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own planner results"
  ON planner_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own planner results"
  ON planner_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### For `support_messages`:
```sql
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (for contact form)
CREATE POLICY "Anyone can insert support messages"
  ON support_messages FOR INSERT
  WITH CHECK (true);

-- Users can view their own messages
CREATE POLICY "Users can view own messages"
  ON support_messages FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IS NULL);
```

### For `chat_messages`:
```sql
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert chat messages"
  ON chat_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own messages"
  ON chat_messages FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IS NULL);
```

### For `waitlist`:
```sql
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert waitlist entries"
  ON waitlist FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own waitlist entries"
  ON waitlist FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IS NULL);
```

## Setup Instructions

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the CREATE TABLE statements above
4. Run the CREATE INDEX statements
5. Run the RLS policies
6. Your database is ready!

## Notes

- All tables use UUID primary keys
- `user_id` references `auth.users(id)` for authenticated users
- `created_at` timestamps are automatically set
- RLS policies ensure users can only access their own data
- Support/chat messages allow anonymous submissions (user_id can be NULL)


