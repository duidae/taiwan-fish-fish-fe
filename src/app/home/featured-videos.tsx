"use client"
import {useState} from "react"
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

  const ytID = GetIDFromYTURL(selected)
  const headlinePlayer = ytID ? (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${ytID}`}
        frameborder="0"
        allowfullscreen
      />
    </div>
  ) : null

  // TODO: make vertical slider
  const featuredSlider = (
    <div className="w-full h-full flex flex-col items-center justify-between cursor-pointer">
      {featured?.map(url => {
        return (
          <div
            onClick={() => {
              setSelected(url)
            }}
          >
            {url}
          </div>
        )
      })}
    </div>
  )

  return <FeaturedSection headline={headlinePlayer} featured={featuredSlider} {...rest} />
}