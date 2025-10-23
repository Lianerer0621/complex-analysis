"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Copy } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { UrlRecommendationViewProps } from "./types"

// interface UrlRecommendationViewProps {
//   loading: boolean
//   recommendation: string | null
//   copyToClipboard: () => void
// }

const UrlRecommendationView: React.FC<UrlRecommendationViewProps> = ({
  loading,
  recommendation,
  copyToClipboard
}) => {
  const normalizeMarkdown = (input: string): string => {
    input = input.replace(/\n(\d+)\./g, '$1.\t')
    return input.trim()
  }
  return (
    <div className="px-6 mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">📌 Strategy Recommendation</h2>
        <Button variant="secondary" onClick={copyToClipboard} disabled={!recommendation}>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      ) : (
        <div className="prose prose-sm max-w-none text-muted-foreground bg-gray-600 bg-opacity-10 h-[800] overflow-y-auto border p-4 rounded-md">
          <ReactMarkdown className="markdown">{recommendation || ""}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

export default UrlRecommendationView
