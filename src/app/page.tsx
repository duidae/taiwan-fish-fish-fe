import {FullscreenGallery, Gallery} from "@/app/home/fullscreen-gallery"
import {FeaturedVideos} from "@/app/home/featured-videos"
import {FeaturedTextContents} from "@/app/home/featured-section"
import {TOC} from "@/app/home/table-of-content"
import {ChillVideo} from "@/app/components/chill-video"
import {ROUTE_VIDEO, ROUTE_TOPIC, ROUTE_POST, Direction} from "@/app/constant"

// TODO: remove mockups when cms is ready
import {featuredGalleries, YTVideos, featuredPosts as posts} from "./mockups"

export default function Home() {
  // TODO: fetch contents from API
  const featuredVideos = YTVideos

  const headlinePost = posts[0]
  const featuredPosts = posts.slice(1)

  const headlineTopic = posts[0]
  const featuredTopics = posts.slice(1)

  const sections = [
    {
      id: "gallery-section",
      label: "頁首",
      component: <FullscreenGallery items={featuredGalleries as Gallery[]} />
    },
    {
      id: "featured-1",
      label: ROUTE_TOPIC.title,
      component: (
        <FeaturedTextContents
          id={"featured-1"}
          title={ROUTE_TOPIC.title}
          route={ROUTE_TOPIC.path}
          direction={Direction.RIGHT}
          headline={headlineTopic}
          featured={featuredTopics}
        />
      )
    },
    {
      id: "featured-2",
      label: ROUTE_POST.title,
      component: (
        <FeaturedTextContents
          id={"featured-2"}
          title={ROUTE_POST.title}
          route={ROUTE_POST.path}
          direction={Direction.LEFT}
          headline={headlinePost}
          featured={featuredPosts}
          bgColor
        />
      )
    },
    {
      id: "featured-3",
      label: ROUTE_VIDEO.title,
      component: (
        <FeaturedVideos
          id={"featured-3"}
          title={ROUTE_VIDEO.title}
          route={ROUTE_VIDEO.path}
          direction={Direction.LEFT}
          featured={featuredVideos}
        />
      )
    },
    {
      id: "featured-4",
      label: "活動",
      component: (
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FTaipei&bgcolor=%23ffffff&src=ZnJvbXdhdGVydHdAZ21haWwuY29t&src=emgtdHcudGFpd2FuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%23F09300"
          style={{width: "80vw", height: "70vh"}}
        ></iframe>
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

  const sectionIndexs = sections.map(section => {
    return {id: section.id, label: section.label}
  })

  return (
    <main className="flex flex-col w-full items-center justify-between">
      <ChillVideo />
      {sectionsJSX}
      <TOC indexes={sectionIndexs} />
    </main>
  )
}
