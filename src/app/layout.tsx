import type { Metadata } from "next";
import localfont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import Image from "next/image";
import background from "@/assets/images/grain-texture.png";

const beatrice = localfont({
  variable: "--font-beatrice",
  src: [
    {
      path: "../assets/fonts/BeatriceDeckTRIAL-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/BeatriceDeckTRIAL-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/BeatriceDeckTRIAL-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/BeatriceDeckTRIAL-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/BeatriceDeckTRIAL-Extrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Cloth Store",
  description:
    "A simple e-commerce application built with Shopify, Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", beatrice.variable)}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Cloth Store" />
      </head>
      <body className="min-h-full relative">
        <Image
          src={background}
          alt="Background"
          className="fixed inset-0 -z-10 h-full w-full object-cover"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
