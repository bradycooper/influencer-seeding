import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const { status, orderId } = await req.json()

  try {
    const updatedSubmission = await prisma.submission.update({
      where: { id },
      data: { status, orderId },
    })

    return NextResponse.json(updatedSubmission)
  } catch (error) {
    console.error('Error updating submission:', error)
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 })
  }
}

