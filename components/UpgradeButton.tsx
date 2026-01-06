'use client'

import { useState } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import { useAccess } from '@/lib/useAccess'
import { useRouter } from 'next/navigation'

interface UpgradeButtonProps {
  plan?: 'starter'
  className?: string
  children?: React.ReactNode
}

export default function UpgradeButton({ plan = 'starter', className = '', children }: UpgradeButtonProps) {
  const { user } = useAuth()
  const { isFree } = useAccess()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    if (!user) {
      router.push('/signup?redirect=/pricing')
      return
    }

    if (!isFree) {
      // User already has a plan
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error: any) {
      console.error('Error creating checkout session:', error)
      alert(error.message || 'Failed to start checkout. Please try again.')
      setLoading(false)
    }
  }

  // Don't show button if user already has access
  if (!isFree) {
    return null
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className={`${className} ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        children || 'Upgrade to Starter'
      )}
    </button>
  )
}

