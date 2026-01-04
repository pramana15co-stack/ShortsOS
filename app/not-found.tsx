import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-extrabold text-primary-600 mb-4">404</h1>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Go to Homepage
          </Link>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link
              href="/formats"
              className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition"
            >
              Browse Formats
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/tools"
              className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition"
            >
              Creator Tools
            </Link>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-900 mb-3">Popular Pages:</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <Link href="/planner" className="text-primary-600 hover:text-primary-700 hover:underline">
              → Content Planner
            </Link>
            <Link href="/hooks" className="text-primary-600 hover:text-primary-700 hover:underline">
              → Hook Generator
            </Link>
            <Link href="/scripts" className="text-primary-600 hover:text-primary-700 hover:underline">
              → Script Generator
            </Link>
            <Link href="/pricing" className="text-primary-600 hover:text-primary-700 hover:underline">
              → Pricing
            </Link>
            <Link href="/about" className="text-primary-600 hover:text-primary-700 hover:underline">
              → About Pramana15
            </Link>
            <Link href="/support" className="text-primary-600 hover:text-primary-700 hover:underline">
              → Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}


