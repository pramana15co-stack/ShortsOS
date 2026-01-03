import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Master Your YouTube Shorts
          <span className="block text-primary-600 mt-2">Without the Overwhelm</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Plan smarter, optimize better, and grow faster. The lightweight tool that helps beginners 
          make the right decisions for their YouTube Shorts channel.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            href="/dashboard" 
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Get Started Free
          </Link>
          <Link 
            href="/features" 
            className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Everything You Need to Succeed
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Content Planning"
            description="Plan and schedule your Shorts with our intuitive calendar. Never miss an upload again."
            icon="📅"
          />
          <FeatureCard
            title="SEO Optimizer"
            description="Get instant feedback on titles, descriptions, and tags. Maximize your discoverability."
            icon="🔍"
          />
          <FeatureCard
            title="Content Ideas"
            description="Generate trending topics and content ideas based on your niche. Never run out of inspiration."
            icon="💡"
          />
          <FeatureCard
            title="Pre-Publish Checklist"
            description="Quality assurance checklist to ensure your Shorts are ready before hitting publish."
            icon="✅"
          />
          <FeatureCard
            title="Analytics Insights"
            description="Simple, actionable insights from your YouTube data. Make data-driven decisions."
            icon="📊"
          />
          <FeatureCard
            title="Zero Cost"
            description="No paid APIs, no video processing overhead. Lightweight and fast, always free to use."
            icon="💰"
          />
        </div>
      </section>

      {/* Problem Statement */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-2xl shadow-lg my-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          The Problem We Solve
        </h2>
        <div className="max-w-3xl mx-auto space-y-4 text-gray-700">
          <p className="text-lg">
            Starting a YouTube Shorts channel is overwhelming. Most beginners struggle with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-left max-w-xl mx-auto">
            <li>No clear strategy or content plan</li>
            <li>Inconsistent upload schedules</li>
            <li>Poor SEO optimization (titles, descriptions, tags)</li>
            <li>Ignoring analytics and missing growth opportunities</li>
            <li>No quality checklist before publishing</li>
          </ul>
          <p className="text-lg mt-6">
            <strong>ShortsOS</strong> solves all of this with a simple, focused tool that helps you 
            plan, optimize, and make better decisions—without the complexity of video editors or expensive AI tools.
          </p>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
