import Link from 'next/link'

export default function Dashboard() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Content Calendar"
          description="Plan and schedule your YouTube Shorts"
          href="/calendar"
          icon="📅"
          color="bg-blue-500"
        />
        <DashboardCard
          title="SEO Optimizer"
          description="Optimize titles, descriptions, and tags"
          href="/seo-optimizer"
          icon="🔍"
          color="bg-green-500"
        />
        <DashboardCard
          title="Content Ideas"
          description="Generate trending content ideas"
          href="/content-ideas"
          icon="💡"
          color="bg-yellow-500"
        />
        <DashboardCard
          title="Pre-Publish Checklist"
          description="Quality assurance before publishing"
          href="/checklist"
          icon="✅"
          color="bg-purple-500"
        />
        <DashboardCard
          title="Analytics Insights"
          description="Data-driven insights and decisions"
          href="/analytics"
          icon="📊"
          color="bg-red-500"
        />
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Quick Stats</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard label="Planned Videos" value="0" />
          <StatCard label="Published This Month" value="0" />
          <StatCard label="Avg. SEO Score" value="0%" />
          <StatCard label="Content Ideas" value="0" />
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
  color 
}: { 
  title: string
  description: string
  href: string
  icon: string
  color: string
}) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
      <div className="text-3xl font-bold text-primary-600 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}
