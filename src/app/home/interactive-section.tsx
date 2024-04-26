import {FullscreenGallery, Gallery} from "./fullscreen-gallery"

export const InteractiveSection = (props: {videos: string[]; gallerySrcs: Gallery[]; items: Gallery[]}) => {
  const {items} = props

  return <FullscreenGallery items={items} />
}
