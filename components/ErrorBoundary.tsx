'use client'

import { Component, ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <div className="glass-effect rounded-2xl p-12 premium-shadow">
              <div className="text-6xl mb-6">⚠️</div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Something Went Wrong
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We encountered an unexpected error. Don't worry, your data is safe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Reload Page
                </button>
                <Link
                  href="/dashboard"
                  className="px-6 py-3 glass-effect border-2 border-primary-200 text-primary-700 rounded-lg font-semibold hover:border-primary-400 transition-all"
                >
                  Go to Dashboard
                </Link>
              </div>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-8 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

