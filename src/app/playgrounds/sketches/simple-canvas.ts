import {P5_PLAYGROUND_ID} from "@/app/constant"

export const sketch = p5 => {
  const container = p5.select(`#${P5_PLAYGROUND_ID}`)
  const width = container.width
  const height = container.height

  p5.setup = () => {
    p5.createCanvas(width, height, p5.WEBGL)
  }

  p5.draw = () => {
    p5.background("rgba(0,255,0, 0.25)")
    const container = p5.select(`#${P5_PLAYGROUND_ID}`)
    const width = container.width
    const height = container.height
    p5.line(0, -height / 2, 0, height / 2)
  }
}
