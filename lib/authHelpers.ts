/**
 * Authentication helper functions for better error handling and edge cases
 */

export interface AuthError {
  message: string
  code?: string
  userFriendly?: string
}

/**
 * Safely stringify an object, handling circular references
 */
function safeStringify(obj: any): string {
  try {
    return JSON.stringify(obj, null, 2)
  } catch (e) {
    try {
      // Try with a replacer to handle circular refs
      const seen = new WeakSet()
      return JSON.stringify(obj, (key, val) => {
        if (val != null && typeof val === 'object') {
          if (seen.has(val)) {
            return '[Circular]'
          }
          seen.add(val)
        }
        return val
      }, 2)
    } catch (e2) {
      return String(obj)
    }
  }
}

/**
 * Extract message from error object with deep fallback
 */
function extractErrorMessage(error: any): string {
  if (!error) {
    return 'Signup failed. Please try again.'
  }

  // If it's already a string, return it
  if (typeof error === 'string') {
    return error
  }

  // Try direct properties first
  if (error.message && typeof error.message === 'string') {
    return error.message
  }

  if (error.error_description && typeof error.error_description === 'string') {
    return error.error_description
  }

  if (error.details && typeof error.details === 'string') {
    return error.details
  }

  if (error.error && typeof error.error === 'string') {
    return error.error
  }

  // Try nested error objects
  if (error.error && typeof error.error === 'object') {
    const nested = extractErrorMessage(error.error)
    if (nested !== 'Signup failed. Please try again.') {
      return nested
    }
  }

  // Try statusText for HTTP errors
  if (error.statusText && typeof error.statusText === 'string') {
    return error.statusText
  }

  // Try status code with generic message
  if (error.status) {
    return `Request failed with status ${error.status}. Please try again.`
  }

  // Last resort: try to stringify (but handle circular refs)
  try {
    const str = String(error)
    if (str && str !== '[object Object]' && str !== '{}') {
      return str
    }
  } catch (e) {
    // Ignore
  }

  // Final fallback
  return 'Signup failed. Please try again.'
}

/**
 * Get user-friendly error message from Supabase auth errors
 * Handles all error formats and ensures a readable string is always returned
 */
export function getAuthErrorMessage(error: any): string {
  // Log full error for debugging (safely)
  try {
    console.log('🔍 [AUTH ERROR] Full error object:', safeStringify(error))
    console.log('🔍 [AUTH ERROR] Error type:', typeof error)
    if (error && typeof error === 'object') {
      console.log('🔍 [AUTH ERROR] Error keys:', Object.keys(error))
      console.log('🔍 [AUTH ERROR] Error.constructor:', error.constructor?.name)
    }
  } catch (e) {
    console.log('🔍 [AUTH ERROR] Could not log error details:', e)
  }

  // Extract message using robust fallback chain
  let errorMessage = extractErrorMessage(error)

  // Ensure it's a string and not empty
  if (!errorMessage || typeof errorMessage !== 'string') {
    errorMessage = 'Signup failed. Please try again.'
  }

  // Clean up the message
  errorMessage = errorMessage.trim()

  // Check for specific error codes first
  if (error?.code === 'SUPABASE_TIMEOUT' || error?.name === 'SignupTimeoutError') {
    return 'Signup service temporarily unavailable. Please retry in 30 seconds.'
  }

  // 504 / AuthRetryableFetchError
  if (
    error?.status === 504 ||
    error?.name?.includes('AuthRetryableFetchError') ||
    errorMessage.toLowerCase().includes('504') ||
    errorMessage.toLowerCase().includes('gateway timeout')
  ) {
    return 'Signup service temporarily unavailable. Please retry in 30 seconds.'
  }

  // Network errors
  if (
    errorMessage.toLowerCase().includes('network') ||
    errorMessage.toLowerCase().includes('fetch') ||
    errorMessage.toLowerCase().includes('failed to fetch') ||
    errorMessage.toLowerCase().includes('networkerror')
  ) {
    return 'Network error. Please check your connection.'
  }

  // Rate limiting
  if (errorMessage.toLowerCase().includes('rate limit') || 
      errorMessage.toLowerCase().includes('too many') ||
      errorMessage.toLowerCase().includes('429')) {
    return 'Too many requests. Please wait a few minutes and try again.'
  }

  // Invalid credentials
  if (errorMessage.includes('Invalid login credentials') || 
      errorMessage.includes('Invalid credentials') ||
      errorMessage.includes('invalid_credentials')) {
    return 'Invalid email or password. Please check your credentials and try again.'
  }

  // Email not confirmed
  if (errorMessage.includes('Email not confirmed') || 
      errorMessage.includes('email_not_confirmed') ||
      errorMessage.includes('email_not_verified')) {
    return 'Please verify your email address before signing in. Check your inbox for the confirmation link.'
  }

  // User not found
  if (errorMessage.includes('User not found') || 
      errorMessage.includes('user_not_found') ||
      errorMessage.includes('No user found')) {
    return 'No account found with this email address. Please sign up first.'
  }

  // Email already exists / User already registered
  if (errorMessage.includes('already registered') || 
      errorMessage.includes('already exists') ||
      errorMessage.includes('User already registered') ||
      errorMessage.includes('email_address_already_exists') ||
      errorMessage.includes('signup_disabled') ||
      errorMessage.toLowerCase().includes('user already')) {
    return 'An account with this email already exists. Please sign in instead.'
  }

  // Weak password
  if (
    errorMessage.includes('Password should be at least') ||
    errorMessage.includes('password_too_short') ||
    errorMessage.includes('Password is too short')
  ) {
    return 'Password must be at least 6 characters.'
  }

  // Expired token
  if (errorMessage.includes('expired') || 
      errorMessage.includes('token_expired')) {
    return 'This link has expired. Please request a new one.'
  }

  // Invalid token
  if (errorMessage.includes('Invalid token') || 
      errorMessage.includes('token_invalid')) {
    return 'Invalid or expired link. Please request a new password reset.'
  }

  // Generic Supabase errors
  if (errorMessage.includes('supabase') || 
      errorMessage.includes('Supabase')) {
    return 'Authentication service error. Please try again in a moment.'
  }

  // Return the extracted message (guaranteed to be a non-empty string)
  return errorMessage || 'Signup failed. Please try again.'
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


