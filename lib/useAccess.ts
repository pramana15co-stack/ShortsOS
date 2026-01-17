'use client'

import { useAuth } from '@/app/providers/AuthProvider'
import { useState, useEffect } from 'react'

export type AccessTier = 'free' | 'starter' | 'pro' | 'agency'

interface AccessState {
  tier: AccessTier
  canAccess: (requiredTier: AccessTier) => boolean
  isFree: boolean
  isStarter: boolean
  isPro: boolean
  isAgency: boolean
  loading: boolean
  // Legacy properties for backward compatibility
  isPaid: boolean
  canAccessPromptStudio: boolean
  canAccessHookCaption: boolean
  canAccessPostProcessing: boolean
  canAccessExportInstructions: boolean
  promptStudioRemaining: number | 'unlimited'
}

// Helper to determine tier from user object
function getUserTier(user: any): AccessTier {
  if (!user) return 'free'
  
  // Check if subscription is active and not expired
  const subscriptionStatus = user.subscription_status
  const planExpiry = user.plan_expiry
  
  // If subscription is not active, return free
  if (subscriptionStatus !== 'active') {
    return 'free'
  }
  
  // Check if plan has expired
  if (planExpiry) {
    const expiryDate = new Date(planExpiry)
    const now = new Date()
    if (expiryDate < now) {
      return 'free' // Plan expired
    }
  }
  
  // Check subscription_tier from database
  const tier = user.subscription_tier || user.tier
  if (tier === 'starter' || tier === 'paid') return 'starter'
  if (tier === 'pro') return 'pro'
  if (tier === 'agency' || tier === 'operator') return 'agency'
  
  return 'free'
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

  const canAccess = (requiredTier: AccessTier): boolean => {
    if (loading) return false
    
    if (requiredTier === 'free') return true
    
    // Tier hierarchy: free < starter < pro < agency
    const tierHierarchy: Record<AccessTier, number> = {
      free: 0,
      starter: 1,
      pro: 2,
      agency: 3,
    }
    
    return tierHierarchy[tier] >= tierHierarchy[requiredTier]
  }

  const isFree = tier === 'free'
  const isStarter = tier === 'starter' || tier === 'pro' || tier === 'agency'
  const isPro = tier === 'pro' || tier === 'agency'
  const isAgency = tier === 'agency'
  const isPaid = isStarter // Legacy alias

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
    // Legacy properties
    isPaid,
    canAccessPromptStudio,
    canAccessHookCaption,
    canAccessPostProcessing,
    canAccessExportInstructions,
    promptStudioRemaining,
  }
}
