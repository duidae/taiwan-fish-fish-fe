"use client"
import {useEffect, useState} from "react"
import axios from "axios"
import {YoutubeIcon} from "@/app/assets/icons"
import {GetIDFromYTURL} from "@/app/utils"
import {DEFAULT_IMAGE_ASPECT_RATIO} from "@/app/constant"
import {List} from "../list"

import {YTVideos} from "@/app/mockups"

// TODO: replace duplicate templates
const ytOEmbedTemplate = "https://youtube.com/oembed?url=${url}&format=json"
const ytImgTemplate = "https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp"
const fallbackYTImgTemplate = "https://i.ytimg.com/vi/${id}/hqdefault.jpg"

const YTFacade = (props: {imageURL: string; url: string; title: string; className?: string}) => {
  const {imageURL, url, title, className} = props

  return (
    <a
      className={`${className ?? ""} relative w-full flex flex-col items-center justify-center bg-center bg-no-repeat object-cover rounded-md`}
      style={{backgroundImage: `url(${imageURL})`, aspectRatio: DEFAULT_IMAGE_ASPECT_RATIO}}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span
        style={{backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))"}}
        className="inline-block w-full absolute h-16 top-0 text-lg text-white text-left align-middle rounded-md truncate p-4"
      >
        {title}
      </span>
      <div className="absolute w-16 h-16">{YoutubeIcon}</div>
    </a>
  )
}

export default function Videos() {
  const featuredYTURLs = YTVideos
  const ytURLs = YTVideos

  const [featuredMetadata, setFeaturedMetadata] = useState<any>([])
  const [metadata, setMetadata] = useState<any>([])

  useEffect(() => {
    const allYTURLs = [...featuredYTURLs, ...ytURLs]
    const requests = allYTURLs.map(ytURL => {
      const oembedURL = ytOEmbedTemplate.replace("${url}", ytURL)
      return axios.get(oembedURL)
    })
    Promise.all(requests)
      .then(responses => {
        const featuredResponses = responses.slice(0, featuredYTURLs.length)
        const ytResponses = responses.slice(featuredYTURLs.length, featuredYTURLs.length + ytURLs.length)
        setFeaturedMetadata(featuredResponses?.map(response => response.data))
        setMetadata(ytResponses?.map(response => response.data))
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const featuredComponents = featuredMetadata.map((meta: any, index: number) => {
    const ytUrl = featuredYTURLs[index]
    const ytID = GetIDFromYTURL(ytUrl)
    const coverImg = ytID ? fallbackYTImgTemplate.replace("${id}", ytID) : ""
    return (
      <YTFacade
        key={`featured-yt-facade-${index}`}
        className="mb-8"
        imageURL={coverImg}
        url={ytUrl}
        title={meta?.title}
      />
    )
  })

  const ytComponents = metadata.map((meta: any, index: number) => {
    const ytUrl = ytURLs[index]
    const ytID = GetIDFromYTURL(ytUrl)
    const coverImg = ytID ? fallbackYTImgTemplate.replace("${id}", ytID) : ""
    return <YTFacade key={`yt-facade-${index}`} imageURL={coverImg} url={ytUrl} title={meta?.title} />
  })

  return <List featuredComponents={featuredComponents} listComponents={ytComponents} title="影音" />
}
