"use client"

import { PlusIcon } from "lucide-react"
import { addItem } from "./actions"
import { Product, ProductVariant } from "@/lib/shopify/types"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"
import { useCart } from "@/context/cart-context"
import { Button } from "../ui/button"

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean
  selectedVariantId: string | undefined
}) {
  if (!availableForSale) {
    return <Button disabled>Out Of Stock</Button>
  }

  if (!selectedVariantId) {
    return (
      <Button aria-label="Please select an option" disabled>
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </Button>
    )
  }

  return (
    <Button aria-label="Add to cart">
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </Button>
  )
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product
  const { addCartItem } = useCart()
  const searchParams = useSearchParams()
  const [message, formAction] = useActionState(addItem, null)

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  )
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined
  const selectedVariantId = variant?.id || defaultVariantId
  const addItemAction = formAction.bind(null, selectedVariantId)
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product)
        addItemAction()
      }}
      className="w-full flex flex-col"
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  )
}
