'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/planner', label: 'Planner' },
    { href: '/formats', label: 'Formats' },
    { href: '/hooks', label: 'Hooks' },
    { href: '/scripts', label: 'Scripts' },
    { href: '/feedback', label: 'Feedback' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/seo-optimizer', label: 'SEO Optimizer' },
    { href: '/content-ideas', label: 'Content Ideas' },
    { href: '/checklist', label: 'Checklist' },
    { href: '/analytics', label: 'Analytics' },
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            ShortsOS
          </Link>
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
