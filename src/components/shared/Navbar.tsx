"use client"

import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/images/shop-logo.png"
import { Button } from "../ui/button"
import { HandbagIcon, HeartIcon, UserIcon } from "lucide-react"
import { useState } from "react"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { Sidebar } from "./Sidebar"
import { useCart } from "@/context/cart-context"

type NavItems = {
  label: string
  path: string
}[]

function Menu({ navItems }: { navItems: NavItems }) {
  return (
    <>
      <div className="flex flex-row items-center my-6 gap-4">
        <h2 className="text-2xl font-extrabold">Cloth Store</h2>
        <Image src={logo} alt="Cloth store" />
      </div>
      <div className="block lg:hidden">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.label} className="">
              <Link
                href={item.path}
                className="text-lg font-medium text-primary hover:text-primary/60 transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Separator className="my-6" />
      </div>
      <div>
        <h3 className="text-lg font-extrabold">Collections</h3>
        <ul className="mt-2 flex flex-col gap-1">
          <li>
            <Link
              href="/product/1"
              className="text-sm text-primary hover:text-primary/60 transition-colors duration-200"
            >
              Product 1
            </Link>
          </li>
          <li>
            <Link
              href="/product/2"
              className="text-sm text-primary hover:text-primary/60 transition-colors duration-200"
            >
              Product 2
            </Link>
          </li>
        </ul>
      </div>
      <Separator className="my-6" />
      <div>
        <h3 className="text-lg font-extrabold">New Arrivals</h3>
        <ul className="mt-2 flex flex-col gap-1">
          <li>
            <Link
              href="/product/1"
              className="text-sm text-primary hover:text-primary/60 transition-colors duration-200"
            >
              Product 1
            </Link>
          </li>
          <li>
            <Link
              href="/product/2"
              className="text-sm text-primary hover:text-primary/60 transition-colors duration-200"
            >
              Product 2
            </Link>
          </li>
        </ul>
      </div>
      <Separator className="my-6" />
      <div>
        <form>
          <Input placeholder="Search" />
        </form>
      </div>
    </>
  )
}

export function Navbar({ navItems }: { navItems: NavItems }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { cart } = useCart()

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}>
        <Menu navItems={navItems} />
      </Sidebar>
      <header className="py-6">
        <nav className="container mx-auto">
          <div className="flex flex-row items-center w-full h-24 px-4">
            <div className="basis-1/3">
              <div className="flex flex-row items-center gap-4">
                <Button
                  variant="ghost"
                  className="p-2 h-auto cursor-pointer"
                  onClick={toggleSidebar}
                >
                  <svg
                    width="28"
                    height="18"
                    viewBox="0 0 28 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-8"
                  >
                    <path
                      d="M26.75 0.75L0.750001 0.75"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18.75 8.75L0.75 8.75"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13.75 16.75H0.75"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Button>
                <ul className="hidden lg:flex gap-6 ms-4">
                  {navItems.map((item) => (
                    <li key={item.label} className="">
                      <Link
                        href={item.path}
                        className="text-lg font-medium text-primary hover:text-primary/60 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="basis-1/3 flex justify-center">
              <Link href="/">
                <Image src={logo} alt="Cloth store" />
              </Link>
            </div>
            <div className="basis-1/3 flex justify-end">
              <div className="flex items-center gap-4">
                <Button size={"icon-lg"} className="hidden lg:inline-flex">
                  <HeartIcon className="size-6" />
                  <span className="sr-only">Wishlist</span>
                </Button>
                <Button
                  size={"icon-lg"}
                  className="hidden lg:inline-flex relative"
                >
                  {cart?.totalQuantity && (
                    <span className="absolute -top-1 -right-1 bg-primary p-1 min-w-5.5 flex items-center justify-center text-white outline-2 outline-white text-[10px] rounded-2xl">
                      {cart.totalQuantity}
                    </span>
                  )}
                  <HandbagIcon className="size-6" />
                  <span className="sr-only">Cart</span>
                </Button>
                <Button size={"icon-lg"}>
                  <UserIcon className="size-6" />
                  <span className="sr-only">Profile</span>
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
