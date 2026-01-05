import Link from 'next/link'
import { formats } from '@/data/formats'

export default function FormatsPage() {
  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-1 bg-gray-900 rounded-full mx-auto mb-6"></div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Shorts Formats Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Proven formats that work. Each format includes structure, pacing guidelines, and execution guides based on analysis of successful Shorts.
          </p>
        </div>

        {/* Formats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {formats.map((format) => (
            <Link 
              key={format.slug} 
              href={`/formats/${format.slug}`}
              className="group card-feature block"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-gray-700 transition-colors">
                {format.name}
              </h2>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {format.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {format.bestNiches.slice(0, 3).map((niche, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg"
                  >
                    {niche}
                  </span>
                ))}
                {format.bestNiches.length > 3 && (
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg">
                    +{format.bestNiches.length - 3} more
                  </span>
                )}
              </div>
              <div className="flex items-center text-sm font-semibold text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
                <span>View format guide</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Ready to Create?</h2>
          <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">
            Use these tools to plan and create your Shorts content using the formats above.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/planner"
              className="card text-center hover:scale-105 transition-transform"
            >
              <div className="text-3xl mb-4">🎯</div>
              <div className="font-bold text-gray-900 mb-2">Get Personalized Plan</div>
              <div className="text-sm text-gray-600">Format recommendations for your niche</div>
            </Link>
            <Link
              href="/hooks"
              className="card text-center hover:scale-105 transition-transform"
            >
              <div className="text-3xl mb-4">🎣</div>
              <div className="font-bold text-gray-900 mb-2">Generate Hooks</div>
              <div className="text-sm text-gray-600">Create compelling opening hooks</div>
            </Link>
            <Link
              href="/scripts"
              className="card text-center hover:scale-105 transition-transform"
            >
              <div className="text-3xl mb-4">📝</div>
              <div className="font-bold text-gray-900 mb-2">Generate Scripts</div>
              <div className="text-sm text-gray-600">Create structured scripts</div>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="card">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">About These Formats</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Based on Data</h3>
              <p className="text-gray-600 leading-relaxed">
                These formats are derived from analysis of successful YouTube Shorts. Each format includes proven structures, pacing guidelines, and common mistakes to avoid.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Stage-Aware</h3>
              <p className="text-gray-600 leading-relaxed">
                Different formats work better at different creator stages. Use the Content Planner to get format recommendations tailored to your experience level and goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
