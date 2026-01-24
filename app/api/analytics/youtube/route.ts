import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

function getServiceRoleClient() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  if (!googleClientId || !googleClientSecret) return null;

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: googleClientId,
        client_secret: googleClientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.access_token;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

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

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check subscription tier
    const supabaseAdmin = getServiceRoleClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('subscription_tier')
      .eq('user_id', user.id)
      .maybeSingle();

    const isPaid = profile?.subscription_tier && profile.subscription_tier !== 'free';

    // Fetch channel
    const { data: channel } = await supabaseAdmin
      .from('youtube_channels')
      .select('channel_id, access_token, refresh_token, subscribers, views, video_count, title')
      .eq('user_id', user.id)
      .maybeSingle();

    // Free users get placeholder data
    if (!isPaid) {
      return NextResponse.json({
        success: true,
        isPaid: false,
        placeholder: true,
        data: {
          subscribers: 0,
          views: 0,
          video_count: 0,
          avg_view_duration: '0:00',
          ctr: '0%',
          best_posting_times: ['9:00 AM', '6:00 PM', '8:00 PM'],
        },
      });
    }

    // Paid users without channel get placeholder
    if (!channel) {
      return NextResponse.json({
        success: true,
        isPaid: true,
        hasChannel: false,
        placeholder: true,
        data: {
          subscribers: 0,
          views: 0,
          video_count: 0,
          avg_view_duration: '0:00',
          ctr: '0%',
          best_posting_times: ['9:00 AM', '6:00 PM', '8:00 PM'],
        },
      });
    }

    // Get fresh access token
    let accessToken = channel.access_token;
    if (channel.refresh_token) {
      const refreshed = await refreshAccessToken(channel.refresh_token);
      if (refreshed) {
        accessToken = refreshed;
        // Update token in DB (async, don't wait)
        supabaseAdmin
          .from('youtube_channels')
          .update({ access_token: refreshed })
          .eq('user_id', user.id)
          .then(() => {});
      }
    }

    if (!accessToken) {
      return NextResponse.json({
        success: true,
        isPaid: true,
        hasChannel: true,
        error: 'token_expired',
        data: {
          subscribers: channel.subscribers || 0,
          views: channel.views || 0,
          video_count: channel.video_count || 0,
          avg_view_duration: '0:00',
          ctr: '0%',
          best_posting_times: ['9:00 AM', '6:00 PM', '8:00 PM'],
        },
      });
    }

    // Fetch latest channel stats
    try {
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channel.channel_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (channelResponse.ok) {
        const channelData = await channelResponse.json();
        const stats = channelData.items?.[0]?.statistics;

        if (stats) {
          // Update DB (async)
          supabaseAdmin
            .from('youtube_channels')
            .update({
              subscribers: parseInt(stats.subscriberCount || '0'),
              views: parseInt(stats.viewCount || '0'),
              video_count: parseInt(stats.videoCount || '0'),
            })
            .eq('user_id', user.id)
            .then(() => {});

          return NextResponse.json({
            success: true,
            isPaid: true,
            hasChannel: true,
            data: {
              subscribers: parseInt(stats.subscriberCount || '0'),
              views: parseInt(stats.viewCount || '0'),
              video_count: parseInt(stats.videoCount || '0'),
              avg_view_duration: '2:30', // Placeholder - YouTube Analytics API requires different scope
              ctr: '4.2%', // Placeholder - requires Analytics API
              best_posting_times: ['9:00 AM', '6:00 PM', '8:00 PM'], // Rule-based
            },
          });
        }
      }
    } catch (error) {
      console.error('YouTube API error:', error);
    }

    // Fallback to stored data
    return NextResponse.json({
      success: true,
      isPaid: true,
      hasChannel: true,
      data: {
        subscribers: channel.subscribers || 0,
        views: channel.views || 0,
        video_count: channel.video_count || 0,
        avg_view_duration: '2:30',
        ctr: '4.2%',
        best_posting_times: ['9:00 AM', '6:00 PM', '8:00 PM'],
      },
    });
  } catch (error: any) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
