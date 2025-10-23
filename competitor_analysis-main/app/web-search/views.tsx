"use client"

import React, { useEffect, useState } from "react"
import validator from "validator"
import { Button } from "@/components/ui/button"
import UrlRecommendationView from "./UrlRecommendationView"
import SearchResultsView from "./SearchResultsView"
import RecommendationDialog from "../components/RecommendationDialog"
import { ViewProps, SearchResults } from "./types"

const ViewContent = ({ submittedQuery, results, loading }: ViewProps) => {
  const [focusMode, setFocusMode] = useState(false)
  const [selected, setSelected] = useState<number[]>([])
  const [recommendation, setRecommendation] = useState<string | null>(null)
  const [loadingRecommendation, setLoadingRecommendation] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const copyToClipboard = () => {
    if (!recommendation) return
    navigator.clipboard.writeText(recommendation)
  }

  const generateRecommendation = async (urls: string[], isFocus: boolean) => {
    if (!urls.length) return
    if (isFocus) setDialogOpen(true)
    setLoadingRecommendation(true)

    try {
      const endpoint = isFocus ? "focus-recommendation" : "direct-recommendation"
      const res = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      })
      const data = await res.json()
      setRecommendation(data.recommendation)
      setHasGenerated(true)
    } catch (err) {
      console.error("Error fetching recommendation:", err)
    } finally {
      setLoadingRecommendation(false)
    }
  }

  useEffect(() => {
    setFocusMode(false)
    setSelected([])
    setRecommendation(null)
    setDialogOpen(false)

    if (validator.isURL(submittedQuery)) {
      generateRecommendation([submittedQuery], false)
    }
  }, [submittedQuery])

  if (!submittedQuery) return null

  if (validator.isURL(submittedQuery)) {
    return (
      <UrlRecommendationView
        loading={loadingRecommendation}
        recommendation={recommendation}
        copyToClipboard={copyToClipboard}
      />
    )
  }

  const handleFocus = () => {
    const selectedUrls = (results as SearchResults[])
      .filter((res) => selected.includes(res.id))
      .map((res) => res.url)
    generateRecommendation(selectedUrls, true)
  }

  return (
    <>
      <div className="px-6 mt-10 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => {
            setFocusMode((prev) => {
              const next = !prev
              if (!next) setSelected([])
              return next
            })
          }}
        >
          {focusMode ? "Exit Focus" : "Focus"}
        </Button>
        <div>
        <Button variant="secondary" className="mr-10" onClick={() => setDialogOpen(true)} disabled={!hasGenerated}>
          View Recommendation
        </Button>

        {focusMode && (
          <Button onClick={handleFocus} disabled={!selected.length || loadingRecommendation}>
            {loadingRecommendation ? "Generating..." : "Generate Recommendations"}
          </Button>
        )}
        </div>
      </div>

      {Array.isArray(results) && (
        <SearchResultsView
          results={results}
          focusMode={focusMode}
          selected={selected}
          toggleSelect={toggleSelect}
        />
      )}
      
      <RecommendationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        loading={loadingRecommendation}
        recommendation={recommendation}
        onCopy={copyToClipboard}
      />
    </>
  )
}

export default ViewContent