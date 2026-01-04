import Link from 'next/link'
import { formats } from '@/data/formats'

export default function FormatsPage() {
  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded mb-6">
            <span className="text-xs font-medium text-gray-700">Built by Pramana</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
            Shorts Formats Library
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Proven formats that work. Each format includes structure, pacing guidelines, and execution guides based on analysis of successful Shorts.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free to Access</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Proven Structures</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Execution Guides</span>
            </div>
          </div>
        </div>

        {/* Formats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {formats.map((format) => (
            <Link 
              key={format.slug} 
              href={`/formats/${format.slug}`}
              className="group block"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">
                  {format.name}
                </h2>
                <p className="text-gray-600 mb-4 flex-grow text-sm leading-relaxed">
                  {format.description}
                </p>
                <div className="mt-auto">
                  <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                    Best for
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {format.bestNiches.slice(0, 3).map((niche, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium"
                      >
                        {niche}
                      </span>
                    ))}
                    {format.bestNiches.length > 3 && (
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium">
                        +{format.bestNiches.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                    <span>View format guide</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            Ready to Create?
          </h2>
          <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
            Use these tools to plan and create your Shorts content using the formats above.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link
              href="/planner"
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-gray-900 mb-1">Get Personalized Plan</div>
              <div className="text-sm text-gray-600">Format recommendations for your niche</div>
            </Link>
            <Link
              href="/hooks"
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">🎣</div>
              <div className="font-semibold text-gray-900 mb-1">Generate Hooks</div>
              <div className="text-sm text-gray-600">Create compelling opening hooks</div>
            </Link>
            <Link
              href="/scripts"
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">📝</div>
              <div className="font-semibold text-gray-900 mb-1">Generate Scripts</div>
              <div className="text-sm text-gray-600">Create structured scripts</div>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About These Formats</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Based on Data</h3>
              <p className="leading-relaxed">
                These formats are derived from analysis of successful YouTube Shorts. Each format includes proven structures, pacing guidelines, and common mistakes to avoid.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Stage-Aware</h3>
              <p className="leading-relaxed">
                Different formats work better at different creator stages. Use the Content Planner to get format recommendations tailored to your experience level and goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
