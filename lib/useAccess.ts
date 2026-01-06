'use client'

import { useAuth } from '@/app/providers/AuthProvider'

export type AccessTier = 'free' | 'paid'

interface AccessLimits {
  promptStudio: {
    free: number // Max generations per day
    paid: 'unlimited'
  }
  hookCaption: {
    free: boolean // Basic only
    paid: boolean // Advanced
  }
  postProcessing: {
    free: boolean // Preview only
    paid: boolean // Full access
  }
  exportInstructions: {
    free: boolean
    paid: boolean
  }
}

// For now, all users are free tier
// This can be extended to check subscription status from user object
export function useAccess() {
  const { user } = useAuth()
  
  // TODO: Check user.subscription_status or user.tier from database
  // For now, all authenticated users are free tier
  // In production, this would check: user?.subscription_tier === 'paid'
  const tier: AccessTier = (user as any)?.subscription_tier === 'paid' ? 'paid' : 'free'
  
  const limits: AccessLimits = {
    promptStudio: {
      free: 5, // 5 generations per day for free users
      paid: 'unlimited',
    },
    hookCaption: {
      free: true, // Basic hooks/captions
      paid: true, // Advanced timing and variations
    },
    postProcessing: {
      free: true, // Preview mode
      paid: true, // Full recommendations
    },
    exportInstructions: {
      free: false, // Not available for free
      paid: true,
    },
  }

  const isPaid = tier === 'paid'
  const isFree = tier === 'free'

  return {
    tier,
    isPaid,
    isFree,
    limits,
    canAccessPromptStudio: true, // Both tiers can access
    canAccessHookCaption: true, // Both tiers can access
    canAccessPostProcessing: true, // Both tiers can access (with limits)
    canAccessExportInstructions: isPaid,
    promptStudioRemaining: isPaid ? 'unlimited' : limits.promptStudio.free, // TODO: Track daily usage
  }
}

