import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  // Handle errors from OAuth provider
  if (error) {
    const errorMessage = error_description || error;
    return NextResponse.redirect(
      new URL(`/signup?error=${encodeURIComponent(error)}&error_description=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }

  // Handle successful auth code
  if (code) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        console.error('Auth callback exchange error:', exchangeError);
        return NextResponse.redirect(
          new URL(`/signup?error=auth_failed&error_description=${encodeURIComponent(exchangeError.message)}`, request.url)
        );
      }

      if (!data.user) {
        return NextResponse.redirect(new URL('/signup?error=no_user', request.url));
      }

      // Check if profile exists, if not create it for OAuth users
      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create one for OAuth user
        const { error: insertError } = await supabase.from('profiles').insert({
          id: data.user.id,
          email: data.user.email!,
          first_name: data.user.user_metadata?.first_name || '',
          last_name: data.user.user_metadata?.last_name || '',
          phone_number: data.user.user_metadata?.phone_number || null,
        });

        if (insertError) {
          console.error('Profile creation error:', insertError);
          // Don't fail the entire auth, just log it
        }
      }

      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (err) {
      console.error('Unexpected error in auth callback:', err);
      return NextResponse.redirect(new URL('/signup?error=unexpected', request.url));
    }
  }

  // No code or error provided
  return NextResponse.redirect(new URL('/signup', request.url));
}
