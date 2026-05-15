import { getCollections, getMenu, getProducts } from "@/lib/shopify"
import { Footer } from "./Footer"
import { Navbar } from "./Navbar"

export async function Layout({ children }: { children: React.ReactNode }) {
  const menu = await getMenu("main-menu")
  const collections = await getCollections()
  const newArrival = await getProducts({
    sortKey: "CREATED_AT",
    limit: 4,
  })

  return (
    <>
      <Navbar
        navItems={menu}
        collections={collections}
        newArrivals={newArrival}
      />
      {children}
      <Footer />
    </>
  )
}
