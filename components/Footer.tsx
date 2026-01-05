import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-white via-gray-50 to-white border-t border-gray-200/50 mt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-extrabold text-gray-900 mb-6 block flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-base font-bold">S</span>
              </div>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ShortsOS</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              The all-in-one platform for YouTube Shorts creators. Plan smarter, optimize better, grow faster.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/planner" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  Planner
                </Link>
              </li>
              <li>
                <Link href="/formats" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  Formats Library
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  Creator Tools
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Company</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Pramana15 builds practical tools for modern creators.
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  About Pramana15
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/feedback-form" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 font-medium">
              © {currentYear} ShortsOS. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Built by</span>
              <Link 
                href="/about" 
                className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
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
