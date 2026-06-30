import type { Metadata } from "next"
import localfont from "next/font/local"
import "./globals.css"
import { cn } from "@/lib/utils"
import Image from "next/image"
import background from "@/assets/images/grain-texture.png"
import { CartProvider } from "@/context/cart-context"
import { getCart } from "@/lib/shopify"
import { Suspense } from "react"
import { Layout } from "@/components/shared/Layout"
import { Toaster } from "@/components/ui/sonner"

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
})

export const metadata: Metadata = {
  title:
    "Cloth Store - Headless e-commerce template using Shopify, Next.js, and TypeScript",
  description:
    "A simple e-commerce application built with Shopify, Next.js, TypeScript, and Tailwind CSS.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cart = getCart()

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

        <CartProvider cart={cart}>
          <Suspense fallback={false}>
            <Layout>{children}</Layout>
            <Toaster />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  )
}
