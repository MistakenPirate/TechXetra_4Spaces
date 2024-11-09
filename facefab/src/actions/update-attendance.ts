"use server";

import { prisma } from '@/lib/prisma';
import axios from 'axios';

const AZURE_FACE_ENDPOINT = process.env.AZURE_FACE_ENDPOINT;
const AZURE_FACE_KEY = process.env.AZURE_FACE_KEY;

export async function updateAttendance(image, subjectId) {
  try {
    // Step 1: Detect and identify the user using Azure Face API
    const faceResponse = await axios.post(
      `${AZURE_FACE_ENDPOINT}/detect`,
      { url: image }, // URL of the image for face detection
      {
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_FACE_KEY,
          'Content-Type': 'application/json',
        },
        params: {
          returnFaceId: true, // Required for identification
        },
      }
    );

    if (faceResponse.data.length === 0) {
      throw new Error('No face detected in the image');
    }

    const faceId = faceResponse.data[0].faceId;

    // Step 2: Identify the face against a person group (assumes Azure Face API person group is set up)
    const identifyResponse = await axios.post(
      `${AZURE_FACE_ENDPOINT}/identify`,
      {
        faceIds: [faceId],
        personGroupId: 'your_person_group_id', // Replace with your person group ID
        maxNumOfCandidatesReturned: 1,
      },
      {
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_FACE_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    if (identifyResponse.data.length === 0 || identifyResponse.data[0].candidates.length === 0) {
      throw new Error('No matching face found');
    }

    const { personId } = identifyResponse.data[0].candidates[0];

    // Step 3: Fetch user based on recognized personId (assuming personId maps to clerkId)
    const user = await prisma.user.findUnique({
      where: { clerkId: personId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Step 4: Find and update attendance in StudentSubject for the specified subject
    const studentSubject = await prisma.studentSubject.findUnique({
      where: {
        userId_subjectId: {
          userId: user.id,
          subjectId: subjectId,
        },
      },
    });

    if (!studentSubject) {
      throw new Error('Enrollment not found');
    }

    // Step 5: Update attendance count
    const updatedStudentSubject = await prisma.studentSubject.update({
      where: { id: studentSubject.id },
      data: {
        attendedClasses: studentSubject.attendedClasses + 1,
      },
    });

    return { message: 'Attendance updated successfully', updatedStudentSubject };
  } catch (error) {
    console.error('Error updating attendance:', error);
    return { error: error.message || 'Internal server error' };
  }
}

