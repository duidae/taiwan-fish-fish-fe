"use client"
import {useEffect, useState} from "react"
import {GetRandomInteger} from "@/app/utils"
import {arrowLeft, arrowRight} from "@/app/icons"

export type Gallery = {
  url: string
  desc: string
}

export const FullscreenGallery = (props: {gallerySrcs: Gallery[]; body: React.ReactNode}) => {
  const {gallerySrcs, body} = props

  // Note: isClient is to fix hydration error from Next.js
  // ref: https://nextjs.org/docs/messages/react-hydration-error
  const [isClient, setIsClient] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(GetRandomInteger(gallerySrcs.length))

  useEffect(() => {
    setIsClient(true)
  }, [])

  const onImageChange = (index: number) => {
    setCurrentIndex(index < 0 ? gallerySrcs.length - 1 : index % gallerySrcs.length)
  }

  const onPrevImage = () => {
    onImageChange(currentIndex - 1)
  }

  const onNextImage = () => {
    onImageChange(currentIndex + 1)
  }

  const description = (
    <div className="absolute w-1/4 right-0 bottom-0 rounded-md p-4 m-4 bg-slate-50 bg-opacity-50">
      <span>{isClient && gallerySrcs[currentIndex].desc}</span>
    </div>
  )

  const controller = (
    <div className="absolute w-full bottom-0 mb-8 flex flex-row justify-center items-center">
      <button onClick={onPrevImage}>{arrowLeft}</button>
      {gallerySrcs.map((gallery, index) => {
        return (
          <div className="cursor-pointer" onClick={() => onImageChange(index)}>
            <img
              style={{borderColor: index === currentIndex ? "white" : "transparent", borderWidth: "1px"}}
              className="object-cover"
              width="50px"
              height="50px"
              src={gallery.url}
            />
          </div>
        )
      })}
      <button onClick={onNextImage}>{arrowRight}</button>
    </div>
  )

  return (
    <div
      style={{
        backgroundImage: `url(${gallerySrcs[currentIndex].url})`,
        transition: "background-image 0.4s ease-in-out"
      }}
      className="bg-black bg-no-repeat bg-center bg-contain flex flex-col w-full h-screen justify-center items-center pt-24"
    >
      {body}
      {description}
      {controller}
    </div>
  )
}
