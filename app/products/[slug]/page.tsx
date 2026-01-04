import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug, products } from '@/data/products'
import { getTestimonialsByProduct } from '@/data/testimonials'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug)
  const productTestimonials = product ? getTestimonialsByProduct(product.name) : []

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        {/* Header */}
        <div className="mb-8">
          {product.popular && (
            <div className="inline-block bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              {product.badge}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
            {product.name}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {product.description}
          </p>
          
          {/* Pricing */}
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-5xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Save ${product.originalPrice - product.price}
                </span>
              </>
            )}
          </div>

          {/* Stats */}
          {product.stats && (
            <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
              {product.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Outcomes */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What You'll Achieve</h2>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <ul className="space-y-3">
                  {product.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What's Included</h2>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Testimonials */}
            {productTestimonials.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Creators Say</h2>
                <div className="space-y-6">
                  {productTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-600">{testimonial.role}</div>
                        </div>
                        {testimonial.verified && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                            Verified
                          </span>
                        )}
                      </div>
                      {testimonial.results && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="text-sm font-semibold text-gray-900">Results: {testimonial.results}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - Purchase Card */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg border-2 border-gray-200 p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">${product.price}</div>
                {product.originalPrice && (
                  <div className="text-lg text-gray-400 line-through mb-2">${product.originalPrice}</div>
                )}
                <div className="text-sm text-gray-600">One-time payment</div>
              </div>

              <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-4">
                Get {product.name}
              </button>

              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Instant access</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>30-day money-back guarantee</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

