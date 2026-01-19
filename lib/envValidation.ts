/**
 * Environment Variable Validation
 * Ensures all required env vars are present and valid
 */

interface EnvValidationResult {
  valid: boolean
  missing: string[]
  errors: string[]
}

/**
 * Validate all required environment variables
 */
export function validateEnvVars(): EnvValidationResult {
  const missing: string[] = []
  const errors: string[] = []

  // Required Supabase variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    missing.push('NEXT_PUBLIC_SUPABASE_URL')
  } else if (!process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://')) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL must be a valid HTTPS URL')
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    missing.push('SUPABASE_SERVICE_ROLE_KEY')
  }

  // Required Razorpay variables
  if (!process.env.RAZORPAY_KEY_ID) {
    missing.push('RAZORPAY_KEY_ID')
  } else if (!process.env.RAZORPAY_KEY_ID.startsWith('rzp_')) {
    errors.push('RAZORPAY_KEY_ID must start with "rzp_"')
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    missing.push('RAZORPAY_KEY_SECRET')
  }

  if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
    missing.push('NEXT_PUBLIC_RAZORPAY_KEY_ID')
  } else if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.startsWith('rzp_')) {
    errors.push('NEXT_PUBLIC_RAZORPAY_KEY_ID must start with "rzp_"')
  }

  return {
    valid: missing.length === 0 && errors.length === 0,
    missing,
    errors,
  }
}

/**
 * Get user-friendly error message for missing env vars
 */
export function getEnvErrorMessage(): string | null {
  const validation = validateEnvVars()
  
  if (validation.valid) {
    return null
  }

  const messages: string[] = []

  if (validation.missing.length > 0) {
    messages.push(`Missing environment variables: ${validation.missing.join(', ')}`)
  }

  if (validation.errors.length > 0) {
    messages.push(`Invalid environment variables: ${validation.errors.join(', ')}`)
  }

  return messages.join('. ')
}

/**
 * Validate and throw error if env vars are missing (server-side only)
 */
export function requireEnvVars(): void {
  if (typeof window !== 'undefined') {
    // Client-side - don't validate (env vars not available)
    return
  }

  const validation = validateEnvVars()
  
  if (!validation.valid) {
    const errorMessage = getEnvErrorMessage()
    console.error('❌ Environment variable validation failed:', errorMessage)
    throw new Error(`Configuration error: ${errorMessage}`)
  }
}
