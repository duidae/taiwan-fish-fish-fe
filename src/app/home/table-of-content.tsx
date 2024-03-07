"use client"
import {useEffect} from "react"
import styled from "styled-components"

const Index = styled.div`
  min-height: 16px;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  word-wrap: break-word;
  color: #8e8e8e;

  &.active {
    color: #27b5f7;
  }
`

export type TOCIndex = {id: string; label: string}

const tocIndexIDPrefix = "toc-index-"
const activeClassname = "active"

export const TOC = (props: {indexes: TOCIndex[]}) => {
  const {indexes} = props

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute("id")
          const indexID = `${tocIndexIDPrefix}${id}`
          const index = document.querySelector(`#${indexID}`)
          if (entry.isIntersecting) {
            index?.classList?.add(activeClassname)
          } else {
            index?.classList?.remove(activeClassname)
          }
        })
      },
      {
        root: null,
        rootMargin: `5px 0px -5px 0px`,
        threshold: 0
      }
    )

    indexes?.forEach(index => {
      const target = document.querySelector(`#${index.id}`)
      if (target) {
        observer.observe(target)
      }
    })
  }, [])

  return (
    <div className="fixed right-0 top-1/4 w-10 flex flex-col gap-6 bg-white opacity-90 m-1 p-1 pt-2 pb-4 rounded-md shadow-md">
      {indexes?.map(
        (tocIndex, index) =>
          tocIndex && (
            <Index
              className="text-center pl-1 pr-1"
              key={`toc-key-${index}`}
              id={`${tocIndexIDPrefix}${tocIndex.id}`}
              onClick={() => {
                const anchor = document.querySelector(`#${tocIndex.id}`) as HTMLElement
                if (anchor) {
                  window.scrollTo({
                    top: anchor.offsetTop,
                    behavior: "smooth"
                  })
                }
              }}
            >
              {tocIndex.label}
            </Index>
          )
      )}
    </div>
  )
}
