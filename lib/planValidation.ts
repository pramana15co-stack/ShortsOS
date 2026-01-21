/**
 * Plan Validation Utilities
 * Single source of truth for subscription status checks
 */

export interface User {
  id: string
  subscription_tier?: string | null
  subscription_status?: string | null
  plan_expiry?: string | null
  is_admin?: boolean | null
  [key: string]: any
}

/**
 * Check if user has an active paid subscription
 * 
 * @param user - User object from Supabase
 * @returns true if user has active subscription that hasn't expired, or is admin
 */
export function isUserPaid(user: User | null | undefined): boolean {
  if (!user) {
    return false
  }

  // Admin always has full access
  if (user.is_admin) {
    return true
  }

  // Check subscription status
  if (user.subscription_status !== 'active') {
    return false
  }

  // Check plan expiry
  if (user.plan_expiry) {
    const expiryDate = new Date(user.plan_expiry)
    const now = new Date()
    
    // If expired, user is not paid
    if (expiryDate <= now) {
      return false
    }
  } else {
    // No expiry date means no active subscription
    return false
  }

  // Check subscription tier (must be paid tier)
  const tier = user.subscription_tier || user.tier
  if (!tier || tier === 'free') {
    return false
  }

  return true
}

/**
 * Get user's subscription tier
 * 
 * @param user - User object from Supabase
 * @returns 'free' | 'starter' | 'pro' | 'agency'
 */
export function getUserTier(user: User | null | undefined): 'free' | 'starter' | 'pro' | 'agency' {
  if (!user) {
    return 'free'
  }

  // If not paid, return free
  if (!isUserPaid(user)) {
    return 'free'
  }

  // Get tier from user object
  const tier = user.subscription_tier || user.tier
  
  if (tier === 'starter' || tier === 'paid') {
    return 'starter'
  }
  if (tier === 'pro') {
    return 'pro'
  }
  if (tier === 'agency' || tier === 'operator') {
    return 'agency'
  }

  return 'free'
}

/**
 * Check if user can access a specific tier
 * 
 * @param user - User object from Supabase
 * @param requiredTier - Minimum tier required
 * @returns true if user's tier meets or exceeds required tier, or is admin
 */
export function canAccessTier(
  user: User | null | undefined,
  requiredTier: 'free' | 'starter' | 'pro' | 'agency'
): boolean {
  if (requiredTier === 'free') {
    return true // Everyone can access free features
  }

  // Admin always has full access
  if (user?.is_admin) {
    return true
  }

  const userTier = getUserTier(user)

  // Tier hierarchy: free < starter < pro < agency
  const tierHierarchy: Record<'free' | 'starter' | 'pro' | 'agency', number> = {
    free: 0,
    starter: 1,
    pro: 2,
    agency: 3,
  }

  return tierHierarchy[userTier] >= tierHierarchy[requiredTier]
}

/**
 * Get days until plan expires
 * 
 * @param user - User object from Supabase
 * @returns number of days until expiry, or null if no expiry
 */
export function getDaysUntilExpiry(user: User | null | undefined): number | null {
  if (!user || !user.plan_expiry) {
    return null
  }

  const expiryDate = new Date(user.plan_expiry)
  const now = new Date()
  const diffTime = expiryDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 0 ? diffDays : 0
}

/**
 * Check if user's plan is expiring soon (within 7 days)
 * 
 * @param user - User object from Supabase
 * @returns true if plan expires within 7 days
 */
export function isPlanExpiringSoon(user: User | null | undefined): boolean {
  const daysUntilExpiry = getDaysUntilExpiry(user)
  return daysUntilExpiry !== null && daysUntilExpiry <= 7 && daysUntilExpiry > 0
}
