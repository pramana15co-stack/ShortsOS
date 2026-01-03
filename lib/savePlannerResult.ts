import { supabase } from '@/lib/supabaseClient'
import { PlannerInput, PlannerResult } from '@/lib/plannerLogic'

export interface SavedPlannerResult {
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
}

export async function savePlannerResult(
  userId: string,
  input: PlannerInput,
  result: PlannerResult
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured' }
  }

  try {
    const savedResult: SavedPlannerResult = {
      user_id: userId,
      niche: input.niche,
      goal: input.goal,
      experience_level: input.experienceLevel,
      recommended_formats: result.recommendations.map((rec) => ({
        format_slug: rec.format.slug,
        format_name: rec.format.name,
        score: rec.score,
        reason: rec.reason,
      })),
      posting_frequency: result.postingFrequency,
      frequency_reason: result.frequencyReason,
    }

    const { error } = await supabase.from('planner_results').insert(savedResult)

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



