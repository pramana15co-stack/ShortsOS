import Link from 'next/link'
import { products } from '@/data/products'
import { testimonials } from '@/data/testimonials'

export default function ProductsPage() {
  const bundles = products.filter(p => p.type === 'bundle')
  const plans = products.filter(p => p.type === 'plan')
  const courses = products.filter(p => p.type === 'course')

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded mb-6">
            <span className="text-xs font-medium text-gray-700">Built by Pramana</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
            Creator Packages & Bundles
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Proven packages designed to help you succeed at every stage. Based on what's worked for thousands of creators.
          </p>
          
          {/* Success Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-sm text-gray-600">Creators using our packages</div>
            </div>
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">78%</div>
              <div className="text-sm text-gray-600">Success rate</div>
            </div>
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">$1.2M+</div>
              <div className="text-sm text-gray-600">Earned by creators using our methods</div>
            </div>
          </div>
        </div>

        {/* Bundles Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">Bundles</h2>
              <p className="text-gray-600">Complete packages with everything you need</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {bundles.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <div className={`bg-white border-2 rounded-lg p-8 hover:shadow-lg transition-all h-full ${product.popular ? 'border-gray-900' : 'border-gray-200'}`}>
                  {product.popular && (
                    <div className="inline-block bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium mb-4">
                      {product.badge}
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {product.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                      {product.stats.map((stat, idx) => (
                        <div key={idx}>
                          <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                          <div className="text-xs text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2 mb-6">
                    {product.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                    {product.features.length > 4 && (
                      <div className="text-sm text-gray-600 pt-2">
                        +{product.features.length - 4} more features
                      </div>
                    )}
                  </div>

                  <div className="flex items-center text-gray-900 font-medium">
                    <span>View details</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Plans Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">Execution Plans</h2>
              <p className="text-gray-600">Step-by-step plans for specific goals</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all h-full">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {product.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                      {product.stats.map((stat, idx) => (
                        <div key={idx}>
                          <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                          <div className="text-xs text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2 mb-6">
                    {product.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center text-gray-900 font-medium">
                    <span>View details</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Courses Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">Courses</h2>
              <p className="text-gray-600">In-depth courses for advanced topics</p>
            </div>
          </div>
          <div className="grid md:grid-cols-1 gap-6 max-w-2xl">
            {courses.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {product.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                      {product.stats.map((stat, idx) => (
                        <div key={idx}>
                          <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                          <div className="text-xs text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2 mb-6">
                    {product.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center text-gray-900 font-medium">
                    <span>View details</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">What Creators Are Saying</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.slice(0, 4).map((testimonial) => (
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
      </div>
    </main>
  )
}


