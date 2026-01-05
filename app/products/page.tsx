import Link from 'next/link'
import { products } from '@/data/products'
import { testimonials } from '@/data/testimonials'

export default function ProductsPage() {
  const bundles = products.filter(p => p.type === 'bundle')
  const plans = products.filter(p => p.type === 'plan')
  const courses = products.filter(p => p.type === 'course')

  return (
    <main className="min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-indigo-200/50 rounded-full mb-8 shadow-lg">
            <span className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Built by Pramana</span>
          </div>
          <div className="accent-line mx-auto mb-6"></div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            Creator Packages & Bundles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Proven packages designed to help you succeed at every stage. Based on what's worked for thousands of creators.
          </p>
          
          {/* Success Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="card p-6 text-center">
              <div className="text-4xl font-extrabold text-gray-900 mb-2">10,000+</div>
              <div className="text-sm text-gray-600 font-medium">Creators using our packages</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-extrabold text-gray-900 mb-2">78%</div>
              <div className="text-sm text-gray-600 font-medium">Success rate</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-extrabold text-gray-900 mb-2">$1.2M+</div>
              <div className="text-sm text-gray-600 font-medium">Earned by creators using our methods</div>
            </div>
          </div>
        </div>

        {/* Bundles Section */}
        <section className="mb-20">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Complete Bundles</h2>
            <p className="text-lg text-gray-600">Everything you need in one package</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {bundles.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <div className={`card p-10 hover:scale-[1.02] transition-transform duration-300 h-full ${product.popular ? 'border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-white' : ''}`}>
                  {product.popular && (
                    <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold mb-6 shadow-lg">
                      {product.badge}
                    </div>
                  )}
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
                  
                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="text-5xl font-extrabold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {product.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
                      {product.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-xl font-extrabold text-gray-900">{stat.value}</div>
                          <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3 mb-8">
                    {product.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {product.features.length > 4 && (
                      <div className="text-sm text-gray-600 pt-2 font-medium">
                        +{product.features.length - 4} more features
                      </div>
                    )}
                  </div>

                  <div className="flex items-center text-indigo-600 font-bold text-base group-hover:translate-x-2 transition-transform duration-300">
                    <span>View details</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Plans Section */}
        <section className="mb-20">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Execution Plans</h2>
            <p className="text-lg text-gray-600">Step-by-step plans for specific goals</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <div className="card p-10 hover:scale-[1.02] transition-transform duration-300 h-full">
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
                  
                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="text-5xl font-extrabold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {product.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
                      {product.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-xl font-extrabold text-gray-900">{stat.value}</div>
                          <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3 mb-8">
                    {product.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center text-indigo-600 font-bold text-base group-hover:translate-x-2 transition-transform duration-300">
                    <span>View details</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Courses Section */}
        {courses.length > 0 && (
          <section className="mb-20">
            <div className="mb-10">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Courses</h2>
              <p className="text-lg text-gray-600">In-depth courses for advanced topics</p>
            </div>
            <div className="grid md:grid-cols-1 gap-8 max-w-2xl">
              {courses.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <div className="card p-10 hover:scale-[1.02] transition-transform duration-300">
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
                    
                    <div className="flex items-baseline gap-4 mb-8">
                      <span className="text-5xl font-extrabold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>

                    {product.stats && (
                      <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
                        {product.stats.map((stat, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-xl font-extrabold text-gray-900">{stat.value}</div>
                            <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-3 mb-8">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-gray-700">
                          <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center text-indigo-600 font-bold text-base group-hover:translate-x-2 transition-transform duration-300">
                      <span>View details</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">What Creators Are Saying</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.slice(0, 4).map((testimonial) => (
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
      </div>
    </main>
  )
}
