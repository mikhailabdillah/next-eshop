import { Search } from "@/components/Search"
import { defaultSort, sorting } from "@/lib/constants"
import { getProducts } from "@/lib/shopify"

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
      ? await getProducts({ sortKey, reverse, query: searchValue })
      : []
  const resultsText = products.length > 1 ? "results" : "result"

  return (
    <main>
      <div className="container mx-auto py-10">
        <h1>Search for &quot;{searchValue}&quot;</h1>
        <div className="mb-4">
          <Search searchValue={searchValue} />
        </div>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
        {searchValue && searchValue.trim() && (
          <p aria-live="polite">
            {products.length} {resultsText} found
          </p>
        )}
      </div>
    </main>
  )
}
