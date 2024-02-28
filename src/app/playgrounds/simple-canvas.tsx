'use client'
import { P5Wrapper } from './util'
import { sketch } from './sketches/simple-canvas'

export const SimpleCanvas = () => {
  return (
    <P5Wrapper sketch={sketch}/>
  )
}
