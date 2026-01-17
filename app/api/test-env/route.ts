import { NextResponse } from 'next/server'

/**
 * Test endpoint to verify Razorpay environment variables are loaded
 * Visit: http://localhost:3000/api/test-env
 * 
 * Remove this file after verifying everything works
 */
export async function GET() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  const publicKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

  return NextResponse.json({
    status: 'Environment Variables Check',
    backend: {
      hasKeyId: !!keyId,
      hasKeySecret: !!keySecret,
      keyIdPrefix: keyId ? keyId.substring(0, 12) + '...' : 'NOT SET',
      keyIdLength: keyId?.length || 0,
    },
    frontend: {
      hasPublicKey: !!publicKey,
      publicKeyPrefix: publicKey ? publicKey.substring(0, 12) + '...' : 'NOT SET',
      publicKeyLength: publicKey?.length || 0,
    },
    allSet: !!(keyId && keySecret && publicKey),
    recommendations: {
      ifKeyIdMissing: 'Add RAZORPAY_KEY_ID to .env.local',
      ifKeySecretMissing: 'Add RAZORPAY_KEY_SECRET to .env.local',
      ifPublicKeyMissing: 'Add NEXT_PUBLIC_RAZORPAY_KEY_ID to .env.local',
      ifAllMissing: 'Create .env.local file in project root with all three variables',
      ifNotTestKeys: 'Make sure keys start with "rzp_test_" for test mode',
    },
  })
}
