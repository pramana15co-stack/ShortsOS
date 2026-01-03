import Link from 'next/link'

export const metadata = {
  title: 'About Pramana15 - ShortsOS',
  description: 'Learn about Pramana15, a company building practical tools for modern creators. Discover how Pramana15 helps YouTube Shorts creators succeed.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
            About <span className="gradient-text">Pramana15</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pramana15 builds practical tools for modern creators.
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {/* Who Pramana15 Is */}
          <div className="glass-effect rounded-2xl p-8 premium-shadow">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Who Pramana15 Is</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Pramana15 is a technology company focused on building practical, accessible tools for content creators. 
              The company specializes in creating software solutions that address real challenges faced by modern creators 
              in planning, optimizing, and growing their content.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              Pramana15's approach combines deep understanding of creator workflows with a commitment to simplicity, 
              ensuring that powerful tools remain accessible regardless of technical expertise or budget.
            </p>
          </div>

          {/* What Problem Pramana15 Solves */}
          <div className="glass-effect rounded-2xl p-8 premium-shadow">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">What Problem Pramana15 Solves</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              YouTube Shorts creators face a critical challenge: the need to plan, create, and optimize content quickly 
              and effectively, but existing tools fall short in several ways:
            </p>
            <ul className="space-y-3 text-gray-700 ml-6 list-disc">
              <li>Tools are often too complex, requiring extensive learning curves</li>
              <li>Pricing models create barriers for creators just starting out</li>
              <li>Most solutions are adapted from long-form content tools, not built for Shorts</li>
              <li>Lack of format-specific guidance and proven templates</li>
              <li>Overwhelming feature sets that distract from core needs</li>
            </ul>
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              Pramana15 addresses these gaps by providing purpose-built tools designed specifically for the YouTube Shorts format, 
              with a focus on simplicity, accessibility, and actionable insights.
            </p>
          </div>

          {/* Why This Product Exists */}
          <div className="glass-effect rounded-2xl p-8 premium-shadow">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Why ShortsOS Exists</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              ShortsOS was created because Pramana15 identified a fundamental disconnect between what creators need and 
              what existing tools provide. The platform exists to bridge that gap.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              ShortsOS represents Pramana15's commitment to making professional-grade planning and optimization tools 
              available to all creators, not just those with large budgets or technical expertise. The platform 
              demonstrates that powerful tools can be both simple and free, challenging the industry standard 
              of complex, expensive solutions.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              By focusing exclusively on YouTube Shorts, ShortsOS delivers format-specific insights, templates, 
              and workflows that generic content tools cannot provide. This specialization enables creators to 
              make better decisions faster, without the noise of irrelevant features.
            </p>
          </div>

          {/* Commitment to Creators */}
          <div className="glass-effect rounded-2xl p-8 premium-shadow">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Pramana15's Commitment to Creators</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Pramana15's commitment to creators is reflected in both product decisions and company values:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Free Core Features</h3>
                <p className="text-gray-600">
                  Essential planning and optimization tools remain free forever, ensuring access regardless of budget.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Creator-First Development</h3>
                <p className="text-gray-600">
                  Product decisions prioritize creator success over revenue optimization or feature bloat.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Transparent Communication</h3>
                <p className="text-gray-600">
                  Clear pricing, honest limitations, and open dialogue about product direction and decisions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Value Before Payment</h3>
                <p className="text-gray-600">
                  Creators experience value and see results before any payment is required, not after.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Continuous Improvement</h3>
                <p className="text-gray-600">
                  Regular updates based on creator feedback, with a focus on solving real problems, not adding features for their own sake.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">No Data Exploitation</h3>
                <p className="text-gray-600">
                  Creator data is protected, not monetized. Privacy and security are fundamental, not afterthoughts.
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg mt-6">
              This commitment extends beyond product features to how Pramana15 operates as a company: 
              transparent pricing, responsive support, and a genuine focus on helping creators succeed 
              rather than extracting maximum value from them.
            </p>
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

