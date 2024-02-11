'use client'

import { HEADER_HEIGHT } from '@/app/constant'

export const Goto = (props: { elementID: string, className?: string, children?: React.ReactNode }) => {
  return (
    <button className={props.className} onClick={() => {
      const element = document.querySelector(`#${props.elementID}`) as HTMLElement
      window.scrollTo({
        top: element.offsetTop - HEADER_HEIGHT,
        behavior: 'smooth',
      })
    }}>
      {props.children}
    </button>
  )
}
