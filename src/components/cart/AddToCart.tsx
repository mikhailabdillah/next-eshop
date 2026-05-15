"use client"

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
        Add To Cart
      </Button>
    )
  }

  return (
    <Button type="submit" aria-label="Add to cart">
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
