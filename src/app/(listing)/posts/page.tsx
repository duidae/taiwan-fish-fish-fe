import {Slider} from "@/app/components/slider"
import {SummaryCard, DisplayMode} from "@/app/components/summary-card"

// TODO: remove mockup
import {featuredPosts as _featuredPosts} from "@/app/mockups"

export default function Posts() {
  const featuredPosts = _featuredPosts
  const posts = [..._featuredPosts, ..._featuredPosts]

  const featuredComponents = featuredPosts.map((summary, index) => (
    <div key={`list-featured-${index}`} className="h-96">
      <SummaryCard
        url={summary.url}
        ogImage={summary.ogImage}
        ogTitle={summary.ogTitle}
        ogDescription={summary.ogDescription}
        displayMode={DisplayMode.COLUMN}
      />
    </div>
  ))

  const postComponents = posts.map((summary, index) => (
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

  const featured = (
    <div className="flex flex-col w-full items-center">
      <h1 className="my-8">精選文章</h1>
      <div className="w-full">
        <Slider slides={featuredComponents} />
      </div>
    </div>
  )

  const all = (
    <div className="flex flex-col w-full items-center">
      <h1 className="my-8">所有文章</h1>
      <div className="w-full grid text-center lg:grid-cols-3 md:grid-cols-2 lg:text-left gap-8 mb-4">
        {postComponents}
      </div>
    </div>
  )

  return (
    <>
      {featured}
      {all}
    </>
  )
}
