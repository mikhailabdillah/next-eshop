"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { useRouter, useSearchParams } from "next/navigation"

export function Search({ searchValue }: { searchValue: string }) {
  const [input, setInput] = useState(searchValue)
  const searchParams = useSearchParams()
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)

    setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (!e.target.value) {
        params.delete("q")
        router.replace(`?${params.toString()}`, { scroll: false })
      } else {
        params.set("q", e.target.value)
        router.replace(`?${params.toString()}`, { scroll: false })
      }
    }, 300)
  }

  return (
    <div>
      <Input
        name="q"
        placeholder="Search"
        autoComplete="off"
        value={input}
        onChange={handleChange}
      />
    </div>
  )
}
