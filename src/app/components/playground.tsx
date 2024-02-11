'use client'

import { type Sketch } from "@p5-wrapper/react"
import { NextReactP5Wrapper } from "@p5-wrapper/next"

const sketch: Sketch = (p5) => {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL)

  p5.draw = () => {
    p5.background(250)
    p5.normalMaterial()
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01)
    p5.rotateX(p5.frameCount * 0.01)
    p5.rotateY(p5.frameCount * 0.01)
    p5.plane(100)
    p5.pop()
  }
}

export const Playground = (props: { className?: string }) => {
  return (
    <div className={`${props.className} border-black border-2 flex flex-col justify-center ml-5 mr-10`}>
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  )
}
