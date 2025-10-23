import { Skeleton } from "@/components/ui/skeleton";

type WebSearchResults = {
    query_type: string;
    results: Array<object>;
    loading: boolean
  }

const SkeletonStruct = {
post_count: Array.from({ length: 3 }), // 6 placeholder skeletons
};

const SearchResults = ({ query_type, results, loading }: WebSearchResults) => {
    return <div className="w-full grid grid-cols-4 gap-4 p-10">
    <div className="grid col-span-1 gap-6 p-3 post-area border-2 border-green-300 rounded-xl">
      {loading
        ? SkeletonStruct.post_count.map((_, idx) => (
            <Skeleton key={idx} className="h-[300px] w-full rounded-xl" />
          ))
        : results.data.map((post, index) => (
            <Post key={post.id} post={post} index={index} content_type="hashtag"/>
          ))}
    </div>

    <div className="p-4 col-span-3 h-full border-2 border-purple-300 rounded-xl">
      {/* Reserved for post preview or analytics */}
    </div>
  </div>
}

export default SearchResults;