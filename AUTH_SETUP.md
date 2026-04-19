# Authentication Setup Instructions

## 1. Database Setup (Required)

Run this SQL migration in your Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Click "New Query"
4. Copy the content from `supabase_migrations_profiles_table.sql`
5. Run the query

This creates:
- `profiles` table with first_name, last_name, phone_number, email
- Row Level Security (RLS) policies so users can only access their own profile
- Auto-update timestamp for `updated_at` field

---

## 2. Enable Google OAuth (Optional)

### Step 1: Create Google OAuth App
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to Credentials → Create OAuth 2.0 Client IDs
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `https://udpwxgqwfucjowdgnwcp.supabase.co/auth/v1/callback`

### Step 2: Configure in Supabase
1. Go to your Supabase dashboard
2. Navigate to Authentication → Providers
3. Select Google
4. Toggle "Enable Sign-up"
5. Enter your Google OAuth Client ID and Client Secret
6. Save

### Step 3: Add Google OAuth button (Optional)
Your `AuthForm.tsx` already has the Google OAuth handler. It will automatically work once configured.

---

## 3. Environment Variables

✅ Already configured in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://udpwxgqwfucjowdgnwcp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_2eTmuVfvfHZNQONt6GZztw_IsAp9_VV
```

---

## 4. Available Features

### Routes Protected by Middleware:
- `/dashboard` - Authenticated users only
- `/profile` - Authenticated users only
- `/login` - Redirects to dashboard if already logged in
- `/signup` - Redirects to dashboard if already logged in

### Auth Functions (in `lib/supabase/auth.ts`):
- `signUp()` - Create account with email/password
- `login()` - Login with credentials
- `logout()` - Sign out user
- `resetPassword()` - Send password reset email
- `updateProfile()` - Update user profile
- `getProfile()` - Fetch user profile

### Form Fields:
**Signup:**
- First Name (required)
- Last Name (required)
- Phone Number (optional)
- Email (required)
- Password (required)

**Login:**
- Email
- Password

**Profile Edit:**
- First Name
- Last Name
- Phone Number
- Email (read-only)

---

## 5. Testing Checklist

- [ ] Visit `/signup` - fill form and create account
- [ ] Check Supabase dashboard - profile record created
- [ ] Visit `/login` - login with created account
- [ ] Redirected to `/dashboard` - see profile info
- [ ] Click "Edit Profile" - update details
- [ ] Try accessing `/dashboard` without logging in - redirected to `/login`
- [ ] Click "Create Account" button on home - redirected to `/signup`

---

## 6. Password Reset Flow

Users can reset password by:
1. Click "Forgot password?" link (you can add this to `/login`)
2. Enter email
3. Check email for reset link
4. Set new password

To add this link, update `app/login/page.tsx` with a password reset form.

---

## Troubleshooting

**"Supabase environment variables are missing"**
- Ensure `.env.local` exists with correct credentials
- Restart Next.js dev server

**"User not found"**
- Clear browser cookies and try again
- Check Supabase profiles table has the record

**Google OAuth not working**
- Verify redirect URI matches exactly in Google Cloud Console
- Check Google Client ID is set in Supabase

**Profile not created on signup**
- Check RLS policies are enabled
- Verify SQL migration ran successfully
