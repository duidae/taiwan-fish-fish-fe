import {SummaryCard, DisplayMode} from "@/app/components/summary-card"
import {featuredPosts as _featuredPosts} from "../mockups"

export default function Posts() {
  const featuredPosts = _featuredPosts
  const posts = [..._featuredPosts, ..._featuredPosts]

  const slider = null

  const postComponents = posts.map((summary, index) => (
    <SummaryCard
      key={`post-list-${index}`}
      url={summary.url}
      ogImage={summary.ogImage}
      ogTitle={summary.ogTitle}
      ogDescription={summary.ogDescription}
      displayMode={DisplayMode.COLUMN}
    />
  ))

  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      <div className="text-2xl">所有文章</div>
      {slider}
      <div className="mt-8 mb-4 grid text-center w-4/5 lg:grid-cols-4 lg:text-left gap-8">{postComponents}</div>
    </main>
  )
}
