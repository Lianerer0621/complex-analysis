import HashtagView from "./instagram/HashtagView"
import IGAccountView from "./instagram/AccountView"
import { Results } from "./types"

const ViewContent = ({ searchType, results, loading }: Results) => {
  if (!searchType) return null

  if (searchType.option === "profile" || searchType.option === "page") {
    return <IGAccountView results={results} loading={loading} />
  } else if (searchType.option === "hashtag") {
    return <HashtagView results={results} loading={loading} />
  } else {
    return <div className="px-6 mt-6 text-muted-foreground">Unknown search type selected.</div>
  }
}

export default ViewContent
