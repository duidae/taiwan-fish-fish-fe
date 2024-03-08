import {Slider} from "@/app/components/slider"
import {SummaryCard, DisplayMode} from "@/app/components/summary-card"

// TODO: remove mockup
import {featuredPosts as _featuredPosts} from "../mockups"

export default function Posts() {
  const featuredPosts = _featuredPosts
  const posts = [..._featuredPosts, ..._featuredPosts]

  const featuredComponents = featuredPosts.map((summary, index) => (
    <SummaryCard
      key={`post-list-${index}`}
      url={summary.url}
      ogImage={summary.ogImage}
      ogTitle={summary.ogTitle}
      ogDescription={summary.ogDescription}
      displayMode={DisplayMode.COLUMN}
    />
  ))

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
      <div className="text-2xl">精選文章</div>
      <Slider slides={featuredComponents} />
      <div className="text-2xl">所有文章</div>
      <div className="mt-8 mb-4 grid text-center w-4/5 lg:grid-cols-4 lg:text-left gap-8">{postComponents}</div>
    </main>
  )
}
