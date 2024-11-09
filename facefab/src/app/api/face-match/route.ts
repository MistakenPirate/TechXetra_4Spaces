import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function euclideanDistance(descriptor1: Float32Array, descriptor2: Float32Array): number {
  return Math.sqrt(
    descriptor1.map((x, i) => Math.pow(x - descriptor2[i], 2)).reduce((sum, curr) => sum + curr, 0)
  );
}

async function findBestMatch(targetDescriptor: Float32Array, subjectName: string, threshold: number = 0.5) {
  const students = await prisma.user.findMany({
    select: {
      id: true,
      faceDescriptor: true,
      clerkId:true,
      name: true,
    },
  });

  const subject = await prisma.subject.findFirst({
    where: { name: subjectName },
    select: {
      id: true,
      name: true,
    },
  });

  if (!subject) {
    throw new Error(`Subject with name "${subjectName}" not found`);
  }

  let bestMatch = {
    studentId: null as number | null,
    subjectId: subject.id,
    distance: Number.MAX_VALUE,
    name: null as string | null,
  };
  
  for (const student of students) {
    console.log(typeof student.faceDescriptor)
    // Check if faceDescriptor exists and is a valid JSON string
  

    let dbDescriptor;
    try {
      dbDescriptor = new Float32Array(student.faceDescriptor);
    } catch (error) {
      console.error(`Error parsing faceDescriptor for student ID ${student.id}`, error);
      continue; // Skip this student if there's an issue with parsing
    }

    const distance = euclideanDistance(targetDescriptor, dbDescriptor);

    if (distance < threshold && distance < bestMatch.distance) {
      bestMatch = {
        studentId: student.clerkId,
        subjectId: subject.id,
        distance: distance,
        name: student.name,
      };
    }
  }

  return bestMatch;
}

export async function POST(request: NextRequest) {
  console.log("Start of POST request");

  try {
    const { faceDescriptor, subjectName } = await request.json();

    if (!faceDescriptor || !subjectName) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const targetDescriptor = new Float32Array(faceDescriptor);
    const match = await findBestMatch(targetDescriptor, subjectName);

    if (!match.studentId) {
      return NextResponse.json({ error: "No matching face found" }, { status: 404 });
    }

    const attendance = await prisma.studentSubject.upsert({
      where: {
        userId_subjectId: {
          userId: match.studentId,
          subjectId: match.subjectId,
        },
      },
      update: {
        attendedClasses: { increment: 1 },
      },
      create: {
        userId: match.studentId,
        subjectId: match.subjectId,
        attendedClasses: 1,
      },
    });

    return NextResponse.json({
      success: true,
      match: {
        studentId: match.studentId,
        subjectId: match.subjectId,
        name: match.name,
        distance: match.distance,
      },
      attendance,
    });
  } catch (error) {
    console.error("Error processing face match:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
