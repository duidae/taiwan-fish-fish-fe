import {Slider} from "@/app/components/slider"
import {GetIDFromYTURL} from "@/app/utils"
import {YTVideos} from "../mockups"

export default function Videos() {
  const featuredYTURLs = YTVideos
  const ytURLs = YTVideos

  const featuredComponents = featuredYTURLs.map((url, index) => {
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
  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      <div className="text-2xl">精選影音</div>
      <Slider slides={featuredComponents} />
      <div className="text-2xl">所有影音</div>
      <div className="mt-8 mb-4 grid text-center w-4/5 lg:grid-cols-3 lg:text-left gap-8">{ytComponents}</div>
    </main>
  )
}
