'use client'
import { useEffect, useRef } from "react"
import dynamic from 'next/dynamic'
//const p5 = dynamic(() => import('p5'), { ssr: false })
import p5 from 'p5'

const sketch = ( sketch: any ) => {
  let x = 100;
  let y = 100;
  sketch.setup = () => {
    sketch.createCanvas(200, 200)
  }
  sketch.draw = () => {
    sketch.background(0)
    sketch.fill(255)
    sketch.rect(x,y,50,50)
  }
}

export const Playground = (props: { className?: string }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    // @ts-ignore
    console.log(p5)
    const instance = new p5(sketch, canvasRef.current)
    return () => {
      instance.remove()
    }
  }, [])

  return (
    <div ref={canvasRef} className={`${props.className} border-black border-2 flex flex-col justify-center ml-5 mr-10`}/>
  )
}
