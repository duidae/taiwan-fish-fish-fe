import {FullscreenGallery, Gallery} from "./fullscreen-gallery"
import {Video} from "./video"
import {Playground} from "./playground"

export const InteractiveSection = (props: {videos: string[]; gallerySrcs: Gallery[]}) => {
  const {videos, gallerySrcs} = props
  return (
    <FullscreenGallery
      gallerySrcs={gallerySrcs}
      body={
        <div className="flex flex-row w-full h-full">
          <Video className="w-1/3" ytURLs={videos} />
          <Playground className="w-2/3" />
        </div>
      }
    />
  )
}
