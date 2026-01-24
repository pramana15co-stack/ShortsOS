// Fallback generators for when AI is unavailable

export function generatePromptStudioData(data: any) {
    const { topic, style, tone, duration, platform } = data;
    
    const styleMap: Record<string, string> = {
      cinematic: 'cinematic, high production value, professional lighting',
      storytelling: 'narrative-driven, character-focused, emotional depth',
      motivation: 'energetic, inspiring, dynamic movement',
      explainer: 'clear, educational, well-lit, professional',
    };
  
    const toneMap: Record<string, string> = {
      dramatic: 'dramatic lighting, intense atmosphere, high contrast',
      calm: 'soft lighting, peaceful atmosphere, smooth transitions',
      energetic: 'fast-paced, vibrant colors, dynamic camera movement',
    };
  
    const durationMap: Record<string, string> = {
      '10s': '10 seconds, fast-paced, quick cuts',
      '20s': '20 seconds, balanced pacing, 3-4 key moments',
      '30s': '30 seconds, detailed storytelling, 4-5 scenes',
    };
  
    const platformMap: Record<string, string> = {
      'youtube-shorts': 'vertical 9:16 format, optimized for mobile viewing',
      'instagram-reels': 'vertical 9:16 format, Instagram-optimized',
    };
  
    const mainPrompt = `Create a ${style} style video about "${topic}" in ${tone} tone. ${styleMap[style] || ''}. ${toneMap[tone] || ''}. ${durationMap[duration] || ''}. ${platformMap[platform] || ''}. High quality, professional production.`;
  
    // Simple scene generation logic
    const sceneCount = duration === '10s' ? 2 : duration === '20s' ? 3 : 4;
    const scenes = Array(sceneCount).fill(0).map((_, i) => `Scene ${i + 1}: detailed shot for ${topic} in ${style} style.`);
    
    const hook = `Hook (0-2s): Compelling visual for ${topic} with ${tone} atmosphere.`;
    const pacing = [`0-2s: Hook`, `2-${parseInt(duration)/2}s: Body`, `${parseInt(duration)/2}-${duration}: Conclusion`];
  
    return { mainPrompt, scenes, hook, pacing };
  }
  
  export function generateHookCaptionData(data: any) {
    const { topic, platform } = data;
    const hooks = [
      `The truth about ${topic}...`,
      `Stop doing ${topic} wrong!`,
      `How to master ${topic} in 3 steps`,
    ];
    
    const caption = `${topic} explained! Follow for more tips. #${topic.replace(/\s/g, '')} #Shorts`;
    
    return {
      hooks,
      caption,
      emphasis: [topic, 'master', 'tips'],
      timing: ['0-2s: Hook', '2-5s: Value', '5-10s: CTA'],
      cta: ['Subscribe for more', 'Save this video']
    };
  }
  
  export function generateContentIdeasData(data: any) {
    const { topic, category } = data;
    const ideas = Array(5).fill(0).map((_, i) => ({
      title: `${category} idea for ${topic} #${i+1}`,
      description: `A video about ${topic} focusing on ${category} aspects.`,
      category: category,
      tags: [topic, category.toLowerCase(), 'viral']
    }));
    return { ideas };
  }
