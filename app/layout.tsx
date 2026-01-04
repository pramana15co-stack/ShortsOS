import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import AuthProvider from './providers/AuthProvider'

// Use system fonts for better deployment reliability
const fontClass = 'font-sans'

export const metadata: Metadata = {
  title: 'ShortsOS - Plan, Optimize & Grow Your YouTube Shorts',
  description: 'The all-in-one planning and optimization tool for YouTube Shorts creators. Plan content, optimize SEO, and make data-driven decisions.',
  keywords: ['YouTube Shorts', 'content planning', 'video optimization', 'Shorts creator tools', 'YouTube analytics'],
  authors: [{ name: 'ShortsOS' }],
  openGraph: {
    title: 'ShortsOS - Plan, Optimize & Grow Your YouTube Shorts',
    description: 'The all-in-one planning and optimization tool for YouTube Shorts creators.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShortsOS - Plan, Optimize & Grow Your YouTube Shorts',
    description: 'The all-in-one planning and optimization tool for YouTube Shorts creators.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fontClass}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  )
}
