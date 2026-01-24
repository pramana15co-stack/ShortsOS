import { createBrowserClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Validate Supabase environment variables
 */
function validateSupabaseConfig(): { valid: boolean; error?: string } {
  if (!supabaseUrl) {
    return {
      valid: false,
      error: 'NEXT_PUBLIC_SUPABASE_URL is missing',
    }
  }

  if (!supabaseUrl.startsWith('https://')) {
    return {
      valid: false,
      error: 'NEXT_PUBLIC_SUPABASE_URL must be a valid HTTPS URL',
    }
  }

  if (!supabaseAnonKey) {
    return {
      valid: false,
      error: 'NEXT_PUBLIC_SUPABASE_ANON_KEY is missing',
    }
  }

  return { valid: true }
}

let supabase: SupabaseClient | null = null
let configValidated = false

// Validate configuration on module load
if (typeof window !== 'undefined') {
  const validation = validateSupabaseConfig()
  configValidated = true

  if (!validation.valid) {
    console.error('❌ [AUTH] Supabase configuration invalid:', validation.error)
    // Don't create client if config is invalid
    supabase = null
  } else if (supabaseUrl && supabaseAnonKey) {
    // Use createBrowserClient for better Next.js integration (cookies)
    supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
    console.log('✅ [AUTH] Supabase client initialized successfully (Browser)')
  }
} else {
  // Server-side: validate but don't block
  const validation = validateSupabaseConfig()
  if (validation.valid && supabaseUrl && supabaseAnonKey) {
    // Note: On server side, we should use createServerClient usually, 
    // but this file is often imported in shared contexts. 
    // For specific server operations, use the API route approach.
    supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
  }
}

/**
 * Get Supabase client with validation check
 */
export function getSupabaseClient(): SupabaseClient {
  if (!configValidated && typeof window !== 'undefined') {
    const validation = validateSupabaseConfig()
    if (!validation.valid) {
      throw new Error(`Auth service misconfigured: ${validation.error}. Please contact support.`)
    }
  }

  if (!supabase) {
    if (typeof window === 'undefined') {
        // Fallback for build time if env vars are missing
        console.warn('Supabase client accessed on server without configuration')
        return null as any
    }
    throw new Error('Auth service misconfigured. Please contact support.')
  }

  return supabase
}

export { supabase }
