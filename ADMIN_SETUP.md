# Admin Account Setup Guide

This guide explains how to set up an admin/authority account with all premium features and credits.

## Overview

The admin account setup endpoint allows you to upgrade any user account to have:
- **Agency tier** (highest subscription tier)
- **Active subscription status**
- **1 year plan expiry** (from setup date)
- **1000 credits** (default, customizable)
- **All premium features unlocked**

## Setup Instructions

### Step 1: Create a User Account

First, create a regular user account through the signup page:
1. Go to `/signup`
2. Sign up with your email and password (or use Google OAuth)
3. Complete the signup process

### Step 2: Upgrade to Admin Account

Once you have a user account, call the admin setup API:

**Using cURL:**
```bash
curl -X POST https://your-domain.com/api/admin/setup-account \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "credits": 1000
  }'
```

**Using JavaScript/Fetch:**
```javascript
const response = await fetch('/api/admin/setup-account', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'your-email@example.com',
    credits: 1000, // Optional, defaults to 1000
  }),
})

const data = await response.json()
console.log(data)
```

**Response:**
```json
{
  "success": true,
  "message": "Admin account setup complete for your-email@example.com",
  "profile": {
    "email": "your-email@example.com",
    "subscription_tier": "agency",
    "subscription_status": "active",
    "credits": 1000,
    "plan_expiry": "2025-12-31T23:59:59.999Z"
  }
}
```

## Security Note

⚠️ **Important:** In production, you should protect this endpoint with:
- An admin API key
- IP whitelisting
- Or move it to a separate admin-only route

Currently, this endpoint is accessible to anyone who knows the URL. Consider adding authentication before deploying to production.

## Features Unlocked

With an admin account, you get:
- ✅ All premium features (Agency tier)
- ✅ Unlimited credits (or 1000+ credits)
- ✅ Access to all tools without restrictions
- ✅ No credit deductions for paid features
- ✅ 1 year subscription validity

## Testing

After setup, you can:
1. Log in to your account
2. Go to `/dashboard` to see your subscription status
3. Use any premium feature without restrictions
4. Check your credits balance

## Troubleshooting

**Error: "User with email X not found"**
- Make sure you've signed up first
- Check that the email matches exactly (case-insensitive)

**Error: "Server configuration error"**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
- Check Supabase connection

**Profile not updating**
- Check Supabase RLS policies allow service role updates
- Verify the profiles table exists and has correct schema
