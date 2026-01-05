import Link from 'next/link'
import { formats } from '@/data/formats'

export default function FormatsPage() {
  return (
    <main className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="accent-line mx-auto mb-8"></div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-gray-900">
            Shorts Formats Library
          </h1>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Proven formats that work. Each format includes structure, pacing guidelines, and execution guides based on analysis of successful Shorts.
          </p>
        </div>

        {/* Formats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {formats.map((format) => (
            <Link 
              key={format.slug} 
              href={`/formats/${format.slug}`}
              className="group card-feature block"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gradient transition-colors">
                {format.name}
              </h2>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                {format.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {format.bestNiches.slice(0, 3).map((niche, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-100"
                  >
                    {niche}
                  </span>
                ))}
                {format.bestNiches.length > 3 && (
                  <span className="px-4 py-2 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 text-xs font-bold rounded-xl border border-gray-200">
                    +{format.bestNiches.length - 3} more
                  </span>
                )}
              </div>
              <div className="flex items-center text-base font-bold text-gray-900 group-hover:text-gradient group-hover:translate-x-2 transition-all duration-300">
                <span>View format guide</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="gradient-bg rounded-3xl p-12 md:p-16 mb-20 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">Ready to Create?</h2>
            <p className="text-xl text-white/90 mb-12 text-center max-w-3xl mx-auto">
              Use these tools to plan and create your Shorts content using the formats above.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                href="/planner"
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                <div className="text-5xl mb-6">🎯</div>
                <div className="font-bold text-lg mb-3">Get Personalized Plan</div>
                <div className="text-sm text-white/80">Format recommendations for your niche</div>
              </Link>
              <Link
                href="/hooks"
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                <div className="text-5xl mb-6">🎣</div>
                <div className="font-bold text-lg mb-3">Generate Hooks</div>
                <div className="text-sm text-white/80">Create compelling opening hooks</div>
              </Link>
              <Link
                href="/scripts"
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                <div className="text-5xl mb-6">📝</div>
                <div className="font-bold text-lg mb-3">Generate Scripts</div>
                <div className="text-sm text-white/80">Create structured scripts</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="card">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-10">About These Formats</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Based on Data</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                These formats are derived from analysis of successful YouTube Shorts. Each format includes proven structures, pacing guidelines, and common mistakes to avoid.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Stage-Aware</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Different formats work better at different creator stages. Use the Content Planner to get format recommendations tailored to your experience level and goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
