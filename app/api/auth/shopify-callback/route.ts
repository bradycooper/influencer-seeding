import { NextRequest, NextResponse } from 'next/server'
import { handleAuthCallback } from '@/utils/shopify-api'
import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const shop = searchParams.get('shop')
  const code = searchParams.get('code')

  if (!shop || !code) {
    return NextResponse.json({ error: 'Missing shop or code parameter' }, { status: 400 })
  }

  try {
    const session = await handleAuthCallback(shop, code)

    // Get the current user from the session
    const token = cookies().get('session')?.value
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const decoded = verify(token, JWT_SECRET) as { userId: string }
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create or update the store and associate it with the user
    await prisma.store.upsert({
      where: { shopifyDomain: shop },
      update: {
        accessToken: session.accessToken,
        userId: user.id,
      },
      create: {
        shopifyDomain: shop,
        accessToken: session.accessToken,
        userId: user.id,
      },
    })

    // Store the Shopify session
    await prisma.shopifySession.upsert({
      where: { shop },
      update: {
        accessToken: session.accessToken,
        scope: session.scope,
        expiresAt: session.expires,
        onlineAccessInfo: session.onlineAccessInfo,
      },
      create: {
        shop,
        accessToken: session.accessToken,
        scope: session.scope,
        expiresAt: session.expires,
        onlineAccessInfo: session.onlineAccessInfo,
      },
    })

    return NextResponse.redirect('/dashboard')
  } catch (error) {
    console.error('Shopify auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}

