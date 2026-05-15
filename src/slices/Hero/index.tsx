import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { getCollections } from "@/lib/shopify"
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function Hero() {
  const collections = await getCollections()

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-row flex-wrap lg:flex-nowrap gap-8">
          <div className="basis-full lg:basis-1/3">
            <div className="flex flex-col gap-8 justify-between h-full">
              <div>
                <h1 className="text-6xl">New Collection</h1>
                <p className="mt-2 text-lg">
                  Discover the latest trends in fashion.
                </p>
                <p>SUMMER</p>
                <p>2026</p>
              </div>
              <div className="flex flex-row flex-wrap justify-between gap-4">
                <Button
                  nativeButton={false}
                  render={<Link href={"/shop"} />}
                  className={"w-full max-w-2/3"}
                >
                  Go to shop now
                  <ArrowRightIcon />
                </Button>
                <div className="flex flex-row gap-2">
                  <Button variant={"outline"} className={"px-2"}>
                    <ChevronLeftIcon className="size-6" />
                  </Button>
                  <Button variant={"outline"} className={"px-2"}>
                    <ChevronRightIcon className="size-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-full lg:basis-2/3">
            <Carousel
              opts={{ dragFree: true, skipSnaps: true }}
              className="relative overflow-hidden"
            >
              <CarouselContent>
                {collections
                  .filter((collection) => collection.handle)
                  .map((collection, i) => (
                    <CarouselItem key={i} className="basis-auto max-w-xs px-4">
                      {collection.image && (
                        <Link href={`/collections/${collection.handle}`}>
                          <Image
                            src={collection.image.url}
                            alt={collection.image.altText || ""}
                            width={collection.image.width}
                            height={collection.image.height}
                            className="object-cover aspect-4/6"
                          />
                        </Link>
                      )}
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}
