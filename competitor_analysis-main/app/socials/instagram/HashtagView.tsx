import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import ReactMarkdown from "react-markdown"
import Post from "@/app/components/post"
import { PostType } from "../types"

const HashtagView = ({ results, loading }: { results: { data: PostType[] }; loading: boolean }) => {
  const [recommendation, setRecommendation] = useState<string>("")
  const [loadingRecommendation, setLoadingRecommendation] = useState(false)

  useEffect(() => {
    const fetchRecommendation = async () => {
      setLoadingRecommendation(true)
      try {
        const res = await fetch("http://127.0.0.1:8000/socials-recommendation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ posts: results.data.map((post) => post.caption || "") }),
        })
        const data = await res.json()
        setRecommendation(data.recommendation)
      } catch (err) {
        console.error("Recommendation fetch failed:", err)
      } finally {
        setLoadingRecommendation(false)
      }
    }

    if (!loading && results.data.length) {
      fetchRecommendation()
    }
  }, [results, loading])

  const handleCopy = () => {
    if (!recommendation) return
    navigator.clipboard.writeText(recommendation)
      .then(() => alert("Copied to clipboard!"))
      .catch(() => alert("Failed to copy"))
  }

  return (
    <div className="w-full grid grid-cols-4 gap-4 p-10">
      <div className="grid col-span-1 gap-6 p-3 post-area border-2 border-green-300 rounded-xl">
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-[300px] w-full rounded-xl" />
            ))
          : results.data.map((post, index) => (
              <Post key={post.id} post={post} index={index} content_type="hashtag" />
            ))}
      </div>

      <div className="p-4 col-span-3 post-area border-2 border-purple-300 rounded-xl overflow-y-auto">
        {loadingRecommendation ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[85%]" />
          </div>
        ) : (
          <>
            {recommendation && (
              <div className="flex justify-end mb-2">
                <Button size="sm" variant="outline" onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
              </div>
            )}
            <div className="prose max-w-none whitespace-pre-wrap">
              <ReactMarkdown>{recommendation}</ReactMarkdown>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HashtagView