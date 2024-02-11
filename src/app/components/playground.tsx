'use client'

import { sketch } from '@/app/sketchs/fish'
import { NextReactP5Wrapper } from "@p5-wrapper/next"

export const Playground = (props: { className?: string }) => {
  return (
    <div className={`${props.className} border-black border-2 flex flex-col justify-center ml-5 mr-10`}>
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  )
}
