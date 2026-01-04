# Supabase Email Confirmation Setup

## Redirect URLs to Add in Supabase

To enable email confirmation, you need to add these redirect URLs in your Supabase dashboard.

### Step 1: Go to Supabase Dashboard

1. Log in to [supabase.com](https://supabase.com)
2. Select your project
3. Go to **Authentication** → **URL Configuration**

### Step 2: Add Redirect URLs

Add these URLs to the **Redirect URLs** section:

#### For Local Development:
```
http://localhost:3000/auth/callback
http://localhost:3000/reset-password
```

#### For Production (Vercel):
```
https://your-project-name.vercel.app/auth/callback
https://your-project-name.vercel.app/reset-password
```

#### For Production (Custom Domain):
```
https://yourdomain.com/auth/callback
https://yourdomain.com/reset-password
https://www.yourdomain.com/auth/callback
https://www.yourdomain.com/reset-password
```

### Step 3: Add Site URL

Set the **Site URL** to your production domain:
- **Local Development**: `http://localhost:3000`
- **Production**: `https://your-project-name.vercel.app` or `https://yourdomain.com`

### Step 4: Enable Email Confirmation

1. Go to **Authentication** → **Providers** → **Email**
2. Make sure **Enable email confirmations** is checked
3. Customize the email template if needed

## How It Works

### Email Confirmation Flow:
1. User signs up with email and password
2. Supabase sends a confirmation email with a link
3. User clicks the link in their email
4. Link redirects to `/auth/callback` with auth tokens
5. Callback page processes the tokens and creates a session
6. User is redirected to `/dashboard`

### Password Reset Flow:
1. User clicks "Forgot password?" on login page
2. User enters email address
3. Supabase sends password reset email with a link
4. User clicks the link in their email
5. Link redirects to `/reset-password` with recovery tokens
6. User enters new password
7. Password is updated and user is redirected to login

## Testing

### Local Testing:
1. Start your dev server: `npm run dev`
2. Sign up with a real email address
3. Check your email for the confirmation link
4. Click the link - it should redirect to `http://localhost:3000/auth/callback`
5. You should be automatically logged in and redirected to dashboard

### Production Testing:
1. Deploy your site to Vercel/Netlify
2. Make sure redirect URLs are added in Supabase
3. Sign up with a real email
4. Click the confirmation link from your email
5. Should redirect to your production domain `/auth/callback`

## Troubleshooting

### "Redirect URL not allowed" error:
- Make sure you've added the exact URL in Supabase dashboard
- Check that the URL matches exactly (including http/https, www/non-www)
- Clear browser cache and try again

### Email not received:
- Check spam folder
- Verify email address is correct
- Check Supabase email logs in dashboard
- Make sure email confirmation is enabled

### Callback page shows error:
- Verify Supabase environment variables are set correctly
- Check browser console for errors
- Ensure callback page is accessible at `/auth/callback`

