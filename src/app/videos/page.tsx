import {List} from "@/app/components/list"
import {featuredPosts} from "../mockups"

export default function Videos() {
  const topicSummaries = [...featuredPosts, ...featuredPosts]

  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      <List summaries={topicSummaries} title="所有影片" />
    </main>
  )
}
