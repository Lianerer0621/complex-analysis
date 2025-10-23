// types.ts
export interface ViewProps {
  submittedQuery: string
  results: string | SearchResults[]
  loading: boolean
}

export interface SearchResults {
    id: number
    date: Date
    title: string
    body: string
    url: string
    image: string
    source: string
  }
  
export interface SearchResultProps {
  results: SearchResults[]
  focusMode: boolean
  selected: number[]
  toggleSelect: (id: number) => void
}

export interface UrlRecommendationViewProps {
    loading: boolean
    recommendation: string | null
    copyToClipboard: () => void
  }