import { HIDDEN_PRODUCT_TAG } from "@/lib/constants"
import { getProduct } from "@/lib/shopify"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ProductDescription } from "@/components/product/Description"
import { ProductGallery } from "@/components/product/Gallery"
import { RelatedProducts } from "@/components/product/Related"

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const params = await props.params
  const product = await getProduct(params.handle)

  if (!product) return notFound()

  const { url, width, height, altText: alt } = product.featuredImage || {}
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG)

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
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

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>
}) {
  const params = await props.params
  const product = await getProduct(params.handle)

  if (!product) return notFound()

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  }

  return (
    <main className="relative overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <div className="flex flex-row flex-wrap">
              <Suspense fallback={<div>Loading...</div>}>
                <ProductGallery images={product.images} />
              </Suspense>
            </div>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <RelatedProducts id={product.id} />
        </Suspense>
      </div>
    </main>
  )
}
