import {FullscreenBackground} from "@/app/components/fullscreen-background"
import {Video} from "@/app/components/video"
import {Playground} from "@/app/components/playground"
import {Goto} from "@/app/components/goto"
import {FeaturedSection, DIRECTION} from '@/app/home/featured-section'
import {chillYTVideos, featuredPosts} from "./mockups"

export default function Home() {
  const featuredSections = [
    {
      id: "featured-section-video",
      title: "影片",
      route: "/videos",
      summaries: featuredPosts
    },
    {
      id: "featured-section-post",
      title: "文章",
      route: "/posts",
      summaries: featuredPosts
    },
    {
      id: "featured-section-topic",
      title: "專題",
      route: "/topics",
      summaries: featuredPosts
    }
  ]

  const interactiveSection = (
    <FullscreenBackground
      imgSrcs={[/*"/test1.webp", "/test2.webp", "/test3.jpeg",*/ "/ai1.jpeg", "/ai2.jpeg"]}
      body={
        <div className="flex flex-row w-full h-full">
          <Video className="w-1/3" ytURLs={chillYTVideos} />
          <Playground className="w-2/3" />
        </div>
      }
      bottom={
        <Goto className="h-1/6 text-xl text-white" elementID={featuredSections[0].id}>
          看內容
        </Goto>
      }
    />
  )

  const featuredSectionsJSX = featuredSections.map((featuredSection, index) => {
    return <FeaturedSection id={featuredSection.id} title={featuredSection.title} route={featuredSection.route} direction={index % 2 == 0 ? DIRECTION.Left : DIRECTION.Right} />
  })

  return (
    <main className="flex flex-col w-full items-center justify-between mb-8">
      {interactiveSection}
      {featuredSectionsJSX}
    </main>
  )
}
