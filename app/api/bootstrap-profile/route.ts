import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function POST() {
  try {
    if (!supabaseUrl || !supabaseAnonKey || !supabaseAdmin) {
      console.error('[BOOTSTRAP_PROFILE_ERROR] Missing Supabase environment variables')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const cookieStore = await cookies()

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { data: existing } = await supabaseAdmin
      .from('profiles')
      .select('credits')
      .eq('user_id', user.id)
      .maybeSingle()

    if (!existing) {
      const { error } = await supabaseAdmin.from('profiles').insert({
        user_id: user.id,
        subscription_tier: 'free',
        subscription_status: 'inactive',
        plan_expiry: null,
        credits: 100,
        is_admin: false
      })

      if (error) {
        console.error('[BOOTSTRAP_PROFILE_ERROR]', error)
        return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
      }

      return NextResponse.json({ ok: true, credits: 100 })
    }

    return NextResponse.json({ ok: true, credits: existing.credits })
  } catch (e) {
    console.error('[BOOTSTRAP_PROFILE_FATAL]', e)
    return NextResponse.json({ error: 'Bootstrap crashed' }, { status: 500 })
  }
}
