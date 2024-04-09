import {SummaryCard, DisplayMode} from "@/app/components/summary-card"
import {List} from "../list"

// TODO: remove mockup
import {featuredPosts as _featuredPosts} from "@/app/mockups"

export default function Posts() {
  const featuredPosts = _featuredPosts
  const posts = [..._featuredPosts, ..._featuredPosts]

  const featuredComponents = featuredPosts.map((summary, index) => (
    <div key={`list-featured-${index}`} className="h-96 mb-8">
      <SummaryCard
        url={summary.url}
        ogImage={summary.ogImage}
        ogTitle={summary.ogTitle}
        ogDescription={summary.ogDescription}
        displayMode={DisplayMode.COLUMN}
      />
    </div>
  ))

  const listComponents = posts.map((summary, index) => (
    <div key={`list-all-${index}`} className="h-96">
      <SummaryCard
        url={summary.url}
        ogImage={summary.ogImage}
        ogTitle={summary.ogTitle}
        ogDescription={summary.ogDescription}
        displayMode={DisplayMode.COLUMN}
      />
    </div>
  ))

  return <List featuredComponents={featuredComponents} listComponents={listComponents} title="文章" />
}
