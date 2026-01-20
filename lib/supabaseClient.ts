import { createClient, SupabaseClient } from '@supabase/supabase-js'

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

  if (supabaseAnonKey.length < 50) {
    return {
      valid: false,
      error: 'NEXT_PUBLIC_SUPABASE_ANON_KEY appears to be invalid',
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
    supabase = createClient(supabaseUrl, supabaseAnonKey)
    console.log('✅ [AUTH] Supabase client initialized successfully')
  }
} else {
  // Server-side: validate but don't block
  const validation = validateSupabaseConfig()
  if (validation.valid && supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
}

/**
 * Get Supabase client with validation check
 */
export function getSupabaseClient(): SupabaseClient {
  if (!configValidated) {
    const validation = validateSupabaseConfig()
    if (!validation.valid) {
      throw new Error(`Auth service misconfigured: ${validation.error}. Please contact support.`)
    }
  }

  if (!supabase) {
    throw new Error('Auth service misconfigured. Please contact support.')
  }

  return supabase
}

export { supabase }


