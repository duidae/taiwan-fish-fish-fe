import { useEffect, useRef } from 'react'
import p5 from 'p5'

const createCanvasInstance = (
    sketch: any,
    wrapper: any
  ): any => {
  return new p5(sketch, wrapper)
}

const removeCanvasInstance = (canvasInstanceRef: any) => {
  canvasInstanceRef.current?.remove()
  canvasInstanceRef.current = null
}

export const P5Wrapper = (props: any) => {
  const { sketch, ...rest } = props
  const wrapperRef = useRef(null)
  const canvasInstanceRef = useRef(null)

  useEffect(() => () => removeCanvasInstance(canvasInstanceRef), [])

  useEffect(() => {
    if (wrapperRef.current === null) {
      return
    }

    removeCanvasInstance(canvasInstanceRef)
    canvasInstanceRef.current = createCanvasInstance(
      sketch,
      wrapperRef.current
    )
  }, [sketch])
  
  
  useEffect(() => {
    canvasInstanceRef.current?.updateWithProps?.(rest)
  }, [rest, wrapperRef])
  

  return (
    <div ref={wrapperRef}>
      {props.children}
    </div>
  )
}
