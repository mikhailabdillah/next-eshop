import { Price } from "@/components/product/Price"
import { getCollection, getCollectionProducts } from "@/lib/shopify"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const params = await props.params
  const collection = await getCollection(params.handle)

  if (!collection) return notFound()

  const { url, width, height, altText: alt } = collection.image || {}

  return {
    title: collection.seo.title || collection.title,
    description: collection.seo.description || collection.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  }
}

export default async function CollectionPage(props: {
  params: Promise<{ handle: string }>
}) {
  const params = await props.params
  const collection = await getCollection(params.handle)
  const products = await getCollectionProducts({
    collection: params.handle,
  })

  if (!collection) return notFound()

  return (
    <main>
      <div className="container mx-auto px-4">
        <div>
          <h1 className="text-4xl">{collection.title + " Collections"}</h1>
          <p>{collection.description}</p>
        </div>
        <div className="mt-8">
          <div className="flex flex-wrap w-full -mx-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-4"
              >
                <div className="relative basis-3/4 md:basis-4/9 lg:basis-3/10">
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
                  <div className="mt-4 font-extrabold">
                    {product.productType}
                  </div>
                  <div className="flex flex-row mt-2 justify-between gap-4">
                    <h3 className="text-base font-medium basis-2/3">
                      {product.title}
                    </h3>
                    <Price
                      className="text-lg font-extrabold basis-1/3 text-right"
                      currencyCode={
                        product.priceRange.minVariantPrice.currencyCode
                      }
                      amount={product.priceRange.minVariantPrice.amount}
                    />
                  </div>
                  <div className="mt-2 text-gray-500">
                    {product.options
                      .find((option) => option.name === "Color")
                      ?.values.join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
