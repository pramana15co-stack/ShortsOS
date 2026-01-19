import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { feature, userId } = body

    if (!feature || !userId) {
      return NextResponse.json(
        { error: 'Feature and userId are required' },
        { status: 400 }
      )
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const { error } = await supabase
      .from('usage_tracking')
      .insert({
        user_id: userId,
        feature,
        usage_date: today.toISOString(),
      })

    if (error) {
      console.error('Error recording usage:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to record usage' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error recording usage:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to record usage' },
      { status: 500 }
    )
  }
}
