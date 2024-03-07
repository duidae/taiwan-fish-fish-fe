import {InteractiveSection} from "@/app/home/interactive-section"
import {FeaturedVideos, FeaturedPosts, FeaturedTopics, DIRECTION} from "@/app/home/featured-section"
import {chillYTVideos, featuredImages} from "./mockups"

export default function Home() {
  return (
    <main className="flex flex-col w-full items-center justify-between mb-8">
      <InteractiveSection videos={chillYTVideos} images={featuredImages} />
      <FeaturedVideos
        id="featured-videos"
        title="影片"
        route="/videos"
        direction={DIRECTION.Left}
        frontPage={<div></div>}
        featured={<div></div>}
      />
      <FeaturedPosts
        id="featured-posts"
        title="文章"
        route="/posts"
        direction={DIRECTION.Right}
        frontPage={<div></div>}
        featured={<div></div>}
      />
      <FeaturedTopics
        id="featured-topics"
        title="專題"
        route="/topics"
        direction={DIRECTION.Left}
        frontPage={<div></div>}
        featured={<div></div>}
      />
    </main>
  )
}
