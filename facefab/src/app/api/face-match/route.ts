import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function euclideanDistance(descriptor1: Float32Array, descriptor2: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < descriptor1.length; i++) {
    const diff = descriptor1[i] - descriptor2[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

async function findBestMatch(targetDescriptor: Float32Array, subjectName: string, threshold: number = 0.6) {
  const students = await prisma.user.findMany({
    select: {
      id: true,
      faceDescriptor: true,
      clerkId:true,
      name: true,
    },
  });
  console.log({"students":students})
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
      console.log({'dbDescriptor':dbDescriptor})
    } catch (error) {
      console.error(`Error parsing faceDescriptor for student ID ${student.id}`, error);
      continue; // Skip this student if there's an issue with parsing
    }

    const distance = euclideanDistance(targetDescriptor, dbDescriptor);
    console.log({'distance':distance})
    if (distance < threshold && distance < bestMatch.distance) {
      bestMatch = {
        studentId: student.clerkId,
        subjectId: subject.id,
        distance: distance,
        name: student.name,
      };
      console.log({"Match Testing":bestMatch})
    }
  }

  return bestMatch;
}

export async function POST(request: NextRequest) {
  console.log("Start of POST request");

  try {
    let{ faceDescriptor, subjectName } = await request.json();
    if (faceDescriptor && faceDescriptor.faceDescriptor) {
      faceDescriptor = faceDescriptor.faceDescriptor;
    }
    if (!faceDescriptor || !subjectName) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    console.log({"faceDescriptor":faceDescriptor})
    const targetDescriptor = new Float32Array(faceDescriptor);
    console.log({"targetDescriptor":targetDescriptor})
    const match = await findBestMatch(targetDescriptor, subjectName);
    console.log(match)

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
