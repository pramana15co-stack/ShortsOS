export default function Features() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          Everything You Need to Succeed
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          ShortsOS is designed specifically for YouTube Shorts creators who want to grow 
          their channel without the complexity of heavy tools.
        </p>
      </div>

      <div className="space-y-20">
        <FeatureSection
          title="Content Planning Calendar"
          description="Never miss an upload again. Plan your content weeks in advance with our intuitive calendar interface."
          features={[
            'Visual calendar view of all scheduled content',
            'Track video status (planned, draft, published)',
            'Easy drag-and-drop scheduling',
            'Monthly and weekly views',
          ]}
          icon="📅"
        />

        <FeatureSection
          title="SEO Optimizer"
          description="Maximize your discoverability with instant feedback on titles, descriptions, and tags."
          features={[
            'Real-time SEO scoring for titles (30-60 character optimization)',
            'Description analysis with keyword suggestions',
            'Tag optimization recommendations',
            'Overall SEO score with actionable feedback',
          ]}
          icon="🔍"
        />

        <FeatureSection
          title="Content Ideas Generator"
          description="Never run out of content ideas. Generate trending topics based on your niche."
          features={[
            '10+ trending categories to choose from',
            'Customizable templates for your niche',
            'Save and organize your favorite ideas',
            'Tag suggestions for each idea',
          ]}
          icon="💡"
        />

        <FeatureSection
          title="Pre-Publish Checklist"
          description="Ensure quality before hitting publish. Our comprehensive checklist covers all aspects."
          features={[
            '15+ quality checkpoints',
            'Organized by category (Format, Quality, SEO, etc.)',
            'Progress tracking with completion percentage',
            'Visual feedback on readiness',
          ]}
          icon="✅"
        />

        <FeatureSection
          title="Analytics Insights"
          description="Make data-driven decisions with simple, actionable insights from your channel."
          features={[
            'Key metrics dashboard (views, subscribers, watch time)',
            'Trend analysis and recommendations',
            'Actionable insights for improvement',
            'Timeframe selection (7d, 30d, 90d)',
          ]}
          icon="📊"
        />
      </div>

      <div className="mt-20 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Channel?</h2>
        <p className="text-xl mb-8 opacity-90">
          Start planning, optimizing, and making better decisions today.
        </p>
        <a
          href="/dashboard"
          className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Get Started Free
        </a>
      </div>
    </main>
  )
}

function FeatureSection({
  title,
  description,
  features,
  icon,
}: {
  title: string
  description: string
  features: string[]
  icon: string
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1">
        <div className="text-6xl mb-4">{icon}</div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
        <p className="text-lg text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-green-500 mr-3 text-xl">✓</span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}



