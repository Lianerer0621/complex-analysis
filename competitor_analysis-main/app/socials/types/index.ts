// view.tsx
export type Post = {
    id: string
    caption?: string
    media_type: string
    media_url: string
    permalink: string
    like_count?: number
    comments_count?: number
}
  
export type SelectedType = {
    platform: string
    option: string
} | null
  
export type Results = {
    searchType: SelectedType
    results: {
      data: Post[]
    }
    loading: boolean
}

// socialType.tsx
export type SearchTypeMenuProps = {
  value: SelectedType
  setValue: React.Dispatch<React.SetStateAction<SelectedType>>
}

// AccountView.tsx

export type PostType = {
  id: string
  caption?: string
  media_type: string
  media_url: string
  permalink: string
  like_count?: number
  comments_count?: number
}

export type IGAccountViewProps = {
  results: {
    data: PostType[]
  }
  loading: boolean
}