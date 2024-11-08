import type { Metadata } from "next";
import "./globals.css";

import { ClerkAuthWrapper } from "../clerk/clerk";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkAuthWrapper>
          <Navbar />
          {children}
        </ClerkAuthWrapper>
      </body>
    </html>
  );
}
