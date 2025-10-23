// "use client"

// import * as React from "react"
// import { Check, ChevronsUpDown } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// const socialType = [
//   {
//     value: "facebook",
//     label: "Facebook",
//   },
//   {
//     value: "instagram",
//     label: "Instagram",
//   }
// ]

// type SearchTypeMenuProps = {
//     value: string
//     setValue: React.Dispatch<React.SetStateAction<string>>
//   }

// export function SearchTypeMenu({ value, setValue }: SearchTypeMenuProps) {
//   const [open, setOpen] = React.useState(false)

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-[250px] justify-between mr-5"
//         >
//           {value
//             ? socialType.find((type) => type.value === value)?.label
//             : "Select type..."}
//           <ChevronsUpDown className="opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandInput placeholder="Search type..." className="h-9" />
//           <CommandList>
//             <CommandEmpty>No type found.</CommandEmpty>
//             <CommandGroup>
//               {socialType.map((type) => (
//                 <CommandItem
//                   key={type.value}
//                   value={type.value}
//                   onSelect={(currentValue) => {
//                     setValue(currentValue === value ? "" : currentValue)
//                     setOpen(false)
//                   }}
//                 >
//                   {type.label}
//                   <Check
//                     className={cn(
//                       "ml-auto",
//                       value === type.value ? "opacity-100" : "opacity-0"
//                     )}
//                   />
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   )
// }