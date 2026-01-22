import { supabase } from '@/lib/supabaseClient'

export interface PlannerHistoryItem {
  id: string
  user_id: string
  niche: string
  goal: string
  experience_level: string
  recommended_formats: Array<{
    format_slug: string
    format_name: string
    score: number
    reason: string
  }>
  posting_frequency: string
  frequency_reason: string
  created_at: string
}

export async function getLastPlannerResult(
  userId: string
): Promise<{ success: boolean; data: PlannerHistoryItem | null; error?: string }> {
  if (!supabase) {
    return { success: false, data: null, error: 'Supabase is not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('planner_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      // Log error but don't fail - table might not exist yet
      // Only log if it's not a "table doesn't exist" error (which is expected)
      if (!error.message?.includes('does not exist') && !error.message?.includes('schema cache')) {
        console.warn('⚠️ [PLANNER] Error fetching planner results:', error.message)
      }
      return { success: true, data: null }
    }

    // If no data, that's okay - return null
    if (!data) {
      return { success: true, data: null }
    }

    return { success: true, data: data as PlannerHistoryItem }
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : 'An unexpected error occurred',
    }
  }
}



