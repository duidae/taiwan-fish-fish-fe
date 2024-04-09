import {GetIDFromYTURL} from "@/app/utils"
import {List} from "../list"

import {YTVideos} from "@/app/mockups"

export default function Videos() {
  const featuredYTURLs = YTVideos
  const ytURLs = YTVideos

  const featuredComponents = featuredYTURLs.map((url, index) => {
    const ytID = GetIDFromYTURL(url)

    return (
      <div key={`video-list-${index}`} className="w-full h-full flex flex-col items-center justify-center pb-8">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          src={`https://www.youtube.com/embed/${ytID}`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    )
  })

  const ytComponents = ytURLs.map((url, index) => {
    const ytID = GetIDFromYTURL(url)

    return (
      <div key={`video-list-${index}`} className="w-full h-full flex flex-col items-center justify-center">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          src={`https://www.youtube.com/embed/${ytID}`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    )
  })

  return <List featuredComponents={featuredComponents} listComponents={ytComponents} title="影音" />
}
