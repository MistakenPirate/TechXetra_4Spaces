import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, subjectId } = body;

    if (!userId || !subjectId) {
      return NextResponse.json(
        { error: "userId and subjectId are required" },
        { status: 400 }
      );
    }

    const studentAttendance = await prisma.studentSubject.findUnique({
      where: {
        userId_subjectId: {
          userId: userId.toString(), 
          subjectId: parseInt(subjectId),
        },
      },
      select: {
        attendedClasses: true,
      },
    });

    const subjectDetails = await prisma.subject.findUnique({
      where: {
        id: parseInt(subjectId),
      },
      select: {
        name: true,
        totalClasses: true,
      },
    });

    if (!subjectDetails) {
      return NextResponse.json(
        { error: "Subject not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      userId,
      subjectId,
      subjectName: subjectDetails.name,
      attendedClasses: studentAttendance?.attendedClasses || 0,
      totalClasses: subjectDetails.totalClasses,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
