import { NextRequest, NextResponse } from 'next/server'

// This would typically interact with a database
const forms: Record<string, any> = {}

export async function POST(req: NextRequest) {
  const { formId, data } = await req.json()
  
  if (!forms[formId]) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 })
  }

  forms[formId].submissions.push(data)

  // TODO: Send email notification to the brand

  return NextResponse.json({ success: true })
}

