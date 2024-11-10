"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const role = user?.publicMetadata?.role as string;

    // Using replace instead of push to prevent back button from returning to dashboard
    if (role === "student") {
      router.replace("/student");
    } else if (role === "faculty") {
      router.replace("/faculty");
    } else {
      router.replace("/student");
    }
  }, [user, isLoaded, router]);

  // Optional: Return loading component
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">Loading...</div>
    </div>
  );
}
