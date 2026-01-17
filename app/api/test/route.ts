import { NextResponse } from 'next/server'

export async function GET() {
  console.log('TEST API HIT')
  return NextResponse.json({ success: true })
}
