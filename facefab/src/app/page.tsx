import { currentUser } from "@clerk/nextjs";
import DashboardPage from "./dashboard/page";
import IntroPage from "@/components/pages/landing";
import { auth } from "@clerk/nextjs/server";
import { useRouter } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  console.log("userId is", userId);
  // const router = useRouter();
  // const user = await currentUser();
  // console.log("user is ", user);
  // const user = 0;

  if (!userId) {
    return <IntroPage />;
  } else {
    return <DashboardPage/>
  }
}
