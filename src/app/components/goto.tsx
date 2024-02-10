'use client'

export const Goto = (props: { elementID: string, label: string }) => {
  return (
    <button onClick={() => {
      const element = document.querySelector(`#${props.elementID}`) as HTMLElement
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      })
    }}>
      {props.label}
    </button>
  )
}
