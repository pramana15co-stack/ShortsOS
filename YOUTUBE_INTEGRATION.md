# YouTube Analytics & Creator Audit Integration

## Overview
This integration adds YouTube channel analytics and AI-powered Creator Audit features to ShortsOS, with strict feature gating to ensure zero out-of-pocket costs.

## Database Setup

Run the migration in Supabase SQL Editor:
```sql
-- See: supabase/migrations/create_youtube_channels.sql
```

## Environment Variables

Add these to your `.env.local` and Vercel:

```env
# Google OAuth (YouTube API)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Base URL (for OAuth callback)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "YouTube Data API v3"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set Application type: "Web application"
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/youtube/callback` (development)
   - `https://yourdomain.com/api/youtube/callback` (production)
7. Copy Client ID and Client Secret to environment variables

## Feature Gating

### Free Users
- See placeholder analytics
- Get rule-based Creator Audit (no AI)
- Cannot link YouTube channel
- Upgrade CTA shown

### Paid Users
- Can link YouTube channel
- See real analytics from YouTube Data API v3
- Get AI-powered personalized Creator Audit
- Credits deducted for Creator Audit (15 credits)

## API Routes

- `GET /api/youtube/link` - Initiate OAuth flow
- `GET /api/youtube/callback` - OAuth callback handler
- `POST /api/youtube/unlink` - Unlink channel
- `GET /api/youtube/channel` - Get linked channel info
- `GET /api/analytics/youtube` - Get analytics data
- `POST /api/creator-audit` - Generate Creator Audit

## Security

- Access tokens stored server-side only
- RLS policies enforce user isolation
- Service role key used for DB writes
- Session validation on all routes
- OpenAI calls gated by subscription tier

## Cost Safety

- **Free users**: NEVER trigger OpenAI
- **Paid users**: OpenAI calls require credits
- **Fallbacks**: Rule-based logic if OpenAI fails
- **No paid APIs**: Only free YouTube Data API v3

## Testing

1. Test OAuth flow with test Google account
2. Verify free users see placeholder data
3. Verify paid users can link channel
4. Verify Creator Audit works for both tiers
5. Verify credit deduction for paid users
