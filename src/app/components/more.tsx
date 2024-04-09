import Link from "next/link"
import {Color, Style} from "@/app/constant"

export const More = (props: {href: string; title: string}) => {
  const {href, title} = props

  return (
    <Link
      className={`my-4 px-8 py-3 border border-${Color.HOVER} rounded-full hover:bg-${Color.HOVER} transition-colors duration-${Style.DURATION}`}
      href={href}
    >
      <h3>{`看更多${title}`}</h3>
    </Link>
  )
}
