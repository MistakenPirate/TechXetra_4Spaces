import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "./logo";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <div className="my-2 mx-4 flex justify-between items-center py-2">
      <Logo />
      <div>
        <SignedOut>
          <SignInButton>
            <Button>Sign In</Button>
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

