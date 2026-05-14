import { getProductRecommendations } from "@/lib/shopify"
import Link from "next/link"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"

export async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id)

  if (!relatedProducts.length) return null

  return (
    <div className="py-24">
      <h2 className="mb-4 text-4xl font-bold">Related Products</h2>
      <Carousel
        opts={{
          dragFree: true,
          skipSnaps: true,
        }}
      >
        <CarouselContent>
          {relatedProducts.map((product) => (
            <CarouselItem
              key={product.handle}
              className="basis-3/4 md:basis-4/9 lg:basis-3/10 xl:basis-3/13"
            >
              <Link
                className="relative h-full w-full"
                href={`/product/${product.handle}`}
                prefetch={true}
              >
                <Image
                  src={product.featuredImage?.url}
                  alt={product.title}
                  width={product.featuredImage?.width}
                  height={product.featuredImage?.height}
                  className="object-cover aspect-10/11"
                />
                <div className="mt-4 font-extrabold">{product.productType}</div>
                <div className="flex flex-row mt-2 justify-between gap-4">
                  <h3 className="text-base font-medium basis-2/3">
                    {product.title}
                  </h3>
                  <p className="text-lg font-extrabold basis-1/3 text-right">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: product.priceRange.minVariantPrice.currencyCode,
                    }).format(
                      parseInt(product.priceRange.minVariantPrice.amount),
                    )}
                  </p>
                </div>
                <div className="mt-2 text-gray-500">
                  {product.options
                    .find((option) => option.name === "Color")
                    ?.values.join(", ")}
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
