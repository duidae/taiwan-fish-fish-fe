'use client'
import dynamic from 'next/dynamic'
import { sketch } from './sketches/simple-canvas'

const NextReactP5Wrapper = dynamic(
  async () => (await import("@p5-wrapper/react")).ReactP5Wrapper,
  { ssr: false },
)

export const SimpleCanvas = () => {
  return (
    <NextReactP5Wrapper sketch={sketch}/>
  )
}
