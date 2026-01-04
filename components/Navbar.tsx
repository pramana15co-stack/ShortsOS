'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/app/providers/AuthProvider'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  // Consolidated menu items - separate by auth requirement
  const publicTools = [
    { href: '/formats', label: 'Formats' },
    { href: '/hooks', label: 'Hooks' },
    { href: '/seo-optimizer', label: 'SEO Optimizer' },
    { href: '/content-ideas', label: 'Content Ideas' },
  ]

  const authTools = [
    { href: '/planner', label: 'Planner' },
    { href: '/scripts', label: 'Scripts' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/checklist', label: 'Checklist' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/feedback', label: 'Feedback' },
  ]

  const allTools = user ? [...publicTools, ...authTools] : publicTools

  const resources = [
    { href: '/tools', label: 'Creator Tools' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg blur-sm opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-primary-600 to-accent-600 text-white px-3 py-1.5 rounded-lg font-bold text-lg tracking-tight">
                ShortsOS
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Primary navigation */}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/planner"
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive('/planner')
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  Planner
                </Link>
                <Link
                  href="/formats"
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive('/formats')
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  Formats
                </Link>
              </>
            ) : (
              <Link
                href="/formats"
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive('/formats')
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Formats
              </Link>
            )}

                {/* Tools Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('tools')}
                    className={`px-3 py-1.5 text-sm font-medium transition-colors flex items-center gap-1 ${
                      allTools.some(item => isActive(item.href))
                        ? 'text-primary-600'
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    Tools
                    <svg 
                      className={`w-4 h-4 transition-transform ${openDropdown === 'tools' ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === 'tools' && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-1">
                      {allTools.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(item.href)
                              ? 'bg-primary-50 text-primary-600 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('resources')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors flex items-center gap-1 ${
                  resources.some(item => isActive(item.href))
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                More
                <svg 
                  className={`w-4 h-4 transition-transform ${openDropdown === 'resources' ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'resources' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-1">
                  {resources.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 flex items-center justify-center text-white text-xs font-semibold">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-xs text-gray-600 hidden xl:block max-w-[120px] truncate">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:shadow-md transition-all"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
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
          <div className="lg:hidden py-4 border-t border-gray-200 animate-slide-down">
            {user ? (
              <>
                <div className="px-4 py-3 border-b border-gray-100 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 flex items-center justify-center text-white font-semibold">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Signed in</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{user.email}</p>
                    </div>
                  </div>
                </div>
                <Link 
                  href="/dashboard" 
                  className={`block px-4 py-2.5 text-sm font-medium ${
                    isActive('/dashboard')
                      ? 'bg-primary-50 text-primary-600 border-l-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/planner" 
                  className={`block px-4 py-2.5 text-sm font-medium ${
                    isActive('/planner')
                      ? 'bg-primary-50 text-primary-600 border-l-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Planner
                </Link>
                <Link 
                  href="/formats" 
                  className={`block px-4 py-2.5 text-sm font-medium ${
                    isActive('/formats')
                      ? 'bg-primary-50 text-primary-600 border-l-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Formats
                </Link>
                {allTools.length > 0 && (
                  <>
                {allTools.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">
                      Tools
                    </div>
                    {allTools.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        className={`block px-6 py-2 text-sm ${
                          isActive(item.href)
                            ? 'bg-primary-50 text-primary-600 border-l-2 border-primary-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </>
                )}
              </>
            ) : (
              <>
                <Link 
                  href="/formats" 
                  className={`block px-4 py-2.5 text-sm font-medium ${
                    isActive('/formats')
                      ? 'bg-primary-50 text-primary-600 border-l-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Formats
                </Link>
                <Link 
                  href="/pricing" 
                  className={`block px-4 py-2.5 text-sm font-medium ${
                    isActive('/pricing')
                      ? 'bg-primary-50 text-primary-600 border-l-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Pricing
                </Link>
                {publicTools.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">
                      Tools
                    </div>
                    {publicTools.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        className={`block px-6 py-2 text-sm ${
                          isActive(item.href)
                            ? 'bg-primary-50 text-primary-600 border-l-2 border-primary-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </>
                )}
              </>
            )}
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">
              More
            </div>
            {resources.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`block px-4 py-2.5 text-sm ${
                  isActive(item.href)
                    ? 'bg-primary-50 text-primary-600 border-l-2 border-primary-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-4 mt-4 border-t border-gray-200 space-y-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-center"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/signup" 
                    className="block px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </nav>
  )
}
