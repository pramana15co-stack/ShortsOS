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

  const aiTools = [
    { href: '/prompt-studio', label: 'Prompt Studio' },
    { href: '/hook-caption-engine', label: 'Hook & Caption' },
    { href: '/post-processing', label: 'Post-Processing' },
    { href: '/export-instructions', label: 'Export Instructions' },
  ]

  const authTools = [
    { href: '/planner', label: 'Planner' },
    { href: '/scripts', label: 'Scripts' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/checklist', label: 'Checklist' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/feedback', label: 'Feedback' },
  ]

  const allTools = user ? [...publicTools, ...aiTools, ...authTools] : [...publicTools, ...aiTools]

  const resources = [
    { href: '/pricing', label: 'Pricing & Packages' },
    { href: '/tools', label: 'Creator Tools' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-200/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-extrabold text-gray-900 hover:opacity-80 transition-opacity flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-base font-bold">S</span>
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ShortsOS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Primary navigation */}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    isActive('/dashboard')
                      ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/planner"
                  className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    isActive('/planner')
                      ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Planner
                </Link>
                <Link
                  href="/formats"
                  className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    isActive('/formats')
                      ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Formats
                </Link>
              </>
            ) : (
              <Link
                href="/formats"
                className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  isActive('/formats')
                    ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Formats
              </Link>
            )}

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('tools')}
                className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  allTools.some(item => isActive(item.href))
                    ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Tools
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'tools' ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'tools' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl overflow-hidden py-2 z-50 shadow-2xl">
                  {allTools.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className={`block px-5 py-3 text-sm transition-all duration-300 ${
                        isActive(item.href)
                          ? 'text-indigo-600 font-semibold bg-indigo-50'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('resources')}
                className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  resources.some(item => isActive(item.href))
                    ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                More
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'resources' ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'resources' && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl overflow-hidden py-2 z-50 shadow-2xl">
                  {resources.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className={`block px-5 py-3 text-sm transition-all duration-300 ${
                        isActive(item.href)
                          ? 'text-indigo-600 font-semibold bg-indigo-50'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
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
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm text-gray-700 hidden xl:block max-w-[140px] truncate font-medium">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
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
            className="lg:hidden p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
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
          <div className="lg:hidden py-6 border-t border-gray-200 animate-fade-in-up bg-white/95 backdrop-blur-xl">
            {user ? (
              <>
                <div className="px-4 py-4 border-b border-gray-100 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Signed in</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{user.email}</p>
                    </div>
                  </div>
                </div>
                <Link 
                  href="/dashboard" 
                  className={`block px-4 py-3 text-sm font-semibold rounded-xl mx-2 mb-2 transition-all ${
                    isActive('/dashboard')
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/planner" 
                  className={`block px-4 py-3 text-sm font-semibold rounded-xl mx-2 mb-2 transition-all ${
                    isActive('/planner')
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Planner
                </Link>
                <Link 
                  href="/formats" 
                  className={`block px-4 py-3 text-sm font-semibold rounded-xl mx-2 mb-2 transition-all ${
                    isActive('/formats')
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Formats
                </Link>
                {allTools.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider mt-4 mb-2">
                      Tools
                    </div>
                    {allTools.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        className={`block px-6 py-3 text-sm font-medium rounded-xl mx-2 mb-1 transition-all ${
                          isActive(item.href)
                            ? 'bg-indigo-50 text-indigo-600 font-semibold'
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
                  className={`block px-4 py-3 text-sm font-semibold rounded-xl mx-2 mb-2 transition-all ${
                    isActive('/formats')
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Formats
                </Link>
                <Link 
                  href="/pricing" 
                  className={`block px-4 py-3 text-sm font-semibold rounded-xl mx-2 mb-2 transition-all ${
                    isActive('/pricing')
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Pricing
                </Link>
                {publicTools.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider mt-4 mb-2">
                      Tools
                    </div>
                    {publicTools.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        className={`block px-6 py-3 text-sm font-medium rounded-xl mx-2 mb-1 transition-all ${
                          isActive(item.href)
                            ? 'bg-indigo-50 text-indigo-600 font-semibold'
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
            <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider mt-4 mb-2">
              More
            </div>
            {resources.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`block px-4 py-3 text-sm font-medium rounded-xl mx-2 mb-1 transition-all ${
                  isActive(item.href)
                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
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
                  className="block w-full px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all text-left"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-xl transition-all text-center"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/signup" 
                    className="block px-4 py-3 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-center shadow-lg"
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
