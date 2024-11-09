import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {

    const rawBody = await request.text()
    console.log("Incoming request body:", rawBody)

    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { faceDescriptor } = await request.json()

    if(!faceDescriptor) {
      return NextResponse.json({ error: "Face descriptor is required"}, {status: 400})
    }
    
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
  } catch (error: unknown) {
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,  
      name: error instanceof Error ? error.name : undefined
    });
   
    if (error instanceof SyntaxError) {
      return NextResponse.json({ 
        error: "Invalid JSON format"
      }, { status: 400 });
    }
   
    return NextResponse.json({
      error: "Internal server error",
      details: process.env.NODE_ENV === "development" 
        ? (error instanceof Error ? error.message : String(error)) 
        : undefined
    }, { status: 500 });
   }
}