import {useEffect, useRef} from "react"
import p5 from "p5"
import {P5_PLAYGROUND_ID} from "@/app/constant"

const createCanvasInstance = (sketch: any, wrapper: any): any => {
  return new p5(sketch, wrapper)
}

const removeCanvasInstance = (canvasInstanceRef: any) => {
  canvasInstanceRef.current?.remove()
  canvasInstanceRef.current = null
}

export const P5Wrapper = (props: any) => {
  const {sketch, ...rest} = props
  const wrapperRef = useRef(null)
  const canvasInstanceRef = useRef(null)

  useEffect(() => {
    const container = document.getElementById(P5_PLAYGROUND_ID)
    if (container) {
      new ResizeObserver(entries => {
        entries.forEach(entry => {
          console.log(entry.target.clientWidth, entry.target.clientHeight)
          requestAnimationFrame(() => {
            // @ts-ignore
            canvasInstanceRef.current?.resizeCanvas(entry.target.clientWidth, entry.target.clientHeight)
          })
        })
      }).observe(container)

      console.log(wrapperRef.current, sketch)
      canvasInstanceRef.current = createCanvasInstance(sketch, wrapperRef.current)
    }
    return () => removeCanvasInstance(canvasInstanceRef)
  }, [])

  /*
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
  */

  useEffect(() => {
    // canvasInstanceRef.current?.updateWithProps?.(rest)
  }, [rest, wrapperRef])

  return (
    <div id={P5_PLAYGROUND_ID} ref={wrapperRef} className="w-full h-full border-2 border-black">
      {props.children}
    </div>
  )
}
