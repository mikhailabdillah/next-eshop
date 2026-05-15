"use client"

import { useActionState, useEffect } from "react"
import { Button } from "../ui/button"
import {
  createCartAndSetCookie,
  redirectToCheckout,
  removeItem,
} from "./actions"
import { UpdateType, useCart } from "@/context/cart-context"
import { HandbagIcon, XIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import Image from "next/image"
import { useFormStatus } from "react-dom"
import { Spinner } from "../ui/spinner"
import { Price } from "../product/Price"
import { CartItem } from "@/lib/shopify/types"

export function CartDropdown() {
  const { cart, updateCartItem } = useCart()

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie()
    }
  }, [cart])

  return (
    <>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              size={"icon-lg"}
              className="hidden lg:inline-flex relative"
            />
          }
        >
          {Boolean(cart?.totalQuantity) && (
            <span className="absolute -top-1 -right-1 bg-primary p-1 min-w-5.5 flex items-center justify-center text-white outline-2 outline-white text-[10px] rounded-2xl">
              {cart?.totalQuantity}
            </span>
          )}
          <HandbagIcon className="size-6" />
          <span className="sr-only">Cart</span>
        </PopoverTrigger>
        <PopoverContent className={"w-full max-w-sm"}>
          <PopoverHeader>
            <PopoverTitle>Your Cart</PopoverTitle>
          </PopoverHeader>
          {!cart || cart.lines.length === 0 ? (
            <div className="py-4 text-center w-sm">
              <h2 className="text-lg">Your cart is empty.</h2>
            </div>
          ) : (
            <ul>
              {cart?.lines.map((item) => (
                <li key={item.id}>
                  <div className="flex flex-row gap-2 py-2">
                    <div className="relative size-20 shrink-0">
                      <DeleteItemButton
                        item={item}
                        optimisticUpdate={updateCartItem}
                      />
                      <Image
                        src={item.merchandise.product.featuredImage.url}
                        alt={
                          item.merchandise.product.featuredImage.altText || ""
                        }
                        width={item.merchandise.product.featuredImage.width}
                        height={item.merchandise.product.featuredImage.height}
                        className="object-cover size-full aspect-square"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {item.merchandise.product.title}
                      </div>
                      <div>
                        <Price
                          amount={item.cost.totalAmount.amount}
                          currencyCode={item.cost.totalAmount.currencyCode}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </PopoverContent>
      </Popover>
    </>
  )
}

function CheckoutButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
      type="submit"
      disabled={pending}
    >
      {pending ? <Spinner className="bg-white" /> : "Proceed to Checkout"}
    </button>
  )
}

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem
  optimisticUpdate: (merchandiseId: string, updateType: UpdateType) => void
}) {
  const [message, formAction] = useActionState(removeItem, null)
  const merchandiseId = item.merchandise.id
  const removeItemAction = formAction.bind(null, merchandiseId)

  return (
    <form
      action={async () => {
        optimisticUpdate(merchandiseId, "delete")
        removeItemAction()
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex size-6 items-center justify-center rounded-full bg-neutral-500"
      >
        <XIcon className="mx-px h-4 w-4 text-white dark:text-black" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  )
}
