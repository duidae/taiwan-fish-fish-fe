"use client"
import {useEffect, useRef} from "react"
import {register} from "swiper/element/bundle"

export const Slider = (props: {slides: React.ReactNode[]}) => {
  const {slides} = props

  const swiperRef = useRef<any>(null)

  // HowTo of swiper web component in react, ref: https://swiperjs.com/blog/using-swiper-element-in-react
  useEffect(() => {
    register()

    const params = {
      autoplay: {
        delay: 3500
      },
      slidesPerView: 3,
      navigation: true,
      pagination: {clickable: true},
      loop: true,
      spaceBetween: 10,
      injectStyles: [
        `
        .swiper-button-prev, .swiper-button-next {
          width: 48px;
          height: 48px;
          color: white;
          background-color: var(--theme-blue);
          border-radius: 100%;

          svg {
            width: 60%;
            height: 60%;
          }
        }
      }`
      ]
    }

    Object.assign(swiperRef.current, params)
    swiperRef.current.initialize()
  }, [])

  return (
    <div className="w-full h-full flex">
      <swiper-container
        init="false"
        ref={swiperRef}
        style={{
          width: "100%",
          "--swiper-pagination-color": "var(--theme-blue)",
          "--swiper-pagination-bullet-inactive-color": "gray",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-navigation-color": "white",
          "--swiper-pagination-bottom": "0px"
        }}
      >
        {slides?.map((slide, index) => {
          return slide && <swiper-slide key={`slide-${index}`}>{slide}</swiper-slide>
        })}
      </swiper-container>
    </div>
  )
}
