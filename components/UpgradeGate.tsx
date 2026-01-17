'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/providers/AuthProvider'
import { isUserPaid } from '@/lib/planValidation'

interface UpgradeGateProps {
  children: ReactNode
  requiredTier?: 'starter' | 'pro' | 'agency'
  fallback?: ReactNode
  showUpgradeCTA?: boolean
}

/**
 * UpgradeGate Component
 * 
 * Blocks paid-only features and shows upgrade CTA for free users.
 * Uses centralized plan validation.
 * 
 * @param children - Content to show if user has access
 * @param requiredTier - Minimum tier required (default: 'starter')
 * @param fallback - Custom fallback UI (optional)
 * @param showUpgradeCTA - Show upgrade CTA (default: true)
 */
export default function UpgradeGate({
  children,
  requiredTier = 'starter',
  fallback,
  showUpgradeCTA = true,
}: UpgradeGateProps) {
  const { user } = useAuth()
  const hasAccess = isUserPaid(user)

  // If user has access, show children
  if (hasAccess) {
    return <>{children}</>
  }

  // If custom fallback provided, use it
  if (fallback) {
    return <>{fallback}</>
  }

  // Default upgrade CTA
  if (!showUpgradeCTA) {
    return null
  }

  return (
    <div className="card p-8 text-center">
      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Upgrade to Unlock This Feature
      </h3>

      <p className="text-gray-600 mb-6 leading-relaxed">
        This feature is available for {requiredTier === 'pro' ? 'Creator Pro' : 'Starter'} plan users.
        Upgrade to get full access to all features.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/pricing"
          className="btn-primary px-8 py-3 text-lg"
        >
          View Pricing Plans
        </Link>
        <Link
          href="/dashboard"
          className="btn-secondary px-8 py-3 text-lg"
        >
          Go to Dashboard
        </Link>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        No pressure. Upgrade only when you're ready.
      </p>
    </div>
  )
}
