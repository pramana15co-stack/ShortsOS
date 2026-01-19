'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'
import { useAccess } from '@/lib/useAccess'
import { useRouter } from 'next/navigation'

// Declare Razorpay types for TypeScript
declare global {
  interface Window {
    Razorpay: any
  }
}

interface UpgradeButtonProps {
  plan?: 'starter' | 'pro'
  className?: string
  children?: React.ReactNode
}

export default function UpgradeButton({ plan = 'starter', className = '', children }: UpgradeButtonProps) {
  const { user, session } = useAuth()
  const { isFree } = useAccess()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)

  // Load Razorpay script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => setRazorpayLoaded(true)
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    } else if (window.Razorpay) {
      setRazorpayLoaded(true)
    }
  }, [])

  const handleUpgrade = async () => {
    if (!user) {
      router.push('/signup?redirect=/pricing')
      return
    }

    if (!isFree) {
      // User already has a plan
      return
    }

    if (!razorpayLoaded) {
      alert('Payment gateway is loading. Please wait a moment and try again.')
      return
    }

    if (!session?.access_token) {
      alert('Session expired. Please log in again.')
      router.push('/login')
      return
    }

    setLoading(true)

    try {
      // Create order on backend
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          plan: plan,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment order')
      }

      // Initialize Razorpay Checkout
      const options = {
        key: data.key,
        amount: data.amount, // Amount in paise
        currency: data.currency,
        name: data.name || 'Pramana',
        description: data.description || 'Starter Plan Subscription',
        order_id: data.orderId,
        prefill: {
          email: data.prefill?.email || user.email,
        },
        theme: data.theme || {
          color: '#6366f1',
        },
        handler: async function (response: any) {
          // Payment successful - call verify endpoint
          try {
            setLoading(true) // Keep loading during verification
            
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                plan: plan,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || 'Payment verification failed')
            }

            console.log('✅ Payment verified successfully:', verifyData)

            // Force refresh profile data by calling refreshSession
            // This ensures the UI shows updated subscription status
            if (window.location.pathname !== '/dashboard') {
              // Redirect to dashboard with success flag
              window.location.href = '/dashboard?payment=success'
            } else {
              // Already on dashboard - refresh the page to show updated status
              window.location.href = '/dashboard?payment=success'
            }
          } catch (verifyError: any) {
            console.error('❌ Payment verification error:', verifyError)
            alert(verifyError.message || 'Payment verification failed. Please contact support with payment ID: ' + response.razorpay_payment_id)
            setLoading(false)
          }
        },
        modal: {
          ondismiss: function () {
            // User closed the checkout modal
            setLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error: any) {
      console.error('Error creating payment order:', error)
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
      disabled={loading || !razorpayLoaded}
      className={`${className} ${loading || !razorpayLoaded ? 'opacity-75 cursor-not-allowed' : ''}`}
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




