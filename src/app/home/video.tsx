"use client"
import {useRef, useEffect} from "react"
import {GetRandomInteger} from "@/app/utils"
import {register} from "swiper/element/bundle"

// Register swiper web components(<swiper-container>, <swiper-slide>)
register()

export const Video = (props: {ytURLs: string[]; className?: string}) => {
  const swiperElRef = useRef(null)
  const ytURLs = props.ytURLs

  // Note: workaround for initialSlide not working bug in swiper web component
  // TODO: use 'initialSlide={GetRandomInteger(ytURLs.length)}' prop when this bug is fixed
  useEffect(() => {
    // @ts-ignore
    swiperElRef.current?.swiper?.slideTo(GetRandomInteger(ytURLs.length))
  })

  // Autoplay only works when &autoplay=1&mute=1
  return (
    <div className={`${props.className} flex flex-col justify-center ml-20 mr-5`}>
      <swiper-container
        ref={swiperElRef}
        pagination="true"
        pagination-clickable="true"
        effect="fade"
        loop="true"
        style={{width: "100%"}}
      >
        {ytURLs.map((url, index) => {
          return (
            url && (
              <swiper-slide key={`yt-slide-${index}`} style={{paddingBottom: "40px"}}>
                <iframe
                  width="100%"
                  loading="lazy"
                  src={url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </swiper-slide>
            )
          )
        })}
      </swiper-container>
    </div>
  )
}
