import {FullscreenGallery, Gallery} from "./fullscreen-gallery"
import { Viewer3D } from "@/app/components/3d-viewer"

export const InteractiveSection = (props: {videos: string[]; gallerySrcs: Gallery[]}) => {
  const {gallerySrcs} = props

  return (
    <FullscreenGallery
      gallerySrcs={gallerySrcs}
      body={<Viewer3D/>}
    />
  )
}
