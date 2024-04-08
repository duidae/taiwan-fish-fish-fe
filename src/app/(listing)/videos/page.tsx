import {Slider} from "@/app/components/slider"
import {GetIDFromYTURL} from "@/app/utils"
import {YTVideos} from "@/app/mockups"

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
      <div className="text-2xl mb-8">精選影音</div>
      <div className="w-4/5">
        <Slider slides={featuredComponents} />
      </div>
      <div className="text-2xl mt-8 mb-8">所有影音</div>
      <div className="w-4/5 grid text-center  lg:grid-cols-4 lg:text-left gap-8 mt-4 mb-4">{ytComponents}</div>
    </main>
  )
}
