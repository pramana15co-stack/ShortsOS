/**
 * Credits System
 * Manages user credits for feature access
 */

export interface CreditsInfo {
  credits: number
  isPaid: boolean
  unlimited: boolean
}

// Credit costs for different features
export const FEATURE_CREDITS = {
  'prompt-studio': 5,        // 5 credits per prompt
  'hook-caption': 3,         // 3 credits per hook/caption
  'post-processing': 8,      // 8 credits per analysis
  'creator-audit': 15,       // 15 credits per audit (premium feature)
  'planner': 2,              // 2 credits per plan
  'content-ideas': 2,        // 2 credits per idea generation
  'scripts': 4,              // 4 credits per script
} as const

export type FeatureName = keyof typeof FEATURE_CREDITS

/**
 * Get credits info for a user
 */
export async function getCreditsInfo(
  userId: string | null | undefined,
  isPaid: boolean
): Promise<CreditsInfo> {
  if (isPaid) {
    return {
      credits: -1, // -1 means unlimited
      isPaid: true,
      unlimited: true,
    }
  }

  if (!userId) {
    return {
      credits: 0,
      isPaid: false,
      unlimited: false,
    }
  }

  try {
    const response = await fetch('/api/credits/balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
      return {
        credits: 0,
        isPaid: false,
        unlimited: false,
      }
    }

    const data = await response.json()
    return {
      credits: data.credits || 0,
      isPaid: false,
      unlimited: false,
    }
  } catch (error) {
    console.error('Error fetching credits:', error)
    return {
      credits: 0,
      isPaid: false,
      unlimited: false,
    }
  }
}

/**
 * Check if user has enough credits for a feature
 */
export function hasEnoughCredits(
  credits: number,
  feature: FeatureName,
  isPaid: boolean
): boolean {
  if (isPaid) return true
  if (credits === -1) return true // Unlimited
  return credits >= FEATURE_CREDITS[feature]
}

/**
 * Get credit cost for a feature
 */
export function getCreditCost(feature: FeatureName): number {
  return FEATURE_CREDITS[feature]
}
