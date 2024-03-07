"use client"
import styled from "styled-components"

const TOCContainer = styled.div`
  position: fixed;
  width: 90px;
  right: 0;
`

const TOCTab = styled.div`
  width: 30px;
  position: fixed;
  top: 300px;
  right: 0;
  transition: transform 0.1s ease-in-out 0.1s;

  > div {
    width: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: #8e8e8e;
    background-color: #f4f4f4;
    padding-top: 25px;
    padding-bottom: 25px;
    font-size: 14px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const Index = styled.div`
  width: 100%;
  min-height: 16px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  word-wrap: break-word;
  color: #8e8e8e;

  &.isActive {
    color: blue;
  }
`

export type TOCIndex = {id: string; label: string}

export const TOC = (props: {indexes: TOCIndex[]}) => {
  return (
    <TOCContainer>
      <TOCTab>
        {props.indexes?.map(
          (tocIndex, index) =>
            tocIndex && (
              <Index
                key={`toc-key-${index}`}
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
      </TOCTab>
    </TOCContainer>
  )
}
