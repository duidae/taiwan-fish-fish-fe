import {FullscreenBackground} from "@/app/components/fullscreen-background"
import {Video} from "@/app/components/video"
import {Playground} from "@/app/components/playground"
import {Goto} from "@/app/components/goto"
import {FeaturedVideos, FeaturedPosts, FeaturedTopics, DIRECTION} from "@/app/home/featured-section"
import {chillYTVideos, featuredImages} from "./mockups"

export default function Home() {
  const interactiveSection = (
    <FullscreenBackground
      imgSrcs={featuredImages}
      body={
        <div className="flex flex-row w-full h-full">
          <Video className="w-1/3" ytURLs={chillYTVideos} />
          <Playground className="w-2/3" />
        </div>
      }
      bottom={
        <Goto className="h-1/6 text-xl text-white" elementID={"featured-videos"}>
          看內容
        </Goto>
      }
    />
  )

  return (
    <main className="flex flex-col w-full items-center justify-between mb-8">
      {interactiveSection}
      <FeaturedVideos id="featured-videos" title="影片" route="/videos" direction={DIRECTION.Left} frontPage={<div></div>} featured={<div></div>} />
      <FeaturedPosts id="featured-posts" title="文章" route="/posts" direction={DIRECTION.Right} frontPage={<div></div>} featured={<div></div>} />
      <FeaturedTopics id="featured-topics" title="專題" route="/topics" direction={DIRECTION.Left} frontPage={<div></div>} featured={<div></div>} />
    </main>
  )
}
