'use client'

import { sketch } from '@/app/sketchs/wiggle-fish'
import { NextReactP5Wrapper } from "@p5-wrapper/next"
import { P5_PLAYGROUND_ID } from '@/app/constant'

export const Playground = (props: { className?: string }) => {
  return (
    <div id={P5_PLAYGROUND_ID} className={`${props.className} flex flex-col justify-center ml-5 mr-10`}>
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  )
}
