"use client"
import {useState} from "react"
import styled from "styled-components"
import {sketch} from "./sketches/wiggle-fish"
import {GetRandomInteger} from "@/app/utils"
import {Style} from "@/app/constant"
import {P5Wrapper} from "./util"

const Image = styled.img<{$isActive: boolean}>`
  width: 40px;
  height: 40px;
  padding: ${props => (props.$isActive ? "0px" : "4px")};
  border-radius: 20px;
  cursor: pointer;
  transition: padding ${Style.DURATION}ms;
`

const fishSrcs = ["/Puntius Snyderi.jpeg", "/Puntius Semifasciolatus.jpeg"]

export const WiggleFish = () => {
  const [fishIndex, setFishIndex] = useState(GetRandomInteger(fishSrcs.length))

  return (
    <>
      <P5Wrapper sketch={sketch} fishSrcs={fishSrcs} selectedIndex={fishIndex} />
      <div className="h-10 flex flex-row justify-center items-center gap-1">
        {fishSrcs.map((fish, index) => {
          return (
            <Image
              key={`fish-type-${index}`}
              $isActive={index === fishIndex}
              onClick={() => setFishIndex(index)}
              src={fish}
            />
          )
        })}
      </div>
    </>
  )
}
