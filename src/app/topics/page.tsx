import {Slider} from "@/app/components/slider"
import {SummaryCard, DisplayMode} from "@/app/components/summary-card"
import {Color} from "@/app/constant"

// TODO: remove mockup
import {featuredPosts} from "../mockups"

export default function Topics() {
  const featuredTopics = featuredPosts
  const topics = [...featuredPosts, ...featuredPosts]

  const featuredComponents = featuredTopics.map((summary, index) => (
    <SummaryCard
      key={`post-list-${index}`}
      url={summary.url}
      ogImage={summary.ogImage}
      ogTitle={summary.ogTitle}
      ogDescription={summary.ogDescription}
      displayMode={DisplayMode.COLUMN}
    />
  ))

  const topicComponents = topics.map((summary, index) => (
    <div key={`post-list-${index}`} className="h-96">
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
      <div className="text-2xl mb-8">
        <h1>精選專題</h1>
      </div>
      <div className="w-10/12">
        <Slider slides={featuredComponents} />
      </div>
    </div>
  )

  const all = (
    <div className="flex flex-col w-full items-center">
      <div className="text-2xl mt-8 mb-8">
        <h1>所有專題</h1>
      </div>
      <div className="w-4/5 grid text-center lg:grid-cols-3 lg:text-left gap-8 mt-4 mb-4">{topicComponents}</div>
    </div>
  )

  return (
    <main className={`w-full flex flex-col items-center mt-16 mb-8 `}>
      <div className={`max-w-screen-2xl w-full flex flex-col divide-y divide-${Color.HOVER} gap-10`}>
        {featured}
        {all}
      </div>
    </main>
  )
}
