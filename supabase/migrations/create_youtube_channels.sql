-- Migration: Create youtube_channels table
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS youtube_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  channel_id TEXT NOT NULL,
  title TEXT,
  subscribers INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  video_count INTEGER DEFAULT 0,
  access_token TEXT,
  refresh_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE youtube_channels ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only read their own channel
CREATE POLICY "Users can view own channel"
  ON youtube_channels
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own channel
CREATE POLICY "Users can insert own channel"
  ON youtube_channels
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own channel
CREATE POLICY "Users can update own channel"
  ON youtube_channels
  FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policy: Users can delete their own channel
CREATE POLICY "Users can delete own channel"
  ON youtube_channels
  FOR DELETE
  USING (auth.uid() = user_id);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_youtube_channels_user_id ON youtube_channels(user_id);
CREATE INDEX IF NOT EXISTS idx_youtube_channels_channel_id ON youtube_channels(channel_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_youtube_channels_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_youtube_channels_timestamp
  BEFORE UPDATE ON youtube_channels
  FOR EACH ROW
  EXECUTE FUNCTION update_youtube_channels_updated_at();
