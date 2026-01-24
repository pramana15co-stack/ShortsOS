import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { generateAIContent } from '@/lib/ai-service';
import { FEATURE_CREDITS, FeatureName } from '@/lib/credits';

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

function generateFreeAudit() {
  return {
    creator_stage: 'Growing Creator',
    content_gaps: [
      'Consider adding more variety in video formats',
      'Increase posting frequency to 3-5 times per week',
      'Focus on trending topics in your niche',
    ],
    what_to_post_next: [
      'Trending topic in your niche',
      'Behind-the-scenes content',
      'Q&A or FAQ video',
      'Collaboration with similar creators',
      'Tutorial or how-to video',
    ],
    what_to_avoid: [
      'Posting inconsistently',
      'Ignoring comments and engagement',
      'Using clickbait without delivering value',
      'Copying other creators without adding your unique perspective',
    ],
    monetization_readiness: 'You\'re on the right track! Focus on consistent content and growing your audience to unlock monetization opportunities.',
    platform_strategy: {
      youtube: 'Focus on YouTube Shorts for discovery, long-form for retention',
      instagram: 'Use Reels to drive traffic to your YouTube channel',
    },
  };
}

export async function POST(request: NextRequest) {
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

    const supabaseAdmin = getServiceRoleClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Check subscription tier
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('subscription_tier, credits, is_admin')
      .eq('user_id', user.id)
      .maybeSingle();

    const isPaid = profile?.subscription_tier && profile.subscription_tier !== 'free';
    const isUnlimited = profile?.is_admin === true;

    // FREE USERS: Return rule-based audit immediately
    if (!isPaid) {
      return NextResponse.json({
        success: true,
        isPaid: false,
        audit: generateFreeAudit(),
      });
    }

    // PAID USERS: Check credits
    const cost = FEATURE_CREDITS['creator-audit' as FeatureName] || 10;
    if (!isUnlimited && (profile?.credits || 0) < cost) {
      return NextResponse.json({
        error: 'Insufficient credits. Please upgrade to continue.',
        credits: profile?.credits || 0,
      }, { status: 403 });
    }

    // Fetch channel if linked
    const { data: channel } = await supabaseAdmin
      .from('youtube_channels')
      .select('channel_id, access_token, refresh_token, subscribers, title')
      .eq('user_id', user.id)
      .maybeSingle();

    let channelData: any = null;
    if (channel) {
      let accessToken = channel.access_token;
      if (channel.refresh_token) {
        const refreshed = await refreshAccessToken(channel.refresh_token);
        if (refreshed) {
          accessToken = refreshed;
          supabaseAdmin
            .from('youtube_channels')
            .update({ access_token: refreshed })
            .eq('user_id', user.id)
            .then(() => {});
        }
      }

      if (accessToken) {
        try {
          // Fetch last 10 videos
          const videosResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.channel_id}&maxResults=10&order=date&type=video`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (videosResponse.ok) {
            const videosData = await videosResponse.json();
            channelData = {
              channelTitle: channel.title,
              subscribers: channel.subscribers,
              recentVideos: videosData.items?.map((item: any) => ({
                title: item.snippet?.title,
                publishedAt: item.snippet?.publishedAt,
              })) || [],
            };
          }
        } catch (error) {
          console.error('YouTube API error:', error);
        }
      }
    }

    // Generate AI audit for paid users
    let aiAudit = null;
    try {
      const systemPrompt = `You are an expert YouTube Creator Intelligence Analyst. Analyze the provided channel data and generate a comprehensive, personalized audit. Output JSON format with keys: "creator_stage" (string), "content_gaps" (array of strings), "what_to_post_next" (array of 5-10 strings), "what_to_avoid" (array of strings), "monetization_readiness" (string), "algorithm_optimization" (array of strings), "platform_strategy" (object with "youtube" and "instagram" keys).`;

      const userPrompt = channelData
        ? `Channel: ${channelData.channelTitle}. Subscribers: ${channelData.subscribers}. Recent videos: ${JSON.stringify(channelData.recentVideos.map((v: any) => v.title))}. Provide personalized recommendations.`
        : `Provide general creator audit recommendations for a growing YouTube channel.`;

      aiAudit = await generateAIContent({
        systemPrompt,
        userPrompt,
        model: 'gpt-4o-mini',
        temperature: 0.8,
      });

      if (aiAudit) {
        try {
          aiAudit = JSON.parse(aiAudit);
        } catch {
          aiAudit = null;
        }
      }
    } catch (error) {
      console.error('AI generation error:', error);
      // Fallback to rule-based
    }

    // Deduct credits
    if (!isUnlimited) {
      const newCredits = (profile?.credits || 0) - cost;
      await supabaseAdmin
        .from('profiles')
        .update({ credits: newCredits })
        .eq('user_id', user.id);

      await supabaseAdmin.from('credits_transactions').insert({
        user_id: user.id,
        feature: 'creator-audit',
        credits_used: cost,
        credits_remaining: newCredits,
      });
    }

    // Return AI audit or fallback
    return NextResponse.json({
      success: true,
      isPaid: true,
      audit: aiAudit || generateFreeAudit(),
      creditsRemaining: isUnlimited ? profile?.credits : (profile?.credits || 0) - cost,
    });
  } catch (error: any) {
    console.error('Creator Audit error:', error);
    // Always return fallback for free users
    return NextResponse.json({
      success: true,
      isPaid: false,
      audit: generateFreeAudit(),
    });
  }
}
