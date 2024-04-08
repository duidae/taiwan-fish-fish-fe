import {Slider} from "@/app/components/slider"
import {SummaryCard, DisplayMode} from "@/app/components/summary-card"
import {Color} from "@/app/constant"

// TODO: remove mockup
import {featuredPosts} from "@/app/mockups"

export default function Topics() {
  const featuredTopics = featuredPosts
  const topics = [...featuredPosts, ...featuredPosts]

  const featuredComponents = featuredTopics.map((summary, index) => (
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

  const topicComponents = topics.map((summary, index) => (
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
      <h1 className="my-8">精選專題</h1>
      <div className="w-full">
        <Slider slides={featuredComponents} />
      </div>
    </div>
  )

  const all = (
    <div className="flex flex-col w-full items-center">
      <h1 className="my-8">所有專題</h1>
      <div className="w-full grid text-center lg:grid-cols-3 md:grid-cols-2 lg:text-left gap-8 mb-4">
        {topicComponents}
      </div>
    </div>
  )

  return (
    <main className={`w-full flex flex-col items-center mt-16 mb-8`}>
      <div className={`max-w-screen-2xl w-full flex flex-col divide-y divide-${Color.HOVER} gap-10 px-8`}>
        {featured}
        {all}
      </div>
    </main>
  )
}
