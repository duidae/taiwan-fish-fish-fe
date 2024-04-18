"use client"
import {useState} from "react"
import {YoutubeIcon} from "@/app/assets/icons"
import {Z_INDEX, Style} from "@/app/constant"

export const ChillVideo = () => {
  const [isChillOpen, setIsChillOpen] = useState(false)

  const onControlChill = (value: boolean) => {
    setIsChillOpen(value)
  }

  const controlPanel = (
    <div
      style={{borderRadius: "10px 10px 0px 0px"}}
      className="w-full h-10 flex flex-row justify-between items-center bg-gray-400/80"
    >
      <div className="w-8 h-8 ml-2">{YoutubeIcon}</div>
      <span
        className={`cursor-pointer w-6 h-6 text-center align-middle hover:bg-gray-400 rounded-full duration-${Style.DURATION}`}
        style={{color: "white"}}
        onClick={e => {
          e.stopPropagation()
          onControlChill(false)
        }}
      >
        x
      </span>
    </div>
  )

  // TODO: skeleton for iframe
  const expandedComponent = (
    <div
      style={{
        visibility: isChillOpen ? "visible" : "hidden",
        opacity: isChillOpen ? "1" : "0",
        transition: `visibility ${Style.DURATION}ms, opacity ${Style.DURATION}ms ease-in-out`
      }}
      className={`fixed w-1/4 h-1/2 left-0 bottom-0 px-8 flex flex-col items-${isChillOpen ? "center" : "start"} ${Z_INDEX.TOP}`}
    >
      {controlPanel}
      <iframe
        style={{width: "100%", height: "100%"}}
        src="https://www.youtube.com/embed/Ra8yYB38Qw0?si=_XW60dNfrid5zgHq"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )

  const reducedComponent = (
    <div
      className={`${isChillOpen ? "invisible" : "visible"} fixed w-12 h-12 left-0 bottom-0 flex flex-col justify-center items-center mb-4 ml-8 rounded-full opacity-50 hover:opacity-100 bg-gray-400/60 hover:bg-gray-200/50 transition hover:duration-${Style.DURATION} cursor-pointer ${Z_INDEX.TOP}`}
      onClick={e => {
        e.stopPropagation()
        onControlChill(true)
      }}
    >
      <div className="w-8 h-8">{YoutubeIcon}</div>
    </div>
  )

  return (
    <>
      {expandedComponent}
      {reducedComponent}
    </>
  )
}
