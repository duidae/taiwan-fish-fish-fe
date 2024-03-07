import {InteractiveSection} from "@/app/home/interactive-section"
import {FeaturedVideos, FeaturedPosts, FeaturedTopics, DIRECTION} from "@/app/home/featured-section"

// TODO: remove mockups when cms is ready
import {chillYTVideos, featuredImages, YTVideos, featuredPosts as posts} from "./mockups"

export default function Home() {
  // TODO: fetch contents from API
  const relaxingVideos = chillYTVideos
  const amazingImages = featuredImages

  const headlineVideo = YTVideos[0]
  const featuredVideos = YTVideos.slice(1)

  const headlinePost = posts[0]
  const featuredPosts = posts.slice(1)

  const headlineTopic = posts[0]
  const featuredTopics = posts.slice(1)

  return (
    <main className="flex flex-col w-full items-center justify-between mb-8">
      <InteractiveSection videos={relaxingVideos} images={amazingImages} />
      <FeaturedVideos
        id="featured-videos"
        title="影片"
        route="/videos"
        direction={DIRECTION.Left}
        headline={headlineVideo}
        featured={featuredVideos}
      />
      <FeaturedPosts
        id="featured-posts"
        title="文章"
        route="/posts"
        direction={DIRECTION.Right}
        headline={headlinePost}
        featured={featuredPosts}
      />
      <FeaturedTopics
        id="featured-topics"
        title="專題"
        route="/topics"
        direction={DIRECTION.Left}
        headline={headlineTopic}
        featured={featuredTopics}
      />
    </main>
  )
}
