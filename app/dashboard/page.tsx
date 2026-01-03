import Link from 'next/link'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
            Welcome to ShortsOS, <span className="gradient-text">Built by Pramana</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Everything you need to plan, create, and grow your YouTube Shorts channel. Build a successful channel with proven strategies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <DashboardCard
            title="Smart Planner"
            description="Get personalized format recommendations"
            href="/planner"
            icon="🎯"
            color="from-primary-500 to-primary-600"
            delay="0.1s"
          />
          <DashboardCard
            title="Format Library"
            description="6 proven formats that generate revenue"
            href="/formats"
            icon="📚"
            color="from-accent-500 to-accent-600"
            delay="0.2s"
          />
          <DashboardCard
            title="Hook Generator"
            description="Create viral-worthy opening hooks"
            href="/hooks"
            icon="🎣"
            color="from-blue-500 to-cyan-600"
            delay="0.3s"
          />
          <DashboardCard
            title="Script Generator"
            description="Complete scripts ready to film"
            href="/scripts"
            icon="📝"
            color="from-purple-500 to-pink-600"
            delay="0.4s"
          />
          <DashboardCard
            title="SEO Optimizer"
            description="Maximize discoverability & views"
            href="/seo-optimizer"
            icon="🔍"
            color="from-green-500 to-emerald-600"
            delay="0.5s"
          />
          <DashboardCard
            title="Content Ideas"
            description="Never run out of trending topics"
            href="/content-ideas"
            icon="💡"
            color="from-orange-500 to-red-600"
            delay="0.6s"
          />
          <DashboardCard
            title="Content Calendar"
            description="Plan and schedule your uploads"
            href="/calendar"
            icon="📅"
            color="from-indigo-500 to-blue-600"
            delay="0.7s"
          />
          <DashboardCard
            title="Pre-Publish Checklist"
            description="Quality assurance before publishing"
            href="/checklist"
            icon="✅"
            color="from-teal-500 to-cyan-600"
            delay="0.8s"
          />
          <DashboardCard
            title="Performance Feedback"
            description="Analyze results & improve"
            href="/feedback"
            icon="📊"
            color="from-rose-500 to-pink-600"
            delay="0.9s"
          />
          <DashboardCard
            title="Creator Tools"
            description="Best tools for video & scripts"
            href="/tools"
            icon="🛠️"
            color="from-indigo-500 to-purple-600"
            delay="1.0s"
          />
        </div>

        {/* Quick Stats */}
        <div className="glass-effect rounded-2xl p-8 premium-shadow animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Progress</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <StatCard label="Planned Videos" value="0" />
            <StatCard label="Published This Month" value="0" />
            <StatCard label="Avg. SEO Score" value="0%" />
            <StatCard label="Content Ideas" value="0" />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="glass-effect rounded-2xl p-8 premium-shadow inline-block">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to Scale?</h3>
            <p className="text-gray-600 mb-6">Upgrade to Pro for advanced features and faster growth</p>
            <Link
              href="/pricing"
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              View Pricing →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function DashboardCard({ 
  title, 
  description, 
  href, 
  icon, 
  color,
  delay
}: { 
  title: string
  description: string
  href: string
  icon: string
  color: string
  delay: string
}) {
  return (
    <Link 
      href={href}
      className="group glass-effect rounded-2xl p-6 hover-lift premium-shadow block"
      style={{ animationDelay: delay }}
    >
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="mt-4 text-primary-600 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
        Open →
      </div>
    </Link>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl border border-primary-100">
      <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </div>
  )
}