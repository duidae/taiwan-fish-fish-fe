"use client"
import {useEffect, useState} from "react"
import axios from "axios"
import {GetIDFromYTURL} from "@/app/utils"
import {FeaturedSectionCommonprops, FeaturedSection} from "./featured-section"

type URL = string

const ytOEmbedTemplate = "http://youtube.com/oembed?url=${url}&format=json"
const ytEmbedTemplate = "https://www.youtube.com/embed/${id}"
const ytImgTemplate = "https://i.ytimg.com/vi/${id}/hqdefault.jpg"

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
    const requests = featured.map(ytURL => {
      const oembedURL = ytOEmbedTemplate.replace("${url}", ytURL)
      return axios.get(oembedURL)
    })
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
        src={ytEmbedTemplate.replace("${id}", ytID)}
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
        const coverImg = ytID ? ytImgTemplate.replace("${id}", ytID) : ""

        return (
          <div
            className="flex flex-row gap-4"
            key={`featured-video-${index}`}
            onClick={() => {
              setSelected(url)
            }}
          >
            <img className="overflow-hidden object-cover" width={50} height={50} src={coverImg} />
            <span>{meta?.[index]?.title}</span>
            <span>{meta?.[index]?.author_name}</span>
          </div>
        )
      })}
    </div>
  )

  return <FeaturedSection headline={headlinePlayer} featured={featuredSlider} {...rest} />
}
