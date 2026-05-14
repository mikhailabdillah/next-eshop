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
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
