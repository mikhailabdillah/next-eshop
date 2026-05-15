import { Product } from "@/lib/shopify/types"
import { Separator } from "../ui/separator"
import { AddToCart } from "../cart/AddToCart"
import { VariantSelector } from "./VariantSelector"
import { Price } from "./Price"

export function ProductDescription({ product }: { product: Product }) {
  return (
    <div className="mb-6 flex flex-col pb-6">
      <h1 className="mb-2 text-4xl">{product.title}</h1>
      <div className="text-2xl">
        <Price
          currencyCode={product.priceRange.minVariantPrice.currencyCode}
          amount={product.priceRange.minVariantPrice.amount}
        />
      </div>
      <Separator className="my-4" />
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10">
        {product.description}
      </p>
      <VariantSelector options={product.options} variants={product.variants} />
      <Separator className="my-8" />
      <AddToCart product={product} />
    </div>
  )
}
