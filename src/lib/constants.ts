export type SortFilterItem = {
  title: string
  slug: string | null
  sortKey:
    | "RELEVANCE"
    | "BEST_SELLING"
    | "CREATED_AT"
    | "PRICE_LOW"
    | "PRICE_HIGH"
  reverse: boolean
}

export const defaultSort: SortFilterItem = {
  title: "Relevance",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
}

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Best Seller",
    slug: "best-seller",
    sortKey: "BEST_SELLING",
    reverse: false,
  }, // asc
  {
    title: "Latest arrivals",
    slug: "latest",
    sortKey: "CREATED_AT",
    reverse: true,
  },
  {
    title: "Price: Low to high",
    slug: "price-asc",
    sortKey: "PRICE_LOW",
    reverse: false,
  }, // asc
  {
    title: "Price: High to low",
    slug: "price-desc",
    sortKey: "PRICE_HIGH",
    reverse: true,
  },
]

export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
}

export const HIDDEN_PRODUCT_TAG = "hidden"
export const DEFAULT_OPTION = "Default Title"
export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2026-04/graphql.json"
