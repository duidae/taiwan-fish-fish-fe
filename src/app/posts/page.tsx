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
    <div className="h-96">
      <SummaryCard
        key={`post-list-${index}`}
        url={summary.url}
        ogImage={summary.ogImage}
        ogTitle={summary.ogTitle}
        ogDescription={summary.ogDescription}
        displayMode={DisplayMode.COLUMN}
      />
    </div>
  ))

  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      <div className="text-2xl mb-8">
        <h1>精選文章</h1>
      </div>
      <div className="w-4/5">
        <Slider slides={featuredComponents} />
      </div>
      <div className="text-2xl mt-8 mb-8">
        <h1>所有文章</h1>
      </div>
      <div className="w-4/5 grid text-center lg:grid-cols-3 lg:text-left gap-8 mt-4 mb-4">{postComponents}</div>
    </main>
  )
}
