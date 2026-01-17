'use client'

import { useAuth } from '@/app/providers/AuthProvider'
import { useState, useEffect } from 'react'
import { isUserPaid, getUserTier, canAccessTier, getDaysUntilExpiry, isPlanExpiringSoon } from '@/lib/planValidation'

export type AccessTier = 'free' | 'starter' | 'pro' | 'agency'

interface AccessState {
  tier: AccessTier
  canAccess: (requiredTier: AccessTier) => boolean
  isFree: boolean
  isStarter: boolean
  isPro: boolean
  isAgency: boolean
  loading: boolean
  // Plan validation
  isPaid: boolean
  daysUntilExpiry: number | null
  isExpiringSoon: boolean
  // Legacy properties for backward compatibility
  canAccessPromptStudio: boolean
  canAccessHookCaption: boolean
  canAccessPostProcessing: boolean
  canAccessExportInstructions: boolean
  promptStudioRemaining: number | 'unlimited'
}

export function useAccess(): AccessState {
  const { user, loading: authLoading } = useAuth()
  const [tier, setTier] = useState<AccessTier>('free')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading) {
      const userTier = getUserTier(user)
      setTier(userTier)
      setLoading(false)
    }
  }, [user, authLoading])

  // Use centralized validation functions (single source of truth)
  const isPaid = isUserPaid(user)
  const canAccess = (requiredTier: AccessTier): boolean => {
    if (loading) return false
    return canAccessTier(user, requiredTier)
  }

  const isFree = tier === 'free'
  const isStarter = tier === 'starter' || tier === 'pro' || tier === 'agency'
  const isPro = tier === 'pro' || tier === 'agency'
  const isAgency = tier === 'agency'

  // Plan expiry information
  const daysUntilExpiry = getDaysUntilExpiry(user)
  const isExpiringSoon = isPlanExpiringSoon(user)

  // Feature access flags
  const canAccessPromptStudio = true // Both tiers can access
  const canAccessHookCaption = true // Both tiers can access
  const canAccessPostProcessing = true // Both tiers can access (with limits)
  const canAccessExportInstructions = isStarter // Paid only

  // Prompt Studio limits (TODO: Track daily usage in database)
  const promptStudioRemaining: number | 'unlimited' = isStarter ? 'unlimited' : 5

  return {
    tier,
    canAccess,
    isFree,
    isStarter,
    isPro,
    isAgency,
    loading: loading || authLoading,
    // Plan validation (single source of truth)
    isPaid,
    daysUntilExpiry,
    isExpiringSoon,
    // Legacy properties
    canAccessPromptStudio,
    canAccessHookCaption,
    canAccessPostProcessing,
    canAccessExportInstructions,
    promptStudioRemaining,
  }
}
