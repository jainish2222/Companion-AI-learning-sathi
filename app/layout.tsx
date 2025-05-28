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
  title: "Companion - Real-time AI Teaching Platform",
  description: "Companion is a cutting-edge real-time AI teaching platform that enhances learning through interactive AI-powered tools and personalized education experiences.",
  keywords: "AI teaching platform, real-time AI learning, online education, interactive AI tutor, personalized learning, e-learning, AI education software",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Companion - Real-time AI Teaching Platform",
    description: "Enhance your learning experience with Companion, the interactive AI-powered teaching platform providing personalized education in real-time.",
    url: "https://yourwebsite.com/companion",
    siteName: "Companion",
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Companion AI Teaching Platform",
      },
    ],
  },
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
