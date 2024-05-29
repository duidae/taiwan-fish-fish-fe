'use client'
import styles from './page.module.css'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null)

  const count = 3
  const [current, setCurrent] = useState(0)
  const [animationState, setAnimationState] = useState(false)

  const gotoNum = (index: number) => {
    console.log('gotoNum', index, current, pageRef.current?.children)
    if (index !== current && !animationState) {
      setAnimationState(true)
      setTimeout(() => setAnimationState(false), 500)
      if (pageRef.current?.children) {
        for (let i = 0; i < count; i++) {
          const slide = pageRef.current?.children?.[i] as HTMLElement
          slide.style.transition = 'bottom 0.5s ease-in-out'
          slide.style.bottom = (index - i) * 100 + '%'
        }
        setCurrent(index)
      }
    }
  }

  const gotoNext = () => {
    console.log('gotoNext', current)
    current < count - 1 && gotoNum(current + 1)
  }

  const gotoPrev = () => {
    console.log('gotoPrev', current)
    current > 0 && gotoNum(current - 1)
  }

  useEffect(() => {
    pageRef.current?.addEventListener('wheel', (e) => {
      e.deltaY < 0 ? gotoPrev() : gotoNext()
    })
  }, [])

  return (
    <>
      <div className={styles.main_container} ref={pageRef}>
        <div className={`${styles.page} bg-green-400`}>
        </div>
        <div className={`${styles.page} bg-red-400`}>
        </div>
        <div className={`${styles.page} bg-blue-400`}>
        </div>
      </div>
      <div className='w-full absolute bottom-0'>{current}</div>
    </>
  )
}
