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
      className="w-10 h-10 flex flex-row justify-center items-center bg-gray-800/50 hover:bg-gray-400/50 duration-300 rounded-full cursor-pointer"
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isControllerOpen, setIsControllerOpen] = useState(true)
  const [isDescOpen, setIsDescOpen] = useState(true)

  useEffect(() => {
    setIsClient(true)
    setCurrentIndex(GetRandomInteger(gallerySrcs.length))
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

  const onAdjustController = () => {
    setIsControllerOpen(!isControllerOpen)
  }

  const onShowDescription = () => {
    setIsDescOpen(!isDescOpen)
  }

  const description = (
    <div
      style={{opacity: isDescOpen ? "1" : "0"}}
      className="absolute w-1/4 right-0 bottom-0 rounded-md p-4 m-6 bg-slate-50 bg-opacity-50 duration-300"
    >
      {isClient && gallerySrcs[currentIndex].desc}
    </div>
  )

  // TODO: replace src with low resolution src
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
    <div className="absolute w-full bottom-0 mb-4 flex flex-row justify-center items-center gap-1">
      <ControlBtn onClick={onPrevImage} icon={arrowLeft} />
      <div
        style={{
          // TODO: improve collapse performance
          maxWidth: isControllerOpen ? "100%" : "0",
          transition: "max-width .3s ease-in-out"
        }}
        className="flex flex-row justify-center items-center"
      >
        {thumbnails}
      </div>
      <ControlBtn onClick={onNextImage} icon={arrowRight} />
      <ControlBtn onClick={onAdjustController} icon={isControllerOpen ? "-" : "+"} />
      <ControlBtn onClick={onShowDescription} icon={"i"} />
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
