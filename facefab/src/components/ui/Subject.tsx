// components/Subject.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Camera from "../../../public/camera.svg"; // Adjust the path
import FaceScanPopup from "@/components/FaceScanPopUp";
import { useToast } from "@/components/ui/use-toast";

export default function Subject() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { toast } = useToast();

  const handleScanComplete = (success: boolean) => {
    toast({
      title: success ? "Attendance Recorded" : "Scan Failed",
      description: success
        ? "Your attendance has been successfully recorded."
        : "Failed to record attendance. Please try again.",
      variant: success ? "default" : "destructive",
    });
  };

  return (
    <>
      <table className="w-full gap-12">
        <thead>
          <tr className="text-lg font-light">
            <th>Subject</th>
            <th>No of CLasses</th>
            <th>Add Classes</th>
            <th>Add Attendandce</th>
          </tr>
        </thead>
        <tbody className="pt-10 text-center">
        <tr className="border-r-2 border-[rgba(255,255,255,0.25)]">
          <td>Maths</td>
          <td>10</td>
          <td>
            <button className="bg-[#39D2E6] px-2 py-1 rounded-lg w-[2rem] active:scale-105">
              +
            </button>
          </td>
          <td>
            <button onClick={() => setIsPopupOpen(true)}>
              <Image
                src={Camera}
                alt={"camera"}
                className="active:scale-105 w-[2rem]"
              />
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <FaceScanPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        subjectName="Maths"
        onScanComplete={handleScanComplete}
      />
    </>
  );
}
