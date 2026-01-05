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
  const isCompleteBundle = product?.slug === 'complete-shorts-bundle'

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8 text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        {/* Header */}
        <div className="mb-12">
          {product.popular && (
            <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              {product.badge}
            </div>
          )}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            {product.name}
          </h1>
          <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
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
            <div className="grid grid-cols-3 gap-6 mb-12 pb-8 border-b border-gray-200">
              {product.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-extrabold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-10">
            {/* Outcomes */}
            <section>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">What You'll Achieve</h2>
              <div className="card p-8">
                <ul className="space-y-4">
                  {product.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
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
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">What's Included</h2>
              <div className="card p-8">
                <ul className="space-y-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Complete Bundle Specific Content */}
            {isCompleteBundle && (
              <>
                {/* Affiliate Marketing Section */}
                <section>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Affiliate Marketing Guide</h2>
                  <div className="card p-8">
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Learn how to monetize your Shorts through affiliate marketing. This comprehensive guide covers everything from choosing the right products to creating compelling affiliate content.
                    </p>
                    <div className="space-y-4">
                      <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                        <h3 className="font-bold text-gray-900 mb-3">What's Covered:</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-3">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>How to choose affiliate products that align with your niche</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>Strategies for naturally integrating affiliate links into Shorts</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>Best practices for disclosure and compliance</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>How to track and optimize affiliate performance</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>Case studies from creators earning $500-$5,000+ monthly</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Videos Per Day Strategy */}
                <section>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Videos Per Day Strategy</h2>
                  <div className="card p-8">
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Understand exactly how many videos to post per day based on your creator stage, goals, and capacity. This isn't about posting more—it's about posting strategically.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                        <h3 className="font-bold text-gray-900 mb-3">Beginners (0-1K subs)</h3>
                        <p className="text-gray-700 mb-3"><strong>2-3 videos per week</strong></p>
                        <p className="text-sm text-gray-600">Focus on quality over quantity. Build consistency first, then scale.</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                        <h3 className="font-bold text-gray-900 mb-3">Growing (1K-10K subs)</h3>
                        <p className="text-gray-700 mb-3"><strong>3-5 videos per week</strong></p>
                        <p className="text-sm text-gray-600">Increase frequency as you establish what works. Test different posting times.</p>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                        <h3 className="font-bold text-gray-900 mb-3">Scaling (10K+ subs)</h3>
                        <p className="text-gray-700 mb-3"><strong>5-7 videos per week</strong></p>
                        <p className="text-sm text-gray-600">Maximum algorithm exposure. Requires efficient workflows and systems.</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                        <h3 className="font-bold text-gray-900 mb-3">Best Posting Times</h3>
                        <p className="text-gray-700 mb-3"><strong>Peak hours guide included</strong></p>
                        <p className="text-sm text-gray-600">Data-driven insights on when your audience is most active.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Tools Directory */}
                <section>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Curated Tools Directory</h2>
                  <div className="card p-8">
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Save hours of research. We've tested and curated the best tools for Shorts creators—from free options to premium solutions.
                    </p>
                    <div className="space-y-4">
                      <div className="border-l-4 border-indigo-500 pl-6">
                        <h3 className="font-bold text-gray-900 mb-2">Video Editing Tools</h3>
                        <p className="text-gray-700 mb-2">Free: CapCut, DaVinci Resolve | Paid: Final Cut Pro, Premiere Pro</p>
                        <p className="text-sm text-gray-600">Detailed comparison, pricing, and when to upgrade.</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-6">
                        <h3 className="font-bold text-gray-900 mb-2">Thumbnail Creation</h3>
                        <p className="text-gray-700 mb-2">Free: Canva, Photopea | Paid: Photoshop, Figma</p>
                        <p className="text-sm text-gray-600">Templates and best practices for Shorts thumbnails.</p>
                      </div>
                      <div className="border-l-4 border-pink-500 pl-6">
                        <h3 className="font-bold text-gray-900 mb-2">Script Writing & Planning</h3>
                        <p className="text-gray-700 mb-2">Free: Notion, Google Docs | Paid: Scrivener, Final Draft</p>
                        <p className="text-sm text-gray-600">Tools to streamline your content planning workflow.</p>
                      </div>
                      <div className="border-l-4 border-emerald-500 pl-6">
                        <h3 className="font-bold text-gray-900 mb-2">Analytics & Tracking</h3>
                        <p className="text-gray-700 mb-2">Free: YouTube Analytics | Paid: TubeBuddy, VidIQ</p>
                        <p className="text-sm text-gray-600">How to use analytics tools to make data-driven decisions.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* Testimonials */}
            {productTestimonials.length > 0 && (
              <section>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">What Creators Say</h2>
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
                      <p className="text-lg text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-600">{testimonial.role}</div>
                        </div>
                        {testimonial.verified && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">
                            Verified
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
          </div>

          {/* Sidebar - Purchase Card */}
          <div className="md:col-span-1">
            <div className="card p-8 sticky top-8 border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/30 to-white">
              <div className="text-center mb-8">
                <div className="text-5xl font-extrabold text-gray-900 mb-3">${product.price}</div>
                {product.originalPrice && (
                  <>
                    <div className="text-2xl text-gray-400 line-through mb-2">${product.originalPrice}</div>
                    <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">
                      Save ${product.originalPrice - product.price}
                    </div>
                  </>
                )}
                <div className="text-sm text-gray-600 font-medium">One-time payment</div>
              </div>

              <button className="w-full btn-primary py-5 text-lg mb-6">
                Get {product.name}
              </button>

              <div className="space-y-4 text-sm text-gray-700 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Instant access to all materials</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Lifetime access & updates</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">30-day money-back guarantee</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center font-medium">
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
