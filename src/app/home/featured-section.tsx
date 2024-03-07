import Link from "next/link"

export enum DIRECTION {
    Left = 'LEFT',
    Right = 'RIGHT',
  }

  export const FeaturedSection = (props: {
    id: string
    title: string
    route: string
    direction?: DIRECTION
  }) => {
    const { id, title, route, direction } = props
    const isLeft = direction === DIRECTION.Left
  
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <div id={id} className="w-full grow flex flex-row justify-center items-stretch">
          <div className={`${isLeft ? "w-3/5" : "w-2/5"} bg-red-50`}></div>
          <div className={`${isLeft ? "w-2/5" : "w-3/5"} bg-green-50`}></div>
        </div>
        <Link className="h-1/6 text-base" href={route}>
          看全部{title}
          {" >>"}
        </Link>
      </div>
    )
}