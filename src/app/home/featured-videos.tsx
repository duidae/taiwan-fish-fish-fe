"use client"
import {useEffect, useState} from "react"
import axios from "axios"
import {GetIDFromYTURL} from "@/app/utils"
import {FeaturedSectionCommonprops} from "./featured-section"
import {HEADER_HEIGHT, TOC_WIDTH, DEFAULT_IMAGE_ASPECT_RATIO} from "@/app/constant"
import {More} from "@/app/components/more"
import {BackToSection} from "./back-to-section"

type URL = string

const ytOEmbedTemplate = "https://youtube.com/oembed?url=${url}&format=json"
const ytEmbedTemplate = "https://www.youtube.com/embed/${id}"
const ytImgTemplate = "https://i.ytimg.com/vi/${id}/hqdefault.jpg"

export const FeaturedVideos = (
  props: FeaturedSectionCommonprops & {
    featured: URL[]
  }
) => {
  const {id, featured, title, route} = props
  const [selected, setSelected] = useState(featured?.[0])
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
        style={{
          aspectRatio: "16/9",
          borderRadius: "10px"
        }}
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
    const desc = (
      <>
        <span
          style={{display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: "2", overflow: "hidden"}}
          className="text-sm"
        >
          {meta?.[index]?.title}
        </span>
        <span className="text-xs text-slate-500">{meta?.[index]?.author_name}</span>
      </>
    )

    return (
      <div
        className="w-full h-20 flex flex-row gap-2"
        key={`featured-video-${index}`}
        onClick={() => {
          setSelected(url)
        }}
      >
        <img
          style={{aspectRatio: DEFAULT_IMAGE_ASPECT_RATIO}}
          className="w-24 h-full object-cover rounded-md"
          src={coverImg}
        />
        <div className="hidden lg:block grow flex flex-col justify-between">{desc}</div>
      </div>
    )
  })

  return (
    <div
      className="max-w-screen-2xl max-h-screen w-full h-screen flex flex-col justify-center items-center"
      style={{paddingTop: `${HEADER_HEIGHT}px`, paddingRight: `${TOC_WIDTH}px`, paddingLeft: `${TOC_WIDTH}px`}}
    >
      <div className="flex flex-row items-center gap-2">
        <h1>精選{title}</h1>
        <BackToSection id={id} />
      </div>
      <div className="grow w-full overflow-auto flex flex-col lg:flex-row justify-center items-stretch gap-4">
        <div className="grow">{ytPlayer}</div>
        <div className="w-full lg:w-96 flex flex-row lg:flex-col items-center cursor-pointer overflow-x-scroll lg:overflow-y-scroll gap-2">
          {featuredVideos}
        </div>
      </div>
      <More href={route} title={title} />
    </div>
  )
}
