'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import { getUserTier, getDaysUntilExpiry } from '@/lib/planValidation'
import Link from 'next/link'

interface SuccessBannerProps {
  show?: boolean
  onDismiss?: () => void
}

/**
 * Success Banner Component
 * Shows plan status after successful payment
 */
export default function SuccessBanner({ show = true, onDismiss }: SuccessBannerProps) {
  const { user } = useAuth()
  const [planName, setPlanName] = useState<string>('')
  const [expiryDate, setExpiryDate] = useState<string>('')
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    if (!user) return

    // Get plan name from tier
    const tier = getUserTier(user)
    if (tier === 'starter') {
      setPlanName('Starter')
    } else if (tier === 'pro') {
      setPlanName('Creator Pro')
    } else if (tier === 'agency') {
      setPlanName('Agency')
    } else {
      setPlanName('Free')
    }

    // Format expiry date
    if (user.plan_expiry) {
      const expiry = new Date(user.plan_expiry)
      const formatted = expiry.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
      setExpiryDate(formatted)
    } else {
      setExpiryDate('')
    }
  }, [user])

  // Only show if user has paid plan
  const tier = getUserTier(user)
  if (!isVisible || (tier === 'free' && !expiryDate)) {
    return null
  }

  return (
    <div className="mb-8 card p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-extrabold text-gray-900 mb-1">
              You're on {planName}
            </h3>
            {expiryDate && (
              <p className="text-gray-700">
                Valid till <span className="font-semibold">{expiryDate}</span>
              </p>
            )}
            {!expiryDate && tier !== 'free' && (
              <p className="text-gray-700">
                Your subscription is active
              </p>
            )}
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={() => {
              setIsVisible(false)
              onDismiss?.()
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
