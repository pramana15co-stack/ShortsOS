import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
// baseUrl removed - using request.nextUrl.origin instead for reliability

function getServiceRoleClient() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function GET(request: NextRequest) {
  try {
    // Get base URL from request (more reliable than env var)
    const origin = request.nextUrl.origin;
    
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(`${origin}/analytics?error=${encodeURIComponent(error)}`);
    }

    if (!code || !state) {
      return NextResponse.redirect(`${origin}/analytics?error=missing_params`);
    }

    // Decode state to get userId
    let userId: string;
    try {
      const decodedState = JSON.parse(Buffer.from(state, 'base64').toString());
      userId = decodedState.userId;
    } catch {
      return NextResponse.redirect(`${origin}/analytics?error=invalid_state`);
    }

    // Verify user session
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.redirect(`${origin}/analytics?error=server_config_error`);
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      supabaseUrl as string,
      supabaseAnonKey as string,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              // Optional: handle cookie updates
            } catch {}
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user || user.id !== userId) {
      return NextResponse.redirect(`${origin}/analytics?error=unauthorized`);
    }

    if (!googleClientId || !googleClientSecret) {
      return NextResponse.redirect(`${origin}/analytics?error=oauth_not_configured`);
    }

    // Exchange code for tokens
    const redirectUri = `${origin}/api/youtube/callback`;
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Token exchange error:', errorData);
      return NextResponse.redirect(`${origin}/analytics?error=token_exchange_failed`);
    }

    const tokens = await tokenResponse.json();
    const { access_token, refresh_token } = tokens;

    // Fetch channel info
    const channelResponse = await fetch(
      'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!channelResponse.ok) {
      console.error('Channel fetch error:', await channelResponse.text());
      return NextResponse.redirect(`${origin}/analytics?error=channel_fetch_failed`);
    }

    const channelData = await channelResponse.json();
    const channel = channelData.items?.[0];

    if (!channel) {
      return NextResponse.redirect(`${origin}/analytics?error=no_channel_found`);
    }

    const channelInfo = {
      channel_id: channel.id,
      title: channel.snippet?.title || 'Unknown Channel',
      subscribers: parseInt(channel.statistics?.subscriberCount || '0'),
      views: parseInt(channel.statistics?.viewCount || '0'),
      video_count: parseInt(channel.statistics?.videoCount || '0'),
    };

    // Save to database
    const supabaseAdmin = getServiceRoleClient();
    if (!supabaseAdmin) {
      return NextResponse.redirect(`${origin}/analytics?error=db_error`);
    }

    // Check if channel already exists
    const { data: existing, error: checkError } = await supabaseAdmin
      .from('youtube_channels')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (checkError) {
      console.error('Check existing channel error:', checkError);
      // If table doesn't exist, provide helpful error
      if (checkError.code === '42P01' || checkError.message?.includes('does not exist')) {
        return NextResponse.redirect(`${origin}/analytics?error=table_not_found&message=${encodeURIComponent('Please run the database migration in Supabase SQL Editor')}`);
      }
      return NextResponse.redirect(`${origin}/analytics?error=check_failed&message=${encodeURIComponent(checkError.message || 'Unknown error')}`);
    }

    if (existing) {
      // Update existing
      const { error: updateError } = await supabaseAdmin
        .from('youtube_channels')
        .update({
          ...channelInfo,
          access_token,
          refresh_token,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      if (updateError) {
        console.error('Update error:', updateError);
        const errorMessage = updateError.message || JSON.stringify(updateError);
        return NextResponse.redirect(`${origin}/analytics?error=update_failed&message=${encodeURIComponent(errorMessage)}`);
      }
    } else {
      // Insert new
      const { error: insertError } = await supabaseAdmin
        .from('youtube_channels')
        .insert({
          user_id: userId,
          ...channelInfo,
          access_token,
          refresh_token,
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        const errorMessage = insertError.message || JSON.stringify(insertError);
        // Check for specific error types
        if (insertError.code === '23505') { // Unique constraint violation
          // Try update instead
          const { error: updateError } = await supabaseAdmin
            .from('youtube_channels')
            .update({
              ...channelInfo,
              access_token,
              refresh_token,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId);
          
          if (updateError) {
            return NextResponse.redirect(`${origin}/analytics?error=insert_failed&message=${encodeURIComponent(updateError.message || 'Failed to update existing channel')}`);
          }
          // Update succeeded, continue
        } else if (insertError.code === '42P01' || insertError.message?.includes('does not exist')) {
          return NextResponse.redirect(`${origin}/analytics?error=table_not_found&message=${encodeURIComponent('Please run the database migration: supabase/migrations/create_youtube_channels.sql')}`);
        } else {
          return NextResponse.redirect(`${origin}/analytics?error=insert_failed&message=${encodeURIComponent(errorMessage)}`);
        }
      }
    }

    return NextResponse.redirect(`${origin}/analytics?linked=success`);
  } catch (error: any) {
    console.error('Callback error:', error);
    return NextResponse.redirect(`${origin}/analytics?error=callback_error`);
  }
}
