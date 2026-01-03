import Link from 'next/link'
import { formats } from '@/data/formats'

export default function FormatsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Shorts Formats Library
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Proven formats that work. Learn the structure, pacing, and scripts for each format 
          to create engaging YouTube Shorts.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formats.map((format) => (
          <Link key={format.slug} href={`/formats/${format.slug}`}>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer h-full flex flex-col">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                {format.name}
              </h2>
              <p className="text-gray-600 mb-4 flex-grow">
                {format.description}
              </p>
              <div className="mt-auto">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Best for:
                </div>
                <div className="flex flex-wrap gap-2">
                  {format.bestNiches.map((niche, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium"
                    >
                      {niche}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 text-primary-600 font-medium text-sm">
                Learn more →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Ready to Create?
        </h2>
        <p className="text-gray-600 mb-4">
          Pick a format, follow the template, and start creating engaging Shorts.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/planner"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Get Personalized Plan
          </Link>
          <Link
            href="/hooks"
            className="inline-block border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
          >
            Generate Hooks
          </Link>
          <Link
            href="/scripts"
            className="inline-block border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
          >
            Generate Scripts
          </Link>
        </div>
      </div>
    </main>
  )
}
