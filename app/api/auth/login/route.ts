import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sign } from 'jsonwebtoken'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET as string

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' })

    cookies().set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day
      path: '/',
    })

    return NextResponse.json({
      id: user.id,
      email: user.email,
      shopDomain: user.shopDomain,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

