export const metadata = {
  title: 'Privacy Policy - ShortsOS',
  description: 'ShortsOS Privacy Policy - How we handle your data and protect your privacy.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. Here's how we protect your data.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="glass-effect rounded-2xl p-8 md:p-10 premium-shadow space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ShortsOS is designed with privacy in mind. We collect minimal information necessary to provide our services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Feedback submissions (voluntary, anonymous)</li>
              <li>Waitlist email addresses (if you choose to join)</li>
              <li>Basic usage analytics (page views, feature usage) - no personal identification</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Important:</strong> We do not require account creation or authentication for core features. 
              All planning and generation tools work without storing personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use collected information only for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Improving our services based on feedback</li>
              <li>Notifying you about new features (waitlist only, opt-out anytime)</li>
              <li>Understanding feature usage to prioritize development</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Data Storage & Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Client-Side Processing:</strong> Most features run entirely in your browser. 
              No data is sent to our servers for script generation, hook creation, or planning tools.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Server-Side:</strong> When you submit feedback or join a waitlist, data is stored securely. 
              We use industry-standard security practices to protect your information.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>No Third-Party Tracking:</strong> We do not use advertising trackers, analytics cookies, 
              or third-party data collection services that identify you personally.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Request access to any data we have about you</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of waitlist emails at any time</li>
              <li>Use our services without providing any personal information</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, contact Pramana15 support at <a href="mailto:support@shortsos.com" className="text-primary-600 hover:underline">support@shortsos.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Cookies & Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              We use minimal, essential cookies only. No advertising cookies, no cross-site tracking, 
              no behavioral profiling. Our goal is to provide a fast, private experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy occasionally. We'll notify users of significant changes 
              via email (if you're on our waitlist) or through a notice on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Contact Pramana15</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this privacy policy, please contact Pramana15 support at{' '}
              <a href="mailto:support@shortsos.com" className="text-primary-600 hover:underline">support@shortsos.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

