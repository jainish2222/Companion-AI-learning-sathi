import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { AnimatedGridPattern } from "../components/ui/shadcn-io/animated-grid-pattern"

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Companion AI",
  description: "Ypur ai partner",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hydrated">
      <body className={`${bricolage.variable} antialiased`}>
       <ClerkProvider appearance={{ variables: { colorPrimary: '#fe5933' }} }>
        <Navbar />
       <div className="fixed inset-0 z-0">
          <AnimatedGridPattern />
        </div>
       <main >
          {children}
        </main>
      </ClerkProvider>
      </body>
    </html>
  );
}
