import { NextRequest, NextResponse } from 'next/server'
import { handleAuthCallback } from '@/utils/shopify-api'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const shop = searchParams.get('shop')
  const code = searchParams.get('code')

  if (!shop || !code) {
    return NextResponse.json({ error: 'Missing shop or code parameter' }, { status: 400 })
  }

  try {
    const session = await handleAuthCallback(shop, code)
    // TODO: Store the session in your database
    return NextResponse.redirect('/dashboard')
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}

