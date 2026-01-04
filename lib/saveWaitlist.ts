import { supabase } from '@/lib/supabaseClient'

export interface WaitlistEntry {
  email: string
  tier: 'pro' | 'agency'
  user_id?: string
}

export async function saveWaitlistEntry(
  entry: WaitlistEntry
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured' }
  }

  try {
    const { error } = await supabase.from('waitlist').insert({
      email: entry.email,
      tier: entry.tier,
      user_id: entry.user_id || null,
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


