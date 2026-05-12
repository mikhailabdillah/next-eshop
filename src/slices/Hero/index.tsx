import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
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
                <p>2024</p>
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
            <Carousel>
              <CarouselContent>
                {Array.from({ length: 5 }, (_, i) => (
                  <CarouselItem key={i} className="basis-1/2 px-4">
                    <Image
                      src={
                        "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt=""
                      width={4000}
                      height={5000}
                      className="object-cover aspect-10/11"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
