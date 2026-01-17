# Vercel Environment Variables Setup

## 🚨 Issue: 500 Error on Production

The `/api/checkout` endpoint is returning 500 errors because Razorpay environment variables are not set in Vercel.

## ✅ Solution: Add Environment Variables in Vercel

### Step 1: Go to Vercel Dashboard
1. Visit [vercel.com](https://vercel.com)
2. Log in and select your project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add These Variables

Add **ALL THREE** variables:

#### For Production Environment:
```
NEXT_PUBLIC_RAZORPAY_KEY_ID = rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_ID = rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET = your_secret_key_here
```

#### Important Settings:
- **Environment**: Select "Production", "Preview", and "Development" (or just "Production" if you only want it there)
- **Value**: Paste your actual Razorpay test keys
- Click **Save** after each variable

### Step 3: Redeploy

**CRITICAL**: After adding environment variables, you MUST redeploy:

1. Go to **Deployments** tab
2. Click the **three dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic redeployment

**Environment variables are only loaded on deployment, not when you just save them!**

### Step 4: Verify

1. After redeploy, visit: `https://your-domain.vercel.app/api/test-env`
2. Should return:
   ```json
   {
     "allSet": true,
     "backend": { "hasKeyId": true, "hasKeySecret": true },
     "frontend": { "hasPublicKey": true }
   }
   ```

## 🔍 Check Vercel Function Logs

If still getting errors:

1. Go to Vercel Dashboard → **Deployments**
2. Click on the latest deployment
3. Go to **Functions** tab
4. Click on `/api/checkout`
5. Check **Logs** tab for error messages

You should see detailed error logs like:
```
❌ Razorpay Environment Variables Missing
❌ Razorpay order creation error: { ... }
```

## 📝 Quick Checklist

- [ ] Added `NEXT_PUBLIC_RAZORPAY_KEY_ID` in Vercel
- [ ] Added `RAZORPAY_KEY_ID` in Vercel
- [ ] Added `RAZORPAY_KEY_SECRET` in Vercel
- [ ] Selected correct environment (Production/Preview/Development)
- [ ] Clicked **Save** for each variable
- [ ] **Redeployed** the application
- [ ] Tested `/api/test-env` endpoint
- [ ] Checked Vercel function logs for errors

## 🐛 Common Mistakes

❌ **Adding variables but not redeploying**
- Variables only load on deployment
- **Fix**: Redeploy after adding variables

❌ **Only adding to one environment**
- If you selected only "Production", preview deployments won't work
- **Fix**: Select all environments you need

❌ **Wrong variable names**
- Must be exact: `RAZORPAY_KEY_ID` (not `RAZORPAY_KEY` or `KEY_ID`)
- **Fix**: Copy variable names exactly

❌ **Using local .env.local values**
- `.env.local` only works locally
- **Fix**: Add to Vercel dashboard

## 🔗 Get Your Razorpay Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Make sure **Test Mode** is ON (toggle in top right)
3. Go to **Settings** → **API Keys**
4. Click **Generate Test Keys** if needed
5. Copy **Key ID** and **Key Secret**

## ✅ After Setup

Once variables are set and redeployed:
- `/api/checkout` should work
- `/api/test-env` should show `allSet: true`
- Payment flow should work
