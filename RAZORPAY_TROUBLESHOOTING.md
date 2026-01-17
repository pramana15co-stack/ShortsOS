# Razorpay Keys Not Working - Troubleshooting Guide

## Quick Fixes

### 1. Check Environment Variables Are Set

#### For Local Development (.env.local)
Create or update `.env.local` in your project root:
```bash
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
```

**Important:**
- File must be named `.env.local` (not `.env`)
- Must be in the **root directory** (same level as `package.json`)
- No spaces around the `=` sign
- No quotes needed (unless the value has spaces)

#### For Vercel Production
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these variables:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` = `rzp_test_xxxxxxxxxxxxx`
   - `RAZORPAY_KEY_ID` = `rzp_test_xxxxxxxxxxxxx`
   - `RAZORPAY_KEY_SECRET` = `your_secret_key_here`
3. **Redeploy** your application after adding variables

### 2. Restart Development Server

After adding/changing environment variables:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

**Environment variables are only loaded when the server starts!**

### 3. Verify Keys Are Correct

#### Test Keys Format
- **Key ID**: Should start with `rzp_test_` (for test mode)
- **Key Secret**: Should be a long string (usually 32+ characters)

#### Get Your Test Keys
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Make sure you're in **Test Mode** (toggle in top right)
3. Go to **Settings** → **API Keys**
4. Click **Generate Test Keys** if you haven't already
5. Copy both keys exactly as shown

### 4. Check for Common Mistakes

❌ **Wrong:**
```bash
RAZORPAY_KEY_ID = rzp_test_xxxxx  # Space around =
RAZORPAY_KEY_ID="rzp_test_xxxxx"  # Quotes (usually fine, but can cause issues)
RAZORPAY_KEY_ID=rzp_live_xxxxx    # Live keys instead of test keys
```

✅ **Correct:**
```bash
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

### 5. Verify Environment Variables Are Loaded

Add this temporary debug code to check:

**In `lib/razorpay.ts`** (temporary):
```typescript
export function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  // Temporary debug (remove after fixing)
  console.log('Razorpay Key ID exists:', !!keyId)
  console.log('Razorpay Key ID starts with:', keyId?.substring(0, 8))
  console.log('Razorpay Key Secret exists:', !!keySecret)

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.')
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })
}
```

Check your **server console** (not browser console) when you try to create an order.

### 6. Check Browser Console

Open browser DevTools (F12) → Console tab, and look for:
- Errors about Razorpay script not loading
- Errors about missing `key` in payment options
- Network errors when calling `/api/checkout`

### 7. Verify .env.local File Location

Your project structure should be:
```
ShortsOS/
├── .env.local          ← HERE (root directory)
├── package.json
├── next.config.js
├── app/
├── components/
└── lib/
```

**NOT:**
```
ShortsOS/
├── app/
│   └── .env.local     ← WRONG LOCATION
```

### 8. For Vercel Deployments

1. **Add environment variables** in Vercel Dashboard
2. **Redeploy** (don't just save - you must redeploy)
3. Check **Function Logs** in Vercel Dashboard for errors

### 9. Test Environment Variable Loading

Create a test API route to verify:

**Create `app/api/test-env/route.ts`:**
```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasKeyId: !!process.env.RAZORPAY_KEY_ID,
    hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET,
    hasPublicKey: !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    keyIdPrefix: process.env.RAZORPAY_KEY_ID?.substring(0, 8) || 'NOT SET',
  })
}
```

Visit: `http://localhost:3000/api/test-env`

**Expected output:**
```json
{
  "hasKeyId": true,
  "hasKeySecret": true,
  "hasPublicKey": true,
  "keyIdPrefix": "rzp_test"
}
```

### 10. Common Error Messages & Solutions

#### "Razorpay credentials not configured"
- **Solution**: Environment variables not loaded
- **Fix**: Check `.env.local` exists, restart dev server

#### "Payment gateway is loading"
- **Solution**: Razorpay script not loaded in browser
- **Fix**: Check internet connection, check browser console

#### "Failed to create payment order"
- **Solution**: Backend can't access Razorpay keys
- **Fix**: Check server logs, verify environment variables

#### "Invalid key_id"
- **Solution**: Wrong key format or test/live mismatch
- **Fix**: Use test keys that start with `rzp_test_`

## Step-by-Step Debugging

1. **Verify .env.local exists and has correct format**
2. **Restart dev server** (`npm run dev`)
3. **Check server console** for errors when clicking upgrade
4. **Check browser console** for frontend errors
5. **Test API endpoint** (`/api/test-env`) to verify variables
6. **Check Razorpay Dashboard** - ensure test mode is ON
7. **Verify keys** - copy fresh keys from Razorpay dashboard

## Still Not Working?

1. **Share the exact error message** from:
   - Browser console
   - Server console
   - Network tab (check `/api/checkout` response)

2. **Verify your .env.local file** (remove sensitive data):
   ```bash
   # Show first few characters only
   cat .env.local | grep RAZORPAY
   ```

3. **Check if variables are being read**:
   - Add console.log in `lib/razorpay.ts`
   - Check server logs when making a request

## Quick Test

Run this in your terminal (from project root):
```bash
# Check if .env.local exists
ls -la .env.local

# Check if variables are there (first few chars only)
grep RAZORPAY .env.local | head -c 50
```

If file doesn't exist or is empty, create it with your keys!
