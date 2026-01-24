import { NextRequest, NextResponse } from 'next/server';
import { generateAIContent } from '@/lib/ai-service';
import { createClient } from '@supabase/supabase-js';
import { FEATURE_CREDITS, FeatureName } from '@/lib/credits';

// Service role client for credit deduction
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getServiceRoleClient() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, feature, data } = body;

    if (!userId || !feature || !data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Verify Credits (Backend Enforcement)
    const supabase = getServiceRoleClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('credits, subscription_status, plan_expiry, is_admin')
      .eq('user_id', userId)
      .maybeSingle();

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const isPaid = profile.subscription_status === 'active' && 
                   profile.plan_expiry && 
                   new Date(profile.plan_expiry) > new Date();
    
    // Skip credit check for paid/admin, otherwise check balance
    if (!profile.is_admin && !isPaid) {
      const cost = FEATURE_CREDITS[feature as FeatureName] || 0;
      if ((profile.credits || 0) < cost) {
        return NextResponse.json({ error: 'Insufficient credits' }, { status: 403 });
      }
    }

    // 2. Generate Content via OpenAI
    let systemPrompt = '';
    let userPrompt = '';

    // Define prompts based on feature
    switch (feature) {
      case 'prompt-studio':
        systemPrompt = `You are an expert AI Video Prompt Engineer. Create a detailed, professional prompt for AI video generators like Sora or Runway. Output JSON format with keys: "mainPrompt", "scenes" (array), "hook", "pacing" (array).`;
        userPrompt = `Topic: ${data.topic}. Style: ${data.style}. Tone: ${data.tone}. Duration: ${data.duration}. Platform: ${data.platform}.`;
        break;
      
      case 'scripts':
        systemPrompt = `You are a viral YouTube Shorts scriptwriter. Write a script that hooks viewers instantly. Output JSON format with keys: "hook", "body", "cta", "fullScript", "estimatedSeconds" (number).`;
        userPrompt = `Topic: ${data.topic}. Format: ${data.formatSlug}. Make it engaging and fast-paced.`;
        break;

      case 'hook-caption':
        systemPrompt = `You are a social media expert. Generate viral hooks and captions. Output JSON with keys: "hooks" (array of 3), "caption", "hashtags" (array).`;
        userPrompt = `Topic: ${data.topic}. Platform: ${data.platform}.`;
        break;

      case 'content-ideas':
        systemPrompt = `You are a content strategist. Generate viral video ideas. Output JSON with key "ideas" containing an array of objects with "title", "description", "category", "tags".`;
        userPrompt = `Niche/Topic: ${data.topic}. Category: ${data.category}. Generate 5 ideas.`;
        break;

      default:
        return NextResponse.json({ error: 'Invalid feature' }, { status: 400 });
    }

    // Call AI Service
    const aiResult = await generateAIContent({
      systemPrompt,
      userPrompt,
      model: 'gpt-4o-mini', // Fast & efficient
      temperature: 0.8,
    });

    // Fallback to templates if AI fails (e.g. no key)
    if (!aiResult) {
      return NextResponse.json({ 
        success: false, 
        fallback: true, 
        message: 'AI service unavailable, using templates' 
      });
    }

    // 3. Deduct Credits (only if AI generation worked and user is not free/admin)
    if (!profile.is_admin && !isPaid) {
      const cost = FEATURE_CREDITS[feature as FeatureName] || 0;
      const newCredits = (profile.credits || 0) - cost;
      
      await supabase.from('profiles').update({ credits: newCredits }).eq('user_id', userId);
      await supabase.from('credits_transactions').insert({
        user_id: userId,
        feature,
        credits_used: cost,
        credits_remaining: newCredits
      });
      
      return NextResponse.json({ 
        success: true, 
        data: JSON.parse(aiResult), 
        creditsRemaining: newCredits 
      });
    }

    return NextResponse.json({ 
      success: true, 
      data: JSON.parse(aiResult), 
      creditsRemaining: profile.credits // No deduction
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
