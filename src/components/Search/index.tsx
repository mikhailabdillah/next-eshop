"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { sorting } from "@/lib/constants"

type SearchProps = {
  sortKey: string
  searchValue: string
}

export default function Search({ sortKey, searchValue }: SearchProps) {
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
    <div className="flex flex-row w-full flex-wrap">
      <div className="w-2/3">
        <Input
          name="q"
          placeholder="Search products"
          autoComplete="off"
          value={input}
          onChange={handleChange}
        />
      </div>
      <div className="ml-auto">
        <Sort sortKey={sortKey} />
      </div>
    </div>
  )
}

function Sort({ sortKey }: { sortKey: string }) {
  const [value, setValue] = useState(sortKey)
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <div>
      <Select
        value={value}
        onValueChange={(newValue) => {
          const params = new URLSearchParams(searchParams.toString())
          if (newValue) {
            setValue(newValue)
            params.set("sort", newValue)
            router.replace(`?${params.toString()}`, { scroll: false })
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sorting.map((item) => (
            <SelectItem key={item.slug} value={item.sortKey}>
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
