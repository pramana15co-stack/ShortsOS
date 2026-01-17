// Razorpay integration utility
import Razorpay from 'razorpay'

export interface RazorpayOrder {
  id: string
  amount: number // in paise (smallest currency unit)
  currency: string
  receipt: string
  status: string
  created_at: number
}

export interface RazorpayPayment {
  id: string
  order_id: string
  amount: number
  currency: string
  status: string
  method: string
  created_at: number
}

// Initialize Razorpay instance
export function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  // Debug logging (helpful for troubleshooting)
  if (!keyId || !keySecret) {
    console.error('❌ Razorpay Environment Variables Missing:')
    console.error('   RAZORPAY_KEY_ID:', keyId ? `✅ Set (${keyId.substring(0, 12)}...)` : '❌ Missing')
    console.error('   RAZORPAY_KEY_SECRET:', keySecret ? '✅ Set (hidden)' : '❌ Missing')
    console.error('   NEXT_PUBLIC_RAZORPAY_KEY_ID:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? `✅ Set (${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.substring(0, 12)}...)` : '❌ Missing')
    console.error('')
    console.error('💡 Solution:')
    console.error('   1. Create .env.local file in project root')
    console.error('   2. Add: RAZORPAY_KEY_ID=rzp_test_xxxxx')
    console.error('   3. Add: RAZORPAY_KEY_SECRET=your_secret')
    console.error('   4. Add: NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx')
    console.error('   5. Restart dev server (npm run dev)')
    throw new Error('Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables. See console for details.')
  }

  // Validate key format
  if (!keyId.startsWith('rzp_test_') && !keyId.startsWith('rzp_live_')) {
    console.warn('⚠️  Warning: RAZORPAY_KEY_ID should start with "rzp_test_" or "rzp_live_"')
    console.warn(`   Current key starts with: "${keyId.substring(0, 8)}"`)
  }

  try {
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })
    
    console.log('✅ Razorpay instance created successfully')
    return razorpay
  } catch (initError: any) {
    console.error('❌ Failed to initialize Razorpay:', initError.message)
    throw new Error(`Failed to initialize Razorpay: ${initError.message}`)
  }
}

/**
 * Create Razorpay order for payment
 * @param params - Order parameters
 * @returns Razorpay order object
 */
export async function createRazorpayOrder(params: {
  amount: number // in rupees
  currency?: string
  receipt: string
  notes?: Record<string, string>
}): Promise<RazorpayOrder> {
  const razorpay = getRazorpayInstance()

  try {
    const orderParams = {
      amount: params.amount * 100, // Convert rupees to paise
      currency: params.currency || 'INR',
      receipt: params.receipt,
      notes: params.notes || {},
    }
    
    console.log('Calling Razorpay orders.create with:', {
      amount: orderParams.amount,
      currency: orderParams.currency,
      receipt: orderParams.receipt.substring(0, 20) + '...',
    })

    const order = await razorpay.orders.create(orderParams)
    
    console.log('✅ Razorpay order created:', {
      id: order.id,
      amount: order.amount,
      status: order.status,
    })

    return order as RazorpayOrder
  } catch (error: any) {
    // Enhanced error logging for Razorpay API errors
    const errorDetails = {
      message: error.message,
      statusCode: error.statusCode,
      status: error.status,
      error: error.error,
      description: error.error?.description,
      code: error.error?.code,
      field: error.error?.field,
      source: error.error?.source,
      step: error.error?.step,
      reason: error.error?.reason,
      metadata: error.error?.metadata,
    }
    
    console.error('❌ Razorpay order creation error:', JSON.stringify(errorDetails, null, 2))
    
    // Create a more helpful error message
    let helpfulMessage = error.message || 'Failed to create Razorpay order'
    
    if (error.statusCode === 401) {
      helpfulMessage = 'Invalid Razorpay API credentials. Please verify your Key ID and Key Secret in Vercel environment variables.'
    } else if (error.statusCode === 400) {
      helpfulMessage = `Razorpay API error: ${error.error?.description || error.message}`
      if (error.error?.field) {
        helpfulMessage += ` (Field: ${error.error.field})`
      }
    } else if (error.statusCode === 429) {
      helpfulMessage = 'Razorpay rate limit exceeded. Please try again in a few moments.'
    } else if (error.statusCode >= 500) {
      helpfulMessage = 'Razorpay service temporarily unavailable. Please try again later.'
    }
    
    // Create new error with helpful message but preserve original error details
    const enhancedError = new Error(helpfulMessage)
    ;(enhancedError as any).statusCode = error.statusCode
    ;(enhancedError as any).error = error.error
    ;(enhancedError as any).originalError = error
    
    throw enhancedError
  }
}

/**
 * Verify Razorpay payment signature
 */
export function verifyPaymentSignature(params: {
  orderId: string
  paymentId: string
  signature: string
}): boolean {
  const crypto = require('crypto')
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keySecret) {
    throw new Error('RAZORPAY_KEY_SECRET not configured')
  }

  const hmac = crypto.createHmac('sha256', keySecret)
  hmac.update(params.orderId + '|' + params.paymentId)
  const generatedSignature = hmac.digest('hex')

  return generatedSignature === params.signature
}

/**
 * Fetch payment details from Razorpay
 */
export async function getPaymentDetails(paymentId: string): Promise<RazorpayPayment> {
  const razorpay = getRazorpayInstance()
  const payment = await razorpay.payments.fetch(paymentId)
  return payment as RazorpayPayment
}


