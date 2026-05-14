"use client"

import { useCallback, useEffect, useState } from "react"
import { Image as ShopifyImage } from "@/lib/shopify/types"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import { EmblaCarouselType } from "embla-carousel"
import { cx } from "class-variance-authority"

export function ProductGallery({ images }: { images: ShopifyImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [carouselApi, setCarouselApi] = useState<EmblaCarouselType | undefined>(
    undefined,
  )

  const onThumbClick = useCallback(
    (index: number) => {
      if (!carouselApi) return
      carouselApi.scrollTo(index)
    },
    [carouselApi],
  )

  const onSelect = useCallback(() => {
    if (!carouselApi) return
    setSelectedIndex(carouselApi.selectedScrollSnap())
  }, [carouselApi])

  useEffect(() => {
    if (!carouselApi) return
    carouselApi.on("select", onSelect)
    carouselApi.on("reInit", onSelect)
    return () => {
      carouselApi.off("select", onSelect)
      carouselApi.off("reInit", onSelect)
    }
  }, [carouselApi, onSelect])

  return (
    <div className="flex flex-row">
      <Carousel
        opts={{ slidesToScroll: 1 }}
        className="relative"
        setApi={setCarouselApi}
      >
        <div className="overflow-hidden">
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.id} className="basis-full">
                <Image
                  src={image.url}
                  alt={image.altText || ""}
                  width={image.width}
                  height={image.height}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
      <div>
        <div className="flex flex-col gap-4 px-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => onThumbClick(index)}
              className={cx(
                "size-24 border-2 relative overflow-hidden cursor-pointer",
                index === selectedIndex
                  ? "border-blue-500"
                  : "border-transparent",
              )}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === selectedIndex}
              tabIndex={0}
              type="button"
              role="tab"
            >
              <Image
                src={image.url}
                alt={image.altText || ""}
                width={image.width}
                height={image.height}
                className="object-cover size-full"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
