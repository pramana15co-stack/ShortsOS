'use client'

import { useState } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import { useAccess } from '@/lib/useAccess'
import { getUserTier, getDaysUntilExpiry } from '@/lib/planValidation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SubscriptionManagement() {
  const { user, session } = useAuth()
  const { isPaid, isStarter, isPro } = useAccess()
  const router = useRouter()
  const [isCancelling, setIsCancelling] = useState(false)
  const [cancelSuccess, setCancelSuccess] = useState(false)
  const [cancelError, setCancelError] = useState<string | null>(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const tier = getUserTier(user)
  const daysUntilExpiry = getDaysUntilExpiry(user)
  const planName = tier === 'starter' ? 'Starter' : tier === 'pro' ? 'Creator Pro' : 'Free'

  const handleCancel = async () => {
    if (!user?.id || !session?.access_token) {
      setCancelError('Please log in to cancel your subscription')
      return
    }

    setIsCancelling(true)
    setCancelError(null)

    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription')
      }

      setCancelSuccess(true)
      setShowCancelConfirm(false)
      
      // Refresh page after 2 seconds to show updated status
      setTimeout(() => {
        router.refresh()
        window.location.reload()
      }, 2000)
    } catch (error: any) {
      console.error('Error cancelling subscription:', error)
      setCancelError(error.message || 'Failed to cancel subscription. Please try again.')
    } finally {
      setIsCancelling(false)
    }
  }

  if (!isPaid) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Subscription</h3>
        <p className="text-gray-600 mb-6">
          Upgrade to unlock all premium features and unlimited access.
        </p>
        <Link href="/pricing" className="btn-primary px-8 py-3">
          View Pricing Plans
        </Link>
      </div>
    )
  }

  return (
    <div className="card p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Subscription Management</h3>
          <p className="text-gray-600">Manage your subscription and billing</p>
        </div>
        <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">
          Active
        </div>
      </div>

      {cancelSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-semibold">
            ✓ Subscription cancelled successfully. Your access will continue until {user?.plan_expiry ? new Date(user.plan_expiry).toLocaleDateString() : 'the end of your billing period'}.
          </p>
        </div>
      )}

      {cancelError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{cancelError}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Current Plan */}
        <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Current Plan</h4>
              <p className="text-3xl font-extrabold text-indigo-600">{planName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <p className="text-lg font-bold text-green-600">Active</p>
            </div>
          </div>
          
          {daysUntilExpiry !== null && (
            <div className="mt-4 pt-4 border-t border-indigo-200">
              <p className="text-sm text-gray-600 mb-1">
                {daysUntilExpiry > 0 
                  ? `Access expires in ${daysUntilExpiry} ${daysUntilExpiry === 1 ? 'day' : 'days'}`
                  : 'Access expired'}
              </p>
              {user?.plan_expiry && (
                <p className="text-xs text-gray-500">
                  Expires on {new Date(user.plan_expiry).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Features Included */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4">What's Included</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900">Unlimited AI Video Prompt Studio</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900">Full Hook & Caption Engine</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900">Creator Intelligence Audit</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900">Export Instructions & Execution Paths</span>
            </div>
            {isPro && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900">All Execution Paths (Beginner, Intermediate, Advanced)</span>
              </div>
            )}
          </div>
        </div>

        {/* Cancel Subscription */}
        {!cancelSuccess && (
          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Cancel Subscription</h4>
            <p className="text-gray-600 mb-4">
              You can cancel your subscription at any time. Your access will continue until the end of your current billing period.
            </p>
            
            {!showCancelConfirm ? (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="btn-secondary px-6 py-3"
              >
                Cancel Subscription
              </button>
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-gray-900 font-semibold mb-4">
                  Are you sure you want to cancel your subscription?
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Your access will continue until {user?.plan_expiry ? new Date(user.plan_expiry).toLocaleDateString() : 'the end of your billing period'}. 
                  You can resubscribe anytime.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    disabled={isCancelling}
                    className="btn-secondary px-6 py-2 text-sm"
                  >
                    {isCancelling ? 'Cancelling...' : 'Yes, Cancel Subscription'}
                  </button>
                  <button
                    onClick={() => {
                      setShowCancelConfirm(false)
                      setCancelError(null)
                    }}
                    className="btn-primary px-6 py-2 text-sm"
                    disabled={isCancelling}
                  >
                    Keep Subscription
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upgrade Option */}
        {isStarter && !isPro && (
          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Upgrade to Creator Pro</h4>
            <p className="text-gray-600 mb-4">
              Get access to all execution paths and advanced features.
            </p>
            <Link href="/pricing" className="btn-primary px-6 py-3 inline-block">
              Upgrade to Pro
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
