"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { SearchTypeMenuProps } from "./types"

const socialType = [
  {
    value: "twitter",
    label: "Twitter",
    options: [
      { value: "profile", label: "Profile" },
      { value: "hashtag", label: "Hashtag" }
    ]
  },
  {
    value: "instagram",
    label: "Instagram",
    options: [
      { value: "profile", label: "Profile" },
      { value: "hashtag", label: "Hashtag" }
    ]
  }
]

// type SelectedType = {
//   platform: string
//   option: string
// } | null

// type SearchTypeMenuProps = {
//   value: SelectedType
//   setValue: React.Dispatch<React.SetStateAction<SelectedType>>
// }

export function DropdownMenuDemo({ value, setValue }: SearchTypeMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[250px] justify-between">
          {value
            ? `${value.platform.charAt(0).toUpperCase() + value.platform.slice(1)} - ${value.option.charAt(0).toUpperCase() + value.option.slice(1)}`
            : "Select Social..."}
          <ChevronsUpDown className="ml-2 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Socials</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {socialType.map((type) => (
          <DropdownMenuSub key={type.value}>
            <DropdownMenuSubTrigger>{type.label}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {type.options.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={() =>
                      setValue({ platform: type.value, option: option.value })
                    }
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value?.platform === type.value &&
                          value?.option === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}