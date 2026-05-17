import Link from "next/link"
import Image from "next/image"
import { Price } from "./Price"
import { Product } from "@/lib/shopify/types"

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="relative">
      <Link
        href={`/product/${product.handle}`}
        className="absolute inset-0 z-10"
      />
      <div className="bg-gray-500">
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText || ""}
          width={product.featuredImage.width}
          height={product.featuredImage.height}
          className="object-cover aspect-10/11"
        />
      </div>
      <div className="mt-4 font-extrabold">{product.productType}</div>
      <div className="flex flex-row mt-2 justify-between gap-4">
        <h3 className="text-base font-medium basis-2/3">{product.title}</h3>
        <Price
          className="text-lg font-extrabold basis-1/3 text-right"
          currencyCode={product.priceRange.minVariantPrice.currencyCode}
          amount={product.priceRange.minVariantPrice.amount}
        />
      </div>
      <div className="mt-2 text-gray-500">
        {product.options
          .find((option) => option.name === "Color")
          ?.values.join(", ")}
      </div>
    </div>
  )
}
