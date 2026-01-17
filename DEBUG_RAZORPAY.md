# Debug Razorpay 500 Error - Step by Step

## ✅ Environment Variables: VERIFIED

Your `/api/test-env` shows:
- ✅ All variables set correctly
- ✅ Keys in correct format (`rzp_test_...`)
- ✅ All three variables present

## 🔍 Next Steps: Check Vercel Function Logs

Since environment variables are correct, the error is likely from Razorpay API itself.

### Step 1: Check Vercel Function Logs

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Deployments** tab
4. Click on the **latest deployment**
5. Go to **Functions** tab
6. Click on **`/api/checkout`**
7. Open **Logs** tab
8. Try the payment again (click upgrade button)
9. Watch the logs in real-time

### Step 2: Look for These Error Messages

You should see one of these:

#### Error 1: "Razorpay credentials not configured"
- **Cause**: Environment variables not loaded (but your test shows they are)
- **Fix**: Already verified - not this issue

#### Error 2: "Invalid Razorpay API credentials" (401)
- **Cause**: Wrong Key ID or Key Secret
- **Fix**: 
  - Verify keys in Razorpay Dashboard
  - Make sure you're using **Test Mode** keys
  - Regenerate keys if needed

#### Error 3: "Razorpay API error: ..." (400)
- **Cause**: Invalid order parameters
- **Fix**: Check the error description in logs
- Common issues:
  - Amount too small/large
  - Invalid currency
  - Invalid receipt format

#### Error 4: Network/Timeout Error
- **Cause**: Razorpay API unreachable
- **Fix**: Check internet/Vercel connectivity

### Step 3: Test Razorpay Keys Directly

Verify your keys work with Razorpay:

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Make sure **Test Mode** is ON
3. Go to **Settings** → **API Keys**
4. Verify the Key ID matches what you set in Vercel
5. If keys look wrong, click **Regenerate Test Keys**
6. Update Vercel environment variables with new keys
7. **Redeploy**

### Step 4: Test Order Creation Manually

You can test if Razorpay API works by creating a test order manually:

**Using cURL:**
```bash
curl -u YOUR_KEY_ID:YOUR_KEY_SECRET \
  -X POST https://api.razorpay.com/v1/orders \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 49900,
    "currency": "INR",
    "receipt": "test_receipt_123"
  }'
```

Replace `YOUR_KEY_ID` and `YOUR_KEY_SECRET` with your actual keys.

**Expected response:**
```json
{
  "id": "order_xxxxx",
  "amount": 49900,
  "currency": "INR",
  ...
}
```

If this fails, your keys are invalid.

### Step 5: Common Razorpay Errors

#### "Invalid key_id"
- Key ID is wrong or doesn't exist
- **Fix**: Regenerate keys in Razorpay Dashboard

#### "Invalid key_secret"
- Key Secret doesn't match Key ID
- **Fix**: Make sure Key ID and Secret are from the same key pair

#### "Amount should be greater than 1.00"
- Amount in paise is less than 100 (₹1)
- **Fix**: Already handled in code (multiplies by 100)

#### "Receipt already exists"
- Receipt ID was used before
- **Fix**: Code generates unique receipts with timestamp

### Step 6: Share Error Details

If still failing, share from Vercel logs:

1. The **exact error message** from logs
2. The **statusCode** (401, 400, 500, etc.)
3. The **error.description** from Razorpay
4. The **error.code** from Razorpay

This will help identify the exact issue.

## 🎯 Quick Checklist

- [ ] Environment variables verified (`/api/test-env` shows `allSet: true`)
- [ ] Checked Vercel function logs for detailed error
- [ ] Verified Razorpay keys in dashboard
- [ ] Tested keys manually with cURL
- [ ] Redeployed after any key changes
- [ ] Checked Razorpay Dashboard → Test Mode is ON

## 💡 Most Likely Issues

1. **Keys are invalid** - Even if format is correct, keys might be wrong
   - **Fix**: Regenerate in Razorpay Dashboard and update Vercel

2. **Keys don't match** - Key ID and Secret are from different key pairs
   - **Fix**: Use keys from the same generation

3. **Test Mode mismatch** - Using live keys in test mode or vice versa
   - **Fix**: Ensure Test Mode is ON in Razorpay and using test keys

4. **Vercel hasn't loaded variables** - Even though test shows they're set
   - **Fix**: Redeploy after adding variables
