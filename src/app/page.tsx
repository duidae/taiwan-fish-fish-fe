import {InteractiveSection} from "@/app/home/interactive-section"
import {FeaturedVideos} from "@/app/home/featured-videos"
import {FeaturedTextContents} from "@/app/home/featured-section"
import {TOC} from "@/app/home/table-of-content"
import {ROUTE_VIDEO, ROUTE_TOPIC, ROUTE_POST, Direction} from "@/app/constant"

// TODO: remove mockups when cms is ready
import {chillYTVideos, featuredImages, YTVideos, featuredPosts as posts} from "./mockups"

export default function Home() {
  // TODO: fetch contents from API
  const relaxingVideos = chillYTVideos
  const amazingImages = featuredImages

  const featuredVideos = YTVideos

  const headlinePost = posts[0]
  const featuredPosts = posts.slice(1)

  const headlineTopic = posts[0]
  const featuredTopics = posts.slice(1)

  const sections = [
    {
      id: "interactive-section",
      label: "頁首",
      component: <InteractiveSection videos={relaxingVideos} gallerySrcs={amazingImages} />
    },
    {
      id: "featured-1",
      label: ROUTE_VIDEO.title,
      component: (
        <FeaturedVideos
          id={"featured-1"}
          title={ROUTE_VIDEO.title}
          route={ROUTE_VIDEO.path}
          direction={Direction.LEFT}
          featured={featuredVideos}
        />
      )
    },
    {
      id: "featured-2",
      label: ROUTE_TOPIC.title,
      component: (
        <FeaturedTextContents
          id={"featured-2"}
          title={ROUTE_TOPIC.title}
          route={ROUTE_TOPIC.path}
          direction={Direction.RIGHT}
          headline={headlineTopic}
          featured={featuredTopics}
          bgColor
        />
      )
    },
    {
      id: "featured-3",
      label: ROUTE_POST.title,
      component: (
        <FeaturedTextContents
          id={"featured-3"}
          title={ROUTE_POST.title}
          route={ROUTE_POST.path}
          direction={Direction.LEFT}
          headline={headlinePost}
          featured={featuredPosts}
        />
      )
    }
  ]

  const sectionsJSX = sections.map((seciton, index) => {
    return (
      <div key={`home-section-${index}`} id={seciton.id} className="w-full h-screen flex flex-col items-center">
        {seciton.component}
      </div>
    )
  })

  const tocIndexes = sections.map(section => {
    return {id: section.id, label: section.label}
  })

  return (
    <main className="flex flex-col w-full items-center justify-between">
      {sectionsJSX}
      {/*<TOC indexes={tocIndexes} />*/}
    </main>
  )
}
