import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getFormatBySlug, formats } from '@/data/formats'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return formats.map((format) => ({
    slug: format.slug,
  }))
}

export default function FormatDetailPage({ params }: PageProps) {
  const format = getFormatBySlug(params.slug)

  if (!format) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/formats"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        ← Back to Formats Library
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          {format.name}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          {format.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {format.bestNiches.map((niche, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full font-medium"
            >
              {niche}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {/* Why It Works */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
            <span className="text-3xl mr-3">💡</span>
            Why This Format Works
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {format.whyItWorks}
          </p>
        </section>

        {/* Hook Structure */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
              <span className="text-3xl mr-3">🎣</span>
              Hook Structure (First 3 Seconds)
            </h2>
            <Link
              href="/hooks"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Generate Hooks →
            </Link>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            The first 3 seconds are critical. Here&apos;s how to structure your hook:
          </p>
          <ul className="space-y-3">
            {format.hookStructure.map((step, idx) => (
              <li key={idx} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-gray-700 flex-1">{step}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Script Template */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
              <span className="text-3xl mr-3">📝</span>
              Script Template
            </h2>
            <Link
              href="/scripts"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Generate Script →
            </Link>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            Use this template as a starting point. Customize the bracketed sections with your content:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary-500">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
              {format.scriptTemplate}
            </pre>
          </div>
        </section>

        {/* Pacing Guidelines */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
            <span className="text-3xl mr-3">⏱️</span>
            Pacing Guidelines
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Timing is everything in Shorts. Follow these pacing guidelines:
          </p>
          <ul className="space-y-3">
            {format.pacingGuidelines.map((guideline, idx) => (
              <li key={idx} className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2" />
                <span className="text-gray-700">{guideline}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
            <span className="text-3xl mr-3">⚠️</span>
            Common Beginner Mistakes
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Avoid these pitfalls to maximize your success with this format:
          </p>
          <ul className="space-y-3">
            {format.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start p-3 bg-red-50 border-l-4 border-red-400 rounded">
                <span className="text-red-600 mr-3 font-bold">✗</span>
                <span className="text-gray-800">{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Navigation */}
      <div className="mt-12 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link
            href="/formats"
            className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition text-center"
          >
            ← All Formats
          </Link>
          <Link
            href="/content-ideas"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition text-center"
          >
            Generate Ideas →
          </Link>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-3 font-medium">Next Steps:</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/planner"
              className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
            >
              Get personalized format recommendations
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/hooks"
              className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
            >
              Generate hooks for this format
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/scripts"
              className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
            >
              Create full script with this format
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
