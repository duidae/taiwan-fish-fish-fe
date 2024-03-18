import {Slider} from "@/app/components/slider"
import {SummaryCard, DisplayMode} from "@/app/components/summary-card"

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
      <div className="text-2xl mb-8">精選專題</div>
      <div className="w-4/5">
        <Slider slides={featuredComponents} />
      </div>
      <div className="text-2xl mt-8 mb-8">所有專題</div>
      <div className="w-4/5 grid text-center  lg:grid-cols-4 lg:text-left gap-8 mt-4 mb-4">{topicComponents}</div>
    </main>
  )
}
