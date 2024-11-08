// page.tsx
import { currentUser } from "@clerk/nextjs";
import DashboardPage from "./dashboard/page";
import IntroPage from "@/components/pages/landing";

export default async function Home() {
  // const user = await currentUser();
  // console.log("user is ", user);
  const user = 0;
  
  if (!user) {
    return <IntroPage />;
  }
  
  return (
    <div>
      <DashboardPage />
    </div>
  );
}