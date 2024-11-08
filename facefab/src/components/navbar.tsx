import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "./logo";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <div className="py-4 px-4 flex justify-between items-center bg-[#020722] sticky">
      <Logo />
      <div>
        <SignedOut>
          <SignInButton>
            <Button className="bg-transparent text-white hover:scale-105 hover:bg-white hover:text-black md:text-lg transition duration-300 md:mr-10">Register Here</Button>
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

