import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

// This would typically be stored in a database
const forms: Record<string, any> = {}

export async function POST(req: NextRequest) {
  const { fields } = await req.json()
  const formId = uuidv4()
  forms[formId] = { fields, submissions: [] }
  const formLink = `${process.env.NEXT_PUBLIC_APP_URL}/influencer-form/${formId}`
  return NextResponse.json({ formLink })
}

export async function GET(req: NextRequest) {
  const formId = req.nextUrl.searchParams.get('id')
  if (!formId || !forms[formId]) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 })
  }
  return NextResponse.json(forms[formId])
}

