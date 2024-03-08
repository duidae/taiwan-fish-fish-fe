import {GetIDFromYTURL} from "@/app/utils"
import {YTVideos} from "../mockups"

export default function Videos() {
  const videoURLs = YTVideos

  const slider = <div>Slider</div>

  const ytVideoComponents = videoURLs.map((url, index) => {
    const ytID = GetIDFromYTURL(url)

    return (
      <div key={`video-list-${index}`} className="w-full h-full flex flex-col items-center justify-center">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${ytID}`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    )
  })
  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      <div className="text-2xl">所有影音</div>
      {slider}
      <div className="mt-8 mb-4 grid text-center w-4/5 lg:grid-cols-3 lg:text-left gap-8">{ytVideoComponents}</div>
    </main>
  )
}
