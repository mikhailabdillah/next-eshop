import { getProductRecommendations } from "@/lib/shopify"
import Link from "next/link"
import Image from "next/image"

export async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id)

  if (!relatedProducts.length) return null

  return (
    <div className="py-8">
      <h2 className="mb-4 text-4xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
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
          </li>
        ))}
      </ul>
    </div>
  )
}
