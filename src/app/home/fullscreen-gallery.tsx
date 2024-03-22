"use client"
import {useState} from "react"
import {GetRandomInteger} from "@/app/utils"
import styled from "styled-components"

const bulletColor = "rgb(113, 113, 113)"
const bulletHeight = 60

const Bullets = styled.ul`
  margin: 0;
  padding-left: 0;
  padding-top: 20px;
  list-style-type: none;
  text-align: center;
  width: 100%;
  height: ${bulletHeight}px;
`

const Bullet = styled.li<{$isActive: boolean}>`
  width: 0.6em;
  height: 0.6em;
  min-width: 10px;
  min-height: 10px;
  margin: 0 0.8em;
  border-radius: 50%;
  display: inline-block;
  background-color: ${props => (props.$isActive ? "white" : bulletColor)};
  transition: background-color 0.6s ease;
  overflow: hidden;
  text-indent: 100%;
  cursor: pointer;
`

export type Gallery = {
  url: string
  desc: string
}

export const FullscreenGallery = (props: {gallerySrcs: Gallery[]; body: React.ReactNode}) => {
  const {gallerySrcs, body} = props
  const [currentIndex, setCurrentIndex] = useState(GetRandomInteger(gallerySrcs.length))

  const onImageChange = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div
      style={{
        backgroundImage: `url(${gallerySrcs[currentIndex].url})`,
        transition: "background-image 0.4s ease-in-out"
      }}
      className="bg-no-repeat bg-center bg-cover flex flex-col w-full h-screen justify-center items-center pt-24"
    >
      {body}
      <Bullets>
        {gallerySrcs?.map((gallerySrc, index) => (
          <Bullet key={`img-bullet-${index}`} $isActive={index === currentIndex} onClick={() => onImageChange(index)} />
        ))}
      </Bullets>
      <div className="absolute w-1/4 right-0 bottom-0 rounded-md p-4 m-4 bg-slate-50 bg-opacity-50">
        {gallerySrcs[currentIndex].desc}
      </div>
    </div>
  )
}
