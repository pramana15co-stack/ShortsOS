import Link from 'next/link'

export const metadata = {
  title: 'About Us - ShortsOS',
  description: 'Learn about ShortsOS - our mission to help YouTube Shorts creators succeed.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
            About <span className="gradient-text">ShortsOS</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're on a mission to help creators master YouTube Shorts without the overwhelm.
          </p>
        </div>

        <div className="space-y-8 mb-12">
          <div className="glass-effect rounded-2xl p-8 premium-shadow">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              YouTube Shorts creators face a unique challenge: they need to plan, create, and optimize content quickly, 
              but most tools are either too complex, too expensive, or don't understand the Shorts format. 
              ShortsOS was built to solve this problem.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              We believe every creator should have access to professional planning and optimization tools, 
              regardless of their budget or experience level. That's why our core features are free forever.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 premium-shadow">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">What Makes Us Different</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-primary-600 mr-3 text-xl">✓</span>
                <div>
                  <strong className="text-gray-900">100% Free Core Features</strong>
                  <p className="text-gray-600">No credit card required. No time limits. Start creating today.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3 text-xl">✓</span>
                <div>
                  <strong className="text-gray-900">Built for Shorts</strong>
                  <p className="text-gray-600">Every tool is designed specifically for YouTube Shorts, not adapted from long-form content tools.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3 text-xl">✓</span>
                <div>
                  <strong className="text-gray-900">No Overengineering</strong>
                  <p className="text-gray-600">Simple, focused tools that solve real problems without unnecessary complexity.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3 text-xl">✓</span>
                <div>
                  <strong className="text-gray-900">Transparent & Honest</strong>
                  <p className="text-gray-600">Clear pricing, honest communication, and no hidden fees or surprises.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="glass-effect rounded-2xl p-8 premium-shadow">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Creator-First</h3>
                <p className="text-gray-600">Every decision we make prioritizes what helps creators succeed.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Transparency</h3>
                <p className="text-gray-600">Clear communication, honest pricing, and open about our limitations.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Simplicity</h3>
                <p className="text-gray-600">Complex problems deserve simple solutions, not complex tools.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Value First</h3>
                <p className="text-gray-600">We believe you should see value before paying, not the other way around.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Start Creating →
          </Link>
        </div>
      </div>
    </main>
  )
}

