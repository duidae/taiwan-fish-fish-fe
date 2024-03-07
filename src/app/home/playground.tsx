// import { WiggleFish } from '@/app/playgrounds/wiggle-fish'
import {SimpleCanvas} from "@/app/playgrounds/simple-canvas"
import {P5_PLAYGROUND_ID} from "@/app/constant"

export const Playground = (props: {className?: string}) => {
  return <div className={`${props.className} flex flex-col justify-center ml-5 mr-10`}>{false && <SimpleCanvas />}</div>
}
