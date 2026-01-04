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
    <main className="min-h-screen bg-white container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/formats"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Formats Library
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
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
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
          <p className="text-gray-700 leading-relaxed mb-4">
            {format.whyItWorks}
          </p>
          
          {/* Video Examples Section */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              See This Format in Action
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              Watch these successful examples to understand how top creators use this format:
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 bg-white rounded border border-blue-200">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Search YouTube Shorts</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Search &quot;{format.name} shorts&quot; or &quot;{format.bestNiches[0]} {format.name}&quot; on YouTube to see real examples
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded border border-blue-200">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Study Top Performers</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Look for videos with 100K+ views using this format to understand what works
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 italic">
              💡 Pro Tip: Pay attention to the first 3 seconds, pacing, and how they structure the content
            </p>
          </div>
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
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
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
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
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

        {/* Success Tips */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
            <span className="text-3xl mr-3">✅</span>
            Pro Tips for Success
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">1. Hook Optimization</h3>
              <p className="text-sm text-gray-700">
                Your first 3 seconds determine if viewers stay. Use our <Link href="/hooks" className="text-gray-900 hover:underline font-medium">Hook Generator</Link> to create multiple variations and test which performs best.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">2. Consistency is Key</h3>
              <p className="text-sm text-gray-700">
                Post regularly using this format. Use our <Link href="/planner" className="text-gray-900 hover:underline font-medium">Planner</Link> to schedule your content and maintain consistency.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">3. Track Performance</h3>
              <p className="text-sm text-gray-700">
                Monitor which variations of this format perform best. Use our <Link href="/feedback" className="text-gray-900 hover:underline font-medium">Performance Feedback</Link> tool to analyze what works.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">4. Customize, Don&apos;t Copy</h3>
              <p className="text-sm text-gray-700">
                Use this format as a structure, but add your unique voice and perspective. Authenticity beats imitation every time.
              </p>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
            <span className="text-3xl mr-3">📚</span>
            Additional Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/hooks" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition">
              <h3 className="font-semibold text-gray-900 mb-2">Generate Hooks</h3>
              <p className="text-sm text-gray-600">Create compelling opening hooks specifically for this format</p>
            </Link>
            <Link href="/scripts" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition">
              <h3 className="font-semibold text-gray-900 mb-2">Create Full Script</h3>
              <p className="text-sm text-gray-600">Generate a complete script using this format structure</p>
            </Link>
            <Link href="/planner" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition">
              <h3 className="font-semibold text-gray-900 mb-2">Get Personalized Plan</h3>
              <p className="text-sm text-gray-600">Get format recommendations based on your niche and goals</p>
            </Link>
            <Link href="/content-ideas" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition">
              <h3 className="font-semibold text-gray-900 mb-2">Generate Content Ideas</h3>
              <p className="text-sm text-gray-600">Never run out of topics for this format</p>
            </Link>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="mt-12 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link
            href="/formats"
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition text-center"
          >
            ← All Formats
          </Link>
          <Link
            href="/content-ideas"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition text-center"
          >
            Generate Ideas →
          </Link>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-3 font-medium">Next Steps:</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/planner"
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
            >
              Get personalized format recommendations
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/hooks"
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
            >
              Generate hooks for this format
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/scripts"
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
            >
              Create full script with this format
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
