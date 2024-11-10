"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import pinkBlob from "../../../public/blob.svg";
import orangeBlob from "../../../public/orangeBLob.svg";
import Cards from "@/components/ui/cards";
import { auth } from "@clerk/nextjs/server";

type AttendanceData = {
  subjectId: number;
  subjectName: string;
  percentage: number;
  classes: number[];
};

const subjectMap: Record<number, string> = {
  1: "TOC",
  2: "Graph Theory",
  3: "OS",
  4: "dsa",
  5: "Maths",
};

export default function StudentDashboard() {
  const { userId } = useAuth();
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);

  const subjectIds = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (!userId) return;

    async function fetchAttendance() {
      const data = await Promise.all(
        subjectIds.map(async (subjectId) => {
          const response = await fetch("/api/fetch-attendance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, subjectId }),
          });
          console.log(response);

          if (response.ok) {
            const { attendedClasses, totalClasses } = await response.json();
            const percentage = (attendedClasses / totalClasses) * 100;
            const classes = [attendedClasses, totalClasses];
            return {
              subjectId,
              subjectName: subjectMap[subjectId] || `Subject ${subjectId}`,
              percentage,
              classes,
            };
          } else {
            console.error(
              `Failed to fetch attendance for subjectId: ${subjectId}`
            );
            return null;
          }
        })
      );

      setAttendanceData(
        data.filter((item) => item !== null) as AttendanceData[]
      );
    }

    fetchAttendance();
  }, [userId]);

  //   console.log(attendanceData);

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] overflow-x-hidden">
      <section className="w-full h-full px-10 py-10">
        <Image
          src={pinkBlob}
          className="absolute right-0 top-0 w-[20%] z-[-10]"
          alt="blob"
        />
        <Image
          src={orangeBlob}
          className="absolute left-0 bottom-0 w-[20%]"
          alt="blob"
        />
        <div className="flex flex-wrap gap-6">
          {attendanceData.map(
            ({ subjectId, subjectName, percentage, classes }) => (
              <Cards
                key={subjectId}
                subject={subjectName}
                percentage={percentage}
                classes={classes}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
}
