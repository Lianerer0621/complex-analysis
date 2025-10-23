"use client"

import React from "react"
import ReactMarkdown from "react-markdown"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  loading: boolean
  recommendation: string | null
  onCopy: () => void
}

const RecommendationDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  loading,
  recommendation,
  onCopy
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>📌 Strategy Recommendation</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4 mt-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        ) : (
          <div className="prose prose-sm max-w-none text-muted-foreground bg-gray-600 bg-opacity-10 max-h-[600px] overflow-y-auto border p-4 rounded-md">
            <ReactMarkdown className="markdown">{recommendation || ""}</ReactMarkdown>
          </div>
        )}

        {!loading && (
          <div className="mt-4 text-right">
            <Button variant="secondary" onClick={onCopy} disabled={!recommendation}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default RecommendationDialog
