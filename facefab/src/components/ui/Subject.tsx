// components/Subject.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Camera from "../../../public/camera.svg"; // Adjust the path
import FaceScanPopup from "@/components/FaceScanPopUp";
import { useToast } from "@/components/ui/use-toast";

export default function Subject({subject,addAttendance}:any) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { toast } = useToast();
  const [subjectName,setSubjectName] = useState("")
  const handleScanComplete = (success: boolean) => {
    toast({
      title: success ? "Attendance Recorded" : "Scan Failed",
      description: success
        ? "Your attendance has been successfully recorded."
        : "Failed to record attendance. Please try again.",
      variant: success ? "default" : "destructive",
    });
  };
  const handleClick =(name)=>{
    setIsPopupOpen(true)
    setSubjectName(name)
  } 

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
        {
              subject?.map((subject:any,index:number)=>{
                return (
                  <tr className="border-r-2 border-[rgba(255,255,255,0.25)] h-[2rem]" key={index}>
                  <td className="">{subject.name}</td>
                  <td>{subject.totalClasses}</td>
                  <td>
                    <button className="bg-[#39D2E6] px-2 py-1 rounded-lg w-[2rem] active:scale-105" onClick={()=>addAttendance(subject.id)}>+</button>
                  </td>
                  <td>
                    <button onClick={()=>handleClick(subject.name)}>
                      <Image src={Camera} alt={"camera"} className="active:scale-105 w-[2rem]"/>
                    </button>
                  </td>
                </tr>
                )
            })}
        </tbody>
      </table>

      <FaceScanPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        subjectName={subjectName}
        onScanComplete={handleScanComplete}
      />
    </>
  );
}
