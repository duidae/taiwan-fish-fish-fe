'use client'

export const Goto = (props: { elementID: string, className?: string, children?: React.ReactNode }) => {
  return (
    <button className={props.className} onClick={() => {
      const element = document.querySelector(`#${props.elementID}`) as HTMLElement
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      })
    }}>
      {props.children}
    </button>
  )
}
