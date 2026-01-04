import { supabase } from '@/lib/supabaseClient'

export interface HookData {
  topic: string
  emotion: string
  audience_level: string
  hook_text: string
  estimated_seconds: number
  user_id: string
}

export async function saveHook(
  hook: HookData
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured' }
  }

  try {
    const { error } = await supabase.from('saved_hooks').insert({
      topic: hook.topic,
      emotion: hook.emotion,
      audience_level: hook.audience_level,
      hook_text: hook.hook_text,
      estimated_seconds: hook.estimated_seconds,
      user_id: hook.user_id,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'An unexpected error occurred',
    }
  }
}


