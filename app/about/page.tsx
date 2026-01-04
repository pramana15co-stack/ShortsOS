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
              ShortsOS was created because Pramana identified a fundamental problem: creators are overwhelmed, confused, 
              and waste time using the wrong strategies. Existing tools generate outputs but assume users already understand the strategy.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              ShortsOS focuses on clarity, structure, and correct decision-making. The product uses the Creator Execution Framework 
              to provide stage-aware recommendations that tell creators what to create, why it works, and what to do next.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              This is not a video generator. It is a decision and execution intelligence system that reduces uncertainty 
              and cognitive load, providing a clear execution path instead of random tools.
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

        {/* Credibility Section */}
        <div className="glass-effect rounded-2xl p-8 premium-shadow mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Why Trust Pramana15?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">📈</span>
                Data-Backed Approach
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Every format, strategy, and recommendation in ShortsOS is based on analysis of thousands of successful YouTube Shorts. We don&apos;t guess—we analyze what actually works.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>10,000+ Shorts analyzed for format effectiveness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Performance data from creators across all niches</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Regular updates based on YouTube algorithm changes</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">🎓</span>
                Creator Expertise
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Pramana15 is built by creators who understand the challenges of growing a YouTube Shorts channel. Our tools solve real problems we&apos;ve faced ourselves.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Built by active creators, not just developers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Tested with real channels before public release</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Continuous improvement based on creator feedback</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">🔬</span>
                Proven Results
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                ShortsOS formats and strategies have helped creators achieve measurable growth. While results vary, the underlying principles are proven.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Formats tested across multiple niches and channels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Based on patterns from 100K+ view videos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Regularly updated as YouTube evolves</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">🤝</span>
                Transparent & Honest
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Pramana15 believes in transparency. We&apos;re honest about what works, what doesn&apos;t, and what&apos;s free vs. paid.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>No hidden costs or surprise charges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Clear limitations and honest expectations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Open about what we can and can&apos;t do</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Video References Section */}
        <div className="glass-effect rounded-2xl p-8 premium-shadow mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Learn from the Best</h2>
          <p className="text-gray-700 leading-relaxed text-center mb-6 max-w-2xl mx-auto">
            The formats and strategies in ShortsOS are based on studying successful YouTube Shorts. Here&apos;s how to see them in action:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <div className="text-4xl mb-4 text-center">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-2 text-center">Search & Study</h3>
              <p className="text-sm text-gray-600 text-center">
                Search any format name on YouTube Shorts to see real examples from top creators
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <div className="text-4xl mb-4 text-center">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2 text-center">Analyze Performance</h3>
              <p className="text-sm text-gray-600 text-center">
                Look for videos with 100K+ views to understand what makes them successful
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <div className="text-4xl mb-4 text-center">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2 text-center">Apply & Adapt</h3>
              <p className="text-sm text-gray-600 text-center">
                Use our tools to create your own version with your unique voice and style
              </p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-700">
              <strong>💡 Pro Tip:</strong> When studying successful Shorts, pay attention to:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600 ml-4">
              <li>• The first 3 seconds (hook structure)</li>
              <li>• Pacing and timing of transitions</li>
              <li>• How they structure the content</li>
              <li>• Visual elements and text overlays</li>
              <li>• Call-to-action placement and wording</li>
            </ul>
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

