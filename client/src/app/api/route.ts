import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { faceDescriptor } = await request.json()
    
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { 
        faceDescriptor: faceDescriptor 
      }
    })

    return NextResponse.json({ success: true, user: updatedUser })
  } catch (error) {
    console.error('Error saving face descriptor:', error)
    return NextResponse.json({ error: 'Error saving face descriptor' }, { status: 500 })
  }
}