import Link from 'next/link'
import { formats } from '@/data/formats'

export default function FormatsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Shorts Formats Library
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Proven formats that work. Each format includes structure, pacing guidelines, and execution guides based on analysis of successful Shorts.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-gray-700">Free to Access</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-gray-700">Proven Structures</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-gray-700">Execution Guides</span>
            </div>
          </div>
        </div>

        {/* Formats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {formats.map((format) => (
            <Link 
              key={format.slug} 
              href={`/formats/${format.slug}`}
              className="group block"
            >
              <div className="card-hover h-full flex flex-col">
                <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                  {format.name}
                </h2>
                <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">
                  {format.description}
                </p>
                <div className="mt-auto">
                  <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                    Best for
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {format.bestNiches.slice(0, 3).map((niche, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                      >
                        {niche}
                      </span>
                    ))}
                    {format.bestNiches.length > 3 && (
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                        +{format.bestNiches.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                    <span>View format guide</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            Ready to Create?
          </h2>
          <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto text-lg">
            Use these tools to plan and create your Shorts content using the formats above.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link
              href="/planner"
              className="card-hover text-center p-6"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="font-bold text-gray-900 mb-2">Get Personalized Plan</div>
              <div className="text-sm text-gray-600">Format recommendations for your niche</div>
            </Link>
            <Link
              href="/hooks"
              className="card-hover text-center p-6"
            >
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="font-bold text-gray-900 mb-2">Generate Hooks</div>
              <div className="text-sm text-gray-600">Create compelling opening hooks</div>
            </Link>
            <Link
              href="/scripts"
              className="card-hover text-center p-6"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="font-bold text-gray-900 mb-2">Generate Scripts</div>
              <div className="text-sm text-gray-600">Create structured scripts</div>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About These Formats</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Based on Data</h3>
              <p className="text-gray-700 leading-relaxed">
                These formats are derived from analysis of successful YouTube Shorts. Each format includes proven structures, pacing guidelines, and common mistakes to avoid.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Stage-Aware</h3>
              <p className="text-gray-700 leading-relaxed">
                Different formats work better at different creator stages. Use the Content Planner to get format recommendations tailored to your experience level and goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
