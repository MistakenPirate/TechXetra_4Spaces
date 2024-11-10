"use client";
import Subject from "@/components/ui/Subject";
import pinkBlob from "../../../public/blob.svg";
import orangeBlob from "../../../public/orangeBLob.svg";
import Image from "next/image";
import Camera from "../../../public/camera.svg";
import { useEffect, useState } from "react";

export default function FacultyDashboard() {
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addAttendance = async (index: number) => {
    try {
      const response = await fetch('/api/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index }),
      });
      if (!response.ok) throw new Error('Failed to add attendance');
      fetchSubject();
    } catch (err) {
      console.error("Add attendance error: ", err);
    }
  };

  const fetchSubject = async () => {
    try {
      const response = await fetch('/api/subjects');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setSubject(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubject();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="text-white montserrat p-10">
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
      <h1 className="text-[3rem]">Welcome Teacher</h1>
      <section className="w-full rounded-xl border-2 py-4 min-h-[60vh] border-[rgba(255,255,255,0.25)] bg-[rgba(217,217,217,0.1)] backdrop-blur-xl" style={{ marginTop: '4rem' }}>
        <Subject subject={subject} addAttendance={addAttendance} />
      </section>
    </div>
  );
}
