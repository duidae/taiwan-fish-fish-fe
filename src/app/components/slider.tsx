"use client"
import {register} from "swiper/element/bundle"

// Register swiper web components(<swiper-container>, <swiper-slide>)
register()

export const Slider = (props: {slides: React.ReactNode[]}) => {
  const {slides} = props

  return (
    <div className="w-full h-96 flex">
      <swiper-container
        autoplay-delay="2500"
        navigation="true"
        pagination="true"
        pagination-clickable="true"
        pagination-dynamic-bullets="true"
        loop="true"
        style={{width: "100%"}}
      >
        {slides.map((slide, index) => {
          return slide && <swiper-slide key={`slide-${index}`}>{true && slide}</swiper-slide>
        })}
      </swiper-container>
    </div>
  )
}
