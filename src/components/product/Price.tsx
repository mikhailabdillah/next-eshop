export function Price({
  amount,
  className,
  currencyCode = "USD",
}: {
  amount: string
  className?: string
  currencyCode: string
} & React.ComponentProps<"p">) {
  return (
    <p suppressHydrationWarning={true} className={className}>
      {`${new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "narrowSymbol",
      }).format(parseFloat(amount))}`}
    </p>
  )
}
