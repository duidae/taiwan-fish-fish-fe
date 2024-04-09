"use client"
import {useEffect, useRef} from "react"
import styled from "styled-components"
import {Z_INDEX} from "@/app/constant"

const Index = styled.div`
  min-height: 16px;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  word-wrap: break-word;
  color: #8e8e8e;
  transition: 0.3s;

  &.isActive {
    color: var(--theme-blue);
  }
`

export type TOCIndex = {id: string; label: string}

const tocIndexIDPrefix = "toc-index-"
const activeClassname = "isActive"

export const TOC = (props: {indexes: TOCIndex[]}) => {
  const {indexes} = props

  const prevAnchorIDRef = useRef<string | null>(null)

  useEffect(() => {
    prevAnchorIDRef.current = `${tocIndexIDPrefix}${indexes?.[0].id}`

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute("id")
          const indexID = `${tocIndexIDPrefix}${id}`
          const indexEl = document.querySelector(`#${indexID}`)
          if (entry.isIntersecting) {
            if (prevAnchorIDRef.current !== indexID) {
              document.querySelector(`#${prevAnchorIDRef.current}`)?.classList?.remove(activeClassname)
            }
            indexEl?.classList?.add(activeClassname)
            prevAnchorIDRef.current = indexID
          } else {
            indexEl?.classList?.remove(activeClassname)
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
    <div
      className={`fixed right-0 top-1/4 w-10 flex flex-col gap-12 bg-white opacity-90 m-1 p-1 pt-2 pb-4 rounded-md shadow-md ${Z_INDEX.TOP}`}
    >
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
