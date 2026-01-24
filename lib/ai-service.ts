import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

let openai: OpenAI | null = null;

if (apiKey) {
  openai = new OpenAI({
    apiKey: apiKey,
  });
}

export interface AIRequest {
  systemPrompt: string;
  userPrompt: string;
  model?: string;
  temperature?: number;
}

export async function generateAIContent(request: AIRequest): Promise<string | null> {
  if (!openai) {
    console.warn('⚠️ [AI] OpenAI API key missing. Returning null (fallback to templates).');
    return null;
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: request.systemPrompt },
        { role: 'user', content: request.userPrompt },
      ],
      model: request.model || 'gpt-4o-mini', // Default to fast/cheap model
      temperature: request.temperature || 0.7,
    });

    return completion.choices[0]?.message?.content || null;
  } catch (error) {
    console.error('❌ [AI] Generation error:', error);
    return null;
  }
}
