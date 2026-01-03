'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toolsMenu = [
    { href: '/planner', label: 'Planner', desc: 'Get personalized recommendations' },
    { href: '/formats', label: 'Formats Library', desc: '6 proven formats' },
    { href: '/hooks', label: 'Hook Generator', desc: 'Create compelling openings' },
    { href: '/scripts', label: 'Script Generator', desc: 'Complete 30-45s scripts' },
  ]

  const optimizeMenu = [
    { href: '/seo-optimizer', label: 'SEO Optimizer', desc: 'Titles, descriptions, tags' },
    { href: '/content-ideas', label: 'Content Ideas', desc: 'Never run out of topics' },
    { href: '/feedback', label: 'Performance Feedback', desc: 'Analyze your results' },
  ]

  const manageMenu = [
    { href: '/calendar', label: 'Content Calendar', desc: 'Plan your uploads' },
    { href: '/checklist', label: 'Pre-Publish Checklist', desc: 'Quality assurance' },
    { href: '/analytics', label: 'Analytics Insights', desc: 'Data-driven decisions' },
  ]

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-gray-200/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                ShortsOS
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === '/dashboard'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              Dashboard
            </Link>

            {/* Tools Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown('tools')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                  pathname.startsWith('/planner') || pathname.startsWith('/formats') || 
                  pathname.startsWith('/hooks') || pathname.startsWith('/scripts')
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                Tools
                <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'tools' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-down">
                  <div className="p-2">
                    {toolsMenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-3 rounded-lg hover:bg-primary-50 transition-all duration-200 group"
                      >
                        <div className="font-semibold text-gray-900 group-hover:text-primary-600">{item.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Optimize Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown('optimize')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                  pathname.startsWith('/seo-optimizer') || pathname.startsWith('/content-ideas') || 
                  pathname.startsWith('/feedback')
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                Optimize
                <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'optimize' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-down">
                  <div className="p-2">
                    {optimizeMenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-3 rounded-lg hover:bg-primary-50 transition-all duration-200 group"
                      >
                        <div className="font-semibold text-gray-900 group-hover:text-primary-600">{item.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Manage Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown('manage')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                  pathname.startsWith('/calendar') || pathname.startsWith('/checklist') || 
                  pathname.startsWith('/analytics')
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                Manage
                <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'manage' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-down">
                  <div className="p-2">
                    {manageMenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-3 rounded-lg hover:bg-primary-50 transition-all duration-200 group"
                      >
                        <div className="font-semibold text-gray-900 group-hover:text-primary-600">{item.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === '/pricing'
                  ? 'bg-accent-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-accent-50 hover:text-accent-600'
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/dashboard"
              className="ml-2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 animate-slide-down">
            <Link href="/dashboard" className="block px-4 py-3 rounded-lg hover:bg-primary-50">Dashboard</Link>
            <div className="px-4 py-2 font-semibold text-gray-500 text-sm">Tools</div>
            {toolsMenu.map((item) => (
              <Link key={item.href} href={item.href} className="block px-8 py-2 rounded-lg hover:bg-primary-50 text-sm">
                {item.label}
              </Link>
            ))}
            <div className="px-4 py-2 font-semibold text-gray-500 text-sm">Optimize</div>
            {optimizeMenu.map((item) => (
              <Link key={item.href} href={item.href} className="block px-8 py-2 rounded-lg hover:bg-primary-50 text-sm">
                {item.label}
              </Link>
            ))}
            <div className="px-4 py-2 font-semibold text-gray-500 text-sm">Manage</div>
            {manageMenu.map((item) => (
              <Link key={item.href} href={item.href} className="block px-8 py-2 rounded-lg hover:bg-primary-50 text-sm">
                {item.label}
              </Link>
            ))}
            <Link href="/pricing" className="block px-4 py-3 rounded-lg hover:bg-accent-50 font-semibold">Pricing</Link>
            <Link href="/dashboard" className="block px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold text-center">
              Get Started
            </Link>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenDropdown(null)}
          onMouseDown={(e) => e.preventDefault()}
        />
      )}
    </nav>
  )
}