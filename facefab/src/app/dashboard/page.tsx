"use client"
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  const role = user?.publicMetadata?.role;
  useEffect(()=>{
    if (role === "faculty") {
      router.push("/faculty");
    } else {
      router.push("/student");
    } 
  },[role,router])

  return null;
}
