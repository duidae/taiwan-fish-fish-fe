'use client'
import { useRef } from 'react'
import { register } from 'swiper/element/bundle'

// Register swiper web components(<swiper-container>, <swiper-slide>)
register()

export const Video = (props: { ytURLs: string[], className?: string }) => {
  const swiperElRef = useRef(null)

  // Autoplay only works when &autoplay=1&mute=1
  return (
    <div className={`${props.className} flex flex-col justify-center ml-20 mr-5`}>
      <swiper-container
        ref={swiperElRef}
        pagination="true"
        pagination-clickable="true"
        style={{ width: '100%', height: '100%' }}
      >
        {props.ytURLs.map((url, index) => {
          return (url &&
            <swiper-slide key={`yt-slide-${index}`}>
              <iframe width="100%" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>
            </swiper-slide>
          )
        })}
      </swiper-container>
    </div>
  )
}
