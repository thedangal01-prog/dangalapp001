import type { Metadata, Viewport } from "next";
import { Geist, Oswald, Cormorant_Garamond, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: false,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: false,
});

const tiroDeva = Tiro_Devanagari_Hindi({
  variable: "--font-deva",
  subsets: ["devanagari"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "The Dangal Unisex Gym — Train. Fight. Rise.",
  description: "AI workout planner, diet planner, fitness tracker, cardio tracker & active-days streak system.",
  keywords: ["Dangal", "gym", "fitness", "AI workout", "Delhi gym"],
  authors: [{ name: "The Dangal Unisex Gym" }],
  icons: { icon: "/gym/logo-v2.jpg", apple: "/gym/logo-v2.jpg" },
  metadataBase: new URL("https://dangal-gym.vercel.app"),
  openGraph: {
    title: "The Dangal Unisex Gym — Train. Fight. Rise.",
    description: "AI workout planner, diet planner, fitness tracker & streak system.",
    siteName: "The Dangal Unisex Gym",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dangal Unisex Gym",
    description: "Train. Fight. Rise.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${oswald.variable} ${cormorant.variable} ${tiroDeva.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
