"use client"
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  const role = user?.publicMetadata?.role;

  if (role === "student") {
    router.push("/student");
  } else if (role === "faculty") {
    router.push("/faculty");
  }
  return null;
}
