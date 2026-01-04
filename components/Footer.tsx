import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 mt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-lg font-medium text-gray-900 mb-4 block">
              ShortsOS
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              The all-in-one platform for YouTube Shorts creators. Plan smarter, optimize better, grow faster.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4 text-sm">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/planner" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Planner
                </Link>
              </li>
              <li>
                <Link href="/formats" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Formats Library
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Creator Tools
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4 text-sm">Company</h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Pramana15 builds practical tools for modern creators.
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About Pramana15
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/feedback-form" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4 text-sm">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} ShortsOS. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Built by</span>
              <Link 
                href="/about" 
                className="font-medium text-gray-900 hover:text-gray-600 transition-colors"
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

