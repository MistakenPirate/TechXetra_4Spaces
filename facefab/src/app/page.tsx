import DashboardPage from "./dashboard/page";
import IntroPage from "@/components/pages/landing";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  console.log(userId)
  if (!userId) {
    return <IntroPage />;
  } else {
    return <DashboardPage/>
  }
}
