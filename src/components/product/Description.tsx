import { Product } from "@/lib/shopify/types"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"

export function ProductDescription({ product }: { product: Product }) {
  return (
    <div className="mb-6 flex flex-col pb-6">
      <h1 className="mb-2 text-4xl">{product.title}</h1>
      <div className="text-2xl">
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: product.priceRange.minVariantPrice.currencyCode,
        }).format(parseInt(product.priceRange.minVariantPrice.amount))}
      </div>
      <Separator className="my-4" />
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10">
        {product.description}
      </p>
      <div className="flex flex-col gap-4">
        {product.options.map((option) => (
          <div key={option.id}>
            <strong>{option.name}</strong>:{" "}
            <div className="flex flex-row flex-wrap w-full gap-2">
              {option.values.map((value) => (
                <Button variant={"outline"} key={value} className="min-w-20">
                  {value}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-8" />
      <Button>Add to Cart</Button>
    </div>
  )
}
