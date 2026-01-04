import { supabase } from '@/lib/supabaseClient'

export interface ScriptData {
  topic: string
  format_slug: string
  format_name: string
  hook: string
  body: string
  cta: string
  full_script: string
  estimated_seconds: number
  user_id: string
}

export async function saveScript(
  script: ScriptData
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured' }
  }

  try {
    const { error } = await supabase.from('saved_scripts').insert({
      topic: script.topic,
      format_slug: script.format_slug,
      format_name: script.format_name,
      hook: script.hook,
      body: script.body,
      cta: script.cta,
      full_script: script.full_script,
      estimated_seconds: script.estimated_seconds,
      user_id: script.user_id,
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


