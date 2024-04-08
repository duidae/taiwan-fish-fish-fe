"use client"
import {register} from "swiper/element/bundle"

// Register swiper web components(<swiper-container>, <swiper-slide>)
register()

export const Slider = (props: {slides: React.ReactNode[]}) => {
  const {slides} = props

  return (
    <div className="w-full h-full flex">
      <swiper-container
        autoplay-delay="3500"
        slides-per-view="3"
        navigation="true"
        pagination="true"
        pagination-clickable="true"
        pagination-dynamic-bullets="true"
        loop="true"
        style={{width: "100%"}}
      >
        {slides?.map((slide, index) => {
          return slide && <swiper-slide key={`slide-${index}`}>{slide}</swiper-slide>
        })}
      </swiper-container>
    </div>
  )
}
