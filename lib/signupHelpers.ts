/**
 * Signup helper functions with retry logic and timeout handling
 */

import { SupabaseClient } from '@supabase/supabase-js'

export interface SignUpOptions {
  email: string
  password: string
  emailRedirectTo?: string
}

export interface SignUpResult {
  data: {
    user: any
    session: any
  } | null
  error: any
}

/**
 * Custom error for timeout scenarios
 */
export class SignupTimeoutError extends Error {
  code = 'SUPABASE_TIMEOUT'
  constructor(message: string) {
    super(message)
    this.name = 'SignupTimeoutError'
  }
}

/**
 * Retry wrapper with timeout for Supabase auth.signUp
 * Retries up to 3 times with 1 second delay between retries
 * Each attempt has a 10 second timeout
 */
export async function signUpWithRetry(
  supabase: SupabaseClient,
  options: SignUpOptions,
  maxRetries: number = 3,
  retryDelay: number = 1000,
  timeoutMs: number = 10000
): Promise<SignUpResult> {
  console.log('[SIGNUP] Attempt - Starting signup with retry logic')

  let lastError: any = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`[SIGNUP] Retry attempt #${attempt} of ${maxRetries}`)

    try {
      // Create timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new SignupTimeoutError('Request timeout'))
        }, timeoutMs)
      })

      // Attempt signup with timeout
      const signUpPromise = supabase.auth.signUp({
        email: options.email,
        password: options.password,
        options: {
          emailRedirectTo: options.emailRedirectTo,
        },
      })

      // Race between signup and timeout
      const result = await Promise.race([signUpPromise, timeoutPromise])

      // Check if we got a successful result
      if (result && !result.error) {
        console.log('[SIGNUP] Success - User created successfully')
        return result
      }

      // If we got an error, check if it's retryable
      if (result?.error) {
        lastError = result.error
        const errorMessage = result.error.message || String(result.error)
        const errorName = result.error.name || result.error.constructor?.name || ''

        // Check if error is retryable (504, network errors, timeout)
        const isRetryable =
          result.error.status === 504 ||
          errorName.includes('AuthRetryableFetchError') ||
          errorName.includes('Timeout') ||
          errorMessage.toLowerCase().includes('timeout') ||
          errorMessage.toLowerCase().includes('network') ||
          errorMessage.toLowerCase().includes('fetch failed')

        if (isRetryable && attempt < maxRetries) {
          console.log(`[SIGNUP] Retry attempt #${attempt} failed with retryable error, will retry...`)
          await new Promise((resolve) => setTimeout(resolve, retryDelay))
          continue
        } else {
          // Non-retryable error or last attempt
          console.log(`[SIGNUP] Final failure reason - ${errorMessage}`)
          return result
        }
      }

      return result
    } catch (error: any) {
      lastError = error

      // Check if it's a timeout error
      if (error instanceof SignupTimeoutError || error.name === 'SignupTimeoutError') {
        console.log(`[SIGNUP] Timeout on attempt #${attempt}`)
        if (attempt < maxRetries) {
          console.log(`[SIGNUP] Retry attempt #${attempt} timed out, will retry...`)
          await new Promise((resolve) => setTimeout(resolve, retryDelay))
          continue
        } else {
          console.log('[SIGNUP] Final failure reason - All retries timed out')
          throw new SignupTimeoutError(
            'Signup service temporarily unavailable. Please retry in 30 seconds.'
          )
        }
      }

      // Other errors - check if retryable
      const errorMessage = error?.message || String(error)
      const isRetryable =
        errorMessage.toLowerCase().includes('network') ||
        errorMessage.toLowerCase().includes('fetch') ||
        errorMessage.toLowerCase().includes('timeout') ||
        error?.status === 504

      if (isRetryable && attempt < maxRetries) {
        console.log(`[SIGNUP] Retry attempt #${attempt} failed with retryable error, will retry...`)
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
        continue
      } else {
        console.log(`[SIGNUP] Final failure reason - ${errorMessage}`)
        throw error
      }
    }
  }

  // All retries exhausted
  console.log('[SIGNUP] Final failure reason - All retries exhausted')
  if (lastError?.status === 504 || lastError?.name?.includes('AuthRetryableFetchError')) {
    throw new SignupTimeoutError(
      'Signup service temporarily unavailable. Please retry in 30 seconds.'
    )
  }

  throw lastError || new Error('Signup failed after all retries')
}
