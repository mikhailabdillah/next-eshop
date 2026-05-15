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
import { CartQuantity } from "./Quantity"

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
          openOnHover
          render={
            <Button
              size={"icon-lg"}
              className="relative aria-expanded:bg-transparent aria-expanded:text-primary"
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
        <PopoverContent className={"w-[24rem] mt-2"}>
          <PopoverHeader className="px-2">
            <PopoverTitle className="font-extrabold text-lg py-2 border-b">
              My Cart
            </PopoverTitle>
          </PopoverHeader>
          {!cart || cart.lines.length === 0 ? (
            <div className="py-4 px-2 text-center w-full">
              <HandbagIcon className="mx-auto mb-2 size-12 text-neutral-400" />
              <h3 className="text-lg font-extrabold text-neutral-600">
                Your cart is empty.
              </h3>
            </div>
          ) : (
            <div className="p-2">
              <ul className="mb-4">
                {cart?.lines.map((item) => (
                  <li key={item.id}>
                    <div className="flex flex-row gap-2 py-2">
                      <div className="relative size-20 shrink-0">
                        <div className="absolute -top-2 -left-2">
                          <DeleteItemButton
                            item={item}
                            optimisticUpdate={updateCartItem}
                          />
                        </div>
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
                      <div className="w-full">
                        <div className="text-sm font-semibold">
                          {item.merchandise.product.title}
                        </div>

                        <div className="flex flex-row w-full items-center mt-2 justify-between">
                          <div className="flex h-6 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                            <CartQuantity
                              item={item}
                              type="minus"
                              optimisticUpdate={updateCartItem}
                            />
                            <p className="w-6 text-center">
                              <span className="w-full text-sm">
                                {item.quantity}
                              </span>
                            </p>
                            <CartQuantity
                              item={item}
                              type="plus"
                              optimisticUpdate={updateCartItem}
                            />
                          </div>
                          <Price
                            className="text-gray-500"
                            amount={item.cost.totalAmount.amount}
                            currencyCode={item.cost.totalAmount.currencyCode}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                  <p>Taxes</p>
                  <Price
                    className="text-right font-extrabold text-black dark:text-white"
                    amount={cart.cost.totalTaxAmount.amount}
                    currencyCode={cart.cost.totalTaxAmount.currencyCode}
                  />
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Shipping</p>
                  <p className="text-right">Calculated at checkout</p>
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Total</p>
                  <Price
                    className="text-right font-extrabold text-black dark:text-white"
                    amount={cart.cost.totalAmount.amount}
                    currencyCode={cart.cost.totalAmount.currencyCode}
                  />
                </div>
              </div>
              <form action={redirectToCheckout}>
                <CheckoutButton />
              </form>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  )
}

function CheckoutButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      className="block w-full text-center text-xs font-medium"
      type="submit"
      disabled={pending}
    >
      {pending ? <Spinner className="bg-white" /> : "Proceed to Checkout"}
    </Button>
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
      <Button
        type="submit"
        variant={"ghost"}
        aria-label="Remove cart item"
        className="flex size-6 px-0 items-center justify-center rounded-full bg-neutral-500 hover:bg-neutral-700"
      >
        <XIcon className="mx-px h-4 w-4 text-white dark:text-black" />
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  )
}
