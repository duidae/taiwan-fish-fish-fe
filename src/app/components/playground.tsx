'use client'
import { useState } from 'react'
import styled from 'styled-components'
import { sketch } from '@/app/sketchs/wiggle-fish'
import { NextReactP5Wrapper } from "@p5-wrapper/next"
import { P5_PLAYGROUND_ID } from '@/app/constant'

const Image = styled.img<{ $isActive: boolean }>`
  width: 40px;
  height: 40px;
  padding: ${props => props.$isActive ? '0px' :'4px'};
  border-radius: 20px;
  cursor: pointer;
  transition: padding 0.3s;
`

const fishSrcs = [
  '/Puntius Snyderi.jpeg',
  '/Puntius Semifasciolatus.jpeg'
]

export const Playground = (props: { className?: string }) => {
  const [fishIndex, setFishIndex] = useState(0)

  return (
    <div id={P5_PLAYGROUND_ID} className={`${props.className} flex flex-col justify-center ml-5 mr-10`}>
      <NextReactP5Wrapper sketch={sketch} fishSrcs={fishSrcs} selectedIndex={fishIndex}/>
      <div className='h-10 flex flex-row justify-center items-center gap-1'>
        {fishSrcs.map((fish, index) => {
          return <Image key={`fish-type-${index}`} $isActive={index === fishIndex} onClick={() => setFishIndex(index)} src={fish}/>
        })}
      </div>
    </div>
  )
}
