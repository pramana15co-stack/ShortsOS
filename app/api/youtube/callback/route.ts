import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

function getServiceRoleClient() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(`${baseUrl}/analytics?error=${encodeURIComponent(error)}`);
    }

    if (!code || !state) {
      return NextResponse.redirect(`${baseUrl}/analytics?error=missing_params`);
    }

    // Decode state to get userId
    let userId: string;
    try {
      const decodedState = JSON.parse(Buffer.from(state, 'base64').toString());
      userId = decodedState.userId;
    } catch {
      return NextResponse.redirect(`${baseUrl}/analytics?error=invalid_state`);
    }

    // Verify user session
    const cookieStore = await cookies();
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
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
      return NextResponse.redirect(`${baseUrl}/analytics?error=unauthorized`);
    }

    if (!googleClientId || !googleClientSecret) {
      return NextResponse.redirect(`${baseUrl}/analytics?error=oauth_not_configured`);
    }

    // Exchange code for tokens
    const redirectUri = `${baseUrl}/api/youtube/callback`;
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
      return NextResponse.redirect(`${baseUrl}/analytics?error=token_exchange_failed`);
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
      return NextResponse.redirect(`${baseUrl}/analytics?error=channel_fetch_failed`);
    }

    const channelData = await channelResponse.json();
    const channel = channelData.items?.[0];

    if (!channel) {
      return NextResponse.redirect(`${baseUrl}/analytics?error=no_channel_found`);
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
      return NextResponse.redirect(`${baseUrl}/analytics?error=db_error`);
    }

    // Check if channel already exists
    const { data: existing } = await supabaseAdmin
      .from('youtube_channels')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

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
        return NextResponse.redirect(`${baseUrl}/analytics?error=update_failed`);
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
        return NextResponse.redirect(`${baseUrl}/analytics?error=insert_failed`);
      }
    }

    return NextResponse.redirect(`${baseUrl}/analytics?linked=success`);
  } catch (error: any) {
    console.error('Callback error:', error);
    return NextResponse.redirect(`${baseUrl}/analytics?error=callback_error`);
  }
}
