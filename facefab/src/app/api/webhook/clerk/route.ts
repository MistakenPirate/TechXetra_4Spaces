// app/api/clerk-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const clerkSecret = process.env.CLERK_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const { type, data } = await req.json();

  // Process the user.signed_in event
  if (type === "user.created") {
    const { id: clerkId, first_name } = data;

    try {
      await prisma.user.create({
        data: {
          clerkId,
          name: first_name, 
        },
      });

      return NextResponse.json(
        { message: "User data stored or updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error handling Clerk webhook:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Invalid event type" },
      { status: 400 }
    );
  }
}
