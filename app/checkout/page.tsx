'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug } from '@/data/products'
import { useState, Suspense } from 'react'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const productSlug = searchParams.get('product')
  const product = productSlug ? getProductBySlug(productSlug) : null

  const [formData, setFormData] = useState({
    email: '',
    name: '',
  })

  if (!product) {
    return (
      <main className="min-h-screen py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/pricing" className="btn-primary px-8 py-4">
            View All Products
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8 text-sm font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Product Details
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Order Summary */}
          <div>
            <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Complete Your Purchase</h1>
            
            <div className="card p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{product.name}</span>
                  <span className="text-gray-900 font-bold">${product.price}</span>
                </div>
                {product.originalPrice && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 line-through">Original Price</span>
                    <span className="text-gray-500 line-through">${product.originalPrice}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center text-xl font-extrabold text-gray-900">
                <span>Total</span>
                <span>${product.price}</span>
              </div>
            </div>

            <div className="card p-6 bg-green-50 border-2 border-green-200">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-bold text-gray-900 mb-1">30-Day Money-Back Guarantee</div>
                  <div className="text-sm text-gray-700">Not satisfied? Get a full refund within 30 days.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-900">
                      <strong>Note:</strong> This is a demo checkout page. In production, this would integrate with a payment processor like Stripe, PayPal, or Gumroad.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn-primary w-full py-4 text-lg font-bold"
                    onClick={() => {
                      alert('This is a demo checkout. In production, this would process your payment and grant access to the product.')
                    }}
                  >
                    Complete Purchase - ${product.price}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    🔒 Secure payment • Instant access • 30-day guarantee
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>By completing your purchase, you agree to our</p>
              <div className="flex justify-center gap-4 mt-2">
                <Link href="/terms" className="text-indigo-600 hover:underline">Terms of Service</Link>
                <span>•</span>
                <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
