import { supabase } from '@/lib/supabaseClient'

export interface SavedScript {
  id: string
  topic: string
  format_slug: string
  format_name: string
  hook: string
  body: string
  cta: string
  full_script: string
  estimated_seconds: number
  created_at: string
}

export async function getSavedScripts(
  userId: string
): Promise<{ success: boolean; data: SavedScript[]; error?: string }> {
  if (!supabase) {
    return { success: false, data: [], error: 'Supabase is not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('saved_scripts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return { success: false, data: [], error: error.message }
    }

    return { success: true, data: (data || []) as SavedScript[] }
  } catch (err) {
    return {
      success: false,
      data: [],
      error: err instanceof Error ? err.message : 'An unexpected error occurred',
    }
  }
}

export async function deleteSavedScript(
  scriptId: string
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured' }
  }

  try {
    const { error } = await supabase
      .from('saved_scripts')
      .delete()
      .eq('id', scriptId)

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

