"use client"
import {register} from "swiper/element/bundle"

// Register swiper web components(<swiper-container>, <swiper-slide>)
register()

export const Slider = (props: {slides: React.ReactNode[]}) => {
  const {slides} = props

  return (
    <div className="w-full h-full flex">
      <swiper-container
        style={{
          width: "100%",
          "--swiper-pagination-color": 'var(--theme-blue)',
          "--swiper-pagination-bullet-inactive-color": 'gray',
          "--swiper-pagination-bullet-inactive-opacity": '1',
          "--swiper-navigation-color": 'white',
        }}
        autoplay-delay="3500"
        slides-per-view="3"
        navigation="true"
        pagination="true"
        pagination-clickable="true"
        loop="true"
        space-between="10"
      >
        {slides?.map((slide, index) => {
          return slide && <swiper-slide key={`slide-${index}`}>{slide}</swiper-slide>
        })}
      </swiper-container>
    </div>
  )
}
