/**
 * Usage Tracking Utilities
 * Track feature usage for free users and enforce limits
 */

import { supabase } from '@/lib/supabaseClient'

export interface UsageRecord {
  id?: string
  user_id: string
  feature: string
  usage_date: string
  created_at?: string
}

// Feature limits for free users
export const FREE_USER_LIMITS = {
  'prompt-studio': 5, // 5 prompts per day
  'hook-caption': 10, // 10 hooks/captions per day
  'post-processing': 3, // 3 post-processing analyses per day
  'creator-audit': 1, // 1 audit per day (paid feature, but allow 1 trial)
  'planner': 10, // 10 planner queries per day
}

/**
 * Check if user can use a feature (based on daily limit)
 */
export async function canUseFeature(
  userId: string | null | undefined,
  feature: keyof typeof FREE_USER_LIMITS,
  isPaid: boolean
): Promise<{ allowed: boolean; remaining: number; limit: number }> {
  // Paid users have unlimited access
  if (isPaid) {
    return {
      allowed: true,
      remaining: -1, // -1 means unlimited
      limit: -1,
    }
  }

  if (!userId || !supabase) {
    return {
      allowed: false,
      remaining: 0,
      limit: FREE_USER_LIMITS[feature],
    }
  }

  // Get today's date in UTC
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const todayISO = today.toISOString()

  // Count today's usage
  const { data: usageRecords, error } = await supabase
    .from('usage_tracking')
    .select('id')
    .eq('user_id', userId)
    .eq('feature', feature)
    .gte('usage_date', todayISO)
    .lt('usage_date', new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString())

  if (error) {
    console.error('Error checking usage:', error)
    // On error, allow usage (fail open)
    return {
      allowed: true,
      remaining: FREE_USER_LIMITS[feature],
      limit: FREE_USER_LIMITS[feature],
    }
  }

  const usageCount = usageRecords?.length || 0
  const limit = FREE_USER_LIMITS[feature]
  const remaining = Math.max(0, limit - usageCount)

  return {
    allowed: usageCount < limit,
    remaining,
    limit,
  }
}

/**
 * Record feature usage
 */
export async function recordUsage(
  userId: string | null | undefined,
  feature: keyof typeof FREE_USER_LIMITS
): Promise<{ success: boolean; error?: string }> {
  if (!userId || !supabase) {
    return { success: false, error: 'User not authenticated' }
  }

  // Get today's date
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  const { error } = await supabase
    .from('usage_tracking')
    .insert({
      user_id: userId,
      feature,
      usage_date: today.toISOString(),
    })

  if (error) {
    console.error('Error recording usage:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

/**
 * Get usage stats for a user
 */
export async function getUsageStats(
  userId: string | null | undefined
): Promise<Record<string, { used: number; limit: number; remaining: number }>> {
  if (!userId || !supabase) {
    return {}
  }

  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const todayISO = today.toISOString()

  const { data: usageRecords } = await supabase
    .from('usage_tracking')
    .select('feature')
    .eq('user_id', userId)
    .gte('usage_date', todayISO)
    .lt('usage_date', new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString())

  const stats: Record<string, { used: number; limit: number; remaining: number }> = {}

  Object.keys(FREE_USER_LIMITS).forEach((feature) => {
    const used = usageRecords?.filter((r) => r.feature === feature).length || 0
    const limit = FREE_USER_LIMITS[feature as keyof typeof FREE_USER_LIMITS]
    stats[feature] = {
      used,
      limit,
      remaining: Math.max(0, limit - used),
    }
  })

  return stats
}
