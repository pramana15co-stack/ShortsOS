import Link from 'next/link'
import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  secondaryActionLabel?: string
  secondaryActionHref?: string
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  secondaryActionLabel,
  secondaryActionHref,
}: EmptyStateProps) {
  const defaultIcon = (
    <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  )

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
          {icon || defaultIcon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {actionHref && actionLabel && (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {actionLabel}
            </Link>
          )}
          {onAction && actionLabel && (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {actionLabel}
            </button>
          )}
          {secondaryActionHref && secondaryActionLabel && (
            <Link
              href={secondaryActionHref}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200"
            >
              {secondaryActionLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

