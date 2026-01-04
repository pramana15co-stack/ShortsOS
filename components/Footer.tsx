import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-24 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-bold text-xl shadow-lg group-hover:shadow-xl transition-shadow">
                ShortsOS
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The all-in-one platform for YouTube Shorts creators. Plan smarter, optimize better, grow faster.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/planner" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Planner
                </Link>
              </li>
              <li>
                <Link href="/formats" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Formats Library
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Creator Tools
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">Company</h3>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              Pramana15 builds practical tools for modern creators.
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  About Pramana15
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/feedback-form" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} ShortsOS. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Built with</span>
              <span className="text-red-500">❤️</span>
              <span>by</span>
              <Link 
                href="/about" 
                className="font-semibold text-white hover:text-primary-400 transition-colors"
              >
                Pramana15
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

