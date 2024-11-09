"use server";

import { prisma } from "@/lib/prisma";

export async function getStudentSubjectAttendance(userId, subjectId) {
  try {
    const studentSubject = await prisma.studentSubject.findUnique({
      where: {
        userId_subjectId: {
          userId,
          subjectId,
        },
      },
      select: {
        totalClasses: true,
        attendedClasses: true,
      },
    });

    if (!studentSubject) {
      throw new Error('Enrollment not found');
    }

    const attendancePercentage = 
      (studentSubject.attendedClasses / studentSubject.totalClasses) * 100;

    return {
      message: 'Attendance fetched successfully',
      attendance: {
        ...studentSubject,
        attendancePercentage: attendancePercentage.toFixed(2),
      },
    };
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return { error: error.message || 'Internal server error' };
  }
}
