"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRightIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import getTopPostsByHashtag from "../api/hashtag_top_posts"
import get_ig_account_posts from "../api/ig_account_api"
import ViewContent from "./views"
import { DropdownMenuDemo } from "./socialType"

export default function SocialSearchPage() {
  const [socialType, setSocialType] = useState<{ platform: string; option: string } | null>(null)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>({ data: [] })
  const [alertInfo, setAlertInfo] = useState({ title: "Alert", description: "Something went wrong. Please try again." })
  const [showAlert, setShowAlert] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!socialType || !search.trim()) {
      setAlertInfo({ title: "Missing Information", description: "Select a type and enter a search term." })
      setShowAlert(true)
      return
    }

    setLoading(true)
    try {
      if (socialType.platform === "instagram") {
        const res = socialType.option === "profile"
          ? await get_ig_account_posts(search)
          : await getTopPostsByHashtag(search)
        setResults(res)
      } else {
        setAlertInfo({ title: "Unsupported Type", description: "Only Instagram is supported right now." })
        setShowAlert(true)
      }
    } catch (err) {
      console.error("Search error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mt-20 w-full">
      <form onSubmit={handleSearch} className="flex gap-4 items-center px-6">
        <DropdownMenuDemo value={socialType} setValue={setSocialType} />
        <Input type="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button type="submit" className="ml-2" disabled={loading}>
          {loading ? "Searching..." : <ArrowRightIcon />}
        </Button>
      </form>

      <ViewContent searchType={socialType} results={results} loading={loading} />

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertInfo.title}</AlertDialogTitle>
            <AlertDialogDescription>{alertInfo.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>OK</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}