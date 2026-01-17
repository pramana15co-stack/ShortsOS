/**
 * Example API Route - Paid Feature Protection
 * 
 * This is an example showing how to protect paid-only API endpoints.
 * Use this pattern for any API route that requires paid subscription.
 */

import { NextRequest, NextResponse } from 'next/server'
import { requirePaidUser } from '@/lib/apiAuth'

export async function POST(request: NextRequest) {
  // Step 1: Validate user has paid subscription
  const { user, error } = await requirePaidUser(request)
  
  if (error) {
    // Returns 401 (not authenticated) or 403 (not paid)
    return error
  }

  // Step 2: User is authenticated and paid - process feature
  try {
    const body = await request.json()
    const { featureData } = body

    // Your paid feature logic here
    const result = await processPaidFeature(user.id, featureData)

    return NextResponse.json({
      success: true,
      result,
    })
  } catch (error: any) {
    console.error('Error processing paid feature:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process feature' },
      { status: 500 }
    )
  }
}

// Example: Process paid feature
async function processPaidFeature(userId: string, data: any) {
  // Your feature implementation
  return {
    processed: true,
    userId,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Alternative: Require specific tier
 * 
 * import { requireTier } from '@/lib/apiAuth'
 * 
 * export async function POST(request: NextRequest) {
 *   const { user, error } = await requireTier(request, 'pro')
 *   
 *   if (error) {
 *     return error
 *   }
 *   
 *   // User has Pro tier or higher
 *   // ... your feature logic
 * }
 */
