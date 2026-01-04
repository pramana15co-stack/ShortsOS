import Link from 'next/link'
import { formats } from '@/data/formats'

export default function FormatsPage() {
  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-medium mb-6 text-gray-900">
            Shorts Formats Library
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Proven formats that work. Each format includes structure, pacing guidelines, and execution guides based on analysis of successful Shorts.
          </p>
        </div>

        {/* Formats Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {formats.map((format) => (
            <Link 
              key={format.slug} 
              href={`/formats/${format.slug}`}
              className="group block border-b border-gray-200 pb-8 hover:border-gray-400 transition-colors"
            >
              <h2 className="text-xl font-medium mb-4 text-gray-900">
                {format.name}
              </h2>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {format.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {format.bestNiches.slice(0, 3).map((niche, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium"
                  >
                    {niche}
                  </span>
                ))}
                {format.bestNiches.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium">
                    +{format.bestNiches.length - 3} more
                  </span>
                )}
              </div>
              <div className="flex items-center text-sm font-medium text-gray-900 group-hover:underline">
                <span>View format guide</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gray-200 pt-16 mb-16">
          <h2 className="text-2xl font-medium text-gray-900 mb-8">Ready to Create?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link
              href="/planner"
              className="block"
            >
              <div className="font-medium text-gray-900 mb-2">Get Personalized Plan</div>
              <div className="text-sm text-gray-600">Format recommendations for your niche</div>
            </Link>
            <Link
              href="/hooks"
              className="block"
            >
              <div className="font-medium text-gray-900 mb-2">Generate Hooks</div>
              <div className="text-sm text-gray-600">Create compelling opening hooks</div>
            </Link>
            <Link
              href="/scripts"
              className="block"
            >
              <div className="font-medium text-gray-900 mb-2">Generate Scripts</div>
              <div className="text-sm text-gray-600">Create structured scripts</div>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-medium text-gray-900 mb-8">About These Formats</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Based on Data</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                These formats are derived from analysis of successful YouTube Shorts. Each format includes proven structures, pacing guidelines, and common mistakes to avoid.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Stage-Aware</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Different formats work better at different creator stages. Use the Content Planner to get format recommendations tailored to your experience level and goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
