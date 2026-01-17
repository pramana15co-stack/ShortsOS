# Password Recovery Email Setup

## Issue
Password recovery emails may not be sending correctly. This is typically a Supabase configuration issue, not a code issue.

## Required Supabase Configuration

### 1. Email Provider Setup
1. Go to Supabase Dashboard → **Settings** → **Auth** → **Email Templates**
2. Ensure email provider is configured (SMTP or Supabase's default)
3. For production, configure custom SMTP settings if needed

### 2. Redirect URLs Configuration
Go to **Authentication** → **URL Configuration** and add:

**Local Development:**
```
http://localhost:3000/reset-password
```

**Production:**
```
https://your-domain.com/reset-password
https://www.your-domain.com/reset-password
```

### 3. Site URL Configuration
Set the **Site URL** in Supabase Dashboard:
- **Local**: `http://localhost:3000`
- **Production**: `https://your-domain.com`

### 4. Email Template Customization
1. Go to **Authentication** → **Email Templates**
2. Select **Reset Password** template
3. Ensure the redirect link uses: `{{ .ConfirmationURL }}`
4. Customize the email content if needed

### 5. Rate Limiting
If emails aren't sending:
- Check rate limits in Supabase Dashboard
- Wait a few minutes between requests
- Check spam folder

## Troubleshooting

### Email Not Received
1. **Check Spam Folder**: Password reset emails often go to spam
2. **Verify Email Address**: Ensure the email exists in your Supabase database
3. **Check Supabase Logs**: Go to **Logs** → **Auth** to see if emails are being sent
4. **Verify Redirect URL**: Must match exactly what's configured in Supabase
5. **Check Email Provider**: If using custom SMTP, verify credentials

### Common Errors
- **"Invalid redirect URL"**: Add the exact URL to Supabase redirect URLs list
- **"Rate limit exceeded"**: Wait a few minutes before trying again
- **"Email not found"**: The error message doesn't reveal this for security, but check if email exists

## Testing
1. Use a real email address (not a test account)
2. Check both inbox and spam folder
3. Verify the reset link works when clicked
4. Test with different email providers (Gmail, Outlook, etc.)

## Support
If issues persist after checking all configurations:
- Contact Supabase support
- Check Supabase status page
- Verify environment variables are set correctly
- Email: pramana15@pramana15.com
