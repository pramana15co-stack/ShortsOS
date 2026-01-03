export const metadata = {
  title: 'Terms of Service - ShortsOS',
  description: 'ShortsOS Terms of Service - The legal terms for using our platform.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The legal terms for using ShortsOS.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="glass-effect rounded-2xl p-8 md:p-10 premium-shadow space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using ShortsOS, you accept and agree to be bound by these Terms of Service. 
              If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ShortsOS provides planning, optimization, and content generation tools for YouTube Shorts creators. 
              Our services include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Content planning and calendar tools</li>
              <li>Script and hook generators</li>
              <li>SEO optimization tools</li>
              <li>Format libraries and guides</li>
              <li>Performance feedback tools</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Important:</strong> ShortsOS does not process, edit, or upload videos. 
              We provide planning and optimization tools only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Free vs. Paid Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Free Tier:</strong> Our core features are available free forever with no credit card required. 
              Free features may have usage limits but are designed to be fully functional.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Paid Tiers:</strong> Future paid tiers (Pro, Agency) will be clearly marked with pricing, 
              features, and terms. You will never be charged without explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Use our services for lawful purposes only</li>
              <li>Not attempt to reverse engineer or extract our algorithms</li>
              <li>Not use our services to create harmful, illegal, or infringing content</li>
              <li>Provide accurate information when submitting feedback or joining waitlists</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Our Content:</strong> All content, features, and functionality of ShortsOS are owned by us 
              and protected by copyright, trademark, and other laws.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Your Content:</strong> Scripts, hooks, and content generated using our tools are yours to use. 
              We claim no ownership over content you create using ShortsOS.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Service Availability</h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to maintain high availability but do not guarantee uninterrupted service. 
              We may perform maintenance, updates, or experience outages. We are not liable for any losses 
              resulting from service unavailability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              ShortsOS is provided &quot;as is&quot; without warranties. We are not liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-4">
              <li>Any losses from using or inability to use our services</li>
              <li>Content performance on YouTube or other platforms</li>
              <li>Decisions made based on our recommendations</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our tools are planning and optimization aids. Success on YouTube depends on many factors beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these terms occasionally. Continued use of ShortsOS after changes constitutes acceptance. 
              We'll notify users of significant changes via email or website notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">9. Contact Pramana</h2>
            <p className="text-gray-700 leading-relaxed">
              Questions about these terms? Contact Pramana support at{' '}
              <a href="mailto:support@shortsos.com" className="text-primary-600 hover:underline">support@shortsos.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

