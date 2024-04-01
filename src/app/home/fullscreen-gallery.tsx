"use client"
import {useState} from "react"
import {GetRandomInteger} from "@/app/utils"
import {arrowLeft, arrowRight} from "@/app/icons"

export type Gallery = {
  url: string
  desc: string
}

export const FullscreenGallery = (props: {gallerySrcs: Gallery[]; body: React.ReactNode}) => {
  const {gallerySrcs, body} = props
  const [currentIndex, setCurrentIndex] = useState(GetRandomInteger(gallerySrcs.length))

  const onImageChange = (index: number) => {
    setCurrentIndex(index < 0 ? gallerySrcs.length - 1 : index % gallerySrcs.length)
  }

  const onPrevImage = () => {
    onImageChange(currentIndex - 1)
  }

  const onNextImage = () => {
    onImageChange(currentIndex + 1)
  }

  const galleryController = (
    <div className="flex flex-row">
      <button onClick={onPrevImage}>{arrowLeft}</button>
      <button onClick={onNextImage}>{arrowRight}</button>
    </div>
  )

  const description = (
    <div className="absolute w-1/4 right-0 bottom-0 rounded-md p-4 m-4 bg-slate-50 bg-opacity-50">
      {gallerySrcs[currentIndex].desc}
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
      {galleryController}
      {description}
    </div>
  )
}
