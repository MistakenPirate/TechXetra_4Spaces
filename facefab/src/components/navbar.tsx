"use client"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "./logo";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
function Navbar() {
  const router = usePathname();

  return (
    <div className="py-4 px-4 flex justify-between items-center bg-[#020722] sticky">
      <Logo />
      {(router === "/student")&&
        <div className="text-[#B2A8A8] flex gap-20 text-[1.2rem]">
          <Link href="#">Attendance Manager</Link>
          <Link href="#">Calendar</Link>
          
        </div>

      }
      <div>
        <SignedOut>
          <SignInButton>
            <Button className="bg-transparent text-white hover:scale-105 hover:bg-white hover:text-black md:text-lg transition duration-300 md:mr-10">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;

