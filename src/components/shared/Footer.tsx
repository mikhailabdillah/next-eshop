import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/shop-logo.png";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function Footer() {
  return (
    <footer className="bg-gray-500/10 px-4 pt-24">
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap gap-6 mb-10">
          <div className="basis-full md:basis-1/3">
            <div>
              <h3 className="text-xl mb-4">Company</h3>
              <ul className="flex flex-col gap-1">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="basis-full md:basis-2/4">
            <div className="flex items-center gap-4">
              <h3 className="text-4xl">Cloth Store</h3>
              <Image src={logo} alt="Cloth Store Logo" />
            </div>
            <div className="mt-8 max-w-sm">
              <form>
                <Label
                  htmlFor="email"
                  className="block mb-2 mt-4 text-sm font-bold text-gray-700"
                >
                  Subscribe to our newsletter
                </Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </form>
            </div>
          </div>
        </div>
        <div className="py-6">
          &copy; {new Date().getFullYear()} Cloth Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
