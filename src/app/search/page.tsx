import { ProductCard } from "@/components/product/Card"
import { Search } from "@/components/Search"
import { defaultSort, sorting } from "@/lib/constants"
import { getSearchProducts } from "@/lib/shopify"
import { Suspense } from "react"

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const { sort, q: searchValue } = searchParams as { [key: string]: string }
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort

  // Only fetch products if searchValue exists and is not empty
  const products =
    searchValue && searchValue.trim()
      ? await getSearchProducts({
          query: searchValue,
          types: "PRODUCT",
          sortKey,
          reverse,
        })
      : []
  const resultsText = products.length > 1 ? "results" : "result"

  return (
    <main>
      <div className="container mx-auto py-10 px-4">
        <h1>Search {searchValue ? `for "${searchValue}"` : ""}</h1>
        <div className="mb-4">
          <Search searchValue={searchValue} />
        </div>
        {searchValue && searchValue.trim() && (
          <p aria-live="polite">
            {products.length} {resultsText} found
          </p>
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <ul className="flex flex-row flex-wrap w-full -mx-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-4"
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </Suspense>
      </div>
    </main>
  )
}
