'use client'
import { sketch } from './sketches/simple-canvas'
import { NextReactP5Wrapper } from '@/app/utils'

export const SimpleCanvas = () => {
  return (
    <NextReactP5Wrapper sketch={sketch}/>
  )
}
