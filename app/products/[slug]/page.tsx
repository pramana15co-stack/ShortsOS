import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug, products } from '@/data/products'
import { getTestimonialsByProduct } from '@/data/testimonials'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export const dynamicParams = false

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  const productTestimonials = product ? getTestimonialsByProduct(product.name) : []
  const isCompleteBundle = product?.slug === 'complete-shorts-bundle'
  const allProducts = products.filter(p => p.type === product?.type && p.slug !== product?.slug)

  if (!product) {
    notFound()
  }

  const comparisonFeatures = [
    { feature: 'Format Guides', complete: 'All 6 formats', beginner: '3 formats', growth: '3 advanced formats', bundle: 'All 6 formats' },
    { feature: 'Execution Paths', complete: '3 paths (Beginner to Advanced)', beginner: '1 path (Beginner)', growth: '2 paths (Advanced)', bundle: 'None' },
    { feature: 'Script Templates', complete: '50+ templates', beginner: '30 templates', growth: '40 templates', bundle: '60+ templates' },
    { feature: 'Hook Variations', complete: '100+ hooks', beginner: '50 hooks', growth: '75 hooks', bundle: '80+ hooks' },
    { feature: 'Growth Strategies', complete: 'Complete playbook', beginner: 'Basic strategies', growth: 'Advanced tactics', bundle: 'Format strategies only' },
    { feature: 'Community Access', complete: 'Private community', beginner: 'Email support (30 days)', growth: 'Priority support', bundle: 'None' },
    { feature: 'Updates', complete: 'Lifetime access', beginner: '30 days', growth: '90 days', bundle: 'Lifetime access' },
  ]

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Back Link */}
        <Link
          href="/pricing"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8 text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Pricing
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-12">
            <div className="flex-1">
              {product.popular && (
                <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
                  {product.badge}
                </div>
              )}
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
                {product.description}
              </p>
              
              {/* Pricing */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-6xl font-extrabold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-3xl text-gray-400 line-through">${product.originalPrice}</span>
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Stats */}
              {product.stats && (
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {product.stats.map((stat, idx) => (
                    <div key={idx} className="text-center p-4 bg-white rounded-xl border border-gray-200">
                      <div className="text-3xl font-extrabold text-gray-900 mb-2">{stat.value}</div>
                      <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Button - Sticky on mobile */}
              <div className="md:hidden mb-8">
                <Link
                  href="#purchase"
                  className="btn-primary w-full text-center py-5 text-lg font-bold block"
                >
                  Get {product.name} Now →
                </Link>
              </div>
            </div>

            {/* Sidebar - Sticky CTA */}
            <div className="md:w-96 md:sticky md:top-8 md:h-fit">
              <div className="card p-8 border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/30 to-white">
                <div className="text-center mb-6">
                  <div className="text-5xl font-extrabold text-gray-900 mb-2">${product.price}</div>
                  {product.originalPrice && (
                    <div className="text-xl text-gray-400 line-through mb-2">${product.originalPrice}</div>
                  )}
                  <div className="text-sm text-gray-600">One-time payment</div>
                </div>

                <Link
                  href="#purchase"
                  className="btn-primary w-full text-center py-5 text-lg font-bold mb-4 block"
                >
                  Get {product.name} Now →
                </Link>

                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Instant access after purchase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Lifetime updates included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>No recurring fees</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="text-xs text-gray-500 text-center">
                    🔒 Secure checkout • Instant delivery • Trusted by 10,000+ creators
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            {/* Outcomes */}
            <section>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">What You'll Achieve</h2>
              <div className="card p-8">
                <ul className="space-y-5">
                  {product.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-lg text-gray-700 leading-relaxed pt-1">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Everything Included</h2>
              <div className="card p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Comparison Table */}
            {isCompleteBundle && (
              <section>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Compare Plans</h2>
                <div className="card p-0 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        <tr>
                          <th className="px-6 py-4 text-left font-bold">Feature</th>
                          <th className="px-6 py-4 text-center font-bold">Beginner Plan</th>
                          <th className="px-6 py-4 text-center font-bold bg-indigo-700">Complete Bundle</th>
                          <th className="px-6 py-4 text-center font-bold">Growth Plan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonFeatures.map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-6 py-4 font-semibold text-gray-900">{row.feature}</td>
                            <td className="px-6 py-4 text-center text-gray-700">{row.beginner}</td>
                            <td className="px-6 py-4 text-center font-bold text-indigo-600 bg-indigo-50">{row.complete}</td>
                            <td className="px-6 py-4 text-center text-gray-700">{row.growth}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/pricing"
                    className="text-indigo-600 hover:text-indigo-700 font-bold"
                  >
                    View All Plans →
                  </Link>
                </div>
              </section>
            )}

            {/* Detailed Content for Complete Bundle */}
            {isCompleteBundle && (
              <>
                <section>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Complete System Overview</h2>
                  <div className="card p-8 space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="text-2xl">📚</span>
                        Format Library (6 Proven Formats)
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Master all six proven formats that consistently perform on YouTube Shorts. Each format includes:
                      </p>
                      <ul className="space-y-2 text-gray-700 ml-6">
                        <li>• Detailed execution guide with step-by-step instructions</li>
                        <li>• Hook structure templates (first 3 seconds)</li>
                        <li>• Complete script templates you can customize</li>
                        <li>• Pacing guidelines for optimal viewer retention</li>
                        <li>• Common mistakes to avoid</li>
                        <li>• Niche-specific variations and examples</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="text-2xl">🗺️</span>
                        Execution Paths (3 Complete Paths)
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Step-by-step playbooks that guide you from where you are to where you want to be:
                      </p>
                      <ul className="space-y-2 text-gray-700 ml-6">
                        <li>• <strong>Beginner Path:</strong> 0 → First Consistent Views (8-12 weeks)</li>
                        <li>• <strong>Intermediate Path:</strong> 1K → 10K Subscribers (12-16 weeks)</li>
                        <li>• <strong>Advanced Path:</strong> 10K → Monetization & Scaling (16+ weeks)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="text-2xl">📝</span>
                        Script Templates (50+ Ready-to-Use)
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Save hours every week with professionally structured script templates:
                      </p>
                      <ul className="space-y-2 text-gray-700 ml-6">
                        <li>• Format-specific templates for each of the 6 formats</li>
                        <li>• Hook variations for different niches</li>
                        <li>• Call-to-action templates</li>
                        <li>• Pacing markers built-in (0-3s, 3-8s, etc.)</li>
                        <li>• Easy customization guidelines</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="text-2xl">💰</span>
                        Monetization Strategies
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Learn how successful creators monetize their Shorts channels:
                      </p>
                      <ul className="space-y-2 text-gray-700 ml-6">
                        <li>• Affiliate marketing setup and optimization</li>
                        <li>• How many videos per day to post for maximum revenue</li>
                        <li>• Tools directory with free and paid options</li>
                        <li>• Revenue optimization tactics</li>
                        <li>• Case studies from earning creators</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* Testimonials */}
            {productTestimonials.length > 0 && (
              <section>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">What Creators Are Saying</h2>
                <div className="space-y-6">
                  {productTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="card p-8">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 leading-relaxed text-lg">"{testimonial.text}"</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-600">{testimonial.role}</div>
                        </div>
                        {testimonial.verified && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      {testimonial.results && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="text-sm font-bold text-gray-900">Results: {testimonial.results}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Guarantee */}
            <section>
              <div className="card p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-3">30-Day Money-Back Guarantee</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      We're confident this bundle will help you grow your channel. If you're not satisfied within 30 days, we'll refund every penny. No questions asked.
                    </p>
                    <p className="text-sm text-gray-600">
                      Your purchase is protected. We stand behind our products and your success.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Purchase Section */}
            <section id="purchase" className="scroll-mt-24">
              <div className="gradient-bg rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
                <div className="relative z-10 text-center">
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Transform Your Channel?</h2>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Join thousands of creators who've used {product.name} to grow their channels and start earning.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <div className="text-5xl font-extrabold mb-2">${product.price}</div>
                      {product.originalPrice && (
                        <div className="text-2xl text-white/70 line-through mb-2">${product.originalPrice}</div>
                      )}
                      <div className="text-sm text-white/80">One-time payment</div>
                    </div>
                  </div>
                  <Link
                    href={`/checkout?product=${product.slug}`}
                    className="inline-block bg-white text-indigo-600 px-12 py-5 rounded-xl font-bold text-xl hover:scale-105 transition-transform shadow-2xl mb-6"
                  >
                    Get {product.name} Now →
                  </Link>
                  <p className="text-sm text-white/80">
                    🔒 Secure checkout • Instant access • 30-day guarantee
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Related Products */}
        {allProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">You Might Also Like</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {allProducts.slice(0, 2).map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.slug}`}
                  className="card p-6 hover:scale-[1.02] transition-transform"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{related.name}</h3>
                  <p className="text-gray-600 mb-4">{related.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-gray-900">${related.price}</span>
                    <span className="text-indigo-600 font-bold">View details →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
