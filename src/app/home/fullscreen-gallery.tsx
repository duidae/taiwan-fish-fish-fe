"use client"
import {useEffect, useState, MouseEvent} from "react"
import {GetRandomInteger} from "@/app/utils"
import {Viewer3D} from "@/app/components/3d-viewer"
import {ArrowLeft, ArrowRight} from "@/app/assets/icons"
import {Z_INDEX, Style} from "@/app/constant"

enum GalleryType {
  MODEL = "model",
  IMAGE = "image"
}

enum ControllerState {
  FULL = "full",
  ICON_ONLY = "icon",
  MINIMIZE = "minimize"
}

export type Gallery = {
  type: GalleryType
  url: string
  desc: string
}

const getControllerStateIcon = (controllerState: ControllerState) => {
  if (controllerState === ControllerState.FULL) {
    return <span style={{color: "white"}}>o</span>
  } else if (controllerState === ControllerState.ICON_ONLY) {
    return <span style={{color: "white"}}>{">>"}</span>
  }
  return <span style={{color: "white"}}>+</span>
}

const ControlBtn = (props: {onClick: () => void; icon: React.ReactNode; isActive?: boolean; disabled?: boolean}) => {
  const {onClick, icon, isActive, disabled} = props
  return (
    <div
      style={{backgroundColor: isActive ? "gray" : ""}}
      className={`w-10 h-10 flex flex-row justify-center items-center bg-gray-700/60 hover:bg-gray-300/50 transition hover:duration-${Style.DURATION} rounded-full cursor-pointer`}
      onClick={e => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      {icon}
    </div>
  )
}

export const FullscreenGallery = (props: {items: Gallery[]}) => {
  const {items} = props

  // Note: isClient is to fix hydration error from Next.js
  // ref: https://nextjs.org/docs/messages/react-hydration-error
  const [isClient, setIsClient] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [controllerState, setControllerState] = useState(ControllerState.FULL)
  const [isDescOpen, setIsDescOpen] = useState(true)
  const [isMagnifierOpen, setIsMagnifierOpen] = useState(false)
  const [pos, setPos] = useState({x: 0, y: 0})
  const [cursorPos, setCursorPos] = useState({x: 0, y: 0})

  useEffect(() => {
    setIsClient(true)
    //TODO: random gallery initially
    // setCurrentIndex(GetRandomInteger(gallerySrcs.length))
  }, [])

  const onImageChange = (index: number) => {
    setCurrentIndex(index < 0 ? items.length - 1 : index % items.length)
  }

  const onPrevImage = () => {
    onImageChange(currentIndex - 1)
  }

  const onNextImage = () => {
    onImageChange(currentIndex + 1)
  }

  const onControllerStateChange = () => {
    let newState
    if (controllerState === ControllerState.FULL) {
      newState = ControllerState.ICON_ONLY
    } else if (controllerState === ControllerState.ICON_ONLY) {
      newState = ControllerState.MINIMIZE
    } else {
      newState = ControllerState.FULL
    }
    setControllerState(newState)
  }

  const onShowDescription = () => {
    setIsDescOpen(!isDescOpen)
  }

  const onShowMagnifier = () => {
    setIsMagnifierOpen(!isMagnifierOpen)
  }

  const onSwitchManifier = (e: MouseEvent<HTMLDivElement>) => {
    setIsMagnifierOpen(!isMagnifierOpen)
  }

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const {left, top, width, height} = e.currentTarget.getBoundingClientRect()
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - top) / height) * 100
    setPos({x, y})
    setCursorPos({x: e.pageX - left, y: e.pageY - top})
  }

  const description = (
    <div
      style={{
        visibility: isDescOpen ? "visible" : "hidden",
        opacity: isDescOpen ? "1" : "0",
        transition: `visibility ${Style.DURATION}ms, opacity ${Style.DURATION}ms ease-in-out`
      }}
      className={`absolute w-1/4 right-0 bottom-0 text-sm lg:text-base rounded-md p-4 mb-4 mr-16 bg-slate-50 bg-opacity-50 ${Z_INDEX.MIDDLE}`}
    >
      {isClient && items[currentIndex].desc}
      <div
        className={`absolute w-6 h-6 -top-3 -right-3 bg-gray-700/60 hover:bg-gray-300/50 duration-${Style.DURATION} rounded-full cursor-pointer flex flex-row justify-center items-center`}
        onClick={e => {
          e.stopPropagation()
          onShowDescription()
        }}
      >
        <span style={{color: "white"}}>x</span>
      </div>
    </div>
  )

  // TODO: replace src with low resolution src
  /*
  const thumbnails = gallerySrcs.map((gallery, index) => {
    return (
      <div
        key={`gallery-thumb-${index}`}
        className="cursor-pointer"
        onClick={e => {
          e.stopPropagation()
          onImageChange(index)
        }}
      >
        <img
          style={{opacity: index === currentIndex ? "1" : "0.5"}}
          className="w-16 h-16 object-cover"
          src={gallery.url}
        />
      </div>
    )
  })
  */

  // TODO: complete controller
  const controller = (
    <div
      style={{
        justifyContent: controllerState === ControllerState.FULL || isDescOpen ? "center" : "center"
      }}
      className="absolute w-full bottom-0 px-2 pb-4 flex flex-row items-center gap-1"
    >
      {controllerState !== ControllerState.MINIMIZE && <ControlBtn onClick={onPrevImage} icon={ArrowLeft} />}
      <div
        style={{
          // TODO: improve collapse performance
          maxWidth: controllerState === ControllerState.FULL ? "100%" : "0",
          transition: "max-width .3s ease-in-out"
        }}
        className="flex flex-row justify-center items-center"
      ></div>
      {controllerState !== ControllerState.MINIMIZE && <ControlBtn onClick={onNextImage} icon={ArrowRight} />}
      {false && <ControlBtn onClick={onControllerStateChange} icon={getControllerStateIcon(controllerState)} />}
      <ControlBtn
        onClick={onShowMagnifier}
        disabled={items[currentIndex].type === GalleryType.IMAGE}
        isActive={isMagnifierOpen}
        icon={<span style={{color: "white"}}>M</span>}
      />
      {controllerState !== ControllerState.MINIMIZE && (
        <ControlBtn onClick={onShowDescription} icon={<span style={{color: "white"}}>i</span>} />
      )}
    </div>
  )

  // TODO: fix incorrect position issue
  const imgMaginifier = (
    <div
      style={{
        left: `${cursorPos.x - 100}px`,
        top: `${cursorPos.y - 100}px`,
        backgroundImage: `url(${items[currentIndex].url})`,
        backgroundPosition: `${pos.x}% ${pos.y}%`
      }}
      className="absolute w-52 h-52 border border-white border-2 bg-black pointer-events-none"
    />
  )

  const getSelectedGellery = () => {
    if (items[currentIndex].type === GalleryType.MODEL) {
      return <Viewer3D />
    } else if (items[currentIndex].type === GalleryType.IMAGE) {
      return (
        <img className="h-full" src={items[currentIndex].url} onMouseMove={onMouseMove} onClick={onSwitchManifier} />
      )
    } else {
      return null
    }
  }

  return (
    <div className="bg-black flex flex-col w-full h-screen justify-center items-center">
      {getSelectedGellery()}
      {isMagnifierOpen && imgMaginifier}
      {controller}
      {description}
    </div>
  )
}
