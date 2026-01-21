# Google OAuth Setup Guide

This guide explains how to configure Google OAuth for Supabase authentication.

## Prerequisites

- Supabase project with Authentication enabled
- Google Cloud Console account
- Production domain (e.g., `https://shorts-os.vercel.app`)

## Step 1: Configure Supabase OAuth Redirect URLs

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Set the **Site URL** to your production domain:
   ```
   https://shorts-os.vercel.app
   ```

4. Add these to **Additional Redirect URLs**:
   ```
   https://shorts-os.vercel.app/auth/callback
   http://localhost:3000/auth/callback
   ```

## Step 2: Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Choose **Web application** as the application type
6. Add the following **Authorized redirect URIs**:
   ```
   https://<YOUR_SUPABASE_PROJECT_ID>.supabase.co/auth/v1/callback
   ```
   
   **Important:** Use your Supabase project URL, NOT your Vercel domain.
   
   Example:
   ```
   https://abcdefghijklmnop.supabase.co/auth/v1/callback
   ```

7. Copy the **Client ID** and **Client Secret**

## Step 3: Configure Supabase Google Provider

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Find **Google** and enable it
3. Enter your Google **Client ID** and **Client Secret**
4. Save the configuration

## Step 4: Verify OAuth Flow

### Local Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login` or `http://localhost:3000/signup`
3. Click "Sign in with Google" or "Sign up with Google"
4. Complete the Google OAuth flow
5. You should be redirected to `/auth/callback` and then to `/dashboard`

### Production Testing

1. Deploy your application to Vercel (or your hosting platform)
2. Ensure environment variables are set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (for profile creation)

3. Test the OAuth flow on your production domain

## How It Works

1. **User clicks "Sign in with Google"**
   - Frontend calls `supabase.auth.signInWithOAuth({ provider: 'google' })`
   - Redirect URL is set to `${window.location.origin}/auth/callback`

2. **User authenticates with Google**
   - Google redirects to Supabase OAuth endpoint
   - Supabase processes the OAuth response

3. **Supabase redirects to `/auth/callback`**
   - Callback page calls `supabase.auth.getSession()`
   - If session exists, profile is created (if needed) via `/api/bootstrap-profile`
   - User is redirected to `/dashboard`

4. **Profile Auto-Creation**
   - Database trigger (`on_auth_user_created`) automatically creates a profile
   - Fallback: `/api/bootstrap-profile` ensures profile exists if trigger fails

## Troubleshooting

### Error: "requested path is invalid"

**Cause:** The redirect URL is not whitelisted in Supabase.

**Solution:**
- Check Supabase Dashboard → Authentication → URL Configuration
- Ensure `/auth/callback` is in Additional Redirect URLs
- Verify the exact URL matches (including protocol: `https://` or `http://`)

### Error: "redirect_uri_mismatch" (Google)

**Cause:** The redirect URI in Google Cloud Console doesn't match Supabase's callback URL.

**Solution:**
- Use Supabase's callback URL: `https://<PROJECT_ID>.supabase.co/auth/v1/callback`
- Do NOT use your Vercel domain for Google OAuth redirect URI
- Google redirects to Supabase, then Supabase redirects to your app

### OAuth works but user doesn't land on dashboard

**Cause:** Callback page isn't handling the session correctly.

**Solution:**
- Check browser console for errors
- Verify `/auth/callback` page is using `getSupabaseClient()` correctly
- Ensure profile creation API (`/api/bootstrap-profile`) is working

### Profile not created for OAuth users

**Cause:** Database trigger might not be set up.

**Solution:**
1. Run the migration: `database/migrations/07_auto_create_profiles_trigger.sql`
2. Or ensure `/api/bootstrap-profile` is called in the callback
3. Check Supabase logs for trigger errors

## Security Notes

- ✅ OAuth redirects always go through `/auth/callback` (never directly to `/dashboard`)
- ✅ Session is validated before redirecting
- ✅ Profile creation is non-blocking (won't prevent login)
- ✅ Failed OAuth attempts redirect to `/signup`

## Environment Variables

Ensure these are set in your production environment:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

## Testing Checklist

- [ ] Google OAuth button appears on login/signup pages
- [ ] Clicking button redirects to Google
- [ ] After Google auth, redirects to `/auth/callback`
- [ ] Callback page shows "Signing you in..." message
- [ ] User is redirected to `/dashboard` after successful auth
- [ ] Profile is created in `public.profiles` table
- [ ] User can access premium features (if applicable)
- [ ] Works on both localhost and production

## Support

If you encounter issues:
1. Check browser console for errors
2. Check Supabase Dashboard → Authentication → Logs
3. Verify all redirect URLs are correctly configured
4. Ensure database trigger is active
