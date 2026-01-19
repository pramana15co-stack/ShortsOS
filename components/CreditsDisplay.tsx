'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import { getCreditsInfo, type FeatureName, getCreditCost } from '@/lib/credits'
import Link from 'next/link'

interface CreditsDisplayProps {
  feature?: FeatureName
  className?: string
}

export default function CreditsDisplay({ feature, className = '' }: CreditsDisplayProps) {
  const { user } = useAuth()
  const [credits, setCredits] = useState<number | null>(null)
  const [isPaid, setIsPaid] = useState(false)
  const [loading, setLoading] = useState(true)

  const isUserPaid = user?.subscription_status === 'active' && 
    user?.plan_expiry && 
    new Date(user.plan_expiry) > new Date()

  useEffect(() => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    let cancelled = false

    const fetchCredits = async () => {
      try {
        const info = await getCreditsInfo(user.id, isUserPaid)
        if (!cancelled) {
          setCredits(info.credits)
          setIsPaid(info.unlimited)
          setLoading(false)
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Error fetching credits:', error)
          setLoading(false)
        }
      }
    }

    fetchCredits()

    return () => {
      cancelled = true
    }
  }, [user?.id, isUserPaid])

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
    )
  }

  if (isPaid) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full">
          <span className="text-indigo-600 font-bold text-sm">✨</span>
          <span className="text-indigo-700 font-bold text-sm">Unlimited</span>
        </div>
      </div>
    )
  }

  const creditCost = feature ? getCreditCost(feature) : null
  const hasEnough = credits !== null && (creditCost ? credits >= creditCost : true)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
          <span className="text-gray-600 text-sm font-medium">Credits:</span>
          <span
            className={`font-bold text-sm ${
              credits !== null && credits < 10
                ? 'text-red-600'
                : credits !== null && credits < 30
                ? 'text-orange-600'
                : 'text-indigo-600'
            }`}
          >
            {credits !== null ? credits : 0}
          </span>
        </div>
        {feature && creditCost && (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-full">
            <span className="text-xs text-gray-600">
              {hasEnough ? (
                <span className="text-green-600 font-medium">
                  -{creditCost} per use
                </span>
              ) : (
                <span className="text-red-600 font-medium">
                  Need {creditCost}
                </span>
              )}
            </span>
          </div>
        )}
      </div>
      {credits !== null && credits < 20 && (
        <Link
          href="/pricing"
          className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-full hover:shadow-lg transition-all hover:scale-105"
        >
          Get More
        </Link>
      )}
    </div>
  )
}
