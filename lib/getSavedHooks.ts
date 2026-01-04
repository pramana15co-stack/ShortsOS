import { supabase } from '@/lib/supabaseClient'

export interface SavedHook {
  id: string
  topic: string
  emotion: string
  audience_level: string
  hook_text: string
  estimated_seconds: number
  created_at: string
}

export async function getSavedHooks(
  userId: string
): Promise<{ success: boolean; data: SavedHook[]; error?: string }> {
  if (!supabase) {
    return { success: false, data: [], error: 'Supabase is not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('saved_hooks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return { success: false, data: [], error: error.message }
    }

    return { success: true, data: (data || []) as SavedHook[] }
  } catch (err) {
    return {
      success: false,
      data: [],
      error: err instanceof Error ? err.message : 'An unexpected error occurred',
    }
  }
}

export async function deleteSavedHook(
  hookId: string
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured' }
  }

  try {
    const { error } = await supabase
      .from('saved_hooks')
      .delete()
      .eq('id', hookId)

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


