"use client"
import {useEffect} from "react"
import {BACK_TO_TOP_ELEMENT_ID} from "@/app/constant"
import styles from "./back-to-top.module.css"

const topDetectorID = "top-detector"

export const TopDetector = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const backToTopElement = document.querySelector(`#${BACK_TO_TOP_ELEMENT_ID}`)
        entry.isIntersecting
          ? backToTopElement?.classList?.add(styles.hide)
          : backToTopElement?.classList?.remove(styles.hide)
      },
      {
        root: null,
        threshold: 0
      }
    )

    observer.observe(document.querySelector(`#${topDetectorID}`) as Element)
  }, [])

  return <div id={topDetectorID}></div>
}

export default TopDetector
