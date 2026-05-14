import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { getCollectionProducts } from "@/lib/shopify"
import Image from "next/image"
import Link from "next/link"

export default async function NewArrival() {
  const items = await getCollectionProducts({
    collection: "men",
    sortKey: "CREATED_AT",
  })

  return (
    <section className="relative py-24 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl uppercase">
          New <br /> This Week
        </h2>
        <p className="mt-2 text-lg">
          Check out the latest additions to our collection.
        </p>

        <div className="mt-8">
          <Carousel
            opts={{
              dragFree: true,
              skipSnaps: true,
            }}
          >
            <CarouselContent>
              {items.map((item) => {
                console.log(item, "item")

                return (
                  <CarouselItem
                    key={item.id}
                    className="basis-3/4 md:basis-4/9 lg:basis-3/10"
                  >
                    <div className="relative">
                      <Link
                        href={`/product/${item.handle}`}
                        className="absolute inset-0 z-10"
                      />
                      <div className="bg-gray-500">
                        <Image
                          src={item.featuredImage.url}
                          alt={item.featuredImage.altText || ""}
                          width={item.featuredImage.width}
                          height={item.featuredImage.height}
                          className="object-cover aspect-10/11"
                        />
                      </div>
                      <div className="mt-4 font-extrabold">
                        {item.productType}
                      </div>
                      <div className="flex flex-row mt-2 justify-between gap-4">
                        <h3 className="text-base font-medium basis-2/3">
                          {item.title}
                        </h3>
                        <p className="text-lg font-extrabold basis-1/3 text-right">
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency:
                              item.priceRange.minVariantPrice.currencyCode,
                          }).format(
                            parseInt(item.priceRange.minVariantPrice.amount),
                          )}
                        </p>
                      </div>
                      <div className="mt-2 text-gray-500">
                        {item.options
                          .find((option) => option.name === "Color")
                          ?.values.join(", ")}
                      </div>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
