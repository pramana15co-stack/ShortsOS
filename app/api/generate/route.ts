import { NextRequest, NextResponse } from 'next/server';
import { generateAIContent } from '@/lib/ai-service';
import { createClient } from '@supabase/supabase-js';
import { FEATURE_CREDITS, FeatureName } from '@/lib/credits';
import { generateScript } from '@/lib/scriptTemplates';
import { generatePromptStudioData, generateHookCaptionData, generateContentIdeasData } from '@/lib/generators';

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
      // If we can't check credits, we shouldn't proceed in a paid app, 
      // but to avoid blocking the user if config is broken, we might allow it or fail.
      // Failing safely:
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { data: fetchedProfile } = await supabase
      .from('profiles')
      .select('credits, subscription_status, plan_expiry, is_admin')
      .eq('user_id', userId)
      .maybeSingle();

    let profile: any = fetchedProfile;

    if (!profile) {
      console.log(`⚠️ [GENERATE] Profile missing for user ${userId}, creating default profile...`);
      // Auto-create profile if missing (Lazy Provisioning)
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          user_id: userId,
          credits: 500, // Default for new/recovered profiles
          subscription_tier: 'free',
          subscription_status: 'inactive',
          updated_at: new Date().toISOString()
        })
        .select('credits, subscription_status, plan_expiry, is_admin')
        .single();
      
      if (createError || !newProfile) {
        console.error('❌ [GENERATE] Failed to auto-create profile:', createError);
        // Fallback to dummy profile to allow generation to proceed
        console.warn('⚠️ [GENERATE] Using dummy profile to bypass hindrance');
        profile = {
          credits: 999999, // Allow generation
          subscription_status: 'free',
          plan_expiry: null,
          is_admin: false,
          dummy: true
        };
      } else {
        profile = newProfile;
      }
    }

    const isPaid = profile.subscription_status === 'active' && 
                   profile.plan_expiry && 
                   new Date(profile.plan_expiry) > new Date();
    
    // Skip credit check for paid/admin/dummy, otherwise check balance
    if (!profile.dummy && !profile.is_admin && !isPaid) {
      const cost = FEATURE_CREDITS[feature as FeatureName] || 0;
      if ((profile.credits || 0) < cost) {
        return NextResponse.json({ error: 'Insufficient credits' }, { status: 403 });
      }
    }

    // 2. Generate Content via OpenAI (or Fallback)
    let aiResult: string | null = null;
    let fallbackData: any = null;

    // Define prompts based on feature
    let systemPrompt = '';
    let userPrompt = '';

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
        systemPrompt = `You are a social media expert. Generate viral hooks and captions. Output JSON with keys: "hooks" (array of 3), "caption", "hashtags" (array), "emphasis" (array), "timing" (array), "cta" (array).`;
        userPrompt = `Topic: ${data.topic}. Platform: ${data.platform}.`;
        break;

      case 'content-ideas':
        systemPrompt = `You are a content strategist. Generate viral video ideas. Output JSON with key "ideas" containing an array of objects with "title", "description", "category", "tags".`;
        userPrompt = `Niche/Topic: ${data.topic}. Category: ${data.category}. Generate 5 ideas.`;
        break;

      default:
        return NextResponse.json({ error: 'Invalid feature' }, { status: 400 });
    }

    // Try AI Generation
    try {
      aiResult = await generateAIContent({
        systemPrompt,
        userPrompt,
        model: 'gpt-4o-mini',
        temperature: 0.8,
      });
    } catch (e) {
      console.warn('AI Generation failed, using fallback');
    }

    // Prepare Response Data
    let finalData;

    if (aiResult) {
      try {
        finalData = JSON.parse(aiResult);
      } catch (e) {
        console.error('Failed to parse AI JSON', e);
        aiResult = null; // Trigger fallback
      }
    }

    // Fallback Logic
    if (!aiResult) {
      console.log(`Using fallback generator for ${feature}`);
      switch (feature) {
        case 'prompt-studio':
          finalData = generatePromptStudioData(data);
          break;
        case 'scripts':
          finalData = generateScript(data); // Uses existing template logic
          break;
        case 'hook-caption':
          finalData = generateHookCaptionData(data);
          break;
        case 'content-ideas':
          finalData = generateContentIdeasData(data);
          break;
      }
    }

    // 3. Deduct Credits (only if user is not free/admin and not dummy)
    // Note: We deduct credits even for fallback content as it provides value
    let newCredits = profile.credits;
    if (!profile.dummy && !profile.is_admin && !isPaid) {
      const cost = FEATURE_CREDITS[feature as FeatureName] || 0;
      newCredits = (profile.credits || 0) - cost;
      
      await supabase.from('profiles').update({ credits: newCredits }).eq('user_id', userId);
      await supabase.from('credits_transactions').insert({
        user_id: userId,
        feature,
        credits_used: cost,
        credits_remaining: newCredits
      });
    }

    return NextResponse.json({ 
      success: true, 
      data: finalData, 
      creditsRemaining: newCredits,
      usedFallback: !aiResult 
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

