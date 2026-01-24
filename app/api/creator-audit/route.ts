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

    // Fetch additional video statistics if channel is linked
    let videoStats: any = null;
    if (channelData && channel) {
      try {
        let accessToken = channel.access_token;
        if (channel.refresh_token) {
          const refreshed = await refreshAccessToken(channel.refresh_token);
          if (refreshed) accessToken = refreshed;
        }

        if (accessToken && channelData.recentVideos.length > 0) {
          // Get video IDs from recent videos
          const videoIds = channelData.recentVideos
            .slice(0, 5)
            .map((v: any) => {
              // Extract video ID from title or fetch from search results
              return null; // We'll use a different approach
            })
            .filter(Boolean);

          // Try to get video statistics
          const statsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channel.channel_id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (statsResponse.ok) {
            const statsData = await statsResponse.json();
            const stats = statsData.items?.[0]?.statistics;
            if (stats) {
              videoStats = {
                totalViews: parseInt(stats.viewCount || '0'),
                subscriberCount: parseInt(stats.subscriberCount || '0'),
                videoCount: parseInt(stats.videoCount || '0'),
                avgViewsPerVideo: Math.round(parseInt(stats.viewCount || '0') / Math.max(parseInt(stats.videoCount || '1'), 1)),
              };
            }
          }
        }
      } catch (error) {
        console.error('Error fetching video stats:', error);
      }
    }

    // Generate comprehensive AI audit for paid users
    let aiAudit = null;
    try {
      const systemPrompt = `You are an elite YouTube Creator Intelligence Analyst with 10+ years of experience analyzing successful channels. Your audits are used by top creators and agencies. 

Generate a COMPREHENSIVE, PROFESSIONAL audit that provides:
1. Detailed creator stage analysis with specific metrics and benchmarks
2. Actionable content gaps with priority levels
3. Strategic content recommendations with specific video ideas
4. Monetization roadmap with clear milestones
5. Algorithm optimization tactics based on current YouTube trends
6. Platform-specific strategies with tactical advice
7. Growth projections and next steps

Output MUST be valid JSON with this exact structure:
{
  "creator_stage": {
    "stage": "string (e.g., 'Micro-Influencer', 'Growing Creator', 'Established Creator')",
    "description": "Detailed 2-3 sentence explanation of their current stage",
    "subscriber_range": "string (e.g., '1K-10K', '10K-100K')",
    "next_milestone": "string (specific next goal)",
    "time_to_next": "string (realistic timeline)"
  },
  "content_analysis": {
    "strengths": ["array of 3-5 specific strengths"],
    "weaknesses": ["array of 3-5 specific weaknesses"],
    "content_gaps": ["array of 5-7 prioritized gaps with explanations"],
    "niche_positioning": "string (where they stand in their niche)"
  },
  "content_recommendations": {
    "what_to_post_next": [
      {
        "title": "string (specific video idea)",
        "reason": "string (why this will work)",
        "priority": "string (High/Medium/Low)"
      }
    ],
    "trending_opportunities": ["array of 3-5 trending topics in their niche"],
    "evergreen_content": ["array of 3-5 evergreen ideas"]
  },
  "what_to_avoid": [
    {
      "mistake": "string (specific mistake)",
      "impact": "string (why it's harmful)",
      "alternative": "string (what to do instead)"
    }
  ],
  "monetization_roadmap": {
    "current_readiness": "string (percentage and explanation)",
    "requirements_met": ["array of requirements they've met"],
    "requirements_missing": ["array of requirements they need"],
    "next_steps": ["array of 3-5 specific monetization steps"],
    "potential_revenue": "string (realistic estimate based on their metrics)"
  },
  "algorithm_optimization": {
    "retention_strategies": ["array of 5-7 specific retention tactics"],
    "ctr_improvements": ["array of 3-5 CTR optimization tips"],
    "engagement_tactics": ["array of 3-5 engagement boosters"],
    "posting_schedule": "string (optimal posting frequency and times)"
  },
  "platform_strategy": {
    "youtube": {
      "primary_focus": "string (main strategy)",
      "shorts_strategy": "string (how to use Shorts)",
      "long_form_strategy": "string (long-form approach)",
      "community_tab": "string (community engagement)"
    },
    "instagram": {
      "reels_strategy": "string (Reels approach)",
      "cross_promotion": "string (how to drive traffic)",
      "stories_tactics": "string (Stories usage)"
    },
    "tiktok": {
      "strategy": "string (TikTok approach if relevant)"
    }
  },
  "growth_projections": {
    "current_trajectory": "string (where they're heading)",
    "optimized_trajectory": "string (where they could be)",
    "key_levers": ["array of 3-5 growth levers to pull"],
    "timeline_to_10k": "string (realistic timeline)",
    "timeline_to_100k": "string (realistic timeline)"
  },
  "action_plan": {
    "immediate_actions": ["array of 3-5 things to do this week"],
    "30_day_plan": ["array of 3-5 monthly goals"],
    "90_day_vision": "string (where they should be in 90 days)"
  }
}

Be SPECIFIC, ACTIONABLE, and DATA-DRIVEN. Use their actual metrics to inform recommendations.`;

      const userPrompt = channelData
        ? `Analyze this YouTube channel in detail:

CHANNEL DATA:
- Channel Name: ${channelData.channelTitle}
- Subscribers: ${channelData.subscribers.toLocaleString()}
${videoStats ? `- Total Views: ${videoStats.totalViews.toLocaleString()}\n- Total Videos: ${videoStats.videoCount}\n- Avg Views/Video: ${videoStats.avgViewsPerVideo.toLocaleString()}` : ''}
- Recent Video Titles:
${channelData.recentVideos.slice(0, 10).map((v: any, i: number) => `${i + 1}. ${v.title}`).join('\n')}

Provide a COMPREHENSIVE, PROFESSIONAL audit with:
- Specific, actionable recommendations based on their actual content
- Realistic growth projections based on their current metrics
- Monetization strategy tailored to their subscriber count
- Content gaps specific to their recent uploads
- Algorithm tactics for their niche and audience size

Be DETAILED and PROFESSIONAL. This is for a paying customer who expects premium insights.`
        : `Provide a comprehensive creator audit for a growing YouTube channel. The creator is serious about growth and monetization. Give detailed, professional recommendations that feel premium and actionable. Include specific strategies, timelines, and next steps.`;

      aiAudit = await generateAIContent({
        systemPrompt,
        userPrompt,
        model: 'gpt-4o-mini',
        temperature: 0.7, // Lower for more consistent, professional output
      });

      if (aiAudit) {
        try {
          // Clean up the response - remove markdown code blocks if present
          let cleanedAudit = aiAudit.trim();
          if (cleanedAudit.startsWith('```json')) {
            cleanedAudit = cleanedAudit.replace(/```json\n?/g, '').replace(/```\n?/g, '');
          } else if (cleanedAudit.startsWith('```')) {
            cleanedAudit = cleanedAudit.replace(/```\n?/g, '');
          }
          
          aiAudit = JSON.parse(cleanedAudit);
          
          // Validate structure
          if (!aiAudit.creator_stage || typeof aiAudit.creator_stage !== 'object') {
            console.warn('Invalid audit structure, using fallback');
            aiAudit = null;
          }
        } catch (parseError) {
          console.error('Failed to parse AI audit JSON:', parseError);
          console.error('Raw AI response:', aiAudit);
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
