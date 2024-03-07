import {Goto} from "@/app/components/goto"
import {FullscreenBackground} from "./fullscreen-background"
import {Video} from "./video"
import {Playground} from "./playground"

export const InteractiveSection = (props: {videos: string[]; images: string[]}) => {
  const {videos, images} = props
  return (
    <FullscreenBackground
      imgSrcs={images}
      body={
        <div className="flex flex-row w-full h-full">
          <Video className="w-1/3" ytURLs={videos} />
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
}
