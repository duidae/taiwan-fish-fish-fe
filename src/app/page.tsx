import {InteractiveSection} from "@/app/home/interactive-section"
import {FeaturedVideos, FeaturedPosts, FeaturedTopics, DIRECTION} from "@/app/home/featured-section"
import {TOC} from "@/app/home/table-of-content"
import {ROUTE_VIDEO, ROUTE_TOPIC, ROUTE_POST} from "@/app/constant"

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

  const sections = [
    {
      id: "interactive-section",
      label: "頁首",
      component: <InteractiveSection videos={relaxingVideos} images={amazingImages} />
    },
    {
      id: "featured-1",
      label: ROUTE_VIDEO.title,
      component: (
        <FeaturedVideos
          title={ROUTE_VIDEO.title}
          route={ROUTE_VIDEO.path}
          direction={DIRECTION.Left}
          headline={headlineVideo}
          featured={featuredVideos}
        />
      )
    },
    {
      id: "featured-2",
      label: ROUTE_TOPIC.title,
      component: (
        <FeaturedTopics
          title={ROUTE_TOPIC.title}
          route={ROUTE_TOPIC.path}
          direction={DIRECTION.Left}
          headline={headlineTopic}
          featured={featuredTopics}
        />
      )
    },
    {
      id: "featured-3",
      label: ROUTE_POST.title,
      component: (
        <FeaturedPosts
          title={ROUTE_POST.title}
          route={ROUTE_POST.path}
          direction={DIRECTION.Right}
          headline={headlinePost}
          featured={featuredPosts}
        />
      )
    }
  ]
  const tocIndexes = sections.map(section => {
    return {id: section.id, label: section.label}
  })

  return (
    <main className="flex flex-col w-full items-center justify-between">
      {sections.map((seciton, index) => {
        return (
          <div key={`home-section-${index}`} id={seciton.id} className="w-full h-screen">
            {seciton.component}
          </div>
        )
      })}
      <TOC indexes={tocIndexes} />
    </main>
  )
}
