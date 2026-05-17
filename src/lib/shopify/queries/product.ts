import productFragment from "../fragments/product"

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`

export const getProductsQuery = /* GraphQL */ `
  query getProducts(
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
    $limit: Int = 100
  ) {
    products(
      sortKey: $sortKey
      reverse: $reverse
      query: $query
      first: $limit
    ) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`

export const getSearchProductsQuery = /* GraphQL */ `
  query getSearchProducts(
    $query: String!
    $types: [SearchType!]
    $limit: Int = 12
    $sortKey: SearchSortKeys
    $reverse: Boolean
    $after: String
    $before: String
  ) {
    search(
      query: $query
      types: $types
      first: $limit
      sortKey: $sortKey
      reverse: $reverse
      after: $after
      before: $before
    ) {
      edges {
        node {
          ... on Product {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`
