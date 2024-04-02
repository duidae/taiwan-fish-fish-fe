"use client"

export const BackToSection = (props: {id: string}) => {
  const {id} = props
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        const anchor = document.querySelector(`#${id}`) as HTMLElement
        if (anchor) {
          window.scrollTo({
            top: anchor.offsetTop,
            behavior: "smooth"
          })
        }
      }}
    >
      B
    </div>
  )
}
