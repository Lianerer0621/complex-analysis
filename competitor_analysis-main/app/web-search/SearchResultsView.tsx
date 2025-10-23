"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle, Circle } from "lucide-react"
import { SearchResultProps } from "./types"

// interface Props {
//   results: SearchResults[]
//   focusMode: boolean
//   selected: number[]
//   toggleSelect: (id: number) => void
// }

const SearchResultsView = ({ results, focusMode, selected, toggleSelect }: SearchResultProps) => {
  if (!results || results.length === 0) {
    return (
      <div className="px-6 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} className="flex flex-col md:flex-row w-full max-w-5xl mx-auto overflow-hidden min-h-[250px] border">
            <div className="w-full md:w-[250px] h-[250px]">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="flex flex-col justify-between p-4 w-full">
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-4 w-full mt-4" />
              <Skeleton className="h-4 w-5/6 mt-1" />
              <div className="mt-4 flex justify-end">
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="px-6 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
      {results.map((res) => {
        const isSelected = selected.includes(res.id)
        return (
          <Card
            key={res.id}
            className={`flex flex-col md:flex-row w-full max-w-5xl mx-auto overflow-hidden min-h-[250px] border-2 transition ${
              isSelected ? "border-primary" : ""
            }`}
            onClick={focusMode ? () => toggleSelect(res.id) : undefined}
          >
            {res.image && (
              <div className="w-full md:w-[250px] h-[250px] md:h-auto">
                <img
                  src={res.image}
                  alt={res.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            <div className="flex flex-col justify-between p-4 w-full">
              <CardHeader className="p-0 mb-2 flex justify-between items-start">
                <CardTitle className="text-lg font-bold leading-snug">{res.title}</CardTitle>
                {focusMode && (
                  <div className="text-primary mt-1">
                    {isSelected ? <CheckCircle size={20} /> : <Circle size={20} />}
                  </div>
                )}
              </CardHeader>

              {(res.date || res.source) && (
                <div className="flex flex-wrap gap-2 mb-2 text-sm text-muted-foreground">
                  {res.date && (
                    <span className="bg-muted px-3 py-1 rounded-full text-xs font-medium">
                      {new Date(res.date).toLocaleDateString()}
                    </span>
                  )}
                  {res.source && (
                    <span className="bg-muted px-3 py-1 rounded-full text-xs font-medium">
                      {res.source}
                    </span>
                  )}
                </div>
              )}

              <CardContent className="p-0">
                <p className="text-sm line-clamp-4">{res.body}</p>
              </CardContent>

              <CardFooter className="p-0 mt-4 flex justify-end">
                <a href={res.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">Visit</Button>
                </a>
              </CardFooter>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default SearchResultsView
