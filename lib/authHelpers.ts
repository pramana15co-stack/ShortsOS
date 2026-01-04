/**
 * Authentication helper functions for better error handling and edge cases
 */

export interface AuthError {
  message: string
  code?: string
  userFriendly?: string
}

/**
 * Get user-friendly error message from Supabase auth errors
 */
export function getAuthErrorMessage(error: any): string {
  if (!error) return 'An unexpected error occurred'

  const errorMessage = error.message || String(error)

  // Network errors
  if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('Failed to fetch')) {
    return 'Network error. Please check your internet connection and try again.'
  }

  // Rate limiting
  if (errorMessage.includes('rate limit') || errorMessage.includes('too many')) {
    return 'Too many requests. Please wait a few minutes and try again.'
  }

  // Invalid credentials
  if (errorMessage.includes('Invalid login credentials') || errorMessage.includes('Invalid credentials')) {
    return 'Invalid email or password. Please check your credentials and try again.'
  }

  // Email not confirmed
  if (errorMessage.includes('Email not confirmed') || errorMessage.includes('email_not_confirmed')) {
    return 'Please verify your email address before signing in. Check your inbox for the confirmation link.'
  }

  // User not found
  if (errorMessage.includes('User not found') || errorMessage.includes('user_not_found')) {
    return 'No account found with this email address. Please sign up first.'
  }

  // Email already exists
  if (errorMessage.includes('already registered') || errorMessage.includes('already exists')) {
    return 'An account with this email already exists. Please sign in instead.'
  }

  // Weak password
  if (errorMessage.includes('Password should be at least')) {
    return 'Password must be at least 6 characters long.'
  }

  // Expired token
  if (errorMessage.includes('expired') || errorMessage.includes('token_expired')) {
    return 'This link has expired. Please request a new one.'
  }

  // Invalid token
  if (errorMessage.includes('Invalid token') || errorMessage.includes('token_invalid')) {
    return 'Invalid or expired link. Please request a new password reset.'
  }

  // Generic Supabase errors
  if (errorMessage.includes('supabase') || errorMessage.includes('Supabase')) {
    return 'Authentication service error. Please try again in a moment.'
  }

  // Return original message if no match
  return errorMessage
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (!password) {
    return { valid: false, message: 'Password is required' }
  }

  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long' }
  }

  return { valid: true }
}

/**
 * Sanitize email input
 */
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase()
}


