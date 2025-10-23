// app/web-search/page.tsx
"use client"

import * as React from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import ViewContent from "./views"
import { SearchResults } from "./types"
import validator from "validator"

export default function WebSearchPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [submittedQuery, setSubmittedQuery] = React.useState("")
  const [results, setResults] = React.useState<string | SearchResults[]>([])
  const [loading, setLoading] = React.useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedQuery(searchQuery)
    setLoading(true)

    try {
      if (validator.isURL(searchQuery)) {
        const res = await axios.post("http://127.0.0.1:8000/direct-recommendation", {
          urls: [searchQuery],
        })
        setResults(res.data.recommendation)
      } else {
        const res = await axios.post("http://127.0.0.1:8000/search-results", {
          search: searchQuery,
        })
        setResults(res.data)
      }
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mt-20 w-full">
      <form onSubmit={handleSearch} className="search flex gap-4 items-center px-6">
        <Input
          id="searchBar"
          type="search"
          placeholder="Paste a competitor article link or keyword"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button type="submit" className="ml-2" disabled={loading}>
          {loading ? "Searching..." : <ArrowRightIcon />}
        </Button>
      </form>

      <ViewContent submittedQuery={submittedQuery} results={results} loading={loading} />
    </main>
  )
}
