"use client"
import {useEffect, useState} from "react"
import {GetRandomInteger} from "@/app/utils"
import {arrowLeft, arrowRight} from "@/app/icons"

export type Gallery = {
  url: string
  desc: string
}

const ControlBtn = (props: {onClick: () => void; icon: React.ReactNode}) => {
  const {onClick, icon} = props
  return (
    <div
      className="w-12 h-12 flex flex-row justify-center items-center bg-gray-800/50 hover:bg-gray-400/50 duration-300 rounded-full cursor-pointer"
      onClick={onClick}
    >
      {icon}
    </div>
  )
}

export const FullscreenGallery = (props: {gallerySrcs: Gallery[]; body?: React.ReactNode}) => {
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
      {isClient && gallerySrcs[currentIndex].desc}
    </div>
  )

  const thumbnails = gallerySrcs.map((gallery, index) => {
    return (
      <div key={`gallery-thumb-${index}`} className="cursor-pointer" onClick={() => onImageChange(index)}>
        <img
          style={{opacity: index === currentIndex ? "1" : "0.5"}}
          className="w-16 h-16 object-cover"
          src={gallery.url}
        />
      </div>
    )
  })

  const controller = (
    <div className="absolute w-full bottom-0 mb-8 flex flex-row justify-center items-center gap-2">
      <ControlBtn onClick={onPrevImage} icon={arrowLeft} />
      <div className="flex flex-row justify-center items-center">{thumbnails}</div>
      <ControlBtn onClick={onNextImage} icon={arrowRight} />
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
