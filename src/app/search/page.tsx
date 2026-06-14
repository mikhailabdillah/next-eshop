import { ProductCard } from "@/components/product/Card"
import { Search } from "@/components/search"
import { Separator } from "@/components/ui/separator"
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
        <h1 className="text-4xl mb-6">Search</h1>
        <div className="mb-4">
          <Search sortKey={sortKey} searchValue={searchValue} />
        </div>
        <div className="flex flex-row">
          {searchValue && (
            <p className="font-bold">{`Search for "${searchValue}"`}</p>
          )}
          <Separator
            orientation="vertical"
            className="bg-gray-300 mx-2 data-vertical:w-0.5"
          />
          {searchValue && searchValue.trim() && (
            <p aria-live="polite">
              <strong>
                {products.length} {resultsText}
              </strong>{" "}
              found
            </p>
          )}
        </div>
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
