import Link from "next/link"
import {FullscreenBackground} from "@/app/components/fullscreen-background"
import {Video} from "@/app/components/video"
import {Playground} from "@/app/components/playground"
import {Goto} from "@/app/components/goto"
import {featuredPosts} from "./mockups"

const FeaturedSection = (props: {section: any; direction: string}) => {
  const section = props.section
  const isLeft = props.direction === "left"

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div id={section.id} className="w-full grow flex flex-row justify-center items-stretch">
        <div className={`${isLeft ? "w-3/5" : "w-2/5"} bg-red-50`}></div>
        <div className={`${isLeft ? "w-2/5" : "w-3/5"} bg-green-50`}></div>
      </div>
      <Link className="h-1/6 text-base" href={section.route}>
        看全部{section.title}
        {" >>"}
      </Link>
    </div>
  )
}

export default function Home() {
  const ytURLs = [
    "https://www.youtube.com/embed/aod40An1DLQ?si=_Y18xwVEIoOHQTLJ",
    "https://www.youtube.com/embed/wPQnp65MYz4?si=s9NnnMzG6nXJzh_j",
    "https://www.youtube.com/embed/NehqK_atfVQ?si=-F0PfGHz09MyvJwl"
  ]

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
          <Video className="w-1/3" ytURLs={ytURLs} />
          <Playground className="w-2/3" />
        </div>
      }
      bottom={
        <Goto className="h-1/6 text-xl text-white" elementID={featuredSections[0].id}>
          看影片
        </Goto>
      }
    />
  )

  return (
    <main className="flex flex-col w-full items-center justify-between mb-8">
      {interactiveSection}
      <FeaturedSection section={featuredSections[0]} direction="left" />
      <FeaturedSection section={featuredSections[1]} direction="right" />
    </main>
  )
}
