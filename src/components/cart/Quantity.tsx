"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import { cx } from "class-variance-authority"
import { updateItemQuantity } from "@/components/cart/actions"
import type { CartItem } from "@/lib/shopify/types"
import { useActionState } from "react"
import { UpdateType } from "@/context/cart-context"

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  return (
    <button
      type="submit"
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      className={cx(
        "ease flex size-6 flex-none items-center cursor-pointer justify-center rounded-full",
        {
          "ml-auto": type === "minus",
        },
      )}
    >
      {type === "plus" ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  )
}

export function CartQuantity({
  item,
  type,
  optimisticUpdate,
}: {
  item: CartItem
  type: "plus" | "minus"
  optimisticUpdate: (merchandiseId: string, updateType: UpdateType) => void
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null)
  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  }
  const updateItemQuantityAction = formAction.bind(null, payload)

  return (
    <form
      action={async () => {
        optimisticUpdate(payload.merchandiseId, type)
        updateItemQuantityAction()
      }}
    >
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  )
}
