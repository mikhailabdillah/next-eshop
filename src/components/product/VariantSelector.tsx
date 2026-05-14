"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ProductOption, ProductVariant } from "@/lib/shopify/types"
import { Button } from "../ui/button"
import { cx } from "class-variance-authority"

type Combination = {
  id: string
  availableForSale: boolean
  [key: string]: string | boolean
}

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[]
  variants: ProductVariant[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1)

  if (hasNoOptionsOrJustOneOption) {
    return null
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }))

  function updateOption(name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => (
        <form key={option.id}>
          <strong>{option.name}</strong>:{" "}
          <div className="flex flex-row flex-wrap w-full gap-2">
            {option.values.map((value) => {
              const optionNameLowerCase = option.name.toLowerCase()

              // Base option params on current searchParams so we can preserve any other param state.
              const optionParams: Record<string, string> = {}
              searchParams.forEach((v, k) => (optionParams[k] = v))
              optionParams[optionNameLowerCase] = value

              // Filter out invalid options and check if the option combination is available for sale.
              const filtered = Object.entries(optionParams).filter(
                ([key, value]) =>
                  options.find(
                    (option) =>
                      option.name.toLowerCase() === key &&
                      option.values.includes(value),
                  ),
              )
              const isAvailableForSale = combinations.find((combination) =>
                filtered.every(
                  ([key, value]) =>
                    combination[key] === value && combination.availableForSale,
                ),
              )

              // The option is active if it's in the selected options.
              const isActive = searchParams.get(optionNameLowerCase) === value

              return (
                <Button
                  variant={"outline"}
                  key={value}
                  formAction={() => updateOption(optionNameLowerCase, value)}
                  type="submit"
                  aria-disabled={!isAvailableForSale}
                  disabled={!isAvailableForSale}
                  title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
                  className={cx(
                    "min-w-20",
                    isActive
                      ? "border-primary bg-primary text-white hover:text-white"
                      : "",
                  )}
                >
                  {value}
                </Button>
              )
            })}
          </div>
        </form>
      ))}
    </div>
  )
}
