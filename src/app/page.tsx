import {InteractiveSection} from "@/app/home/interactive-section"
import {FeaturedVideos, FeaturedPosts, FeaturedTopics, DIRECTION} from "@/app/home/featured-section"
import {TOC} from "@/app/home/table-of-content"

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
    <main className="flex flex-col w-full items-center justify-between">
      <div id="interactive-section" className="w-full h-screen">
        <InteractiveSection videos={relaxingVideos} images={amazingImages} />
      </div>
      <div id="featured-videos" className="w-full h-screen">
        <FeaturedVideos
          title="影音"
          route="/videos"
          direction={DIRECTION.Left}
          headline={headlineVideo}
          featured={featuredVideos}
        />
      </div>
      <div id="featured-posts" className="w-full h-screen bg-red-50">
        {/*
      <FeaturedPosts
        title="文章"
        route="/posts"
        direction={DIRECTION.Right}
        headline={headlinePost}
        featured={featuredPosts}
      />
        */}
      </div>
      <div id="featured-topics" className="w-full h-screen bg-green-50">
        {/*
      <FeaturedTopics
        title="專題"
        route="/topics"
        direction={DIRECTION.Left}
        headline={headlineTopic}
        featured={featuredTopics}
      />
      */}
      </div>
      <TOC
        indexes={[
          {id: "interactive-section", label: "頁首"},
          {id: "featured-videos", label: "影音"},
          {id: "featured-posts", label: "文章"},
          {id: "featured-topics", label: "專題"}
        ]}
      />
    </main>
  )
}
