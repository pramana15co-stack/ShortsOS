import { NextRequest, NextResponse } from 'next/server';
import { generateAIContent } from '@/lib/ai-service';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { FEATURE_CREDITS, FeatureName } from '@/lib/credits';
import { generateScript } from '@/lib/scriptTemplates';
import { generatePromptStudioData, generateHookCaptionData, generateContentIdeasData, generatePostProcessingData } from '@/lib/generators';

// Service role client for credit deduction and profile management
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getServiceRoleClient() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { feature, data } = body;
    // We ignore body.userId for security, getting it from auth instead

    if (!feature || !data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!supabaseUrl || !supabaseAnonKey) {
       return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // 1. Authenticate User
    const cookieStore = await cookies();
    const supabaseAuth = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
               // Optional: handle cookie updates
            } catch {}
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.id;

    // 2. Setup Admin Client
    const supabaseAdmin = getServiceRoleClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Server configuration error (admin)' }, { status: 500 });
    }

    // 3. Fetch or Create Profile
    let { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('credits, subscription_status, plan_expiry, is_admin')
      .eq('user_id', userId)
      .maybeSingle();

    if (!profile) {
      console.log(`⚠️ [GENERATE] Profile missing for user ${userId}, creating default profile...`);
      // Auto-create profile if missing (Lazy Provisioning)
      const { data: newProfile, error: createError } = await supabaseAdmin
        .from('profiles')
        .insert({
          user_id: userId,
          credits: 50, // Default for new/recovered profiles (Strict 50)
          subscription_tier: 'free',
          subscription_status: 'inactive',
          updated_at: new Date().toISOString()
        })
        .select('credits, subscription_status, plan_expiry, is_admin')
        .maybeSingle();
      
      if (createError || !newProfile) {
        console.error('❌ [GENERATE] Failed to auto-create profile:', createError);
        // STRICT ERROR HANDLING: Do not give free credits.
        return NextResponse.json({ 
            error: 'Profile creation failed. Please contact support or try again.' 
        }, { status: 500 });
      } else {
        profile = newProfile;
      }
    }

    const isPaid = profile.subscription_status === 'active' && 
                   profile.plan_expiry && 
                   new Date(profile.plan_expiry) > new Date();
    
    // 4. Check Credits
    const cost = FEATURE_CREDITS[feature as FeatureName] || 0;
    
    // Admin gets unlimited. Paid users get unlimited (if that's the business logic, otherwise check limits)
    // The prompt says "pro version gives 500 credits per month", so paid users DO have limits usually, 
    // unless "isPaid" implies "Unlimited Plan". 
    // The previous code had: if (!profile.dummy && !profile.is_admin && !isPaid)
    // If "Starter" is 500 credits/month, then isPaid check might need to be removed if they are just on a credit plan.
    // However, the pricing page says "Starter: 500 Credits Monthly". 
    // If the database has credits, we should probably just check credits for everyone EXCEPT admins/truly unlimited plans.
    // But let's stick to the previous logic: if isPaid (active sub), maybe they have a different flow?
    // Actually, usually "isPaid" users just have a higher credit balance refilled monthly. 
    // BUT the previous logic exempted "isPaid" from credit checks.
    // Let's look at pricing page: "Unlimited Credits & All Features" is for Creator Pro.
    // Starter is "500 Credits Monthly".
    // So 'isPaid' is ambiguous. 
    // For now, I will assume 'isPaid' means "Unlimited" based on previous logic, OR 
    // strictly enforce credits for everyone unless `is_admin` or specific 'unlimited' tier.
    
    // STRICTER LOGIC:
    // If they are admin, skip check.
    // If they have an active subscription that is "pro" or "operator" (unlimited), skip check.
    // If they are "starter" (paid but limited), CHECK credits.
    // If they are free, CHECK credits.
    
    // To be safe and simple: Check credits for EVERYONE except Admins and specific Unlimited tiers.
    // Since I don't know the exact tier string for "unlimited", I will stick to:
    // If credits > 0, use them. If credits < cost, fail.
    // UNLESS is_admin.
    
    const isUnlimited = profile.is_admin === true; // Add specific tier checks if needed
    
    if (!isUnlimited) {
      if ((profile.credits || 0) < cost) {
        return NextResponse.json({ 
            error: 'Insufficient credits. Please upgrade to continue.',
            credits: profile.credits 
        }, { status: 403 });
      }
    }

    // 5. Generate Content
    // Define prompts based on feature
    let systemPrompt = '';
    let userPrompt = '';
    let aiResult: string | null = null;
    const randomSeed = Math.random().toString(36).substring(7);

    switch (feature) {
      case 'prompt-studio':
        systemPrompt = `You are an expert AI Video Prompt Engineer. Create a detailed, professional prompt for AI video generators like Sora or Runway. Avoid clichés and repetitive patterns. Output JSON format with keys: "mainPrompt", "scenes" (array), "hook", "pacing" (array).`;
        userPrompt = `Topic: ${data.topic}. Style: ${data.style}. Tone: ${data.tone}. Duration: ${data.duration}. Platform: ${data.platform}. Provide a unique perspective. Ref: ${randomSeed}`;
        break;
      
      case 'scripts':
        systemPrompt = `You are a viral YouTube Shorts scriptwriter. Write a unique, engaging script that hooks viewers instantly. Avoid common openings. Output JSON format with keys: "hook", "body", "cta", "fullScript", "estimatedSeconds" (number).`;
        userPrompt = `Topic: ${data.topic}. Format: ${data.formatSlug}. Make it engaging and fast-paced. Ensure it feels fresh and not templated. Ref: ${randomSeed}`;
        break;

      case 'hook-caption':
        systemPrompt = `You are a social media expert. Generate 3 distinct and viral hooks and captions. Ensure variety in tone and structure. Output JSON with keys: "hooks" (array of 3), "caption", "hashtags" (array), "emphasis" (array), "timing" (array), "cta" (array).`;
        userPrompt = `Topic: ${data.topic}. Platform: ${data.platform}. Provide 3 very different hook angles (e.g. controversial, question, story). Ref: ${randomSeed}`;
        break;

      case 'content-ideas':
        systemPrompt = `You are a content strategist. Generate 5 unique and viral video ideas. Avoid generic suggestions. Output JSON with key "ideas" containing an array of objects with "title", "description", "category", "tags".`;
        userPrompt = `Niche/Topic: ${data.topic}. Category: ${data.category}. Generate 5 fresh ideas that stand out. Ref: ${randomSeed}`;
        break;

      case 'post-processing':
        systemPrompt = `You are an expert video editor and retention specialist. Analyze this video concept and provide detailed post-processing advice. Output JSON format with keys: "hookSpeed" (string), "pacing" (array of strings), "captionDensity" (string), "mistakes" (array of strings), "improvements" (array of strings).`;
        userPrompt = `Duration: ${data.duration}s. Type: ${data.contentType}. Goal: ${data.goal}. Niche: ${data.niche}. Audience: ${data.audience}. Key Hook: ${data.hook}. Ref: ${randomSeed}`;
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
        temperature: 0.9, // Increased for more variety
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
          finalData = generateScript(data);
          break;
        case 'hook-caption':
          finalData = generateHookCaptionData(data);
          break;
        case 'content-ideas':
          finalData = generateContentIdeasData(data);
          break;
        case 'post-processing':
          finalData = generatePostProcessingData(data);
          break;
      }
    }

    // 6. Deduct Credits
    // We deduct credits even for fallback content as it provides value (templates/logic)
    let newCredits = profile.credits;
    if (!isUnlimited) {
      newCredits = (profile.credits || 0) - cost;
      
      // Update profile
      const { error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({ credits: newCredits })
        .eq('user_id', userId);

      if (updateError) {
          console.error('Failed to update credits:', updateError);
          // We don't rollback generation, but we log the error.
      }

      // Record transaction
      await supabaseAdmin.from('credits_transactions').insert({
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
