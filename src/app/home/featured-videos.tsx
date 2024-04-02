"use client"
import {useEffect, useState} from "react"
import axios from "axios"
import Link from "next/link"
import {GetIDFromYTURL} from "@/app/utils"
import {FeaturedSectionCommonprops} from "./featured-section"
import {HEADER_HEIGHT, TOC_WIDTH} from "@/app/constant"

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
  const {headline, featured, title, route} = props
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
  const ytPlayer = ytID ? (
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

  const featuredVideos = featured?.map((url, index) => {
    const ytID = GetIDFromYTURL(url)
    const coverImg = ytID ? ytImgTemplate.replace("${id}", ytID) : ""

    return (
      <div
        className="w-full h-20 flex flex-row gap-2"
        key={`featured-video-${index}`}
        onClick={() => {
          setSelected(url)
        }}
      >
        <img style={{aspectRatio: "16/9"}} className="h-full object-cover rounded-md" src={coverImg} />
        <div className="grow flex flex-col justify-between">
          <span
            style={{display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: "2", overflow: "hidden"}}
            className="text-sm"
          >
            {meta?.[index]?.title}
          </span>
          <span className="text-xs text-slate-500">{meta?.[index]?.author_name}</span>
        </div>
      </div>
    )
  })

  return (
    <div
      className="max-w-screen-2xl max-h-screen w-full h-screen flex flex-col justify-center items-center gap-4"
      style={{paddingTop: `${HEADER_HEIGHT}px`, paddingRight: `${TOC_WIDTH}px`, paddingLeft: `${TOC_WIDTH}px`}}
    >
      <h1>精選{title}</h1>
      <div className="grow w-full overflow-auto flex flex-row justify-center items-stretch gap-4">
        <div className="grow">{ytPlayer}</div>
        <div className="w-96 flex flex-col items-center cursor-pointer overflow-auto gap-2">{featuredVideos}</div>
      </div>
      <div className="h-20 flex flex-row justify-center items-center">
        <Link href={route}>{`看全部${title} >>`}</Link>
      </div>
    </div>
  )
}
