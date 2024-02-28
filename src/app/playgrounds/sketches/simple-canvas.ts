import { type Sketch, P5CanvasInstance } from "@p5-wrapper/react"
import { P5_PLAYGROUND_ID } from '@/app/constant'

export const sketch: Sketch = (p5: P5CanvasInstance) => {
    /*
  const container = p5.select(`#${P5_PLAYGROUND_ID}`)
  const width = container.width
  const height = container.height
  */

  p5.setup = () => {
    const container = p5.select(`#${P5_PLAYGROUND_ID}`)
    const width = container.width
    const height = container.height
    p5.createCanvas(width, height, p5.WEBGL)
  }

  p5.windowResized = () => {
    const c = p5.select(`#${P5_PLAYGROUND_ID}`)
    console.log(c.width, c.height)
    requestAnimationFrame(() => {
      console.log('requestAnimationFrame', c.width, c.height)
      p5.resizeCanvas(c.width, c.height)
    })
    //p5.resizeCanvas(c.width, c.height)
  }

  p5.draw = () => {
    p5.background('rgba(0,255,0, 0.25)')
    const container = p5.select(`#${P5_PLAYGROUND_ID}`)
    const width = container.width
    const height = container.height
    p5.line(0, -height/2, 0, height/2)
  }
}
