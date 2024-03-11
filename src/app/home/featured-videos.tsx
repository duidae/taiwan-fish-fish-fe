"use client"
import {useEffect, useState} from "react"
import axios from "axios"
import {GetIDFromYTURL} from "@/app/utils"
import {FeaturedSectionCommonprops, FeaturedSection} from "./featured-section"

type URL = string

export const FeaturedVideos = (
  props: FeaturedSectionCommonprops & {
    headline: URL
    featured: URL[]
  }
) => {
  const {headline, featured, ...rest} = props
  const [selected, setSelected] = useState(headline)
  const [meta, setMeta] = useState<any>([])

  useEffect(() => {
    const requests = featured.map(ytURL => axios.get(`http://youtube.com/oembed?url=${ytURL}&format=json`))
    Promise.all(requests)
      .then(responses => {
        setMeta(responses.map(response => response.data))
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const ytID = GetIDFromYTURL(selected)
  const headlinePlayer = ytID ? (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        src={`https://www.youtube.com/embed/${ytID}`}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  ) : null

  // TODO: make vertical slider
  const featuredSlider = (
    <div className="w-full h-full flex flex-col items-center justify-evenly cursor-pointer">
      {featured?.map((url, index) => {
        const ytID = GetIDFromYTURL(url)
        const coverImg = `https://i.ytimg.com/vi/${ytID}/hqdefault.jpg`

        return (
          <div
            className="flex flex-row gap-4"
            key={`featured-video-${index}`}
            onClick={() => {
              setSelected(url)
            }}
          >
            {true && <img className="overflow-hidden object-cover" width={50} height={50} src={coverImg} />}
            {meta?.[index]?.title}
            {meta?.[index]?.author_name}
          </div>
        )
      })}
    </div>
  )

  return <FeaturedSection headline={headlinePlayer} featured={featuredSlider} {...rest} />
}
