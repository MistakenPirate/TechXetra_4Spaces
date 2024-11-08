"use client"
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const PUBLIC_PAGES: readonly string[] = ["/"] as const;

interface ClerkAuthWrapperProps {
  children: ReactNode;
}

const isPublicPath = (path: string): boolean => PUBLIC_PAGES.includes(path);

export function ClerkAuthWrapper({ children }: ClerkAuthWrapperProps): JSX.Element {
  const pathname = usePathname(); // Use usePathname from next/navigation to get the current path
  const isPublicPage = isPublicPath(pathname);

  return (
    <ClerkProvider>
      {isPublicPage ? (
        children
      ) : (
        <>
          <SignedIn>{children}</SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}
